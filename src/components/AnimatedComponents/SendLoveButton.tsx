import React, { useState, CSSProperties } from 'react';
import { useTheme } from '@/components/ThemeProvider';

interface SendLoveButtonProps {
  staticText?: string;
  hoverText?: string;
}

const SendLoveButton: React.FC<SendLoveButtonProps> = ({ staticText = "Send Love", hoverText = "Send Love" }) => {
  const [isHovered, setIsHovered] = useState(false);
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

  // Specific button--kari styles
  const kariButtonStyles: CSSProperties = {
    ...baseButtonStyles,
    fontFamily: 'freight-display-pro, serif',
    fontWeight: 900,
    fontSize: '1.25rem',
    borderRadius: '50%',
    border: '2px solid hsl(var(--border))',
    background: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    transition: 'all 0.3s ease'
  };

  // Static text span styles
  const staticTextStyles: CSSProperties = {
    display: 'inline-block',
    opacity: isHovered ? 0 : 1,
    transition: 'opacity 0.1s'
  };

  // Marquee container styles
  const marqueeStyles: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    overflow: 'hidden',
    pointerEvents: 'none',
    transform: 'rotate(-2.75deg)'
  };

  // Marquee inner animation styles
  const marqueeInnerStyles: CSSProperties = {
    width: 'fit-content',
    display: 'flex',
    position: 'relative',
    transform: 'translate3d(calc(-25% + 1rem), 0, 0)',
    animation: isHovered ? 'marquee 1s linear infinite' : 'none',
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.6s'
  };

  // Individual marquee span styles
  const marqueeSpanStyles: CSSProperties = {
    textAlign: 'center',
    whiteSpace: 'nowrap',
    fontStyle: 'italic',
    padding: '1.5rem 0.5rem',
    color: 'inherit'
  };

  // CSS keyframes for marquee animation (injected as style tag)
  const keyframesCSS = `
    @keyframes marquee {
      0% {
        transform: translate3d(calc(-25% + 1rem), 0, 0);
      }
      100% {
        transform: translate3d(calc(-50% + 1rem), 0, 0);
      }
    }
  `;

  // Inject keyframes into document head if not already present
  React.useEffect(() => {
    const styleId = 'send-love-button-keyframes';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = keyframesCSS;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <button
      style={{
        ...kariButtonStyles,
        ...(isHovered && {
          backgroundColor: 'hsl(var(--accent))',
          borderColor: 'hsl(var(--accent))',
          color: 'hsl(var(--accent-foreground))',
          transform: 'scale(1.05)',
          boxShadow: '0 8px 25px hsla(var(--accent), 0.3)'
        })
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <span style={staticTextStyles}>
        {staticText}
      </span>
      
      <div style={marqueeStyles} aria-hidden="true">
        <div style={marqueeInnerStyles}>
          <span style={marqueeSpanStyles}>{hoverText}</span>
          <span style={marqueeSpanStyles}>{hoverText}</span>
          <span style={marqueeSpanStyles}>{hoverText}</span>
          <span style={marqueeSpanStyles}>{hoverText}</span>
        </div>
      </div>
    </button>
  );
};

export default SendLoveButton;