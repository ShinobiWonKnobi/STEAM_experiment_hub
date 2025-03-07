import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container, ThemeProvider, CssBaseline, useMediaQuery, CircularProgress } from '@mui/material';
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
const PendulumMotion = lazy(() => import('./features/experiments/PendulumMotion'));
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
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DyslexiaFontLoader />
        
        {screenReaderOptimized && (
          <ScreenReaderOnly>
            <a href="#main-content">Skip to main content</a>
          </ScreenReaderOnly>
        )}
        
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Header />
          
          <Box 
            component="main" 
            id="main-content"
            tabIndex={-1}
            sx={{ 
              flexGrow: 1,
              pt: { xs: 8, sm: 9 },
              pb: 4,
            }}
          >
            <Container maxWidth="lg">
              <ErrorBoundary>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<ExperimentDashboard />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/experiments/acid-base-titration" element={<AcidBaseTitration />} />
                    <Route path="/experiments/pendulum-motion" element={<PendulumMotion />} />
                    <Route path="/accessibility" element={<AccessibilityDemo />} />
                    <Route path="*" element={
                      <Box sx={{ textAlign: 'center', py: 8 }}>
                        <h1>Page Not Found</h1>
                        <p>The page you are looking for does not exist.</p>
                      </Box>
                    } />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </Container>
          </Box>
          
          <Footer />
          <ChatbotInterface />
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App; 