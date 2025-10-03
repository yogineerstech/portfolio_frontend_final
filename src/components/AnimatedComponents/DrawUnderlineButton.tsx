import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '@/components/ThemeProvider';

interface DrawUnderlineButtonProps {
  children: React.ReactNode;
  href?: string;
  underlineColor?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  onBack?: boolean; // When true, applies effect as background behind the full width of the element
  marginTop?: string; // Custom margin-top for SVG positioning (e.g., "10px", "1rem", "20%")
  width?: string; // Custom width for SVG coverage (e.g., "100%", "80%", "300px") - defaults to "100%"
  thickness?: number; // Custom stroke width for the animation (e.g., 4, 6, 8) - defaults to 6
}

const DrawUnderlineButton: React.FC<DrawUnderlineButtonProps> = ({ 
  children,
  href,
  underlineColor,
  onClick,
  as = 'div',
  className = '',
  onBack = false,
  marginTop = '0px',
  width = '100%',
  thickness = 6
}) => {
  const { theme } = useTheme();
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [currentSvg, setCurrentSvg] = useState<string>('');
  const pathRef = useRef<SVGPathElement | null>(null);
  const enterTweenRef = useRef<gsap.core.Tween | null>(null);
  const leaveTweenRef = useRef<gsap.core.Tween | null>(null);
  const nextIndexRef = useRef<number>(Math.floor(Math.random() * 6)); // Start with random index

  // Same SVG variants will be used for both modes - just positioned differently

  // SVG path templates (without stroke-width, will be added dynamically)
  const svgPathTemplates: string[] = [
    `M5 20.9999C26.7762 16.2245 49.5532 11.5572 71.7979 14.6666C84.9553 16.5057 97.0392 21.8432 109.987 24.3888C116.413 25.6523 123.012 25.5143 129.042 22.6388C135.981 19.3303 142.586 15.1422 150.092 13.3333C156.799 11.7168 161.702 14.6225 167.887 16.8333C181.562 21.7212 194.975 22.6234 209.252 21.3888C224.678 20.0548 239.912 17.991 255.42 18.3055C272.027 18.6422 288.409 18.867 305 17.9999`,
    
    `M5 24.2592C26.233 20.2879 47.7083 16.9968 69.135 13.8421C98.0469 9.5853 128.407 4.02322 158.059 5.14674C172.583 5.69708 187.686 8.66104 201.598 11.9696C207.232 13.3093 215.437 14.9471 220.137 18.3619C224.401 21.4596 220.737 25.6575 217.184 27.6168C208.309 32.5097 197.199 34.281 186.698 34.8486C183.159 35.0399 147.197 36.2657 155.105 26.5837C158.11 22.9053 162.993 20.6229 167.764 18.7924C178.386 14.7164 190.115 12.1115 201.624 10.3984C218.367 7.90626 235.528 7.06127 252.521 7.49276C258.455 7.64343 264.389 7.92791 270.295 8.41825C280.321 9.25056 296 10.8932 305 13.0242`,
    
    `M5 29.5014C9.61174 24.4515 12.9521 17.9873 20.9532 17.5292C23.7742 17.3676 27.0987 17.7897 29.6575 19.0014C33.2644 20.7093 35.6481 24.0004 39.4178 25.5014C48.3911 29.0744 55.7503 25.7731 63.3048 21.0292C67.9902 18.0869 73.7668 16.1366 79.3721 17.8903C85.1682 19.7036 88.2173 26.2464 94.4121 27.2514C102.584 28.5771 107.023 25.5064 113.276 20.6125C119.927 15.4067 128.83 12.3333 137.249 15.0014C141.418 16.3225 143.116 18.7528 146.581 21.0014C149.621 22.9736 152.78 23.6197 156.284 24.2514C165.142 25.8479 172.315 17.5185 179.144 13.5014C184.459 10.3746 191.785 8.74853 195.868 14.5292C199.252 19.3205 205.597 22.9057 211.621 22.5014C215.553 22.2374 220.183 17.8356 222.979 15.5569C225.4 13.5845 227.457 11.1105 230.742 10.5292C232.718 10.1794 234.784 12.9691 236.164 14.0014C238.543 15.7801 240.717 18.4775 243.356 19.8903C249.488 23.1729 255.706 21.2551 261.079 18.0014C266.571 14.6754 270.439 11.5202 277.146 13.6125C280.725 14.7289 283.221 17.209 286.393 19.0014C292.321 22.3517 298.255 22.5014 305 22.5014`,
    
    `M17.0039 32.6826C32.2307 32.8412 47.4552 32.8277 62.676 32.8118C67.3044 32.807 96.546 33.0555 104.728 32.0775C113.615 31.0152 104.516 28.3028 102.022 27.2826C89.9573 22.3465 77.3751 19.0254 65.0451 15.0552C57.8987 12.7542 37.2813 8.49399 44.2314 6.10216C50.9667 3.78422 64.2873 5.81914 70.4249 5.96641C105.866 6.81677 141.306 7.58809 176.75 8.59886C217.874 9.77162 258.906 11.0553 300 14.4892`,
    
    `M4.99805 20.9998C65.6267 17.4649 126.268 13.845 187.208 12.8887C226.483 12.2723 265.751 13.2796 304.998 13.9998`,
    
    `M5 29.8857C52.3147 26.9322 99.4329 21.6611 146.503 17.1765C151.753 16.6763 157.115 15.9505 162.415 15.6551C163.28 15.6069 165.074 15.4123 164.383 16.4275C161.704 20.3627 157.134 23.7551 153.95 27.4983C153.209 28.3702 148.194 33.4751 150.669 34.6605C153.638 36.0819 163.621 32.6063 165.039 32.2029C178.55 28.3608 191.49 23.5968 204.869 19.5404C231.903 11.3436 259.347 5.83254 288.793 5.12258C294.094 4.99476 299.722 4.82265 305 5.45025`
  ];

  // Generate SVG with dynamic thickness
  const generateSvgWithThickness = (pathData: string): string => {
    return `<path d="${pathData}" stroke="currentColor" stroke-width="${thickness}" stroke-linecap="round"/>`;
  };

  // Get SVG based on current index with dynamic thickness
  const getCurrentSvg = (): string => {
    const pathData = svgPathTemplates[nextIndexRef.current];
    return generateSvgWithThickness(pathData);
  };

  // Calculate path length for stroke-dasharray animation
  const getPathLength = (pathElement: SVGPathElement | null): number => {
    return pathElement ? pathElement.getTotalLength() : 0;
  };

  // Animate path drawing using GSAP
  const animatePathIn = (pathElement: SVGPathElement | null): void => {
    if (!pathElement) return;
    
    const length = getPathLength(pathElement);
    pathElement.style.strokeDasharray = length.toString();
    
    // Set initial state
    gsap.set(pathElement, { strokeDashoffset: length });
    
    // Animate in
    enterTweenRef.current = gsap.to(pathElement, {
      duration: 0.5,
      strokeDashoffset: 0,
      ease: "power2.inOut",
      onComplete: () => {
        enterTweenRef.current = null;
      }
    });
  };

  // Animate path out
  const animatePathOut = (pathElement: SVGPathElement | null): void => {
    if (!pathElement) return;
    
    const length = getPathLength(pathElement);
    
    leaveTweenRef.current = gsap.to(pathElement, {
      duration: 0.5,
      strokeDashoffset: length,
      ease: "power2.inOut",
      onComplete: () => {
        leaveTweenRef.current = null;
        setCurrentSvg('');
        setIsAnimating(false);
      }
    });
  };

  const handleMouseEnter = (): void => {
    // Kill any running leave animation
    if (leaveTweenRef.current && leaveTweenRef.current.isActive()) {
      leaveTweenRef.current.kill();
    }

    // Don't restart if already animating in
    if (enterTweenRef.current && enterTweenRef.current.isActive()) return;

    setIsAnimating(true);
    
    // Select SVG variant with dynamic thickness
    const pathData = svgPathTemplates[nextIndexRef.current];
    const selectedSvg = generateSvgWithThickness(pathData);
    setCurrentSvg(selectedSvg);
    
    // Advance index for next hover
    nextIndexRef.current = (nextIndexRef.current + 1) % svgPathTemplates.length;

    // Start animation after SVG is rendered
    setTimeout(() => {
      const pathElement = pathRef.current;
      if (pathElement) {
        animatePathIn(pathElement);
      }
    }, 50);
  };

  const handleMouseLeave = (): void => {
    const pathElement = pathRef.current;
    if (!pathElement || !currentSvg) return;

    const playOut = (): void => {
      // Don't restart if still drawing out
      if (leaveTweenRef.current && leaveTweenRef.current.isActive()) return;
      animatePathOut(pathElement);
    };

    if (enterTweenRef.current && enterTweenRef.current.isActive()) {
      // Wait until draw-in finishes
      enterTweenRef.current.eventCallback('onComplete', playOut);
    } else {
      playOut();
    }
  };

  // Clean up GSAP tweens on unmount
  useEffect(() => {
    return () => {
      if (enterTweenRef.current) enterTweenRef.current.kill();
      if (leaveTweenRef.current) leaveTweenRef.current.kill();
    };
  }, []);

  // Get theme-aware underline color
  const effectiveUnderlineColor = underlineColor || 'hsl(var(--accent))';

  // Wrapper styles that contain everything
  const wrapperStyles: React.CSSProperties = {
    display: 'inline-block', // Always inline-block, width controlled by width prop
    position: 'relative',
    cursor: 'pointer'
  };

  // SVG background layer - customizable width
  const svgBackgroundStyles: React.CSSProperties = onBack ? {
    position: 'absolute',
    top: marginTop, // Custom top positioning
    left: '50%', // Center the SVG
    transform: 'translateX(-50%)', // Center alignment
    width: width, // Dynamic width
    height: '100%',
    zIndex: 0, // Behind everything
    pointerEvents: 'none',
    color: effectiveUnderlineColor,
    overflow: 'visible'
  } : {
    // Traditional underline positioning
    position: 'absolute',
    bottom: '-0.2em',
    left: '50%', // Center the SVG for underline too
    transform: 'translateX(-50%)', // Center alignment
    width: width, // Dynamic width
    height: '0.625em',
    zIndex: 0,
    pointerEvents: 'none',
    color: effectiveUnderlineColor,
    overflow: 'visible'
  };

  // Content layer - always on top
  const contentStyles: React.CSSProperties = {
    position: 'relative',
    zIndex: 1, // On top of SVG
    display: 'inline-block'
  };

  const svgStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  // Render as different elements based on the 'as' prop
  const WrapperComponent = as;

  const commonProps = {
    style: wrapperStyles,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    className: className
  };

  const content = (
    <>
      {/* SVG Background Layer */}
      {currentSvg && (
        <div style={svgBackgroundStyles}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 310 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={svgStyles}
            preserveAspectRatio={onBack ? "none" : "xMidYMid meet"}
            dangerouslySetInnerHTML={{ __html: currentSvg }}
            ref={(svg: SVGSVGElement | null) => {
              if (svg) {
                const path = svg.querySelector('path') as SVGPathElement | null;
                pathRef.current = path;
              }
            }}
          />
        </div>
      )}
      
      {/* Content Layer - Always on top */}
      <div style={contentStyles}>
        {children}
      </div>
    </>
  );

  // If href is provided, render as anchor
  if (href) {
    return (
      <a href={href} {...commonProps}>
        {content}
      </a>
    );
  }

  // Otherwise render as specified element
  return React.createElement(WrapperComponent, commonProps, content);
};

