import { createContext, DragEvent, ReactNode, RefObject, useContext, useRef } from 'react';
import { publish } from '@lib/DragDrop/events';
import { useDragThrottle } from '@lib/DragDrop/hooks';

type DragSchema = Record<string, string>;

interface DragDropProviderProps {
  children: ReactNode;
  dragSchema: DragSchema;
  onDrop: (event: Drop) => void;
}

interface DraggingEvent<T extends HTMLElement = HTMLElement> {
  draggableId: string;
  containerId: string;
  index: number;
  type: string;
  ref: RefObject<T>;
}

interface DraggingOver {
  id: string;
  type: string;
}

interface DraggingOverEvent {
  index: number | null;
  type: string;
  containerId: string;
}

interface DropEvent {
  droppableId: string;
  type: string;
}

export interface Drop {
  draggableIndex: number;
  draggableId: string;
  previousContainerId: string;
  dropBeforeIndex: number | null;
  containerId: string;
  containerType: string;
}

interface ContainerDraggable<T extends HTMLElement = HTMLElement> {
  draggableId: string;
  index: number;
  ref: RefObject<T>;
}

// type ScopeDraggables = Record<string, Omit<ContainerDraggable, 'draggableId'>>;
type ScopeDraggables = Record<string, ContainerDraggable>;

interface IDragDropContext<T extends HTMLElement = HTMLElement> {
  draggingEvent: DraggingEvent | null;
  startDraggingEvent: (listenerEvent: DragEvent, event: DraggingEvent | null) => void;
  draggingOverEvent: DraggingOverEvent | null;
  handleDraggingOverEvent: (listenerEvent: DragEvent, event: DraggingOver | null) => void;
  handleDrop: (listenerEvent: DragEvent, event: DropEvent) => void;
  gatherDraggable: (props: ContainerDraggable) => void;
  activeDraggable: string | number | null;
  dragOverDraggable: string | number | null;
  dragOverContainer: string | number | null;
  // addNewDraggable: (props: AddNewDraggable) => void;
}

const DragDropContext = createContext({} as IDragDropContext);

export const useDragDrop = () => {
  return useContext(DragDropContext);
};

const isEventDefined = <T,>(event: T | null): event is T => {
  return event !== null;
};

export const DragDropProvider = ({ children, dragSchema, onDrop }: DragDropProviderProps) => {
  const draggingEvent = useRef<DraggingEvent | null>(null);
  const draggingOverEvent = useRef<DraggingOverEvent | null>(null);
  const containerDraggables = useRef<ScopeDraggables>({});
  const [activeDraggable, setCurrentDraggable] = useDragThrottle(null);
  const [dragOverDraggable, setCurrentDragOverDraggable] = useDragThrottle(null);
  const [dragOverContainer, setCurrentDragOverContainer] = useDragThrottle(null);

  const startDraggingEvent = (listenerEvent: DragEvent, event: DraggingEvent | null) => {
    if (event === null) {
      containerDraggables.current = {};
    }

    draggingEvent.current = event;
    setCurrentDraggable(event && event.draggableId);
  };

  const handleDraggingOverEvent = (listenerEvent: DragEvent, event: DraggingOver | null) => {
    listenerEvent.preventDefault();

    if (!isEventDefined(draggingEvent.current)) return;
    if (!isEventDefined(event)) return;

    const isDragOverAllowed = dragSchema[event.type] === draggingEvent.current.type;

    if (!isDragOverAllowed) return;

    listenerEvent.stopPropagation();

    publish({ containerId: event.id });

    setCurrentDragOverContainer(event.id);

    const sortItems = Object.values(containerDraggables.current);

    const dropBefore = sortItems.reduce<{
      offset: number;
      draggableId: string | null;
      index: number | null;
    }>(
      (closest, { ref: { current }, index, draggableId }) => {
        const box = current?.getBoundingClientRect();

        if (!box) return closest;

        const offset = listenerEvent.clientY - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, draggableId, index };
        }

        return closest;
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        draggableId: null,
        index: null,
      },
    );

    setCurrentDragOverDraggable(dropBefore.draggableId);

    draggingOverEvent.current = {
      containerId: event.id,
      type: event.type,
      index: dropBefore.index,
    };
  };

  const gatherDraggable = ({ draggableId, ref, index }: ContainerDraggable) => {
    containerDraggables.current = {
      ...containerDraggables.current,
      [draggableId]: { ref, index, draggableId },
    };
  };

  const handleDrop = (listenerEvent: DragEvent, dropEvent: DropEvent) => {
    setCurrentDragOverDraggable(null);
    setCurrentDragOverContainer(null);
    setCurrentDraggable(null);

    if (!isEventDefined(draggingEvent.current)) return;
    if (!isEventDefined(draggingOverEvent.current)) return;
    if (!isEventDefined(dropEvent)) return;

    const isDropAllowed = dragSchema[dropEvent.type] === draggingEvent.current.type;

    if (!isDropAllowed) {
      return;
    }

    listenerEvent.stopPropagation();

    onDrop({
      containerId: dropEvent.droppableId,
      containerType: dropEvent.type,
      previousContainerId: draggingEvent.current.containerId,
      draggableId: draggingEvent.current.draggableId,
      dropBeforeIndex: draggingOverEvent.current.index,
      draggableIndex: draggingEvent.current.index,
    });
  };

  return (
    <DragDropContext.Provider
      value={{
        draggingEvent: draggingEvent.current,
        startDraggingEvent,
        handleDraggingOverEvent,
        draggingOverEvent: draggingOverEvent.current,
        gatherDraggable,
        handleDrop,
        activeDraggable,
        dragOverContainer,
        dragOverDraggable,
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
};
