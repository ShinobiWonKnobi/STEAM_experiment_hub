import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Collapse,
  Alert,
  AlertTitle,
  IconButton,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import { useAccessibilityStore } from '../stores/accessibilityStore';

interface ContentWarningProps {
  title: string;
  warnings: string[];
  severity?: 'info' | 'warning' | 'error';
  children: React.ReactNode;
}

const ContentWarning: React.FC<ContentWarningProps> = ({
  title,
  warnings,
  severity = 'warning',
  children,
}) => {
  const [showContent, setShowContent] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { contentWarnings } = useAccessibilityStore();

  // If content warnings are disabled or already dismissed, show content directly
  if (!contentWarnings || dismissed) {
    return <>{children}</>;
  }

  return (
    <Box>
      <Collapse in={!showContent}>
        <Alert
          severity={severity}
          icon={<WarningIcon fontSize="inherit" />}
          action={
            <IconButton
              aria-label="dismiss"
              color="inherit"
              size="small"
              onClick={() => setDismissed(true)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>{title}</AlertTitle>
          <Typography variant="body2" gutterBottom>
            This content contains material related to:
          </Typography>
          <ul>
            {warnings.map((warning, index) => (
              <li key={index}>
                <Typography variant="body2">{warning}</Typography>
              </li>
            ))}
          </ul>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              size="small"
              color={severity}
              onClick={() => setShowContent(true)}
            >
              Show Content
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => setDismissed(true)}
            >
              Don't Show Warnings Again
            </Button>
          </Box>
        </Alert>
      </Collapse>

      <Collapse in={showContent}>
        {children}
      </Collapse>
    </Box>
  );
};

export default ContentWarning; 