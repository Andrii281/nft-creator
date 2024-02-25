import { DragEventHandler, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { IDraggableItems } from '@common/constants';
import { useDrop } from '@lib/DragDrop/hooks/useDrop';

interface Provided {
  isDraggingOver: boolean;
}

interface DroppableProps {
  children: ReactNode | ((provided: Provided) => JSX.Element | JSX.Element[] | ReactNode);
  droppableId: string;
  type: IDraggableItems;
}

export const Droppable = ({ children, droppableId, type }: DroppableProps): JSX.Element => {
  const { isDraggingOver, ...props } = useDrop(droppableId, type);

  if (children instanceof Function) {
    return <>{children({ isDraggingOver, ...props })}</>;
  }

  return <StyledContainer {...props}>{children}</StyledContainer>;
};

const StyledContainer = styled.div`
  min-height: 100%;
`;
