import { DragEventHandler, ReactNode, useRef } from 'react';
import { useDrag } from '@lib/DragDrop/hooks';
import { IDraggableItems } from '@common/constants';

interface Provided {
  isDragging: boolean;
  isDraggingOver: boolean;
}

interface DraggableProps {
  children: ReactNode | ((provided: Provided) => ReactNode | JSX.Element | JSX.Element[]);
  draggableId: string;
  containerId: string;
  type: IDraggableItems;
  index: number;
  onDragStart?: () => void;
}

export const Draggable = ({
  children,
  draggableId,
  containerId,
  type,
  index,
}: DraggableProps): JSX.Element => {
  const { isDragging, isDraggingOver, ...draggableProps } = useDrag(
    draggableId,
    containerId,
    index,
    type,
  );

  if (children instanceof Function) {
    return <div {...draggableProps}>{children({ isDragging, isDraggingOver })}</div>;
  }

  return <div {...draggableProps}>{children}</div>;
};
