const internshipsList = document.getElementById('internshipsList');
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('show');
});

async function fetchInternships() {
  try {
    const response = await fetch('https://akshay050702-chatbot.hf.space/get_internships', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) // Send empty body if no parameters needed
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const internships = data.internships;

    internships.forEach(internship => {
      const card = document.createElement('div');
      card.className = 'internship-card';

      card.innerHTML = `
        <div class="card-header">
          <div class="internship-role">${internship.role}</div>
          
        </div>
        <div class="internship-company"><strong>Company:</strong> ${internship.company}</div>
        <div class="internship-info"><strong>Location:</strong> ${internship.location}</div>
        <div class="internship-info"><strong>Stipend:</strong> ${internship.stipend}</div>
        <div class="internship-info"><strong>Duration:</strong> ${internship.duration}</div>
        <div class="requirements"><strong>Requirements:</strong> ${internship.requirements.join(', ')}</div>
        <a class="apply-btn" href="${internship.apply_link}" target="_blank">Apply</a>
      `;

      internshipsList.appendChild(card);
    });

  } catch (error) {
    internshipsList.innerHTML = '<p style="text-align:center; color:red;">Failed to load internships. Please try again later.</p>';
    console.error('Error fetching internships:', error);
  }
}

fetchInternships();
