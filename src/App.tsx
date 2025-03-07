import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container, ThemeProvider, CssBaseline, useMediaQuery, CircularProgress, Typography } from '@mui/material';
import { useTheme } from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './features/landing/LandingPage';
import ErrorBoundary from './components/ErrorBoundary';
import DyslexiaFontLoader from './components/DyslexiaFontLoader';
import { useAccessibilityStore } from './stores/accessibilityStore';
import ScreenReaderOnly from './components/ScreenReaderOnly';
import ChatbotInterface from './components/ChatbotInterface';

// Lazy load components for better performance
const ProfilePage = lazy(() => import('./features/profile/ProfilePage'));
const ExperimentDashboard = lazy(() => import('./features/dashboard/ExperimentDashboard'));
const AcidBaseTitration = lazy(() => import('./features/experiments/AcidBaseTitration'));
const OhmsLawExperiment = lazy(() => import('./features/experiments/OhmsLawExperiment'));
const WaveInterferenceExperiment = lazy(() => import('./features/experiments/WaveInterferenceExperiment'));
const NaturalSelectionExperiment = lazy(() => import('./features/experiments/NaturalSelectionExperiment'));
const MoleculeShapesExperiment = lazy(() => import('./features/experiments/MoleculeShapesExperiment'));
const AccessibilityDemo = lazy(() => import('./components/AccessibilityDemo'));

// Loading fallback component
const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    <CircularProgress />
  </Box>
);

const App: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { screenReaderOptimized } = useAccessibilityStore();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DyslexiaFontLoader />
      
      {screenReaderOptimized && (
        <ScreenReaderOnly>
          Steam Experiment Hub - Interactive science experiments for students
        </ScreenReaderOnly>
      )}
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}>
        <Header />
        
        <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
          <Container maxWidth={false}>
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/dashboard" element={<ExperimentDashboard />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/experiments/acid-base-titration" element={<AcidBaseTitration />} />
                  <Route path="/experiments/ohms-law" element={<OhmsLawExperiment />} />
                  <Route path="/experiments/wave-interference" element={<WaveInterferenceExperiment />} />
                  <Route path="/experiments/natural-selection" element={<NaturalSelectionExperiment />} />
                  <Route path="/experiments/molecule-shapes" element={<MoleculeShapesExperiment />} />
                  <Route path="/accessibility" element={<AccessibilityDemo />} />
                  <Route path="*" element={
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <Typography variant="h4">Page Not Found</Typography>
                      <Typography variant="body1">
                        The page you are looking for does not exist.
                      </Typography>
                    </Box>
                  } />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </Container>
        </Box>
        
        <Footer />
      </Box>
      
      <ChatbotInterface />
    </ThemeProvider>
  );
};

export default App; 