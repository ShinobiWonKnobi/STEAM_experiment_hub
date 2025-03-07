import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { useAccessibilityStore } from '../stores/accessibilityStore';

interface ScreenReaderOnlyProps extends BoxProps {
  children: React.ReactNode;
  showWhenOptimized?: boolean;
}

/**
 * A component that visually hides content but keeps it accessible to screen readers
 * 
 * @param props Component props including children to be hidden visually
 * @returns A component that is visually hidden but accessible to screen readers
 */
const ScreenReaderOnly: React.FC<ScreenReaderOnlyProps> = ({
  children,
  showWhenOptimized = false,
  ...boxProps
}) => {
  const { screenReaderOptimized } = useAccessibilityStore();
  
  // If screen reader optimization is enabled and showWhenOptimized is true,
  // show the content visually as well
  const shouldBeVisible = screenReaderOptimized && showWhenOptimized;
  
  return (
    <Box
      {...boxProps}
      sx={{
        ...(shouldBeVisible
          ? {
              // Visible styles when screen reader optimization is enabled
              // and showWhenOptimized is true
              padding: '0.5rem',
              margin: '0.5rem 0',
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: '4px',
              backgroundColor: 'primary.light',
              color: 'primary.contrastText',
              fontWeight: 'bold',
            }
          : {
              // Hidden styles for screen reader only
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              borderWidth: 0,
            }),
        ...boxProps.sx,
      }}
      aria-hidden={false}
    >
      {children}
    </Box>
  );
};

export default ScreenReaderOnly; 