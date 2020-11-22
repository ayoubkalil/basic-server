const multer = require('multer');
const fs = require('fs');

const multerStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function(req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `videos-${req.body.id}-${Date.now()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('file not allowed'), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadPhoto = upload.single('photo');

exports.getVideos = (req, res) => {
  // 1 ) import videos from the data.json file
  const videos = fs.readFileSync(`${__dirname}/../data.json`);

  // 2 ) parse that data
  const parsedVideos = JSON.parse(videos);
  console.log('newVideosList', __dirname);

  // 3 ) send the data as a response
  res.status(200).json({
    status: 'success',
    data: {
      videos: parsedVideos
    }
  });
};

exports.postVideos = (req, res) => {
  // 1 ) get the data from the body
  const video = req.body;

  // 1.1 ) save the image in the json file,
  const photo = `public/uploads/${req.file.filename}`;
  const newVideo = Object.assign(video, { photo });

  // 2 ) import videos from data.json
  const videos = JSON.parse(fs.readFileSync(`${__dirname}/../data.json`));

  // 3 ) merge the videos from our req.body
  const newVideosList = [...videos, newVideo];

  // 4 ) save the data to the file again
  fs.writeFileSync(`${__dirname}/../data.json`, JSON.stringify(newVideosList));

  // 5 ) just return a message to tell the user that the data was added
  res.status(200).json({
    status: 'success',
    message: 'data added'
  });
};
