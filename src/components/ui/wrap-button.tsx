import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface WrapButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const WrapButton = React.forwardRef<HTMLButtonElement, WrapButtonProps>(
  ({ children, variant = 'primary', size = 'md', className, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const button = buttonRef.current;
      const wrap = wrapRef.current;
      const text = textRef.current;

      if (!button || !wrap || !text) return;

      const handleMouseEnter = () => {
        gsap.to(wrap, {
          scaleX: 1.05,
          scaleY: 1.1,
          duration: 0.3,
          ease: 'power2.out'
        });
        
        gsap.to(text, {
          y: -2,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(wrap, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
        
        gsap.to(text, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(button, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeaveComplete = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      };

      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
      button.addEventListener('mouseleave', handleMouseLeaveComplete);
      button.addEventListener('mousemove', handleMouseMove);

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
        button.removeEventListener('mouseleave', handleMouseLeaveComplete);
        button.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);

    const sizeClasses = {
      sm: 'px-6 py-3 text-sm',
      md: 'px-8 py-4 text-base',
      lg: 'px-10 py-5 text-lg'
    };

    const variantClasses = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border'
    };

    return (
      <button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(
          'relative overflow-hidden rounded-xl font-medium transition-all duration-300 cursor-pointer',
          'transform-gpu will-change-transform',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <div
          ref={wrapRef}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
        />
        <span
          ref={textRef}
          className="relative z-10 font-display tracking-wide"
        >
          {children}
        </span>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-white/20 transform scale-0 rounded-full transition-transform duration-500 group-active:scale-150" />
        </div>
      </button>
    );
  }
);

WrapButton.displayName = 'WrapButton';