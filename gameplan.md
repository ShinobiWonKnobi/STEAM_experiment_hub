# STEAM Experiment Hub: Prototype Implementation Guide

## Project Overview
The **STEAM Experiment Hub** is an **inclusive, interactive, and affordable digital platform** that allows students to perform and explore science experiments in a virtual environment. The prototype focuses on building a **minimal viable product (MVP)** with the following features:
1. **Experiment Dashboard**: Displays available experiments.
2. **Simple 2D Experiment**: Acid-Base Titration with voice commands.
3. **Voice Command Integration**: Users can control experiments using voice.
4. **Accessible UI**: Screen reader support and keyboard navigation.
5. **Gamification**: Badges and progress tracking.

---

## Technical Requirements
### Tech Stack
- **Frontend**: React + TypeScript
- **UI Library**: `@mui/material`
- **State Management**: Zustand
- **Voice Commands**: `react-speech-recognition`
- **Mock Backend**: `json-server`

### Folder Structure
```plaintext
src/
├── components/       # Reusable UI components
├── features/         # Experiment-specific components
├── hooks/            # Custom hooks (e.g., voice commands)
├── stores/           # Zustand stores (e.g., gamification)
├── App.tsx           # Main application component
└── index.tsx         # Entry point