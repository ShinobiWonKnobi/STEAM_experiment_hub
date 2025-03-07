# STEAM Experiment Hub

A virtual laboratory platform for interactive STEAM (Science, Technology, Engineering, Arts, and Mathematics) experiments designed for students and educators.

## Features

- **Interactive Experiments**: Engage with virtual simulations of scientific experiments
- **Voice Control**: Hands-free operation with voice commands
- **Gamification**: Earn badges and track progress to enhance learning motivation
- **Accessibility**: Comprehensive accessibility features including screen reader support, dyslexia-friendly fonts, and more
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Virtual Assistant**: Built-in chatbot to answer questions and provide guidance

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/steam-experiment-hub.git
   cd steam-experiment-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

This will start both the React application and the JSON server for the mock API.

## Project Structure

```
steam-experiment-hub/
├── public/                  # Static assets
│   ├── images/              # Images for experiments and UI
│   └── badges/              # Badge images
├── src/
│   ├── components/          # Reusable UI components
│   ├── features/            # Feature-specific components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── experiments/     # Individual experiment components
│   │   ├── landing/         # Landing page components
│   │   └── profile/         # User profile components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API and service functions
│   ├── stores/              # State management (Zustand)
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── db.json                  # Mock database for development
└── package.json             # Project dependencies and scripts
```

## Architecture

The application follows a modular architecture with the following key principles:

1. **Component-Based Design**: UI is built with reusable components
2. **State Management**: Uses Zustand for global state management
3. **Error Handling**: Comprehensive error boundaries and graceful fallbacks
4. **Accessibility**: Built with accessibility in mind from the ground up
5. **Performance Optimization**: Code splitting, memoization, and other performance techniques

## Key Components

### Experiments

Each experiment is implemented as a standalone component with:
- Interactive simulation
- Voice command support
- Progress tracking
- Educational content

### Gamification System

The gamification system includes:
- Badges for achievements
- Progress tracking
- Points system
- Visual feedback for accomplishments

### Accessibility Features

- Screen reader optimization
- Keyboard navigation
- High contrast mode
- Dyslexia-friendly fonts
- Reduced motion options

## Error Handling

The application implements robust error handling:
- Error boundaries to prevent UI crashes
- Graceful fallbacks for failed API calls
- Detailed error logging
- User-friendly error messages

## Performance Optimizations

- Code splitting with React.lazy and Suspense
- Component memoization
- Efficient state management
- Optimized rendering

## API Integration

The application uses a RESTful API for data persistence:
- Experiments data
- User progress
- Badges and achievements

During development, a JSON server provides a mock API.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the component library
- Zustand for state management
- React Speech Recognition for voice command functionality
