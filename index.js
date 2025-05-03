const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

const bookingRoutes = require('./routes/booking');
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require("./routes/quiz");

// Initialize Express app
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://supriyonag552:ahy7BxxpZHAtslK7@cluster0.ldoppfe.mongodb.net/free-session-booking?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use routes
app.use('/api', bookingRoutes);
app.use('/api', userRoutes);
app.use("/api", quizRoutes);


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
