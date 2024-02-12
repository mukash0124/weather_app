const express = require('express');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

const apiKey = process.env.OPENWEATHER_API_KEY;

router.get('/get/:city', authenticate, async (req, res) => {
  const city = req.params.city;

  try {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      const response = await axios.get(url);

      res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;