import React, { useState, CSSProperties } from 'react';
import { useTheme } from '@/components/ThemeProvider';

interface GoButtonProps {
  text?: string;
}

const GoButton: React.FC<GoButtonProps> = ({ text = "Go" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useTheme();

  // Base button styles (from .button base class)
  const baseButtonStyles: CSSProperties = {
    pointerEvents: 'auto',
    cursor: 'pointer',
    background: 'hsl(var(--muted))',
    border: 'none',
    padding: '1.5rem 3rem',
    margin: 0,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    position: 'relative',
    display: 'inline-block',
    boxSizing: 'border-box',
    color: 'hsl(var(--foreground))'
  };

  // Specific button--fenrir styles
  const fenrirButtonStyles: CSSProperties = {
    ...baseButtonStyles,
    background: 'none',
    padding: 0,
    clipPath: 'circle(50% at 50% 50%)',
    WebkitClipPath: 'circle(50% at 50% 50%)',
    width: '120px',
    height: '120px',
    fontFamily: 'aktiv-grotesk-extended, sans-serif',
    fontWeight: 700,
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    color: 'hsl(var(--foreground))',
    transition: 'all 0.3s ease'
  };

  // Progress SVG container styles
  const progressStyles: CSSProperties = {
    position: 'absolute',
    width: '80px',
    height: '80px',
    top: 'calc(50% - 40px)',
    left: 'calc(50% - 40px)',
    transition: 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)',
    transform: isHovered ? 'scale3d(1.2, 1.2, 1)' : 'scale3d(1, 1, 1)'
  };

  // Progress circle styles
  const progressCircleStyles: CSSProperties = {
    fill: isFocused ? 'hsl(var(--accent) / 0.4)' : 'none',
    stroke: 'hsl(var(--border))',
    strokeWidth: '1px'
  };

  // Progress path styles
  const progressPathStyles: CSSProperties = {
    fill: 'none',
    stroke: 'hsl(var(--accent))',
    strokeWidth: '1px',
    strokeDasharray: '1',
    strokeDashoffset: isHovered ? '0' : '1',
    transition: 'stroke-dashoffset 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
  };

  // Text span styles
  const textStyles: CSSProperties = {
    display: 'block',
    position: 'relative',
    zIndex: 2,
    color: 'inherit'
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <button
      style={{
        ...fenrirButtonStyles,
        ...(isHovered && {
          backgroundColor: 'hsl(var(--accent) / 0.1)',
          color: 'hsl(var(--accent))',
          transform: 'scale(1.05)',
          boxShadow: '0 8px 25px hsla(var(--accent), 0.2)'
        })
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <svg 
        aria-hidden="true" 
        className="progress" 
        width="70" 
        height="70" 
        viewBox="0 0 70 70"
        style={progressStyles}
      >
        <path 
          className="progress__circle" 
          d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
          style={progressCircleStyles}
        />
        <path 
          className="progress__path" 
          d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z" 
          pathLength="1"
          style={progressPathStyles}
        />
      </svg>
      <span style={textStyles}>{text}</span>
    </button>
  );
};

export default GoButton;