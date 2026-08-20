import React from 'react';
import { motion } from 'motion/react';

export function RevealOnScroll({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  duration = 0.5,
  staggerChildren = false,
  viewportMargin = "-40px"
}) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 28, x: 0 };
      case 'down': return { y: -28, x: 0 };
      case 'left': return { x: 28, y: 0 };
      case 'right': return { x: -28, y: 0 };
      case 'none': return { x: 0, y: 0 };
      default: return { y: 28, x: 0 };
    }
  };

  const initialPos = getInitialPosition();

  if (staggerChildren) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: viewportMargin }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: delay,
            }
          }
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...initialPos }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className = '', direction = 'up' }) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 20, x: 0 };
      case 'down': return { y: -20, x: 0 };
      case 'left': return { x: 20, y: 0 };
      case 'right': return { x: -20, y: 0 };
      default: return { y: 20, x: 0 };
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...getInitialPosition() },
        visible: { 
          opacity: 1, 
          x: 0, 
          y: 0, 
          transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] } 
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
