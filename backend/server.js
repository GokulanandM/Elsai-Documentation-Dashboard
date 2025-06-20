require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB URI — should be set in .env in production (NEVER hardcoded)
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI not set in environment variables');
  process.exit(1); // Stop the server if no DB URI
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => {
  console.error("❌ MongoDB connection failed:", err);
  process.exit(1);
});

// Models
const Project = require('./models/Project');
const Run = require('./models/Run');

// API Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.get('/api/runs', async (req, res) => {
  try {
    const runs = await Run.find();
    res.json(runs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch runs' });
  }
});

// ✅ Dynamic PORT (for Render or local)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
