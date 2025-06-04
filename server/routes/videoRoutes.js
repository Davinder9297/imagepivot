const express = require('express');
const multer = require('multer');
const path = require('path');
const { convertVideo } = require('../controller/videoController');

const router = express.Router();

// Setup multer for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../upload_videos'));
  },
  filename: (req, file, cb) => {
    // e.g. 1681234567890-originalfilename.mp4
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// POST /convert-video?format=mp4
router.post('/convert-video', upload.single('video'), convertVideo);

module.exports = router;
