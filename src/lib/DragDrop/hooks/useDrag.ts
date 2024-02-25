import { DragEventHandler, useCallback, useLayoutEffect, useRef } from 'react';
import { useDragDrop } from '@lib/DragDrop';
import { IDraggableItems } from '@common/constants';
import { DragOverContainerEvent, subscribe, unsubscribe } from '../events';

export const useDrag = <T extends HTMLElement = HTMLElement>(
  draggableId: string,
  containerId: string,
  index: number,
  type: IDraggableItems,
) => {
  const { startDraggingEvent, activeDraggable, dragOverDraggable, gatherDraggable } = useDragDrop();
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    subscribe(handlePushDraggable);

    return () => {
      unsubscribe(handlePushDraggable);
    };
  }, [index, containerId]);

  const onDragStart: DragEventHandler = (event) => {
    event.stopPropagation();
    startDraggingEvent(event, { draggableId, index, ref, type, containerId });
  };

  const handlePushDraggable = useCallback(
    (event: DragOverContainerEvent) => {
      if (event.detail.data.containerId === containerId) {
        gatherDraggable({ ref, draggableId, index });
      }
    },
    [index, containerId],
  );

  const onDragEnd: DragEventHandler = (event) => {
    startDraggingEvent(event, null);
  };

  const isDragging = activeDraggable === draggableId;
  const isDraggingOver = dragOverDraggable === draggableId && activeDraggable !== draggableId;

  console.log(dragOverDraggable);

  return {
    ref,
    onDragStart,
    onDragEnd,
    isDragging,
    isDraggingOver,
    draggable: true,
  } as const;
};
