import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Container, 
  Paper, 
  useTheme, 
  alpha,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  Fade,
  Zoom
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ScienceIcon from '@mui/icons-material/Science';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import DevicesIcon from '@mui/icons-material/Devices';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useGamificationStore } from '../../stores/gamificationStore';
import ExperimentList from '../experiments/ExperimentList';

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const badges = useGamificationStore(state => state.badges);
  
  const features = [
    {
      icon: <ScienceIcon fontSize="large" color="primary" />,
      title: 'Interactive Experiments',
      description: 'Engage with virtual STEAM experiments that simulate real-world scientific phenomena.',
    },
    {
      icon: <EmojiEventsIcon fontSize="large" sx={{ color: theme.palette.warning.main }} />,
      title: 'Gamification',
      description: 'Earn badges, track progress, and level up as you complete experiments and challenges.',
    },
    {
      icon: <AccessibilityNewIcon fontSize="large" sx={{ color: theme.palette.success.main }} />,
      title: 'Accessibility',
      description: 'Designed for all users with customizable accessibility options for an inclusive experience.',
    },
    {
      icon: <SchoolIcon fontSize="large" sx={{ color: theme.palette.info.main }} />,
      title: 'Track Your Progress',
      description: 'Earn badges, level up, and monitor your learning journey with our gamification system.',
    },
  ];
  
  const experiments = [
    {
      id: 'acid-base-titration',
      title: 'Acid-Base Titration',
      description: 'Explore acid-base reactions and learn about pH indicators through a virtual titration experiment. Developed by Dr. Sharma from IIT Delhi.',
      imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      subject: 'Chemistry',
      path: '/experiments/acid-base-titration'
    },
    {
      id: 'pendulum-motion',
      title: 'Pendulum Motion',
      description: 'Investigate the physics of pendulum motion and discover how different factors affect its behavior. Based on research from ISRO Bangalore.',
      imageUrl: 'https://images.unsplash.com/photo-1564937683645-eaf3c7e3e58d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      subject: 'Physics',
      path: '/experiments/pendulum-motion'
    },
    {
      id: 'dna-extraction',
      title: 'DNA Extraction',
      description: 'Extract DNA from fruits using household materials. Designed by biotechnology experts from AIIMS Mumbai.',
      imageUrl: 'https://images.unsplash.com/photo-1581093196277-9f608bb3b511?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      subject: 'Biology',
      path: '/experiments/dna-extraction'
    },
    {
      id: 'solar-energy',
      title: 'Solar Energy Conversion',
      description: 'Learn about solar energy conversion and build a simple solar-powered device. Developed by renewable energy researchers from IIT Madras.',
      imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      subject: 'Physics',
      path: '/experiments/solar-energy'
    }
  ];
  
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 8, md: 12 },
          mb: { xs: 6, md: 10 },
          borderRadius: 4,
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            zIndex: 0,
          }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} sx={{ position: 'relative', zIndex: 1 }}>
              <Fade in timeout={1000}>
                <Box>
                  <Typography 
                    variant="h2" 
                    component="h1" 
                    gutterBottom
                    sx={{
                      fontWeight: 800,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 2,
                      fontSize: { xs: '2.5rem', md: '3.5rem' }
                    }}
                  >
                    Explore STEAM Through Interactive Experiments
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    paragraph
                    sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
                  >
                    Discover the wonders of Science, Technology, Engineering, Arts, and Mathematics 
                    through our engaging virtual experiments. Learn by doing and track your progress.
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Button 
                      component={RouterLink}
                      to="/experiments"
                      variant="contained" 
                      size="large"
                      sx={{ 
                        px: 4, 
                        py: 1.5,
                        borderRadius: 2,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        '&:hover': {
                          background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                        }
                      }}
                    >
                      Start Experimenting
                    </Button>
                    <Button 
                      component={RouterLink} 
                      to="/profile" 
                      variant="outlined" 
                      size="large"
                      sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                    >
                      View Profile
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6} sx={{ position: 'relative', zIndex: 1 }}>
              <Zoom in timeout={1500}>
                <Box 
                  component="img"
                  src="/hero-illustration.svg"
                  alt="STEAM Experiment Illustration"
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    height: 'auto',
                    display: 'block',
                    mx: 'auto',
                    filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.15))',
                  }}
                />
              </Zoom>
            </Grid>
          </Grid>
          
          {/* Stats */}
          <Grid 
            container 
            spacing={3} 
            sx={{ 
              mt: { xs: 4, md: 8 },
              position: 'relative',
              zIndex: 1,
            }}
          >
            {[
              { label: 'Experiments', value: experiments.length },
              { label: 'Badges to Earn', value: badges.length },
              { label: 'Active Users', value: '5,000+' },
              { label: 'Schools Using', value: '120+' },
            ].map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 2, 
                    textAlign: 'center',
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.paper, 0.7),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  }}
                >
                  <Typography 
                    variant="h3" 
                    component="div"
                    sx={{ 
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      mb: 1
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h4" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              mb: 6,
              fontWeight: 700,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                borderRadius: 2,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }
            }}
          >
            Why Choose Our Platform?
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Zoom in style={{ transitionDelay: `${index * 150}ms` }}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 4, 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      borderRadius: 4,
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 12px 20px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        mb: 2, 
                        color: 'primary.main',
                        p: 2,
                        borderRadius: '50%',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Featured Experiments */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ fontWeight: 700 }}
            >
              Featured Experiments
            </Typography>
            
            <Button 
              component={RouterLink} 
              to="/experiments" 
              variant="outlined"
              endIcon={<ScienceIcon />}
            >
              View All
            </Button>
          </Box>
          
          <ExperimentList />
        </Container>
      </Box>
      
      {/* Testimonials */}
      <Container maxWidth="lg" sx={{ mb: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{
              fontWeight: 700,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                borderRadius: 2,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }
            }}
          >
            What Our Users Say
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Hear from students and educators who have transformed their learning experience with our platform.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {[
            {
              name: 'Dr. Rajesh Kumar',
              role: 'Science Department Head, Delhi Public School, R.K. Puram',
              avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
              quote: 'The STEAM Experiment Hub has transformed our science labs. Students can now practice experiments virtually before performing them in the lab, significantly improving their understanding and safety awareness.',
            },
            {
              name: 'Ananya Reddy',
              role: 'Class 12 Student, Narayana Junior College, Hyderabad',
              avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
              quote: 'The interactive simulations helped me score 95% in my Physics practicals. The platform made complex concepts like wave motion and electromagnetic induction so much easier to understand!',
            },
            {
              name: 'Prof. Lakshmi Menon',
              role: 'Education Technology Researcher, IIT Madras',
              avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
              quote: 'Our research shows that students using STEAM Experiment Hub show a 40% improvement in practical knowledge retention. The platform brilliantly combines traditional learning with modern technology.',
            },
          ].map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Zoom in timeout={500 + index * 300}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    bgcolor: alpha(theme.palette.background.paper, 0.6),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                    '&::before': {
                      content: '"""',
                      position: 'absolute',
                      top: 20,
                      left: 20,
                      fontSize: '4rem',
                      lineHeight: 1,
                      color: alpha(theme.palette.primary.main, 0.1),
                      fontFamily: 'Georgia, serif',
                    }
                  }}
                >
                  <Typography 
                    variant="body1" 
                    paragraph
                    sx={{ 
                      mb: 3, 
                      fontStyle: 'italic',
                      position: 'relative',
                      zIndex: 1,
                      pt: 3,
                    }}
                  >
                    "{testimonial.quote}"
                  </Typography>
                  <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      sx={{ width: 50, height: 50, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* CTA Section */}
      <Box sx={{ py: 8, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
        <Container maxWidth="md">
          <Paper 
            elevation={0}
            sx={{ 
              p: 6, 
              textAlign: 'center',
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Ready to Start Your STEAM Journey?
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
              Join thousands of students who are discovering the wonders of science and technology
              through our interactive experiments. Start learning by doing today!
            </Typography>
            
            <Button 
              component={RouterLink} 
              to="/experiments" 
              variant="contained" 
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5,
                borderRadius: 2,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                '&:hover': {
                  background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                }
              }}
            >
              Get Started Now
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage; 