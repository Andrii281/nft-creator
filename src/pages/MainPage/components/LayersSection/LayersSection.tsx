import { Layer } from './components/Layer';
import styled from 'styled-components';
import {DragDropProvider, Draggable, Drop, Droppable} from '@lib/DragDrop';
import { layerStore } from '@store';
import { observer } from 'mobx-react-lite';
import { DraggableItems, draggableSchema } from '@common/constants';

const MAIN_CONTAINER_ID = 'main-container';

export const LayersSection = observer(() => {
  console.log(layerStore.layers)
  const layerItems = layerStore.layers.map((layer, index) => (
    <Draggable
      draggableId={layer.id}
      index={index}
      key={layer.id}
      containerId={MAIN_CONTAINER_ID}
      type={DraggableItems.LAYER}
    >
      <Layer {...layer} />
    </Draggable>
  ));

  const onDrop = (event: Drop) => {
    layerStore.change(event);
  }

  return (
    <DragDropProvider dragSchema={draggableSchema} onDrop={onDrop}>
      <Wrapper>
        <Droppable droppableId={MAIN_CONTAINER_ID} type={DraggableItems.MAIN_CONTAINER}>
          {layerItems}
        </Droppable>
      </Wrapper>
    </DragDropProvider>
  );
});

const Wrapper = styled.section`
  padding: 10px;
  width: 500px;
  height: 500px;
  background-color: blue;
  overflow-y: scroll;
`;
