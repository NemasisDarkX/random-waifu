const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path'); 
const waifuData = require('./waifu-data.json');

app.get('/random/:name', (req, res) => {
  const { name } = req.params;
  const waifu = waifuData.find((waifu) => waifu.name === name);

  if (!waifu) {
    return res.status(404).send('Waifu not found');
  }

  const randomImageIndex = Math.floor(Math.random() * 10);
  const imageUrl = waifu[`image${randomImageIndex}`];

  if (!imageUrl) {
    return res.status(404).send('Image not found');
  }

  try {
    const imagePath = path.join(__dirname, imageUrl); 
    const image = fs.readFileSync(imagePath);
    res.contentType('image/jpeg');
    res.send(image);
  } catch (error) {
    res.status(500).send('Error serving the image');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
