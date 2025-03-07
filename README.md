# STEAM Experiment Hub

An interactive platform for exploring science, technology, engineering, arts, and mathematics through immersive experiments.

## Features

- Interactive experiments with PhET simulations
- Voice command integration for hands-free interaction
- Gamification with badges and progress tracking
- Accessibility features for inclusive learning
- Beautiful, immersive UI with modern design

## Tech Stack

- React 18
- TypeScript
- Material UI
- React Router
- Zustand for state management
- Web Speech API for voice commands

## Deployment on Vercel

This project is configured for seamless deployment on Vercel. Follow these steps to deploy:

1. **Fork or Clone the Repository**

   ```
   git clone https://github.com/yourusername/steam-experiment-hub.git
   cd steam-experiment-hub
   ```

2. **Install Dependencies**

   ```
   npm install
   ```

3. **Local Development**

   ```
   npm start
   ```

4. **Deploy to Vercel**

   - Install Vercel CLI:
     ```
     npm install -g vercel
     ```

   - Login to Vercel:
     ```
     vercel login
     ```

   - Deploy:
     ```
     vercel
     ```

   - For production deployment:
     ```
     vercel --prod
     ```

   Alternatively, you can connect your GitHub repository to Vercel for automatic deployments.

## Environment Variables

The following environment variables can be configured in Vercel:

- `REACT_APP_API_URL`: URL for the backend API (if applicable)
- `REACT_APP_ENV`: Environment (development, production)

## Project Structure

- `src/components`: Reusable UI components
- `src/features`: Feature-specific components organized by domain
- `src/hooks`: Custom React hooks
- `src/stores`: Zustand state management stores
- `src/types`: TypeScript type definitions
- `src/theme.ts`: Material UI theme configuration

## License

MIT
