import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Slider,
  IconButton,
  Tooltip,
  Alert,
  AlertTitle,
  Fade,
  CircularProgress,
  useTheme,
  alpha,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import VoiceCommandHelp from '../../components/VoiceCommandHelp';
import { useVoiceCommands } from '../../hooks/useVoiceCommands';
import { useGamificationStore } from '../../stores/gamificationStore';

const AcidBaseTitration: React.FC = () => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ph, setPh] = useState(1.0);
  const [baseAdded, setBaseAdded] = useState(0);
  const [autoTitrating, setAutoTitrating] = useState(false);
  const [dropAnimation, setDropAnimation] = useState(false);
  const [showEndpoint, setShowEndpoint] = useState(false);
  const [experimentCompleted, setExperimentCompleted] = useState(false);
  const [baseConcentration, setBaseConcentration] = useState(0.1);
  const [flowRate, setFlowRate] = useState(1);
  
  const updateProgress = useGamificationStore((state) => state.updateProgress);
  const earnBadge = useGamificationStore((state) => state.earnBadge);

  const voiceCommands = [
    { command: "add base", description: "Add 1 mL of base solution" },
    { command: "add five milliliters", description: "Add 5 mL of base solution" },
    { command: "start auto titration", description: "Start automatic titration" },
    { command: "stop auto titration", description: "Stop automatic titration" },
    { command: "reset experiment", description: "Reset the experiment" },
    { command: "show results", description: "Show the results" },
  ];

  const { transcript } = useVoiceCommands();

  const handleAddBase = useCallback((amount: number) => {
    setDropAnimation(true);
    setTimeout(() => setDropAnimation(false), 500);

    setBaseAdded((prev) => {
      const newAmount = prev + amount;
      // Calculate new pH based on titration curve
      const newPh = calculatePh(newAmount);
      setPh(newPh);

      // Check if endpoint is reached
      if (Math.abs(newPh - 7.0) < 0.1 && !experimentCompleted) {
        setShowEndpoint(true);
        setAutoTitrating(false);
        setExperimentCompleted(true);
        updateProgress('acid-base-titration', 100);
      }

      return newAmount;
    });
  }, [experimentCompleted, updateProgress]);

  const calculatePh = (baseVolume: number): number => {
    // Simplified pH calculation for demonstration
    const initialPh = 1.0;
    const equivalencePoint = 25.0; // mL
    const buffer = 5.0; // buffer region width

    if (baseVolume < equivalencePoint - buffer) {
      return initialPh + (6.0 * baseVolume) / (equivalencePoint - buffer);
    } else if (baseVolume < equivalencePoint + buffer) {
      return 7.0 + (baseVolume - equivalencePoint) / buffer;
    } else {
      return 13.0;
    }
  };

  useEffect(() => {
    if (transcript) {
      const lowerTranscript = transcript.toLowerCase();
      
      if (lowerTranscript.includes("add base")) {
        handleAddBase(1);
      } else if (lowerTranscript.includes("add five milliliters")) {
        handleAddBase(5);
      } else if (lowerTranscript.includes("start auto titration")) {
        setAutoTitrating(true);
      } else if (lowerTranscript.includes("stop auto titration")) {
        setAutoTitrating(false);
      } else if (lowerTranscript.includes("reset experiment")) {
        handleReset();
      }
    }
  }, [transcript, handleAddBase]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoTitrating && !experimentCompleted) {
      interval = setInterval(() => {
        handleAddBase(flowRate);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [autoTitrating, experimentCompleted, handleAddBase, flowRate]);

  const handleReset = () => {
    setPh(1.0);
    setBaseAdded(0);
    setAutoTitrating(false);
    setShowEndpoint(false);
    setExperimentCompleted(false);
  };

  const getColorForPH = (ph: number): string => {
    if (ph < 3) return theme.palette.error.main;
    if (ph < 6) return theme.palette.warning.main;
    if (ph < 8) return theme.palette.success.main;
    if (ph < 11) return theme.palette.info.main;
    return theme.palette.secondary.main;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw beaker
    const beakerWidth = 200;
    const beakerHeight = 300;
    const beakerX = (canvas.width - beakerWidth) / 2;
    const beakerY = canvas.height - beakerHeight - 50;

    // Draw solution
    ctx.fillStyle = alpha(getColorForPH(ph), 0.5);
    ctx.fillRect(beakerX, beakerY, beakerWidth, beakerHeight);

    // Draw beaker outline
    ctx.strokeStyle = theme.palette.grey[300];
    ctx.lineWidth = 2;
    ctx.strokeRect(beakerX, beakerY, beakerWidth, beakerHeight);

    // Draw burette
    const buretteWidth = 40;
    const buretteHeight = 200;
    const buretteX = canvas.width / 2 - buretteWidth / 2;
    const buretteY = 50;

    ctx.fillStyle = theme.palette.grey[200];
    ctx.fillRect(buretteX, buretteY, buretteWidth, buretteHeight);
    ctx.strokeRect(buretteX, buretteY, buretteWidth, buretteHeight);

    // Draw drop if animation is active
    if (dropAnimation) {
      ctx.beginPath();
      ctx.fillStyle = theme.palette.primary.main;
      ctx.arc(canvas.width / 2, beakerY - 20, 5, 0, Math.PI * 2);
      ctx.fill();
    }

  }, [ph, dropAnimation, theme]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Acid-Base Titration
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ position: 'relative', height: 500 }}>
              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              />
              {showEndpoint && (
                <Fade in>
                  <Alert 
                    severity="success"
                    sx={{ 
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      maxWidth: 400,
                    }}
                  >
                    <AlertTitle>Endpoint Reached!</AlertTitle>
                    You've successfully reached the endpoint of the titration.
                    The solution is now neutral (pH ≈ 7).
                  </Alert>
                </Fade>
              )}
            </Box>

            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Typography variant="body2" color="text.secondary">
                    Base Concentration (M):
                  </Typography>
                  <Slider
                    value={baseConcentration}
                    onChange={(_, value) => setBaseConcentration(value as number)}
                    min={0.01}
                    max={1}
                    step={0.01}
                    disabled={autoTitrating}
                    sx={{ width: 120 }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.secondary">
                    Flow Rate (mL/s):
                  </Typography>
                  <Slider
                    value={flowRate}
                    onChange={(_, value) => setFlowRate(value as number)}
                    min={0.1}
                    max={5}
                    step={0.1}
                    disabled={autoTitrating}
                    sx={{ width: 120 }}
                  />
                </Grid>
                <Grid item>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title={autoTitrating ? "Stop Auto-titration" : "Start Auto-titration"}>
                      <IconButton 
                        onClick={() => setAutoTitrating(!autoTitrating)}
                        color={autoTitrating ? "secondary" : "primary"}
                      >
                        {autoTitrating ? <PauseIcon /> : <PlayArrowIcon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Add 1 mL">
                      <IconButton 
                        onClick={() => handleAddBase(1)}
                        disabled={autoTitrating}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Add 5 mL">
                      <IconButton 
                        onClick={() => handleAddBase(5)}
                        disabled={autoTitrating}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Reset Experiment">
                      <IconButton onClick={handleReset}>
                        <RestartAltIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box 
              sx={{ 
                mt: 2, 
                p: 2, 
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="h6">
                Current pH: {ph.toFixed(2)}
              </Typography>
              <Typography variant="h6">
                Base Added: {baseAdded.toFixed(1)} mL
              </Typography>
              {autoTitrating && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} />
                  <Typography>Auto-titrating...</Typography>
                </Box>
              )}
            </Box>
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
                • Adjust the base concentration to change titration speed
              </Typography>
              <Typography variant="body2" paragraph>
                • Use auto-titration for consistent flow rate
              </Typography>
              <Typography variant="body2" paragraph>
                • Watch for color changes indicating pH changes
              </Typography>
              <Typography variant="body2">
                • The endpoint is reached at pH 7 (green color)
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AcidBaseTitration; 