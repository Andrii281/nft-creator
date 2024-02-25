import styled from 'styled-components';
import { CanvasProvider } from '@context';
import { SideControls, PreviewSection, LayersSection } from './components';

export const MainPage = () => {
  return (
    <CanvasProvider>
      <MainPageStyled>
        <SideControls />
        <PreviewSection />
        <LayersSection />
      </MainPageStyled>
    </CanvasProvider>
  );
};

const MainPageStyled = styled.main`
  height: calc(100vh - var(--headerHeight));
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
`;
