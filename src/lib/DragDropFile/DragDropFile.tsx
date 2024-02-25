import { ReactNode, DragEventHandler } from 'react';
import styled from 'styled-components';

interface IDragDropFile {
  children: ReactNode;
  onDrop: (items: File[]) => void;
  onDragOver?: (isDragOver: boolean) => void;
}

export const DragDropFile = ({
  children,
  onDrop,
  onDragOver = () => {
    return;
  },
}: IDragDropFile) => {
  const handleDragOver: DragEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onDragOver(true);
  };

  const handleDragLeave: DragEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onDragOver(false);
  };

  const handleDrop: DragEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onDragOver(false);
    if (event.dataTransfer.files.length) {
      onDrop([...event.dataTransfer.files] as File[]);
    }
  };

  return (
    <DragDropWrapper
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </DragDropWrapper>
  );
};

const DragDropWrapper = styled.div``;
