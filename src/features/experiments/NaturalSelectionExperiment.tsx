import React from 'react';
import { Box, Typography, Container, Paper, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NaturalSelectionExperiment: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 4, my: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Natural Selection Experiment
        </Typography>
        
        <Typography variant="body1" paragraph>
          This experiment is currently under development and will be available soon.
        </Typography>
        
        <Typography variant="body1" paragraph>
          The Natural Selection experiment will allow you to explore how populations change over time
          in response to environmental pressures, using the PhET Natural Selection simulation.
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Button
            component={RouterLink}
            to="/dashboard"
            variant="contained"
            color="primary"
          >
            Return to Dashboard
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NaturalSelectionExperiment; 