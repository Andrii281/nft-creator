import { CanvasElement } from '@common/types';
import { useEffect, useRef } from 'react';
import { useCanvas } from '@context';
import styled from 'styled-components';

export const Canvas = ({ ...props }: CanvasElement) => {
  const canvasRef = useRef(null);

  const { init } = useCanvas();

  useEffect(() => {
    if (canvasRef.current) init(canvasRef.current);
  }, []);

  return (
    <CanvasContainer>
      <canvas ref={canvasRef} {...props}></canvas>
    </CanvasContainer>
  );
};

const CanvasContainer = styled.div`
  width: fit-content;
  background: #fff;
  border: 1px solid #000;
`;
