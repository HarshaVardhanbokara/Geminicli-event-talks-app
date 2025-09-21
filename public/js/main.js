document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule-container');
  const searchInput = document.getElementById('search-input');
  let talks = [];

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
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0);
    const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let talkIndex = 0;

    for (let i = 0; i < 7; i++) { // Loop for 7 main events (6 talks + 1 lunch)
        const scheduleItem = document.createElement('div');
        scheduleItem.classList.add('schedule-item');

        const startTime = new Date(currentTime);
        let isTalk = false;

        if (i === 3 && !searchTerm) { // Event 4 (index 3) is Lunch
            currentTime.setHours(currentTime.getHours() + 1);
            const endTime = new Date(currentTime);
            scheduleItem.classList.add('break');
            scheduleItem.innerHTML = `
              <h2>Lunch Break</h2>
              <p class="time">${formatTime(startTime)} - ${formatTime(endTime)}</p>
            `;
        } else if (talkIndex < talksToRender.length) {
            isTalk = true;
            const talk = talksToRender[talkIndex];
            currentTime.setHours(currentTime.getHours() + 1);
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
            talkIndex++;
        }

        if (scheduleItem.innerHTML) {
            scheduleContainer.appendChild(scheduleItem);
        }

        // Add 10-minute transition after talks, but not after the very last event
        if (isTalk && i < 6) {
            currentTime.setMinutes(currentTime.getMinutes() + 10);
        }
    }
  }
});
