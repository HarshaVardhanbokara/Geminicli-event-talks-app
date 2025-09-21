# Tech Event Website

A single-page website for a 1-day tech event, showcasing a schedule of talks with search functionality.

## Features

*   **Dynamic Schedule Display:** Fetches and displays talk data from a JSON file.
*   **Search Functionality:** Allows users to search for talks by category or speaker.
*   **Responsive Design:** Basic styling for a clean and readable interface.
*   **Node.js Backend:** Serves static files and provides a simple API for talk data.

## Technologies Used

*   **Frontend:**
    *   HTML5
    *   CSS3
    *   JavaScript (ES6+)
*   **Backend:**
    *   Node.js
    *   Express.js

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js installed on your machine.

*   [Node.js](https://nodejs.org/)

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd tech-event-website
    ```

2.  Install NPM dependencies:

    ```bash
    npm install
    ```

### Running the Application

To start the server, run the following command:

```bash
npm start
```

The application will be accessible at `http://localhost:3000` (or the port specified in your environment variables).

## Project Structure

```
tech-event-website/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── index.html
├── data/
│   └── talks.json
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

*   `public/`: Contains all static frontend assets (HTML, CSS, JavaScript).
*   `public/index.html`: The main HTML file for the application.
*   `public/css/style.css`: Stylesheets for the application.
*   `public/js/main.js`: Frontend JavaScript logic for fetching data and rendering the schedule.
*   `data/talks.json`: JSON file containing the data for all the talks.
*   `server.js`: The Node.js Express server that serves the frontend and the API.
*   `package.json`: Project metadata and dependencies.

## API Endpoints

*   `GET /api/talks`: Returns a JSON array of all available talks.

## Customization

*   **Talk Data:** Modify `data/talks.json` to update the schedule with your own talks, speakers, and categories.
*   **Styling:** Adjust `public/css/style.css` to change the look and feel of the website.
*   **Frontend Logic:** Update `public/js/main.js` to modify how the schedule is rendered or how search works.

## License

This project is licensed under the ISC License. See the `package.json` file for more details.