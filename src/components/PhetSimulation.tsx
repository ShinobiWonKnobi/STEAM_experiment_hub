import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface PhetSimulationProps {
  title: string;
  simulationUrl: string;
  width?: string | number;
  height?: string | number;
  onLoad?: () => void;
}

const PhetSimulation: React.FC<PhetSimulationProps> = ({ 
  title, 
  simulationUrl, 
  width = '100%', 
  height = 600,
  onLoad 
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [simulationReady, setSimulationReady] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Handle messages from the PhET simulation if needed
      if (event.data && event.data.type === 'phet-simulation-loaded') {
        console.log('PhET simulation loaded and ready');
        setSimulationReady(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleIframeLoad = () => {
    setLoading(false);
    if (onLoad) onLoad();
  };

  const handleIframeError = () => {
    setLoading(false);
    setError('Failed to load the simulation. Please check your internet connection and try again.');
  };

  const handleStartSimulation = () => {
    setUserInteracted(true);
    
    // Send a message to the iframe to resume AudioContext if needed
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ 
        type: 'user-interaction',
        action: 'resume-audio'
      }, '*');
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      {title && <Typography variant="h6" gutterBottom>{title}</Typography>}
      
      <Box 
        sx={{ 
          width: '100%', 
          height: typeof height === 'number' ? `${height}px` : height,
          border: '1px solid #ddd',
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          bgcolor: '#f5f5f5'
        }}
      >
        {!userInteracted ? (
          <Box 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              bgcolor: 'rgba(0, 0, 0, 0.03)',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Click to Start Simulation
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: '80%', textAlign: 'center' }}>
              Browser security requires user interaction before starting audio in simulations
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<PlayArrowIcon />}
              onClick={handleStartSimulation}
              size="large"
            >
              Start Simulation
            </Button>
          </Box>
        ) : (
          <>
            {loading && (
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  zIndex: 1
                }}
              >
                <CircularProgress />
              </Box>
            )}
            
            {error && (
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)', 
                  width: '80%',
                  zIndex: 2
                }}
              >
                <Alert severity="error">{error}</Alert>
              </Box>
            )}
            
            <iframe
              ref={iframeRef}
              src={simulationUrl}
              title={title}
              width={width}
              height={height}
              style={{ 
                border: 'none',
                opacity: loading ? 0 : 1,
                transition: 'opacity 0.3s ease'
              }}
              allowFullScreen
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default PhetSimulation; 