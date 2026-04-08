require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
app.get('/', (req, res) => res.send('Backend on 4000 is READY!'));
app.listen(port, () => console.log(`FavTech API running on port ${port}`));
