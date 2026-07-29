import React, { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export default function CountUp({ to, duration = 2, className = '' }) {
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useSpring(count, { duration: duration * 1000, bounce: 0 });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      count.set(parseInt(to, 10) || 0);
    }
  }, [isInView, hasStarted, to, count]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      setDisplayValue(Math.floor(latest).toString());
    });
  }, [rounded]);

  return <span ref={ref} className={className}>{displayValue}</span>;
}
