const baseURL = "http://localhost:3000/skills";
const skillList = document.getElementById("skill-list");
const form = document.getElementById("skill-form");
const search = document.getElementById("search");
const toggleModeBtn = document.getElementById("toggle-mode");

function fetchSkills() {
  fetch(baseURL)
    .then(res => res.json())
    .then(displaySkills);
}

function displaySkills(skills) {
  skillList.innerHTML = "";
  skills.forEach(skill => {
    const div = document.createElement("div");
    div.className = "skill-card";
    div.innerHTML = `
      <h3>${skill.name}</h3>
      <p><strong>Category:</strong> ${skill.category}</p>
      <p>${skill.description}</p>
      <p><strong>Location:</strong> ${skill.location}</p>
    `;
    skillList.appendChild(div);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const newSkill = {
    name: form.name.value,
    category: form.category.value,
    description: form.description.value,
    location: form.location.value
  };

  fetch(baseURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSkill)
  })
    .then(res => res.json())
    .then(() => {
      fetchSkills();
      form.reset();
    });
});

search.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  fetch(baseURL)
    .then(res => res.json())
    .then(data => {
      const filtered = data.filter(skill =>
        skill.name.toLowerCase().includes(term) ||
        skill.category.toLowerCase().includes(term)
      );
      displaySkills(filtered);
    });
});

toggleModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

fetchSkills();
