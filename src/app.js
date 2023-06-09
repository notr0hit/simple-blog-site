const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const postsRouter = require('./routes/posts');
const path = require('path');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', postsRouter);

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
