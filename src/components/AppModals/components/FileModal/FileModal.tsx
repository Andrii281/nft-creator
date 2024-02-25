import { ChangeEvent, MouseEventHandler, useId } from 'react';
import styled, { keyframes } from 'styled-components';

import { useDragOver, useEventListener } from '@hooks';

import { fileToImage, generateId, getFileName, readAndConvertFiles } from '@utils';

import DropImage from '@assets/UploadImage.svg';

import { DragDropFile } from '@lib/DragDropFile';
import { GrClose } from 'react-icons/gr';

import { layerStore, modalStore } from '@store';

interface FileModalProps {
  layerId: string;
}

export const FileModal = ({ layerId }: FileModalProps) => {
  const inputId = useId();
  const [isDragOver, setIsDragOver] = useDragOver(false);

  useEventListener('keydown', (event) => {
    if (event.key === 'Escape') handleCloseModal();
  });

  const handleCloseModal = () => {
    modalStore.setFileModalVisibility(null);
  };

  const handeModalClick: MouseEventHandler = (event) => {
    event.stopPropagation();
  };

  const onDrop = (files: File[]) => {
    handleAddFragments(files);
  };

  const handleInputChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
    const files = [...target.files];

    handleAddFragments(files);
    handleCloseModal();
  };

  const handleAddFragments = (files: File[]) => {
    readAndConvertFiles(files, fileToImage, (image, file) => {
      if (image == null) return;

      const name = getFileName(file);
      const id = generateId();

      const fragment = { id, name, image };

      layerStore.addLayerFragment(layerId, fragment);
    });
  };

  const dragTextItem = (
    <TextContainer>
      {isDragOver ? (
        <p>Drop like it is hot</p>
      ) : (
        <>
          <Input onChange={handleInputChange} id={inputId} type='file' accept='image/*' multiple />
            <p>You can drop your images here.</p>
          <InputLabel htmlFor={inputId}>Upload from computer.</InputLabel>
        </>
      )}
    </TextContainer>
  );

  return (
    <ModalScreen onMouseDown={handleCloseModal} role='dialog'>
      <ModalContainer onMouseDown={handeModalClick}>
        <IconContainer>
          <GrClose onClick={handleCloseModal} />
        </IconContainer>
        <DragDropFile onDrop={onDrop} onDragOver={setIsDragOver}>
          <DropContainer $isDragOver={isDragOver}>
            <DropImageItem src={DropImage} $isDragOver={isDragOver} draggable={false} />
            {dragTextItem}
          </DropContainer>
        </DragDropFile>
        <ControlsContainer>
          <ConfirmButton onClick={handleCloseModal}>Proceed</ConfirmButton>
        </ControlsContainer>
      </ModalContainer>
    </ModalScreen>
  );
};

const fadeInAnimation = keyframes`
  0% {
    opacity: 0.25;
  }

  50% {
    opacity: 0.7;
  }

  100% {
    opacity: 1;
  }
`;

const ModalScreen = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(235, 255, 255, 0.75);
  padding: 1em 2em;
  display: grid;
  place-items: center;

  animation: ${fadeInAnimation} 0.25s linear;
`;

const appearAnimation = keyframes`
  0% {
    opacity: 0.25;
    transform: scale(0.925);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95);
  }
  75% {
    opacity: 0.75;
    transform: scale(0.97);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const ModalContainer = styled.section`
  position: relative;
  width: 100%;
  max-width: 550px;
  background: #fff;

  padding: 3em 2em;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.35);
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  gap: 1em;

  animation: ${appearAnimation} 0.25s linear forwards;
`;

const DropContainer = styled.div<{ $isDragOver: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2.5em;

  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  padding: 3em 2em;
  align-items: center;
  justify-content: center;

  border-color: ${({ $isDragOver }) => ($isDragOver ? '#0d5cf5' : '#d9d9d9')};
`;

const DropImageItem = styled.img<{ $isDragOver: boolean }>`
  width: 100px;
  height: 100px;
  object-fit: contain;
  filter: ${({ $isDragOver }) =>
    $isDragOver ? 'invert(75%) sepia(100%) saturate(1200%) hue-rotate(214deg)' : 'none'};

  /* Add a transparent border or outline when dragging over */
  border: ${({ $isDragOver }) => ($isDragOver ? '2px solid transparent' : 'none')};
  /* or */
  outline: ${({ $isDragOver }) => ($isDragOver ? '2px solid transparent' : 'none')};
`;

const InputLabel = styled.label`
  cursor: pointer;
  font-size: 0.8em;
  color: #0d5cf5;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  align-items: center;
`;

const Input = styled.input`
  display: none;
`;

const IconContainer = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConfirmButton = styled.button`
  padding: 1em 2em;
  background: #1e8aa1;
  color: #fff;
  border-radius: 5px;
`;
