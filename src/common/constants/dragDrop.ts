export const DraggableItems = {
  MAIN_CONTAINER: 'MAIN_CONTAINER',
  LAYER: 'LAYER',
  FRAGMENT: 'FRAGMENT',
} as const;

export type IDraggableItems = keyof typeof  DraggableItems;

export const draggableSchema = {
  [DraggableItems.MAIN_CONTAINER]: DraggableItems.LAYER,
  [DraggableItems.LAYER]: DraggableItems.FRAGMENT,
};
