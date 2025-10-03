import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ImageVerticalCarouselProps {
  className?: string;
}

export const ImageVerticalCarousel: React.FC<ImageVerticalCarouselProps> = ({ className }) => {
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  // PNG images from the public folder
  const images = [
    '/ai.png',
    '/cloud.png',
    '/cyber.png',
    '/data.png',
    '/desktop.png',
    '/ecom.png',
    '/erp.png',
    '/exam.png',
    '/itconsulting.png',
    '/mobiledev.png',
  ];

  // Split images into two columns
  const column1Images = images.slice(0, Math.ceil(images.length / 2));
  const column2Images = images.slice(Math.ceil(images.length / 2));

  // Duplicate arrays for seamless scrolling
  const duplicatedColumn1 = [...column1Images, ...column1Images];
  const duplicatedColumn2 = [...column2Images, ...column2Images];

  return (
    <div className={`relative h-screen overflow-hidden ${className}`}>
      
      {/* Left column - scrolling down */}
      <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
        <motion.div
          ref={scrollRef1}
          className="flex flex-col gap-8 h-full"
          animate={{
            y: [0, -50 * column1Images.length + '%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {duplicatedColumn1.map((image, index) => (
            <div
              key={`col1-${index}`}
              className="flex-shrink-0 h-80 md:h-96 lg:h-[28rem] relative overflow-hidden rounded-lg shadow-lg"
              style={{ width: '240px' }}
            >
              <img
                src={image}
                alt={`Service ${index + 1}`}
                className="h-full object-cover transition-transform duration-300 hover:scale-105"
                style={{ width: '240px', objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right column - scrolling up */}
      <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
        <motion.div
          ref={scrollRef2}
          className="flex flex-col gap-8 h-full"
          animate={{
            y: [-50 * column2Images.length + '%', 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {duplicatedColumn2.map((image, index) => (
            <div
              key={`col2-${index}`}
              className="flex-shrink-0 h-80 md:h-96 lg:h-[28rem] relative overflow-hidden rounded-lg shadow-lg ml-4"
              style={{ width: '240px' }}
            >
              <img
                src={image}
                alt={`Service ${index + 1}`}
                className="h-full object-cover transition-transform duration-300 hover:scale-105"
                style={{ width: '240px', objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile version - horizontal scrolling */}
      <div className="md:hidden absolute inset-0">
        {/* Top row - scrolling right */}
        <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden">
          <motion.div
            className="flex gap-4 h-full items-center"
            animate={{
              x: [0, -50 * column1Images.length + '%']
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {duplicatedColumn1.map((image, index) => (
              <div
                key={`mobile-col1-${index}`}
                className="flex-shrink-0 w-32 h-24 relative overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src={image}
                  alt={`Service ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom row - scrolling left */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden">
          <motion.div
            className="flex gap-4 h-full items-center"
            animate={{
              x: [-50 * column2Images.length + '%', 0]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {duplicatedColumn2.map((image, index) => (
              <div
                key={`mobile-col2-${index}`}
                className="flex-shrink-0 w-32 h-24 relative overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src={image}
                  alt={`Service ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>


    </div>
  );
};