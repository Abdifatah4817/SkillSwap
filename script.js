const searchInput = document.getElementById("search");
const skillList = document.getElementById("skill-list");
const skillForm = document.getElementById("skill-form");
const toggleModeBtn = document.getElementById("toggle-mode");

let allSkills = [];

// 🔄 Fetch skills
function fetchSkills() {
  fetch("http://localhost:3000/skills")
    .then(res => res.json())
    .then(data => {
      allSkills = data;
      displaySkills(allSkills);
    })
    .catch(err => console.error("Error fetching skills:", err));
}

// 📦 Display skills
function displaySkills(skills) {
  skillList.innerHTML = "";

  if (skills.length === 0) {
    skillList.innerHTML = `<p>No skills found.</p>`;
    return;
  }

  skills.forEach(skill => {
    const card = document.createElement("div");
    card.className = "skill-card";
    card.innerHTML = `
      <h3>${skill.name}</h3>
      <p><strong>Category:</strong> ${skill.category}</p>
      <p>${skill.description}</p>
      <p><strong>Location:</strong> ${skill.location}</p>
      <button class="delete-btn" data-id="${skill.id}">🗑 Delete</button>
    `;
    skillList.appendChild(card);
  });

  // 🗑 Add delete event listeners
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      deleteSkill(id);
    });
  });
}

// 🧹 Delete skill
function deleteSkill(id) {
  fetch(`http://localhost:3000/skills/${id}`, {
    method: "DELETE"
  })
    .then(() => {
      allSkills = allSkills.filter(skill => skill.id != id);
      displaySkills(allSkills);
    })
    .catch(err => console.error("Delete error:", err));
}

// 🔍 Search functionality
searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = allSkills.filter(skill =>
    skill.name.toLowerCase().includes(term) ||
    skill.category.toLowerCase().includes(term) ||
    skill.description.toLowerCase().includes(term) ||
    skill.location.toLowerCase().includes(term)
  );
  displaySkills(filtered);
});

// ➕ Handle form submission
skillForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newSkill = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    description: document.getElementById("description").value,
    location: document.getElementById("location").value
  };

  fetch("http://localhost:3000/skills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newSkill)
  })
    .then(res => res.json())
    .then(addedSkill => {
      allSkills.push(addedSkill);
      displaySkills(allSkills);
      skillForm.reset();
    })
    .catch(err => console.error("Add skill error:", err));
});

// 🌙 Toggle dark mode
toggleModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// 🔃 Initial load
fetchSkills();
