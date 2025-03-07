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
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material';
import PhetSimulation from '../../components/PhetSimulation';
import { usePhetVoiceCommands } from '../../hooks/usePhetVoiceCommands';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import { Link as RouterLink } from 'react-router-dom';
import { useGamificationStore } from '../../stores/gamificationStore';

const WaveInterferenceExperiment: React.FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [showVoiceHelp, setShowVoiceHelp] = useState(false);
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const updateProgress = useGamificationStore(state => state.updateProgress);
  
  // Quiz answers
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: ''
  });
  
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
  
  // Define command actions for the Wave Interference simulation
  const commandActions = {
    'add source': () => {
      sendCommand('add-source');
      setFeedbackMessage('Adding a wave source');
    },
    'remove source': () => {
      sendCommand('remove-source');
      setFeedbackMessage('Removing a wave source');
    },
    'increase frequency': () => {
      sendCommand('increase-frequency');
      setFeedbackMessage('Increasing wave frequency');
    },
    'decrease frequency': () => {
      sendCommand('decrease-frequency');
      setFeedbackMessage('Decreasing wave frequency');
    },
    'increase amplitude': () => {
      sendCommand('increase-amplitude');
      setFeedbackMessage('Increasing wave amplitude');
    },
    'decrease amplitude': () => {
      sendCommand('decrease-amplitude');
      setFeedbackMessage('Decreasing wave amplitude');
    },
    'show graph': () => {
      sendCommand('show-graph');
      setFeedbackMessage('Showing the graph view');
    },
    'reset simulation': () => {
      sendCommand('reset-simulation');
      setFeedbackMessage('Resetting the simulation');
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
  
  const handleAnswerChange = (question: keyof typeof answers) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers(prev => ({
      ...prev,
      [question]: event.target.value
    }));
  };
  
  const handleQuizSubmit = () => {
    // Calculate score based on correct answers
    let score = 0;
    const correctAnswers = {
      question1: 'c', // Constructive interference
      question2: 'b', // Destructive interference
      question3: 'd', // Wavelength
      question4: 'a'  // Diffraction
    };
    
    // Check each answer
    Object.keys(answers).forEach(question => {
      const key = question as keyof typeof answers;
      if (answers[key] === correctAnswers[key as keyof typeof correctAnswers]) {
        score += 25; // Each question is worth 25 points
      }
    });
    
    setQuizScore(score);
    setQuizSubmitted(true);
    
    // Update progress in the gamification store
    updateProgress('wave-interference', score);
  };
  
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 4, mb: 4, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SchoolIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
          <Typography variant="h4" component="h1">
            Wave Interference Experiment
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
              Introduction to Wave Interference
            </Typography>
            
            <Typography paragraph>
              Wave interference is a phenomenon that occurs when two or more waves meet while traveling along the same medium. 
              When waves meet, they interact with each other, and the resulting wave pattern depends on how the waves align.
            </Typography>
            
            <Box sx={{ 
              bgcolor: alpha(theme.palette.primary.main, 0.1), 
              p: 3, 
              borderRadius: 2,
              mb: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
            }}>
              <Typography variant="h6" gutterBottom>
                Key Concepts in Wave Interference
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Constructive Interference
                      </Typography>
                      <Typography variant="body2">
                        When two waves meet and their crests align (in phase), they combine to form a wave with a larger amplitude. 
                        This is called constructive interference.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Destructive Interference
                      </Typography>
                      <Typography variant="body2">
                        When two waves meet and a crest aligns with a trough (out of phase), they cancel each other out, 
                        resulting in a wave with a smaller amplitude. This is called destructive interference.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Diffraction
                      </Typography>
                      <Typography variant="body2">
                        Diffraction is the bending of waves around obstacles or through openings. 
                        The amount of diffraction depends on the wavelength of the wave and the size of the obstacle or opening.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Interference Patterns
                      </Typography>
                      <Typography variant="body2">
                        When waves from multiple sources interfere, they create patterns of constructive and destructive interference. 
                        These patterns can be observed as alternating bright and dark regions.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
            
            <Typography paragraph>
              Wave interference is a fundamental concept in physics that applies to all types of waves, including water waves, 
              sound waves, light waves, and even matter waves in quantum mechanics.
            </Typography>
            
            <Typography paragraph>
              In this experiment, you will use a PhET simulation to explore how waves interfere with each other and 
              how factors like frequency, amplitude, and the number of sources affect the interference patterns.
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
              Wave Interference Simulation
            </Typography>
            
            <Typography paragraph>
              Use the simulation below to explore how waves interfere with each other. You can add multiple sources, 
              adjust their frequencies and amplitudes, and observe the resulting interference patterns.
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
                title="Wave Interference"
                simulationUrl="https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_en.html"
                height={600}
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
                    Start with a single source and observe the wave pattern. Note how the waves spread out in all directions.
                  </Typography>
                </li>
                <li>
                  <Typography paragraph>
                    Add a second source and observe the interference pattern. Look for areas of constructive and destructive interference.
                  </Typography>
                </li>
                <li>
                  <Typography paragraph>
                    Change the frequency of one source and observe how the interference pattern changes.
                  </Typography>
                </li>
                <li>
                  <Typography paragraph>
                    Place an obstacle in the path of the waves and observe how the waves diffract around it.
                  </Typography>
                </li>
                <li>
                  <Typography paragraph>
                    Create a barrier with two small openings (a double-slit) and observe the interference pattern that forms.
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
              Wave Interference Quiz
            </Typography>
            
            <Typography paragraph>
              Based on your observations from the simulation, answer the following questions about wave interference.
            </Typography>
            
            <Box sx={{ 
              bgcolor: alpha(theme.palette.background.paper, 0.7), 
              p: 3, 
              borderRadius: 2,
              mb: 3,
              border: `1px solid ${theme.palette.divider}`
            }}>
              <FormControl component="fieldset" sx={{ mb: 4, width: '100%' }}>
                <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
                  1. What happens when two waves meet and their crests align (they are in phase)?
                </FormLabel>
                <RadioGroup
                  value={answers.question1}
                  onChange={handleAnswerChange('question1')}
                >
                  <FormControlLabel value="a" control={<Radio />} label="The waves cancel each other out" />
                  <FormControlLabel value="b" control={<Radio />} label="The waves pass through each other unchanged" />
                  <FormControlLabel value="c" control={<Radio />} label="The waves combine to form a larger wave (constructive interference)" />
                  <FormControlLabel value="d" control={<Radio />} label="The waves change direction" />
                </RadioGroup>
              </FormControl>
              
              <FormControl component="fieldset" sx={{ mb: 4, width: '100%' }}>
                <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
                  2. What happens when a wave crest from one source meets a wave trough from another source?
                </FormLabel>
                <RadioGroup
                  value={answers.question2}
                  onChange={handleAnswerChange('question2')}
                >
                  <FormControlLabel value="a" control={<Radio />} label="The waves combine to form a larger wave" />
                  <FormControlLabel value="b" control={<Radio />} label="The waves cancel each other out (destructive interference)" />
                  <FormControlLabel value="c" control={<Radio />} label="The waves bounce off each other" />
                  <FormControlLabel value="d" control={<Radio />} label="The waves increase in frequency" />
                </RadioGroup>
              </FormControl>
              
              <FormControl component="fieldset" sx={{ mb: 4, width: '100%' }}>
                <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
                  3. What property of a wave determines the distance between adjacent crests?
                </FormLabel>
                <RadioGroup
                  value={answers.question3}
                  onChange={handleAnswerChange('question3')}
                >
                  <FormControlLabel value="a" control={<Radio />} label="Amplitude" />
                  <FormControlLabel value="b" control={<Radio />} label="Frequency" />
                  <FormControlLabel value="c" control={<Radio />} label="Speed" />
                  <FormControlLabel value="d" control={<Radio />} label="Wavelength" />
                </RadioGroup>
              </FormControl>
              
              <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }}>
                <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
                  4. What is the phenomenon called when waves bend around obstacles or through openings?
                </FormLabel>
                <RadioGroup
                  value={answers.question4}
                  onChange={handleAnswerChange('question4')}
                >
                  <FormControlLabel value="a" control={<Radio />} label="Diffraction" />
                  <FormControlLabel value="b" control={<Radio />} label="Reflection" />
                  <FormControlLabel value="c" control={<Radio />} label="Refraction" />
                  <FormControlLabel value="d" control={<Radio />} label="Polarization" />
                </RadioGroup>
              </FormControl>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleBack}>
                Back to Simulation
              </Button>
              <Button 
                variant="contained" 
                onClick={handleNext}
                disabled={!answers.question1 || !answers.question2 || !answers.question3 || !answers.question4}
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
                  label={quizScore === 100 ? "Perfect Score!" : quizScore >= 60 ? "Good Job!" : "Keep Practicing"}
                  color={quizScore === 100 ? "success" : quizScore >= 60 ? "primary" : "default"}
                />
              </Box>
              
              <Typography align="center">
                {quizScore === 100 
                  ? "Excellent! You've mastered the concepts of wave interference." 
                  : quizScore >= 60 
                    ? "Good understanding of wave interference. Review the key concepts to improve your knowledge." 
                    : "Keep practicing with the simulation to better understand how waves interact with each other."}
              </Typography>
            </Box>
            
            <Typography variant="h6" gutterBottom>
              What You've Learned:
            </Typography>
            
            <ul>
              <li>
                <Typography paragraph>
                  Wave interference occurs when two or more waves meet while traveling along the same medium.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Constructive interference occurs when waves are in phase, resulting in a larger amplitude.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Destructive interference occurs when waves are out of phase, resulting in a smaller amplitude.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Diffraction is the bending of waves around obstacles or through openings.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Interference patterns can be observed in all types of waves, including water waves, sound waves, and light waves.
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

export default WaveInterferenceExperiment; 