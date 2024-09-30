# Movie Tracker

Movie Tracker is my personal playground/training environment project using below mentioned technologies, which allows users to explore detailed information about movies, view movie charts, and more.

## Features

- **Movie Details**: View comprehensive details about individual movies.
- **Director's Movie List**: Explore a list of movies directed by the same director.
- **Chart Visualization**: Visualize movie ratings over the years using charts.
- **User Authentication**: Login functionality with error handling.

## Technologies Used

- **Frontend**: React, TypeScript, Next.js, React Bootstrap, MUI (Material-UI)
- **Backend**: Node.js, Express, MongoDB
- **Styling**: CSS Modules
- **State Management**: Redux

## Project Structure

### Frontend

- **Pages**
  - [frontend/src/app/movie/[id]/singularMoviePage.tsx]: Main page for displaying a single movie's information.
  - others...
- **Components**
  - [frontend/src/components/CardCarouselMovie.tsx]: Contains the [MovieItemChunker] function for chunking movie items and setting up a carousel component to view movies by the main director.
  - [frontend/src/components/auth/LoginModal.tsx]: Modal for user login.
  - [frontend/src/components/MovieCardEntry.tsx]: Component for individual movie card entries.
  - others...
- **Styles**
  - [frontend/src/styles/MovieCardGrid.module.css]: Styling for the movie card grid.
  - [frontend/src/styles/singularMoviePage.module.css]: Styling for the singular movie page.
  - [frontend/src/styles/CustomTooltip.module.css]: Styling for custom tooltips in charts.
  - others...

### Backend

- **Controllers**
  - [backend/src/controllers/movie.ts]: Contains the [getMovieDataForCharts] function to fetch movie data for chart visualization.
  - others...
- **Middlewares**
  - [backend/src/middlewares/validateRequestSchema.ts]: Middleware for validating request schemas.
  - others...

## Setup and Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/Oubeniel/movie-tracker.git
    cd movie-tracker
    ```

2. **Install dependencies**:
    - For frontend:
        ```sh
        cd frontend
        npm install
        ```
    - For backend:
        ```sh
        cd backend
        npm install
        ```

3. **Run the development server**:
    - For frontend:
        ```sh
        cd frontend
        npm run dev
        ```
    - For backend:
        ```sh
        cd backend
        npm start
        ```

4. **Environment Variables**:
    - Create a `.env` file in both the `frontend` and `backend` directories and add the necessary environment variables as per your setup.

## Usage

- Navigate to `http://localhost:3000` to start using the Movie Explorer application.

## Acknowledgements

- Thanks to all the open-source libraries and frameworks used in this project.