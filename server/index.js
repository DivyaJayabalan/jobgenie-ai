const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");

fastify.register(cors);

const jobs = [
  {
    id: 1,
    title: "React Developer",
    company: "TechCorp",
    location: "Remote",
    skills: ["React", "JavaScript"]
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataSoft",
    location: "Bangalore",
    skills: ["Node.js", "MongoDB"]
  }
];

// ⭐ Store applied jobs here
let applications = [];

// Get job list
fastify.post("/jobs", async (request, reply) => {
  const { resumeSkills } = request.body;

  const matchedJobs = jobs.map(job => {
    const matchCount = job.skills.filter(skill =>
      resumeSkills.includes(skill)
    ).length;

    const score = Math.round((matchCount / job.skills.length) * 100);

    return { ...job, score };
  });

  return matchedJobs;
});

// Save application when user clicks Apply
fastify.post("/apply", async (request) => {
  const job = request.body;
  applications.push({
  ...job,
  status: "Applied",
  history: [{ status: "Applied", date: new Date() }]
});

  
  return { message: "Application saved" };
});

// Get all applied jobs
fastify.get("/applications", async () => {
  return applications;
});
fastify.put("/update-status", async (request) => {
  const { index, status } = request.body;

  if (applications[index]) {
    applications[index].status = status;
applications[index].history.push({ status, date: new Date() });

    return { message: "Status updated" };
  }

  return { message: "Application not found" };
});


fastify.listen({ port: 5000 }, err => {
  if (err) throw err;
  console.log("Server running on http://localhost:5000");
});
