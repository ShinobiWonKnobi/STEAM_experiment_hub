import React, { useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { useAccessibilityStore } from '../stores/accessibilityStore';
import ContentWarning from './ContentWarning';
import ScreenReaderOnly from './ScreenReaderOnly';
import SimplifiedText from './SimplifiedText';
import useKeyboardNavigation from '../hooks/useKeyboardNavigation';

const AccessibilityDemo: React.FC = () => {
  const {
    highContrast,
    largeText,
    reducedMotion,
    colorBlindMode,
    dyslexiaFriendlyFont,
    screenReaderOptimized,
    keyboardNavigationEnhanced,
    simplifiedLanguage,
    contentWarnings,
  } = useAccessibilityStore();
  
  // Use our keyboard navigation hook
  const cardContainerRef = useKeyboardNavigation<HTMLDivElement>();
  
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Accessibility Features Demo
      </Typography>
      
      <Typography variant="body1" paragraph>
        This page demonstrates the accessibility features we've added to the STEAM Experiment Hub.
        Try toggling different accessibility options using the menu in the top right corner.
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your Current Settings
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              High Contrast: {highContrast ? 'Enabled' : 'Disabled'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              Large Text: {largeText ? 'Enabled' : 'Disabled'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              Reduced Motion: {reducedMotion ? 'Enabled' : 'Disabled'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              Color Blind Mode: {colorBlindMode ? 'Enabled' : 'Disabled'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              Dyslexia-Friendly Font: {dyslexiaFriendlyFont ? 'Enabled' : 'Disabled'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              Screen Reader Optimized: {screenReaderOptimized ? 'Enabled' : 'Disabled'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              Enhanced Keyboard Navigation: {keyboardNavigationEnhanced ? 'Enabled' : 'Disabled'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              Simplified Language: {simplifiedLanguage ? 'Enabled' : 'Disabled'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2">
              Content Warnings: {contentWarnings ? 'Enabled' : 'Disabled'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      
      <Typography variant="h5" gutterBottom>
        Feature Demonstrations
      </Typography>
      
      <Grid container spacing={4}>
        {/* Simplified Language Demo */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Simplified Language
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                Original Text:
              </Typography>
              <Typography variant="body2" paragraph>
                During titration, the acid-base equilibrium is monitored as the concentration
                of the solution changes. The chemical reaction produces a precipitate when the
                equivalence point is reached.
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Simplified Text (toggle in settings):
              </Typography>
              <SimplifiedText
                variant="body2"
                paragraph
                original="During titration, the acid-base equilibrium is monitored as the concentration
                of the solution changes. The chemical reaction produces a precipitate when the
                equivalence point is reached."
                simplified="During mixing liquids to find amounts, the sour-neutral balance is watched as the strength
                of the liquid mixture changes. The substance change makes a solid that forms when the
                right point is reached."
              />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Content Warning Demo */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Content Warnings
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              <ContentWarning
                title="Chemistry Safety Warning"
                warnings={[
                  "Chemical reactions",
                  "Laboratory safety procedures",
                  "Hazardous materials"
                ]}
              >
                <Typography variant="body2">
                  This experiment involves working with acids and bases which can be corrosive.
                  Always wear protective equipment including gloves and safety goggles.
                  In case of skin contact, rinse immediately with water for 15 minutes.
                </Typography>
              </ContentWarning>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Screen Reader Support Demo */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Screen Reader Support
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" paragraph>
                  The graph below shows the pH change during titration.
                </Typography>
                
                <Box
                  sx={{
                    height: 200,
                    bgcolor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  [Visual pH Graph]
                </Box>
                
                <ScreenReaderOnly showWhenOptimized>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Graph description: The pH starts at 2.0 and remains stable until 20mL of base is added.
                    Between 20-25mL, there is a sharp increase in pH from 3.0 to 11.0.
                    After 25mL, the pH stabilizes around 12.0.
                  </Typography>
                </ScreenReaderOnly>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Keyboard Navigation Demo */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Keyboard Navigation
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="body2" paragraph>
                Use arrow keys to navigate between these buttons when keyboard navigation is enabled.
                Press Tab to enter this section, then use arrow keys.
              </Typography>
              
              <Box
                ref={cardContainerRef}
                sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}
              >
                <Button variant="contained" color="primary">
                  Button 1
                </Button>
                <Button variant="contained" color="secondary">
                  Button 2
                </Button>
                <Button variant="contained">
                  Button 3
                </Button>
                <Button variant="contained">
                  Button 4
                </Button>
                <Button variant="contained">
                  Button 5
                </Button>
                <Button variant="contained">
                  Button 6
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccessibilityDemo; 