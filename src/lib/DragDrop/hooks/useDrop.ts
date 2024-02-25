import { IDraggableItems } from '@common/constants';
import { useDragDrop } from '@lib/DragDrop';
import { DragEventHandler, useEffect, useLayoutEffect, useRef } from 'react';

export const useDrop = (droppableId: string, type: IDraggableItems) => {
  const { dragOverContainer, handleDraggingOverEvent, handleDrop } = useDragDrop();
  const ref = useRef<any>();

  const onDrop: DragEventHandler = (event) => {
    handleDrop(event, { droppableId, type });
  };

  // useLayoutEffect(() => {
  //   createDroppableContainer(droppableId);
  // }, []);

  const onDragOver: DragEventHandler = (event) => {
    handleDraggingOverEvent(event, { id: droppableId, type });
  };

  const onDragLeave: DragEventHandler = (event) => {
    handleDraggingOverEvent(event, null);
  };

  const isDraggingOver = dragOverContainer === droppableId;

  return { ref, onDrop, onDragLeave, isDraggingOver, onDragOver } as const;
};
