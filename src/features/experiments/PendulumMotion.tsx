import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Slider, 
  Button,
  IconButton,
  Tooltip,
  Alert,
  Fade,
  useTheme,
  alpha
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TimelineIcon from '@mui/icons-material/Timeline';
import VoiceCommandHelp from '../../components/VoiceCommandHelp';
import { useVoiceCommands } from '../../hooks/useVoiceCommands';
import { useGamificationStore } from '../../stores/gamificationStore';

interface PendulumState {
  angle: number;
  velocity: number;
}

const PendulumMotion: React.FC = () => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  // Pendulum parameters
  const [length, setLength] = useState(200); // pendulum length in pixels
  const [gravity, setGravity] = useState(9.81); // acceleration due to gravity
  const [damping, setDamping] = useState(0.999); // damping factor
  const [showTrace, setShowTrace] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [pendulumState, setPendulumState] = useState<PendulumState>({
    angle: Math.PI / 4, // initial angle (45 degrees)
    velocity: 0, // initial velocity
  });
  
  const [step, setStep] = useState<'setup' | 'experiment' | 'results'>('setup');
  const [experimentCompleted, setExperimentCompleted] = useState(false);
  const [tracePoints, setTracePoints] = useState<Array<{ x: number; y: number }>>([]);
  
  const earnBadge = useGamificationStore((state) => state.earnBadge);
  const updateProgress = useGamificationStore((state) => state.updateProgress);
  
  const voiceCommands = [
    { command: "start pendulum", description: "Start the pendulum motion" },
    { command: "stop pendulum", description: "Stop the pendulum motion" },
    { command: "reset experiment", description: "Reset the experiment" },
    { command: "show trace", description: "Show pendulum trace" },
    { command: "hide trace", description: "Hide pendulum trace" },
    { command: "show results", description: "Show the results" },
  ];
  
  const { transcript } = useVoiceCommands();
  
  const handleShowResults = useCallback(() => {
    if (experimentCompleted) {
      setStep('results');
    }
  }, [experimentCompleted]);
  
  useEffect(() => {
    // Process voice commands
    if (transcript) {
      const lowerTranscript = transcript.toLowerCase();
      
      if (lowerTranscript.includes("start pendulum")) {
        setIsRunning(true);
      } else if (lowerTranscript.includes("stop pendulum")) {
        setIsRunning(false);
      } else if (lowerTranscript.includes("reset experiment")) {
        handleReset();
      } else if (lowerTranscript.includes("show trace")) {
        setShowTrace(true);
      } else if (lowerTranscript.includes("hide trace")) {
        setShowTrace(false);
      } else if (lowerTranscript.includes("show results")) {
        handleShowResults();
      }
    }
  }, [transcript, handleShowResults]);
  
  const handleReset = () => {
    setIsRunning(false);
    setPendulumState({
      angle: Math.PI / 4,
      velocity: 0,
    });
    setTracePoints([]);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };
  
  // Animation loop
  useEffect(() => {
    if (!isRunning || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let lastTime = performance.now();
    const origin = { x: canvas.width / 2, y: canvas.height / 4 };
    
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000; // convert to seconds
      lastTime = currentTime;
      
      // Update physics
      setPendulumState(prev => {
        const acceleration = -(gravity / length) * Math.sin(prev.angle);
        const newVelocity = (prev.velocity + acceleration * deltaTime) * damping;
        const newAngle = prev.angle + newVelocity * deltaTime;
        
        return {
          angle: newAngle,
          velocity: newVelocity,
        };
      });
      
      // Clear canvas
      if (!showTrace) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      // Draw pendulum
      const bobX = origin.x + length * Math.sin(pendulumState.angle);
      const bobY = origin.y + length * Math.cos(pendulumState.angle);
      
      // Update trace points
      if (showTrace) {
        setTracePoints(prev => [...prev, { x: bobX, y: bobY }].slice(-100));
      }
      
      // Draw trace
      if (showTrace && tracePoints.length > 1) {
        ctx.beginPath();
        ctx.moveTo(tracePoints[0].x, tracePoints[0].y);
        tracePoints.forEach((point, i) => {
          if (i > 0) {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.strokeStyle = alpha(theme.palette.secondary.main, 0.5);
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      // Draw string
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(bobX, bobY);
      ctx.strokeStyle = theme.palette.primary.main;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw bob
      ctx.beginPath();
      ctx.arc(bobX, bobY, 20, 0, Math.PI * 2);
      ctx.fillStyle = theme.palette.secondary.main;
      ctx.fill();
      ctx.strokeStyle = theme.palette.secondary.dark;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Check if experiment is complete
      if (!experimentCompleted && performance.now() - startTime > 10000) {
        setExperimentCompleted(true);
        earnBadge('physics-master');
        updateProgress('pendulum-motion', 100);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    const startTime = performance.now();
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, length, gravity, damping, showTrace, pendulumState, theme, experimentCompleted, earnBadge, updateProgress, tracePoints]);
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Pendulum Motion Experiment
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              height: 600, 
              display: 'flex', 
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {step === 'setup' && (
              <Fade in timeout={300}>
                <Box sx={{ textAlign: 'center', my: 'auto' }}>
                  <Typography variant="h6" gutterBottom>
                    Experiment Setup
                  </Typography>
                  <Typography paragraph>
                    In this experiment, you will explore how different factors affect
                    the motion of a pendulum. Adjust the length, gravity, and damping
                    to see how they influence the pendulum's period and behavior.
                  </Typography>
                  <Button 
                    variant="contained" 
                    onClick={() => setStep('experiment')}
                    sx={{ mt: 2 }}
                  >
                    Start Experiment
                  </Button>
                </Box>
              </Fade>
            )}
            
            {step === 'experiment' && (
              <Fade in timeout={300}>
                <Box>
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={500}
                    style={{
                      width: '100%',
                      height: 'auto',
                      backgroundColor: alpha(theme.palette.background.paper, 0.8),
                      borderRadius: theme.shape.borderRadius,
                    }}
                  />
                  
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title={isRunning ? "Pause" : "Start"}>
                          <IconButton 
                            onClick={() => setIsRunning(!isRunning)}
                            color={isRunning ? "secondary" : "primary"}
                          >
                            {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reset">
                          <IconButton onClick={handleReset}>
                            <RestartAltIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={showTrace ? "Hide Trace" : "Show Trace"}>
                          <IconButton 
                            onClick={() => setShowTrace(!showTrace)}
                            color={showTrace ? "secondary" : "primary"}
                          >
                            <TimelineIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      
                      {experimentCompleted && (
                        <Button 
                          variant="outlined"
                          onClick={() => setStep('results')}
                        >
                          View Results
                        </Button>
                      )}
                    </Box>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography gutterBottom>Length (cm)</Typography>
                        <Slider
                          value={length}
                          onChange={(_, value) => setLength(value as number)}
                          min={100}
                          max={300}
                          disabled={isRunning}
                          marks={[
                            { value: 100, label: '100' },
                            { value: 200, label: '200' },
                            { value: 300, label: '300' },
                          ]}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography gutterBottom>Gravity (m/s²)</Typography>
                        <Slider
                          value={gravity}
                          onChange={(_, value) => setGravity(value as number)}
                          min={1}
                          max={20}
                          step={0.1}
                          disabled={isRunning}
                          marks={[
                            { value: 1, label: '1' },
                            { value: 9.81, label: 'Earth' },
                            { value: 20, label: '20' },
                          ]}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography gutterBottom>Damping</Typography>
                        <Slider
                          value={damping}
                          onChange={(_, value) => setDamping(value as number)}
                          min={0.9}
                          max={1}
                          step={0.001}
                          disabled={isRunning}
                          marks={[
                            { value: 0.9, label: 'High' },
                            { value: 0.95, label: 'Medium' },
                            { value: 1, label: 'None' },
                          ]}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Fade>
            )}
            
            {step === 'results' && (
              <Fade in timeout={300}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Experiment Results
                  </Typography>
                  
                  <Typography paragraph>
                    You've successfully explored pendulum motion! Here's what you learned:
                  </Typography>
                  
                  <Typography paragraph>
                    <strong>Period Relationship:</strong> The period of a pendulum depends
                    primarily on its length and the acceleration due to gravity. A longer
                    pendulum has a longer period.
                  </Typography>
                  
                  <Typography paragraph>
                    <strong>Damping Effects:</strong> The damping factor simulates air
                    resistance and friction, causing the pendulum's amplitude to decrease
                    over time.
                  </Typography>
                  
                  <Typography paragraph>
                    <strong>Energy Conservation:</strong> Without damping, the pendulum's
                    total energy (kinetic + potential) remains constant, demonstrating
                    energy conservation.
                  </Typography>
                  
                  <Button 
                    variant="contained" 
                    onClick={handleReset}
                    sx={{ mt: 2 }}
                  >
                    Try Again
                  </Button>
                </Box>
              </Fade>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Experiment Controls
            </Typography>
            
            <VoiceCommandHelp commands={voiceCommands} />
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Tips:
              </Typography>
              <Typography variant="body2" paragraph>
                • Adjust the length to see how it affects the period
              </Typography>
              <Typography variant="body2" paragraph>
                • Change gravity to simulate pendulums on different planets
              </Typography>
              <Typography variant="body2" paragraph>
                • Use damping to model real-world friction effects
              </Typography>
              <Typography variant="body2">
                • Enable trace to visualize the pendulum's path
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PendulumMotion; 