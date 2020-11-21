const fs = require('fs');

exports.getVideos = (req, res) => {
  // 1 ) import videos from the data.json file
  const videos = fs.readFileSync(`${__dirname}/../data.json`);

  // 2 ) parse that data
  const parsedVideos = JSON.parse(videos);

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

  // 2 ) import videos from data.json
  const videos = JSON.parse(fs.readFileSync(`${__dirname}/../data.json`));

  // 3 ) merge the videos from our req.body
  const newVideosList = [...videos, video];

  console.log('newVideosList', newVideosList);
  // 4 ) save the data to the file again
  fs.writeFileSync(`${__dirname}/../data.json`, JSON.stringify(newVideosList));

  // 5 ) just return a message to tell the user that the data was added
  res.status(200).json({
    status: 'success',
    message: 'data added'
  });
};
