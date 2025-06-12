const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const ffmpeg = require("fluent-ffmpeg");
const supportedVideoFormats = [
  'mp4', 'mov', 'avi', 'mkv', 'flv', 'webm', 'wmv', 'mpeg', '3gp', 'ogg'
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

const convertVideo = (req, res) => {
  try {
    // inputFileName from body or detect from uploaded file if using multer
    const inputFileName = req.body.inputFileName || (req.file && req.file.filename);
    const outputFormat = (req.body.format || '').toLowerCase();

    if (!inputFileName || !outputFormat) {
      return res.status(400).json({ error: 'Input file name and output format are required.' });
    }

    if (!supportedVideoFormats.includes(outputFormat)) {
      return res.status(400).json({ error: `Unsupported output video format: ${outputFormat}` });
    }

    const inputPath = req.file ? req.file.path : path.join(__dirname, '../upload_videos', inputFileName);
    const baseName = path.parse(inputFileName).name;

    const outputDir = path.join(__dirname, '../converted_videos');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputFileName = `${baseName}_converted.${outputFormat}`;
    const outputPath = path.join(outputDir, outputFileName);

    // Example: custom codec selection, default to libx264 for video and aac for audio
    const videoCodec = req.query.codec || 'libx264';
    const audioCodec = outputFormat === 'webm' ? 'libopus' : 'aac';

    // Build ffmpeg command
    const cmd = `ffmpeg -y -i "${inputPath}" -vcodec ${videoCodec} -acodec ${audioCodec} "${outputPath}"`;

    exec(cmd, (error) => {
      // Delete input immediately after conversion attempt
      cleanUp(inputPath);

      if (error) {
        cleanUp(outputPath);
        console.error('FFmpeg conversion error:', error);
        return res.status(500).json({ error: 'Video conversion failed', details: error.message });
      }

      if (!fs.existsSync(outputPath)) {
        return res.status(500).json({ error: 'Converted video file not found' });
      }

      // Send converted file to client, delete after sending
      res.download(outputPath, outputFileName, (err) => {
        cleanUp(outputPath);
        if (err) console.error('Error sending converted video:', err);
      });
    });

  } catch (err) {
    console.error('Conversion controller error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.toString() });
  }
};
const compressVideo = (req, res) => {
  const file = req.file;
  const { percentage } = req.body;

  if (!file || !percentage) {
    return res.status(400).json({ error: "Video file and compression percentage are required." });
  }

  const inputPath = file.path;
  const outputFileName = `${Date.now()}-compressed.mp4`;
  const outputPath = path.join(__dirname, "..", "outputs", outputFileName);

  // Clamp the CRF value based on percentage
  // CRF: 0 (best quality) → 51 (worst)
  // Convert percentage (0–100) to CRF scale inversely
  const crf = Math.round(51 - (percentage / 100) * 51);
  const safeCRF = Math.max(18, Math.min(40, crf)); // Limit range to reasonable values

  ffmpeg(inputPath)
    .outputOptions([
      `-vcodec libx264`,
      `-crf ${safeCRF}`,
      `-preset veryfast`
    ])
    .on("end", () => {
      res.download(outputPath, () => {
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
      });
    })
    .on("error", (err) => {
      console.error("Compression error:", err.message);
      fs.unlinkSync(inputPath);
      res.status(500).json({ error: "Video compression failed." });
    })
    .save(outputPath);
};

module.exports = { convertVideo,compressVideo };
