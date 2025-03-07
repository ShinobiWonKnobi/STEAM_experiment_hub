import React from 'react';
import { Grid, Box } from '@mui/material';
import ExperimentCard from '../../components/ExperimentCard';
import { useGamificationStore } from '../../stores/gamificationStore';
import ErrorBoundary from '../../components/ErrorBoundary';

/**
 * ExperimentList component displays a grid of available experiments
 */
const ExperimentList: React.FC = () => {
  // Use the helper function from gamificationStore
  const getExperimentProgress = useGamificationStore((state) => state.getExperimentProgress);

  // List of available experiments
  const experiments = [
    {
      id: 'acid-base-titration',
      title: 'Acid-Base Titration',
      description: 'Determine the concentration of an acid by titrating it with a base of known concentration.',
      imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      difficulty: 'Beginner',
      subject: 'Chemistry',
      duration: '30 min',
      path: '/experiments/acid-base-titration'
    },
    {
      id: 'pendulum-motion',
      title: 'Pendulum Motion',
      description: 'Explore the factors that affect the period of a pendulum and understand simple harmonic motion.',
      imageUrl: 'https://images.unsplash.com/photo-1585314062604-1a357de8b000?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      difficulty: 'Intermediate',
      subject: 'Physics',
      duration: '45 min',
      path: '/experiments/pendulum-motion'
    },
    {
      id: 'dna-extraction',
      title: 'DNA Extraction',
      description: 'Extract DNA from fruits using household materials and learn about cellular structures.',
      imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      difficulty: 'Advanced',
      subject: 'Biology',
      duration: '60 min',
      path: '/experiments/dna-extraction'
    }
  ];

  return (
    <ErrorBoundary>
      <Grid container spacing={3}>
        {experiments.map((experiment) => {
          const experimentProgress = getExperimentProgress(experiment.id);
          return (
            <Grid item key={experiment.id} xs={12} sm={6} md={4}>
              <Box sx={{ height: '100%' }}>
                <ExperimentCard
                  {...experiment}
                  progress={experimentProgress.progress}
                  completed={experimentProgress.completed}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </ErrorBoundary>
  );
};

export default ExperimentList; 