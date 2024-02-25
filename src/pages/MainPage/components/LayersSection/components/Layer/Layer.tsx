import styled from 'styled-components';
import { Fragment } from '../Fragment';
import { ILayer } from '@models';
import { useBooleanToggle } from '@hooks';
import { layerStore, modalStore } from '@store';
import { Draggable, Droppable } from '@lib/DragDrop';
import { DraggableItems } from '@common/constants';

type LayerProps = ILayer;

export const Layer = ({ name, activeFragmentId, fragments, id }: LayerProps) => {
  const [isShowFragments, toggleShowFragments] = useBooleanToggle(true);
  const handleActiveFragmentChange = (fragmentId: string | null) => {
    layerStore.setActiveFragment(id, fragmentId);
  };

  const handleOpenModal = () => {
    modalStore.setFileModalVisibility(id);
  };

  const fragmentItems = isShowFragments
    ? fragments.map((fragment, index) => (
        <Draggable
          draggableId={fragment.id}
          index={index}
          key={fragment.id}
          type={DraggableItems.FRAGMENT}
          containerId={id}
        >
          {({ isDragging, isDraggingOver }) => (
            <Fragment
              {...fragment}
              isActive={fragment.id === activeFragmentId}
              setActive={handleActiveFragmentChange}
              key={fragment.id}
              isDragging={isDragging}
              isDraggingOver={isDraggingOver}
            />
          )}
        </Draggable>
      ))
    : null;

  return (
    <Droppable droppableId={id} type={DraggableItems.LAYER}>
      <LayerContainer>
        <Header>
          <Name>{name}</Name>
          <Options>
            <Button onClick={handleOpenModal}>Add</Button>
            <Button
              onClick={() => {
                toggleShowFragments();
              }}
            >
              {isShowFragments ? 'Hide' : 'Show'}
            </Button>
          </Options>
        </Header>
        <FragmentsContainer>{fragmentItems}</FragmentsContainer>
      </LayerContainer>
    </Droppable>
  );
};

const LayerContainer = styled.section``;

const Header = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  background-color: #bbc6c8;
  margin: 0 0 10px 0;
  padding: 20px;
`;

const Name = styled.h2`
  margin: 0 10px 0 0;
`;
const Options = styled.div`
  display: flex;
  align-items: center;
  width: min-content;
  height: 100%;

  > * {
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
`;

const FragmentsContainer = styled.div`
  background: #fff;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
`;
