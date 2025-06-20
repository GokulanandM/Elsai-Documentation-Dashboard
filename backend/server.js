const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://gokulkvmhs2020:tCQSWHygV3CzZw6O@cluster0.pg4chsb.mongodb.net/llm_dashboard?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

const Project = require('./models/Project');
const Run = require('./models/Run');

app.get('/api/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.get('/api/runs', async (req, res) => {
  const runs = await Run.find();
  res.json(runs);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend server running at http://localhost:${PORT}`));