import React, { useEffect, useRef, useState } from 'react';
import * as dat from 'dat.gui';
import "./WaveLine.css"

type WaveProps = {
  maxAmplitude?: number;
  length?: number;
  frequency?: number;
  bgOpacity?: number;
  y?: number;
};

const Wave: React.FC<WaveProps> = ({
  maxAmplitude = 50,
  length = 100,
  frequency = 8,
  bgOpacity = 0.03,
  y = window.innerHeight / 2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gui = useRef<dat.GUI>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let amplitude = 0;
    let increment = Math.random() * 360;

    const draw = () => {
      ctx.beginPath();

      ctx.fillStyle = `rgba(0,0,0,${bgOpacity})`;
      ctx.strokeStyle = `hsl(${increment * 20}, 80%, 70%)`;

      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.moveTo(0, canvas.height / 2);

      for (let i = 0; i < canvas.width; i += 1) {
        ctx.lineTo(
          i,
          y + Math.sin(i / length + increment) * amplitude,
        );
      }

      ctx.stroke();
      ctx.closePath();

      amplitude = Math.sin(increment) * maxAmplitude;
      increment -= frequency / 1000;

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
    //   guiInstance.destroy();
    };
  }, [bgOpacity, frequency, length, maxAmplitude, y]);

  return <canvas className='canvas' ref={canvasRef} />;
};

export default Wave;
