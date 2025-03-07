import React from 'react';
import { 
  Card, 
  CardContent,
  Box,
  Skeleton,
} from '@mui/material';

const ExperimentCardSkeleton: React.FC = () => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Difficulty badge skeleton */}
      <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}>
        <Skeleton 
          variant="rectangular" 
          width={80} 
          height={24} 
          sx={{ borderRadius: 1 }}
        />
      </Box>

      {/* Image skeleton */}
      <Skeleton 
        variant="rectangular" 
        height={160}
        sx={{
          transform: 'scale(1, 1)',
        }}
      />

      <CardContent sx={{ flexGrow: 1, pt: 3 }}>
        {/* Title skeleton */}
        <Skeleton 
          variant="text" 
          height={32} 
          width="80%" 
          sx={{ mb: 1 }}
        />

        {/* Description skeleton */}
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} width="60%" />

        {/* Tags skeleton */}
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={70} height={24} sx={{ borderRadius: 1 }} />
        </Box>

        {/* Progress skeleton */}
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Skeleton variant="text" width={60} height={20} />
            <Skeleton variant="text" width={40} height={20} />
          </Box>
          <Skeleton 
            variant="rectangular" 
            height={6} 
            sx={{ borderRadius: 3 }}
          />
        </Box>
      </CardContent>

      {/* Button skeleton */}
      <Box sx={{ p: 2, pt: 0 }}>
        <Skeleton 
          variant="rectangular" 
          height={40} 
          sx={{ borderRadius: 2 }}
        />
      </Box>
    </Card>
  );
};

export default ExperimentCardSkeleton; 