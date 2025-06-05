const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const gm = require('gm').subClass({ imageMagick: true });
const ffmpeg = require('fluent-ffmpeg');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// ✅ Using require with .default to handle ESM default export

const supportedRasterSharp = ['jpeg','jpg','png','webp','tiff','heif','heic'];
const supportedVectorInkscape = ['svg', 'ai', 'eps', 'pdf', 'cdr'];
const supportedAnimationFFmpeg = ['gif', 'mp4', 'webm', 'mov'];
const supportedGM = ['bmp', 'gif', 'tiff', 'psd', 'ico', 'cur', 'pcx', 'tga', 'xcf', 'dds'];
const RAWFormats = ['cr2','nef','arw','dng'];

async function convertWithSharp(inputPath, outputPath, format) {
  const image = sharp(inputPath);
  if (format === 'heif' || format === 'heic') {
    const newOutputPath = outputPath.replace(/\.(heic|heif)$/i, '.avif');
    return image.avif({ quality: 50 }).toFile(newOutputPath);
  } else {
    return image.toFormat(format).toFile(outputPath);
  }
}

function convertWithGM(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    gm(inputPath).write(outputPath, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function convertWithFFmpeg(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .run();
  });
}

const cleanUp = (filePath) => {
  fs.unlink(filePath, (err) => { if (err) console.error(err); });
};

const convertRawToJpeg = async (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const ppmPath = inputPath + '.ppm';
    exec(`dcraw -c "${inputPath}" > "${ppmPath}"`, async (error, stdout, stderr) => {
      if (error) return reject(stderr || stdout || error);
      try {
        await sharp(ppmPath).jpeg().toFile(outputPath);
        cleanUp(ppmPath);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  });
};

const convertToSVG = async (inputPath, outputPath, originalExt) => {
  const rasterExts = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tiff', 'heic', 'heif'];
  const vectorExts = ['svg', 'pdf', 'eps', 'ai', 'cdr'];
  const animationExts = ['gif', 'mp4', 'webm', 'mov'];
  const rawExts = ['cr2', 'nef', 'arw', 'dng'];

  const ext = originalExt.toLowerCase();

  // Convert RAW to JPEG first
  if (rawExts.includes(ext)) {
    const jpegPath = inputPath + '_raw_converted.jpg';
    await convertRawToJpeg(inputPath, jpegPath);
    return convertToSVG(jpegPath, outputPath, 'jpg');
  }

  // Extract first frame if animation
  if (animationExts.includes(ext)) {
    const pngPath = inputPath + '_frame.png';
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .frames(1)
        .output(pngPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });
    return convertToSVG(pngPath, outputPath, 'png');
  }

  // If vector, use Inkscape directly to convert to SVG
  if (vectorExts.includes(ext)) {
    return new Promise((resolve, reject) => {
      exec(`xvfb-run --auto-servernum inkscape "${rasterPath}" --export-plain-svg="${outputPath}" --export-dpi=300`, (error, stdout, stderr) => {
  if (error) {
    return reject(stderr || stdout || error);
  }
  if (!fs.existsSync(outputPath)) {
    return reject(new Error('Output file not found after Inkscape raster to SVG conversion'));
  }
  // Clean up intermediate PNG file if created
  if (rasterPath !== inputPath) {
    cleanUp(rasterPath);
  }
  resolve();
});
    });
  }

  // If raster, convert to PNG first (if not PNG already)
  let rasterPath = inputPath;
  if (!['png'].includes(ext)) {
    const pngPath = inputPath + '_converted.png';
    await sharp(inputPath).png().toFile(pngPath);
    rasterPath = pngPath;
  }

  // Use Inkscape's "Trace Bitmap" feature to generate SVG from raster
  return new Promise((resolve, reject) => {
    exec(`xvfb-run --auto-servernum inkscape "${rasterPath}" --export-plain-svg="${outputPath}" --export-dpi=300`, (error, stdout, stderr) => {
      if (error) {
        return reject(stderr || stdout || error);
      }
      if (!fs.existsSync(outputPath)) {
        return reject(new Error('Output file not found after Inkscape raster to SVG conversion'));
      }
      // Clean up intermediate PNG file if created
      if (rasterPath !== inputPath) {
        cleanUp(rasterPath);
      }
      resolve();
    });
  });
};
function convertJpgToEps(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    gm(inputPath)
      .setFormat('eps')
      .write(outputPath, (err) => {
        if (err) reject(err);
        else resolve();
      });
  });
}
const convertWithInkscape = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const ext = path.extname(outputPath).slice(1);
    // This command handles EPS, AI, PDF, SVG conversions via Inkscape
