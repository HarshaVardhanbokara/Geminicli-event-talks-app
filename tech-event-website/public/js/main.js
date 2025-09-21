document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule-container');
  const searchInput = document.getElementById('search-input');
  let talks = [];

  const loadingIndicator = document.getElementById('loading-indicator');

  // Show loading indicator
  loadingIndicator.style.display = 'block';

  fetch('/api/talks')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
      talks = data;
      renderSchedule(talks, searchInput.value);
    })
    .catch(error => {
        console.error('Error fetching talks:', error);
        scheduleContainer.innerHTML = '<p style="color: red;">Error: Could not load schedule data.</p>';
    })
    .finally(() => {
      // Hide loading indicator regardless of success or failure
      loadingIndicator.style.display = 'none';
    });

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const searchType = document.querySelector('input[name="search-type"]:checked').value;

    const filteredTalks = talks.filter(talk => {
      if (searchType === 'category') {
        return talk.categories.some(cat => cat.toLowerCase().includes(searchTerm));
      } else { // speaker
        return talk.speakers.some(speaker => speaker.toLowerCase().includes(searchTerm));
      }
    });
    renderSchedule(filteredTalks, searchTerm);
  });

  function renderSchedule(talksToRender, searchTerm) {
    scheduleContainer.innerHTML = '';

    if (talksToRender.length === 0 && searchTerm) {
      scheduleContainer.innerHTML = '<p>No talks found matching your criteria.</p>';
      return;
    }

    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0);
    const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const fullSchedule = [];

    // Populate fullSchedule with talks and a potential lunch break
    for (let i = 0; i < talksToRender.length; i++) {
        fullSchedule.push({ type: 'talk', data: talksToRender[i] });
        // Insert lunch break after the 3rd talk if no search term is active
        if (i === 2 && !searchTerm) {
            fullSchedule.push({ type: 'break', title: 'Lunch Break', duration: 60 });
        }
    }

    for (const event of fullSchedule) {
        const scheduleItem = document.createElement('div');
        scheduleItem.classList.add('schedule-item');

        const startTime = new Date(currentTime);
        let eventDuration = 0;

        if (event.type === 'talk') {
            const talk = event.data;
            eventDuration = talk.duration;
            currentTime.setMinutes(currentTime.getMinutes() + eventDuration);
            const endTime = new Date(currentTime);

            scheduleItem.classList.add('talk');
            scheduleItem.innerHTML = `
              <div class="time">${formatTime(startTime)} - ${formatTime(endTime)}</div>
              <h2>${talk.title}</h2>
              <p class="speakers">By: ${talk.speakers.join(', ')}</p>
              <p>${talk.description}</p>
              <div class="categories">
                ${talk.categories.map(cat => `<span>${cat}</span>`).join('')}
              </div>
            `;
        } else if (event.type === 'break') {
            eventDuration = event.duration;
            currentTime.setMinutes(currentTime.getMinutes() + eventDuration);
            const endTime = new Date(currentTime);

            scheduleItem.classList.add('break');
            scheduleItem.innerHTML = `
              <h2>${event.title}</h2>
              <p class="time">${formatTime(startTime)} - ${formatTime(endTime)}</p>
            `;
        }

        scheduleContainer.appendChild(scheduleItem);

        // Add 10-minute transition after events, but not after the very last event
        if (event !== fullSchedule[fullSchedule.length - 1]) {
             currentTime.setMinutes(currentTime.getMinutes() + 10);
        }
    }
  }
});
