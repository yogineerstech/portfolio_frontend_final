import React from 'react';

const AnimatedGridBackground: React.FC = () => {
  // Configuration for grid lines and floating elements - maximum spread across container width
  const gridLines = [
    { left: '10%', elements: [{ top: '25%', delay: '0s', duration: '8s' }, { top: '70%', delay: '3s', duration: '10s' }] },
    { left: '30%', elements: [{ top: '40%', delay: '2s', duration: '9s' }, { top: '15%', delay: '5s', duration: '7s' }] },
    { left: '50%', elements: [{ top: '30%', delay: '4s', duration: '8.5s' }] },
    { left: '70%', elements: [{ top: '55%', delay: '6s', duration: '9.5s' }, { top: '20%', delay: '1s', duration: '11s' }] },
    { left: '90%', elements: [{ top: '35%', delay: '2.5s', duration: '8s' }, { top: '65%', delay: '4.5s', duration: '7.5s' }] },
  ];

  return (
    <>
      {/* CSS Animation Keyframes */}
      <style>{`
        @keyframes floatUpDown {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-40px); 
          }
        }
        .grid-float-element {
          animation: floatUpDown var(--duration) var(--delay) infinite ease-in-out;
        }
      `}</style>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        {/* Vertical Grid Lines */}
        {gridLines.map((line, lineIndex) => (
          <div 
            key={lineIndex} 
            className="absolute top-0 h-full bg-gray-300/40 dark:bg-gray-600/20" 
            style={{ 
              left: line.left,
              width: '1px',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
            }}
          >
            {/* Floating Elements on each line */}
            {line.elements.map((element, elementIndex) => (
              <div
                key={elementIndex}
                className="absolute grid-float-element bg-[#E3BE89]/70 dark:bg-[#E3BE89]/30"
                style={{
                  top: element.top,
                  left: '-1px',
                  width: '3px',
                  height: '24px',
                  borderRadius: '1px',
                  '--duration': element.duration,
                  '--delay': element.delay,
                } as React.CSSProperties}
              />
            ))}
          </div>
        ))}
        
        {/* Top and Bottom Fade Overlays */}
        <div 
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))',
          }}
        />
        <div 
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none dark:block hidden"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none dark:block hidden"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
          }}
        />
      </div>
    </>
  );
};

export default AnimatedGridBackground;