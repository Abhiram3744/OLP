const response = await fetch('http://localhost:5000/api/roadmap/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    goal: 'Placement',
    experienceLevel: 'Beginner',
    programmingLanguage: 'Java',
    targetRole: 'Software Developer',
    hoursPerDay: 2,
    subjects: ['DSA', 'Web Development'],
  }),
});

const data = await response.json();

console.log(JSON.stringify(data, null, 2));