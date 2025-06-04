const express = require('express');
const multer = require('multer');
const path = require('path');
const { convertAudio } = require('../controller/audioController');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // use __dirname to ensure correct absolute path
    const uploadPath = path.join(__dirname, '../upload_audio'); 
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST route for audio conversion
router.post('/convertaudio', upload.single('audio'), convertAudio);

module.exports = router;
