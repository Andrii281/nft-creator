export interface DragOverContainerData {
  containerId: string | null;
}

interface CurrentEvent {
  data: DragOverContainerData;
}

const eventName = 'drag-over-container';
const dragOverContainerEvent = new CustomEvent<CurrentEvent>(eventName, {
  detail: { data: { containerId: null } },
});

export type DragOverContainerEvent = typeof dragOverContainerEvent;

export const publish = (data: DragOverContainerData) => {
  dragOverContainerEvent.detail.data = data;

  window.dispatchEvent(dragOverContainerEvent);
};

export const subscribe = (callback: (data: DragOverContainerEvent) => void) => {
  // @ts-ignore
  window.addEventListener(eventName, callback);
};

export const unsubscribe = (callback: (data: DragOverContainerEvent) => void) => {
  // @ts-ignore
  window.removeEventListener<DragOverContainerEvent>(eventName, callback);
};


