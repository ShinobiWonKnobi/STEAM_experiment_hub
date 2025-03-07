import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  Chip,
} from '@mui/material';
import { Badge } from '../types';
import { format } from 'date-fns';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LockIcon from '@mui/icons-material/Lock';

interface BadgeDialogProps {
  badge: Badge | null;
  open: boolean;
  onClose: () => void;
}

const BadgeDialog: React.FC<BadgeDialogProps> = ({ badge, open, onClose }) => {
  if (!badge) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        {badge.name}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            py: 2,
          }}
        >
          <Avatar
            src={badge.imageUrl}
            alt={badge.name}
            sx={{
              width: 120,
              height: 120,
              border: '4px solid',
              borderColor: badge.earned ? 'primary.main' : 'grey.300',
              backgroundColor: 'background.paper',
              opacity: badge.earned ? 1 : 0.7,
              filter: badge.earned ? 'none' : 'grayscale(80%)',
            }}
          />
          
          <Chip 
            icon={badge.earned ? <EmojiEventsIcon /> : <LockIcon />}
            label={badge.earned ? 'Earned' : 'Locked'} 
            color={badge.earned ? 'success' : 'default'}
            variant={badge.earned ? 'filled' : 'outlined'}
          />
          
          <Typography variant="body1" textAlign="center">
            {badge.description}
          </Typography>
          
          {badge.earned && badge.earnedDate && (
            <Typography variant="subtitle2" color="text.secondary">
              Earned on {format(new Date(badge.earnedDate), 'MMMM d, yyyy')}
            </Typography>
          )}
          
          {!badge.earned && (
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
              <strong>How to earn:</strong> {badge.description}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BadgeDialog; 