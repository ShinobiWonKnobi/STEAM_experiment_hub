import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { useAccessibilityStore } from '../stores/accessibilityStore';
import { simplifyText } from '../utils/simplifyLanguage';

interface SimplifiedTextProps extends Omit<TypographyProps, 'children'> {
  original: string;
  simplified?: string;
}

/**
 * A component that displays text in a simplified form based on accessibility settings
 * 
 * @param props Component props including original and optional simplified text
 * @returns A Typography component with simplified or original text
 */
const SimplifiedText: React.FC<SimplifiedTextProps> = ({
  original,
  simplified,
  ...typographyProps
}) => {
  const { simplifiedLanguage } = useAccessibilityStore();
  
  const displayText = simplifiedLanguage && simplified 
    ? simplified 
    : simplifiedLanguage 
      ? simplifyText(original)
      : original;
  
  return (
    <Typography {...typographyProps}>
      {displayText}
    </Typography>
  );
};

export default SimplifiedText; 