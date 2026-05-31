import { useState, useEffect } from 'react';
import { FastAverageColor } from 'fast-average-color';

export function useAmbientColor(imageUrl: string | null | undefined) {
  const [color, setColor] = useState<string>('rgba(0,0,0,0)');

  useEffect(() => {
    if (!imageUrl) {
      setColor('rgba(0,0,0,0)');
      return;
    }

    const fac = new FastAverageColor();
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      try {
        const avgColor = fac.getColor(img);
        // We use a darker/more transparent version for ambient effect
        setColor(`rgba(${avgColor.value[0]}, ${avgColor.value[1]}, ${avgColor.value[2]}, 0.5)`);
      } catch (e) {
        setColor('rgba(0,0,0,0)');
      }
    };
    
    img.onerror = () => {
      setColor('rgba(0,0,0,0)');
    };

    img.src = imageUrl;

    return () => {
      fac.destroy();
    };
  }, [imageUrl]);

  return color;
}