const command = `xvfb-run --auto-servernum inkscape "${inputPath}" --export-type=${ext} --export-filename="${outputPath}" --export-dpi=300`;
    console.log('Running command:', command);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Inkscape error:', stderr || stdout || error);
        return reject(new Error(`Inkscape conversion failed: ${stderr || stdout || error}`));
      }

      if (!fs.existsSync(outputPath)) {
        console.error('Output file not found after Inkscape conversion:', outputPath);
        return reject(new Error('Output file not found after Inkscape conversion'));
      }

      resolve();
    });
  });
};
const convertJpgToPdf = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    gm(inputPath)
      .setFormat('pdf')
      .write(outputPath, (err) => {
        if (err) return reject(err);
        resolve();
      });
  });
};

const convertImage = async (req, res) => {
  try {
    if (!req.file || !req.body.format) {
      return res.status(400).json({ error: 'Image file and target format are required.' });
    }

    const inputPath = req.file.path;
    const targetFormat = req.body.format.toLowerCase();

    const convertedDir = path.join(__dirname, 'converted');
    if (!fs.existsSync(convertedDir)) fs.mkdirSync(convertedDir, { recursive: true });

    let ext = targetFormat;
    if (targetFormat === 'heif') ext = 'avif';

    const outputPath = path.join(convertedDir, `${req.file.filename}_converted.${ext}`);

    console.log(`Converting ${inputPath} to ${outputPath} as format ${targetFormat}`);

    const inputExt = path.extname(req.file.originalname).slice(1).toLowerCase();

    // Handle JPG/PNG to EPS with gm
    if (
  targetFormat === 'pdf' &&
  ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tiff'].includes(inputExt)
) {
  await convertJpgToPdf(inputPath, outputPath);
}
    else if (
      targetFormat === 'eps' &&
      ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tiff'].includes(inputExt)
    ) {
      await convertJpgToEps(inputPath, outputPath);
    } 
     else if ((targetFormat === 'mp4' || targetFormat === 'mov') && supportedRasterSharp.includes(path.extname(req.file.originalname).slice(1).toLowerCase())) {
  // Convert single image to video (mp4 or mov) with 5 seconds duration
  await new Promise((resolve, reject) => {
    ffmpeg()
      .input(inputPath)
      .loop(5)  // loop image for 5 seconds
      .outputOptions([
        '-t 5',
        '-pix_fmt yuv420p',
        '-vf scale=1280:720'  // optional: resize video to 720p
      ])
      .output(outputPath)
      // Codec depends on container:
      // For mp4 use libx264, for mov you can also use libx264 or prores
      .videoCodec(targetFormat === 'mp4' ? 'libx264' : 'prores_ks')
      .on('end', resolve)
      .on('error', reject)
      .run();
  });
}
else if (targetFormat === 'ico' || targetFormat === 'cur') {
  // Resize image before saving as ICO to avoid size limit error
  await new Promise((resolve, reject) => {
    gm(inputPath)
      .resize(256, 256) // ICO max size
      .write(outputPath, (err) => {
        if (err) reject(err);
        else resolve();
      });
  });
}
    else if (targetFormat === 'svg') {
      await convertToSVG(inputPath, outputPath, inputExt);
    } else if (supportedRasterSharp.includes(targetFormat)) {
      await convertWithSharp(inputPath, outputPath, targetFormat);
    } else if (supportedVectorInkscape.includes(targetFormat)) {
      await convertWithInkscape(inputPath, outputPath);
    } else if (supportedAnimationFFmpeg.includes(targetFormat)) {
      await convertWithFFmpeg(inputPath, outputPath);
    } else if (supportedGM.includes(targetFormat)) {
      await convertWithGM(inputPath, outputPath, targetFormat);
    } else if (RAWFormats.includes(inputExt)) {
      await convertRawToJpeg(inputPath, outputPath);
    } else {
      return res.status(400).json({ error: 'Unsupported target format.' });
    }

    if (!fs.existsSync(outputPath)) {
      console.error('Output file not found:', outputPath);
      return res.status(500).json({ error: 'Converted file not found' });
    }

    res.download(outputPath, (err) => {
      cleanUp(inputPath);
      cleanUp(outputPath);
      if (err) console.error('Download error:', err);
    });
  } catch (err) {
    console.error('Conversion error:', err);
    if (req.file) cleanUp(req.file.path);
    res.status(500).json({ error: 'Conversion failed', details: err.toString() });
  }
};
const compressImage = async (req, res) => {
  const file = req.file;
  const quality = parseInt(req.body.quality) || 80;

  if (!file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  try {
    const image = sharp(file.buffer);
    const metadata = await image.metadata();
    const format = metadata.format;

    let transformed = image;
    
    if (format === "jpeg" || format === "jpg") {
      transformed = transformed.jpeg({ quality });
    } else if (format === "png") {
      transformed = transformed.png({ quality });
    } else if (format === "webp") {
      transformed = transformed.webp({ quality });
    }

    const outputBuffer = await transformed.toBuffer();

    res.set("Content-Type", `image/${format}`);
    res.send(outputBuffer);
  } catch (err) {
    console.error("Image compression error:", err);
    res.status(500).json({ message: "Image compression failed" });
  }
};

module.exports = { convertImage, compressImage };
