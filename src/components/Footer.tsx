import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton, 
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import ScienceIcon from '@mui/icons-material/Science';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Experiments',
      links: [
        { name: 'All Experiments', path: '/experiments' },
        { name: 'Chemistry', path: '/experiments?subject=chemistry' },
        { name: 'Physics', path: '/experiments?subject=physics' },
        { name: 'Biology', path: '/experiments?subject=biology' },
        { name: 'Mathematics', path: '/experiments?subject=mathematics' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Learning Guides', path: '/resources/guides' },
        { name: 'Video Tutorials', path: '/resources/videos' },
        { name: 'Teacher Resources', path: '/resources/teachers' },
        { name: 'FAQ', path: '/faq' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Careers', path: '/careers' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
      ],
    },
  ];
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper',
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: 'auto',
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ScienceIcon 
                sx={{ 
                  mr: 1, 
                  color: 'primary.main',
                  fontSize: 32
                }} 
              />
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                STEAM Experiment Hub
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              An interactive platform for exploring Science, Technology, Engineering, Arts, and Mathematics through engaging virtual experiments.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <IconButton 
                size="small" 
                aria-label="facebook" 
                sx={{ 
                  color: '#1877F2',
                  '&:hover': { bgcolor: alpha('#1877F2', 0.1) }
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                size="small" 
                aria-label="twitter" 
                sx={{ 
                  color: '#1DA1F2',
                  '&:hover': { bgcolor: alpha('#1DA1F2', 0.1) }
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                size="small" 
                aria-label="instagram" 
                sx={{ 
                  color: '#E4405F',
                  '&:hover': { bgcolor: alpha('#E4405F', 0.1) }
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                size="small" 
                aria-label="youtube" 
                sx={{ 
                  color: '#FF0000',
                  '&:hover': { bgcolor: alpha('#FF0000', 0.1) }
                }}
              >
                <YouTubeIcon />
              </IconButton>
              <IconButton 
                size="small" 
                aria-label="github" 
                sx={{ 
                  color: '#333333',
                  '&:hover': { bgcolor: alpha('#333333', 0.1) }
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>
          
          {/* Footer links */}
          {footerLinks.map((section) => (
            <Grid item xs={12} sm={6} md={2.5} key={section.title}>
              <Typography 
                variant="subtitle1" 
                color="text.primary" 
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                {section.title}
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.name} sx={{ py: 0.5 }}>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      color="text.secondary"
                      sx={{ 
                        textDecoration: 'none',
                        '&:hover': { 
                          color: 'primary.main',
                          textDecoration: 'underline' 
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: 'flex-start' },
          gap: 2
        }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} STEAM Experiment Hub. All rights reserved.
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 3,
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <Link 
              component={RouterLink} 
              to="/privacy" 
              color="text.secondary"
              sx={{ 
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Privacy Policy
            </Link>
            <Link 
              component={RouterLink} 
              to="/terms" 
              color="text.secondary"
              sx={{ 
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Terms of Service
            </Link>
            <Link 
              component={RouterLink} 
              to="/cookies" 
              color="text.secondary"
              sx={{ 
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 