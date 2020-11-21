const express = require('express');
const videosController = require('../controllers/videosController');

const router = express.Router();

router
  .route('/')
  .get(videosController.getVideos)
  .post(videosController.postVideos);

module.exports = router;