export default DrawUnderlineButton;

/* 
Usage as wrapper component - preserves child styling and adds animated effects:

// DEFAULT MODE: Underline effect (good for buttons, small text)
<DrawUnderlineButton>
  <h1 className="text-4xl font-bold">My Custom Title</h1>
</DrawUnderlineButton>

// BACKGROUND MODE: Full-width background effect (perfect for large text sections)
<DrawUnderlineButton onBack={true}>
  <h1 className="text-6xl font-bold text-center">
    Pioneering the Future of Software Development
  </h1>
</DrawUnderlineButton>

// Custom width and thickness
<DrawUnderlineButton onBack={true} width="80%" thickness={4} marginTop="15px">
  <div className="text-4xl leading-relaxed">
    <p>Customized background animation</p>
    <p>with 80% width and thin lines</p>
  </div>
</DrawUnderlineButton>

// Narrow underline with custom thickness
<DrawUnderlineButton width="60%" thickness={3}>
  <button className="px-6 py-3">Subtle Button</button>
</DrawUnderlineButton>

// Wide background with thick lines
<DrawUnderlineButton onBack={true} width="120%" thickness={10} marginTop="10px">
  <h1 className="text-6xl font-bold">Bold Statement</h1>
</DrawUnderlineButton>

// Precise control over all properties
<DrawUnderlineButton 
  onBack={true} 
  width="90%" 
  thickness={5} 
  marginTop="20px" 
  underlineColor="#ff6b6b"
>
  <h2 className="text-5xl font-display">Perfectly Controlled</h2>
</DrawUnderlineButton>

// Regular underline mode with custom width
<DrawUnderlineButton width="75%" thickness={8} underlineColor="#00ff00">
  <button className="px-4 py-2 bg-blue-500 text-white rounded">
    Custom Green Underline
  </button>
</DrawUnderlineButton>

// Props:
// - onBack={true}: Creates animated background behind the element (perfect for hero sections, large titles)
// - onBack={false} (default): Creates animated underline below the element (perfect for buttons, links, small text)  
// - marginTop: Custom positioning for SVG animation (e.g., "10px", "1rem", "20%") - only applies when onBack={true}
// - width: Custom width for SVG coverage (e.g., "100%", "80%", "300px") - defaults to "100%"
// - thickness: Custom stroke width for animation (e.g., 3, 6, 10) - defaults to 6
// - underlineColor: Custom color for the animation (defaults to theme accent color)
// 
// Features:
// - Dynamic stroke width control with thickness prop
// - Flexible width control - can be narrower or wider than the element
// - Fully customizable positioning with marginTop
// - Theme-aware colors that adapt to light/dark mode
// - Preserves all child element styling
// - Centered alignment for perfect positioning
*/

