const express = require('express');

const videosRouter = require('./routes/videosRouter');

const PORT = 80;
const app = express();

app.use(express.json());

app.use('/videos', videosRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'this route cannot be found'
  });
});

app.listen(PORT, () => {
  console.log(`App runing on port :  ${PORT}`);
});
