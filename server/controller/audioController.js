const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const ffmpeg = require("fluent-ffmpeg");

const supportedAudioFormats = [
  'wav', 'aiff', 'pcm', 'mp3', 'aac', 'ogg', 'flac', 'alac', 'm4a', 'opus', 'amr'
];

const cleanUp = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch (e) {
      console.error(`Failed to delete file: ${filePath}`, e);
    }
  }
};

const convertAudio = async (req, res) => {
  try {
    if (!req.file || !req.body.format) {
      return res.status(400).json({ error: 'Audio file and target format are required.' });
    }

    const inputPath = req.file.path;
    const targetFormat = req.body.format.toLowerCase();

    if (!supportedAudioFormats.includes(targetFormat)) {
      cleanUp(inputPath);
      return res.status(400).json({ error: `Unsupported audio format: ${targetFormat}` });
    }

    const outputDir = path.join(__dirname, 'converted_audio');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputFilename = `${path.parse(req.file.filename).name}_converted.${targetFormat}`;
    let outputPath = path.join(outputDir, outputFilename);

    // Handle PCM conversion differently
let cmd;
if (targetFormat === 'pcm') {
  cmd = `ffmpeg -y -i "${inputPath}" -f s16le -acodec pcm_s16le -ar 44100 -ac 2 "${outputPath}"`;
} else if (targetFormat === 'alac') {
  const alacOutput = outputPath.replace(/\.alac$/, '.m4a');
  cmd = `ffmpeg -y -i "${inputPath}" -c:a alac "${alacOutput}"`;
  outputPath = alacOutput;
} else if (targetFormat === 'amr') {
cmd = `ffmpeg -y -i "${inputPath}" -ac 1 -c:a libopencore_amrnb -ar 8000 -ab 12.2k "${outputPath}"`;
} else {
  cmd = `ffmpeg -y -i "${inputPath}" "${outputPath}"`;
}

    exec(cmd, (error) => {
      // Clean up input file immediately after conversion attempt
      cleanUp(inputPath);

      if (error) {
        cleanUp(outputPath); // If output was created before error
        console.error('FFmpeg error:', error);
        return res.status(500).json({ error: 'Audio conversion failed', details: error.message });
      }

      if (!fs.existsSync(outputPath)) {
        return res.status(500).json({ error: 'Converted file not found' });
      }

      res.download(outputPath, (err) => {
        // Clean up output file right after download or error
        cleanUp(outputPath);
        if (err) console.error('Download error:', err);
      });
    });

  } catch (err) {
    if (req.file) cleanUp(req.file.path);
    console.error('Conversion controller error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.toString() });
  }
};
const compressAudio = (req, res) => {
  const file = req.file;
  const { percentage } = req.body;

  if (!file || !percentage) {
    return res.status(400).json({ error: "Audio file and percentage are required." });
  }

  const inputPath = file.path;
  const outputFileName = `${Date.now()}-compressed.mp3`;
  const outputPath = path.join(__dirname, "..", "outputs", outputFileName);

  const bitrate = Math.max(32, Math.min(320, Math.floor((percentage / 100) * 320))); // Clamp 32–320 kbps

  ffmpeg(inputPath)
    .audioBitrate(`${bitrate}k`)
    .toFormat("mp3")
    .on("end", () => {
      res.download(outputPath, () => {
        fs.unlinkSync(inputPath); // Clean up
        fs.unlinkSync(outputPath);
      });
    })
    .on("error", (err) => {
      console.error("Compression error:", err.message);
      fs.unlinkSync(inputPath);
      res.status(500).json({ error: "Compression failed." });
    })
    .save(outputPath);
};

module.exports = {
  convertAudio,
  compressAudio
};
