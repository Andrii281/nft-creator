import { Canvas } from '@components';
import { useCanvas } from '@context/CanvasContext';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { layerStore } from '@store';
import { observer } from 'mobx-react-lite';

export const PreviewSection = observer(() => {
  const { controller } = useCanvas();
  const [src, setSrc] = useState('')
  useEffect(() => {
    controller.clearCanvas();
    
    layerStore.layers.forEach((layer) => {
      const activeFragment = layer.fragments.find(
        (fragment) => fragment.id === layer.activeFragmentId,
      );

      if (activeFragment) {
        controller.drawImage(activeFragment.image, 512, 512);
        setSrc(controller.setNewDimention(activeFragment.image))
        console.log(src)
      }
    });
  }, [layerStore.layers]);

  return (
    <PreviewSectionStyled>
      <Canvas width={512} height={512} />
      <img src={src}/>
    </PreviewSectionStyled>
  );
});

const PreviewSectionStyled = styled.section`
  display: grid;
  place-content: center;
  background-image: linear-gradient(to right, var(--gray-300) 0.5px, transparent 0.75px),
    linear-gradient(to bottom, var(--gray-300) 0.5px, transparent 0.75px);
  background-size: 35px 35px;
`;
