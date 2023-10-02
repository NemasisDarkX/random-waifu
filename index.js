const express = require('express');
const app = express();
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const waifuData = require('./waifu-data.json');

app.get('/random/:name', async (req, res) => {
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
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    });

    
    const extension = path.extname(imageUrl);
    const filename = `${name}-${randomImageIndex}${extension}`;
    const filePath = path.join(__dirname, 'images', filename);

    
    await fs.writeFile(filePath, response.data);

    
    res.sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error serving the image');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
