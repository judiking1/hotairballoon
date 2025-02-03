'use client';

import { useState } from 'react';
import { Experience } from './components/Experience';
import Header from './components/Header';

export default function IndexPage() {
  const [isNight, setIsNight] = useState(false);

  const toggleDayNight = () => {
    setIsNight((prev) => !prev);
  };
  return (
    <div>
      <Header toggleDayNight={toggleDayNight} isNight={isNight}/>
      <Experience isNight={isNight}/>
    </div>
  );
}
