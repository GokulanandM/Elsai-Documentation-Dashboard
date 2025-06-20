const mongoose = require('mongoose');

const uri = 'mongodb+srv://gokulkvmhs2020:tCQSWHygV3CzZw6O@cluster0.pg4chsb.mongodb.net/llm_dashboard?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Project = require('./models/Project');
const Run = require('./models/Run');

async function seed() {
  await Project.deleteMany({});
  await Run.deleteMany({});

  const projects = await Project.insertMany([
    {
      _id: "proj1",
      name: "AI Research Assistant",
      client: "client@company.com",
      token_usage: 2365,
      total_cost: 0.011825,
      success_rate: 1.0,
      total_runs: 2,
      avg_latency: 14286.33
    },
    {
      _id: "proj2",
      name: "Customer Support Bot",
      client: "user@company.com",
      token_usage: 15420,
      total_cost: 0.077100,
      success_rate: 0.96,
      total_runs: 25,
      avg_latency: 8500.45
    }
  ]);

  const runs = await Run.insertMany([
    {
      run_id: "run1",
      project_id: "proj1",
      llm_calls: [
        {
          model: "gpt-4o-mini",
          total_tokens: 459,
          latency_ms: 11171,
          prompt: "What is deep learning?",
          response: "Deep learning is a subset of machine learning...",
          cost: 0.002295
        }
      ]
    },
    {
      run_id: "run2",
      project_id: "proj2",
      llm_calls: [
        {
          model: "gpt-4o-mini",
          total_tokens: 346,
          latency_ms: 8942,
          prompt: "Help me with my billing question",
          response: "I'd be happy to help you with that...",
          cost: 0.001730
        }
      ]
    }
  ]);

  console.log('Seeding complete');
  process.exit();
}

seed();