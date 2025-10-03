import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedCTAButtonProps {
  href?: string;
  className?: string;
}

export const AnimatedCTAButton: React.FC<AnimatedCTAButtonProps> = ({ 
  href = "/contact", 
  className = "" 
}) => {
  const messages = [
    "Grow your business",
    "Build your brand",
    "Scale your startup",
    "Transform digitally",
    "Innovate with AI",
    "Dominate your market"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentMessage = messages[currentIndex];
      
      if (isDeleting) {
        setDisplayText(currentMessage.substring(0, displayText.length - 1));
        setTypingSpeed(50);
        
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % messages.length);
          setTypingSpeed(100);
        }
      } else {
        setDisplayText(currentMessage.substring(0, displayText.length + 1));
        setTypingSpeed(100);
        
        if (displayText === currentMessage) {
          setTimeout(() => setIsDeleting(true), 2000);
          setTypingSpeed(2000);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, messages, typingSpeed]);

  const handleClick = () => {
    window.location.href = href;
  };

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden
        flex items-center
        bg-[#1e293b] dark:bg-[#1e293b]
        text-white
        rounded-xl
        font-medium text-lg
        transition-all duration-300 ease-out
        cursor-pointer
        group
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        paddingLeft: '4px',
        paddingRight: '24px',
        paddingTop: '4px',
        paddingBottom: '4px',
        minWidth: '280px',
        height: '60px'
      }}
    >
      {/* White box with arrow */}
      <motion.div
        className="bg-white rounded-lg flex items-center justify-center mr-4"
        style={{
          width: '52px',
          height: '52px',
          flexShrink: 0
        }}
        animate={{
          x: isHovered ? 8 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          animate={{
            x: isHovered ? [0, 4, 0] : 0,
          }}
          transition={{
            duration: isHovered ? 0.6 : 0,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#1e293b" 
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Typewriter text */}
      <div className="flex-1 text-left relative">
        <span className="text-white font-medium">
          {displayText}
          <motion.span
            className="inline-block w-0.5 h-5 bg-white ml-1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </span>
      </div>

      {/* Subtle hover background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};