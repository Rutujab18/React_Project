// server.js

const express = require('express');
const multer = require('multer');
const tf = require('@tensorflow/tfjs-node');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static('uploads'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const model = await tf.loadLayersModel('path/to/your/pretrained/model/model.json');

app.post('/classify', upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    const imageArray = new Uint8Array(imageBuffer);
    const imageTensor = tf.node.decodeImage(imageArray);

    const prediction = await model.predict(imageTensor).data();
    const maxIndex = prediction.indexOf(Math.max(...prediction));

    res.json({ prediction: `Category ${maxIndex + 1}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
