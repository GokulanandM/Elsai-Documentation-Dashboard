let appData = {};

document.addEventListener('DOMContentLoaded', async () => {
  const [projectsRes, runsRes] = await Promise.all([
    fetch('http://localhost:3000/api/projects'),
    fetch('http://localhost:3000/api/runs')
  ]);
  const [projects, runs] = await Promise.all([projectsRes.json(), runsRes.json()]);

  appData.projects = projects;
  appData.runs = runs;

  console.log('App data loaded:', appData);
});