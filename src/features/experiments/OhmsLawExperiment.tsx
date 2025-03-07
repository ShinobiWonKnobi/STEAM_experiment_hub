import React, { useRef, useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  useTheme,
  alpha,
  TextField,
  Alert,
  Tooltip,
  IconButton
} from '@mui/material';
import PhetSimulation from '../../components/PhetSimulation';
import { usePhetVoiceCommands } from '../../hooks/usePhetVoiceCommands';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { Link as RouterLink } from 'react-router-dom';

const OhmsLawExperiment: React.FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [showVoiceHelp, setShowVoiceHelp] = useState(false);
  const [answers, setAnswers] = useState({
    voltage: '',
    current: '',
    resistance: ''
  });
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [simulationStarted, setSimulationStarted] = useState(false);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const handleNext = () => {
    setActiveStep((prevStep) => {
      const nextStep = Math.min(prevStep + 1, steps.length - 1);
      
      // If moving to the Results step, calculate the quiz score
      if (nextStep === 3 && !quizSubmitted) {
        handleQuizSubmit();
      }
      
      return nextStep;
    });
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };
  
  // Define command actions for the Ohm's Law simulation
  const commandActions = {
    'increase voltage': () => {
      sendCommand('increase-voltage');
      setFeedbackMessage('Increasing voltage');
    },
    'decrease voltage': () => {
      sendCommand('decrease-voltage');
      setFeedbackMessage('Decreasing voltage');
    },
    'increase resistance': () => {
      sendCommand('increase-resistance');
      setFeedbackMessage('Increasing resistance');
    },
    'decrease resistance': () => {
      sendCommand('decrease-resistance');
      setFeedbackMessage('Decreasing resistance');
    },
    'reset simulation': () => {
      sendCommand('reset');
      setFeedbackMessage('Resetting simulation');
    },
    'next step': () => {
      handleNext();
      setFeedbackMessage('Moving to next step');
    },
    'previous step': () => {
      handleBack();
      setFeedbackMessage('Moving to previous step');
    }
  };
  
  // Use the updated voice commands hook
  const { listening, toggleListening, lastCommand, sendCommand, error } = usePhetVoiceCommands({
    iframeRef,
    commandActions
  });
  
  // Handle simulation load
  const handleSimulationLoad = () => {
    setSimulationStarted(true);
    console.log('Simulation loaded and ready for interaction');
  };
  
  // Display error message if there's an issue with voice commands
  useEffect(() => {
    if (error) {
      setFeedbackMessage(`Voice command error: ${error}`);
    }
  }, [error]);
  
  // Display feedback when a command is recognized
  useEffect(() => {
    if (lastCommand) {
      setFeedbackMessage(`Recognized command: ${lastCommand}`);
      
      // Clear feedback after 3 seconds
      const timer = setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [lastCommand]);
  
  const steps = ['Introduction', 'Simulation', 'Quiz', 'Results'];
  
  const handleAnswerChange = (field: keyof typeof answers) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };
  
  const handleQuizSubmit = () => {
    // Simple quiz evaluation
    let score = 0;
    
    // Check if voltage = current * resistance (V = IR)
    const v = parseFloat(answers.voltage);
    const i = parseFloat(answers.current);
    const r = parseFloat(answers.resistance);
    
    if (!isNaN(v) && !isNaN(i) && !isNaN(r)) {
      // Allow for some rounding error
      if (Math.abs(v - (i * r)) < 0.1) {
        score += 100;
      } else if (Math.abs(v - (i * r)) < 0.5) {
        score += 50; // Partial credit
      }
    }
    
    setQuizScore(score);
    setQuizSubmitted(true);
  };
  
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 4, mb: 4, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ElectricBoltIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
          <Typography variant="h4" component="h1">
            Ohm's Law Experiment
          </Typography>
        </Box>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {/* Introduction Step */}
        {activeStep === 0 && (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
              Introduction to Ohm's Law
            </Typography>
            
            <Typography paragraph>
              Ohm's Law is a fundamental principle in electrical engineering that describes the relationship 
              between voltage (V), current (I), and resistance (R) in an electrical circuit.
            </Typography>
            
            <Box sx={{ 
              bgcolor: alpha(theme.palette.primary.main, 0.1), 
              p: 3, 
              borderRadius: 2,
              mb: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
            }}>
              <Typography variant="h6" gutterBottom>
                The Formula: V = I × R
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Voltage (V)
                      </Typography>
                      <Typography variant="body2">
                        Measured in volts (V), voltage is the electrical pressure that pushes electrons through a circuit.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Current (I)
                      </Typography>
                      <Typography variant="body2">
                        Measured in amperes (A), current is the flow rate of electrons through the circuit.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Resistance (R)
                      </Typography>
                      <Typography variant="body2">
                        Measured in ohms (Ω), resistance is the opposition to the flow of electrons in the circuit.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
            
            <Typography paragraph>
              In this experiment, you will use a PhET simulation to explore how changing voltage and resistance 
              affects the current in a circuit, following Ohm's Law.
            </Typography>
            
            <Typography paragraph>
              You'll be able to interact with the simulation using both your mouse and voice commands.
            </Typography>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                onClick={handleNext}
                size="large"
              >
                Start Experiment
              </Button>
            </Box>
          </Box>
        )}
        
        {/* Simulation Step */}
        {activeStep === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
              Ohm's Law Simulation
            </Typography>
            
            <Typography paragraph>
              Use the simulation below to explore Ohm's Law. You can adjust the voltage and resistance 
              using the sliders and observe how the current changes according to the formula V = I × R.
            </Typography>
            
            {/* Voice command feedback */}
            {feedbackMessage && (
              <Alert 
                severity={error ? "error" : "info"} 
                sx={{ mb: 2 }}
                onClose={() => setFeedbackMessage(null)}
              >
                {feedbackMessage}
              </Alert>
            )}
            
            {/* Voice commands help */}
            {showVoiceHelp && (
              <Paper sx={{ p: 2, mb: 3, bgcolor: alpha(theme.palette.info.main, 0.1) }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Available Voice Commands:
                </Typography>
                <Grid container spacing={1}>
                  {Object.keys(commandActions).map((command) => (
                    <Grid item key={command}>
                      <Chip label={command} size="small" />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}
            
            {/* PhET Simulation */}
            <Box sx={{ position: 'relative' }}>
              <PhetSimulation 
                title="Ohm's Law"
                simulationUrl="https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law_en.html"
                height={500}
                onLoad={handleSimulationLoad}
              />
              
              {/* Voice command controls - only show after simulation has started */}
              {simulationStarted && (
                <Box sx={{ 
                  position: 'absolute', 
                  top: 10, 
                  right: 10, 
                  zIndex: 10,
                  display: 'flex',
                  gap: 1
                }}>
                  <Tooltip title={listening ? "Voice commands active" : "Enable voice commands"}>
                    <IconButton 
                      onClick={() => toggleListening()}
                      color={listening ? "primary" : "default"}
                      sx={{ 
                        bgcolor: 'white', 
                        boxShadow: 2,
                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) }
                      }}
                    >
                      {listening ? <MicIcon /> : <MicOffIcon />}
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Show voice commands">
                    <IconButton 
                      onClick={() => setShowVoiceHelp(!showVoiceHelp)}
                      color={showVoiceHelp ? "primary" : "default"}
                      sx={{ 
                        bgcolor: 'white', 
                        boxShadow: 2,
                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) }
                      }}
                    >
                      <HelpOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Box>
            
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Experiment Tasks:
              </Typography>
              
              <ol>
                <li>
                  <Typography paragraph>
                    Increase the voltage and observe how the current changes while resistance remains constant.
                  </Typography>
                </li>
                <li>
                  <Typography paragraph>
                    Increase the resistance and observe how the current changes while voltage remains constant.
                  </Typography>
                </li>
                <li>
                  <Typography paragraph>
                    Try to find a combination of voltage and resistance that produces exactly 2 amperes of current.
                  </Typography>
                </li>
              </ol>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleBack}>
                Back
              </Button>
              <Button 
                variant="contained" 
                onClick={handleNext}
              >
                Continue to Quiz
              </Button>
            </Box>
          </Box>
        )}
        
        {/* Quiz Step */}
        {activeStep === 2 && (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
              Ohm's Law Quiz
            </Typography>
            
            <Typography paragraph>
              Based on your observations from the simulation, answer the following questions about Ohm's Law.
            </Typography>
            
            <Box sx={{ 
              bgcolor: alpha(theme.palette.background.paper, 0.7), 
              p: 3, 
              borderRadius: 2,
              mb: 3,
              border: `1px solid ${theme.palette.divider}`
            }}>
              <Typography variant="h6" gutterBottom>
                Ohm's Law Calculation
              </Typography>
              
              <Typography paragraph>
                Using the formula V = I × R, fill in the values to demonstrate your understanding of Ohm's Law.
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Voltage (V)"
                    fullWidth
                    variant="outlined"
                    value={answers.voltage}
                    onChange={handleAnswerChange('voltage')}
                    type="number"
                    InputProps={{
                      endAdornment: <Typography variant="body2">volts</Typography>
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Current (I)"
                    fullWidth
                    variant="outlined"
                    value={answers.current}
                    onChange={handleAnswerChange('current')}
                    type="number"
                    InputProps={{
                      endAdornment: <Typography variant="body2">amps</Typography>
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Resistance (R)"
                    fullWidth
                    variant="outlined"
                    value={answers.resistance}
                    onChange={handleAnswerChange('resistance')}
                    type="number"
                    InputProps={{
                      endAdornment: <Typography variant="body2">ohms</Typography>
                    }}
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  <InfoIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Make sure your values satisfy the equation V = I × R
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleBack}>
                Back to Simulation
              </Button>
              <Button 
                variant="contained" 
                onClick={handleNext}
                disabled={!answers.voltage || !answers.current || !answers.resistance}
              >
                Submit and See Results
              </Button>
            </Box>
          </Box>
        )}
        
        {/* Results Step */}
        {activeStep === 3 && (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
              Experiment Results
            </Typography>
            
            <Box sx={{ 
              bgcolor: alpha(theme.palette.success.main, 0.1), 
              p: 3, 
              borderRadius: 2,
              mb: 4,
              border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`
            }}>
              <Typography variant="h4" align="center" gutterBottom>
                Your Score: {quizScore}%
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Chip 
                  label={quizScore === 100 ? "Perfect Score!" : quizScore >= 50 ? "Good Job!" : "Keep Practicing"}
                  color={quizScore === 100 ? "success" : quizScore >= 50 ? "primary" : "default"}
                />
              </Box>
              
              <Typography align="center">
                {quizScore === 100 
                  ? "Excellent! You've mastered Ohm's Law." 
                  : quizScore >= 50 
                    ? "Good understanding of Ohm's Law. Review the relationship between voltage, current, and resistance." 
                    : "Keep practicing with the simulation to better understand how voltage, current, and resistance relate to each other."}
              </Typography>
            </Box>
            
            <Typography variant="h6" gutterBottom>
              What You've Learned:
            </Typography>
            
            <ul>
              <li>
                <Typography paragraph>
                  Ohm's Law states that the current through a conductor is directly proportional to the voltage and inversely proportional to the resistance.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  The mathematical formula is V = I × R, where V is voltage (volts), I is current (amperes), and R is resistance (ohms).
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Increasing voltage while keeping resistance constant will increase current proportionally.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Increasing resistance while keeping voltage constant will decrease current proportionally.
                </Typography>
              </li>
            </ul>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                onClick={handleBack}
                variant="outlined"
              >
                Review Quiz
              </Button>
              <Button 
                component={RouterLink}
                to="/dashboard"
                variant="contained" 
                color="primary"
              >
                Return to Dashboard
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default OhmsLawExperiment; 