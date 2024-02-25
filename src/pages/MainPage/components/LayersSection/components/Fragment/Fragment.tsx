import styled from 'styled-components';
import { IFragment } from '@models';

interface IFragmentProps extends IFragment {
  isActive: boolean;
  setActive: (fragmentId: string | null) => void;
  isDragging: boolean;
  isDraggingOver: boolean;
}

export const Fragment = ({
  id,
  name,
  image,
  isActive,
  setActive,
  isDragging,
  isDraggingOver,
}: IFragmentProps) => {
  const handleFragmentActive = () => {
    if (isActive) {
      return setActive(null);
    }
    setActive(id);
  };

  return (
    <Wrapper $isDraggingOver={isDraggingOver} $isDragging={isDragging}>
      <Button onClick={handleFragmentActive}>{isActive ? 'isActive' : ''}</Button>
      <ImageWrapper>
        <Img src={image.src} alt = ' ' draggable={false} />
      </ImageWrapper>
      <NameContainer>
        <Name>{name}</Name>
      </NameContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $isDraggingOver: boolean; $isDragging: boolean }>`
  display: grid;
  grid-template-columns: 50px 50px 1fr;
  place-content: center;
  gap: 0.5em;

  height: 80px;
  max-width: 100%;
  padding: 1em 1.25em;
  background-color: #e5e3e4;
  margin: 0 0 10px 0;
  overflow: hidden;

  transition: border-top-color 0.25s ease, opacity 0.25s ease;

  opacity: ${({$isDragging}) => ($isDragging ? 0.25 : 1)};

  border-top: 3px solid ${({$isDraggingOver}) => ($isDraggingOver ? '#000' : 'transparent')};
`;
const Button = styled.button`
  background-color: #bbc6c8;
`;

const ImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: grid;
  place-content: center;
  overflow: hidden;
`;

const Img = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const NameContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  max-width: 100%;
`;

const Name = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
