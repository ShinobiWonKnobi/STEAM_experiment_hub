import React from 'react';
import { Box, Typography, Container, Paper, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const MoleculeShapesExperiment: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 4, my: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Molecule Shapes Experiment
        </Typography>
        
        <Typography variant="body1" paragraph>
          This experiment is currently under development and will be available soon.
        </Typography>
        
        <Typography variant="body1" paragraph>
          The Molecule Shapes experiment will allow you to explore how the arrangement of electron pairs
          determines the three-dimensional structure of molecules, using the PhET Molecule Shapes simulation.
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

export default MoleculeShapesExperiment; 