const eventsList = document.getElementById('events-list');

async function loadEvents() {
  try {
    const response = await fetch('https://akshay050702-chatbot.hf.space/get_events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched events:', data);

    const events = data.events;
    events.forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card';

      const date = new Date(event.date).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
      });

      card.innerHTML = `
        <div class="card-header">
          <div class="event-name">${event.name}</div>
          <div class="event-date">${date}</div>
        </div>
        <div class="event-description">${event.description}</div>
        <div class="event-info"><strong>Location:</strong> ${event.location}</div>
        <div class="event-info"><strong>Category:</strong> ${event.category}</div>
        <div class="event-info"><strong>Available Slots:</strong> ${event.available_slots}</div>
        <div class="organizer">
          <strong>Organizer:</strong> ${event.organizer.name} <br>
          <strong>Contact:</strong> ${event.organizer.contact}
        </div>
        <a class="register-btn" href="${event.registration_link}" target="_blank">Register</a>
      `;

      eventsList.appendChild(card);
    });
  } catch (error) {
    eventsList.innerHTML = '<p style="color:red;">Failed to load events. Please try again later.</p>';
    console.error('Error fetching events:', error);
  }
}

loadEvents();


function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

