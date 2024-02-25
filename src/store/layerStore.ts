import { makeAutoObservable } from 'mobx';
import { IFragment, ILayer } from '@models';
import { generateId } from '@utils';
import { DraggableItems, draggableSchema } from '@common/constants';
import { Drop } from '@lib/DragDrop';

class LayerStore {
  layers: ILayer[] = [
    {
      name: 'First',
      fragments: [],
      activeFragmentId: null,
      // id: generateId(),
      id: 'first-container',
    },
    {
      name: 'Second',
      fragments: [],
      activeFragmentId: null,
      // id: generateId(),
      id: 'second-container',
    },
    {
      name: 'Third',
      fragments: [],
      activeFragmentId: null,
      id: 'third-container',
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addLayerFragment(layerId: string, fragment: IFragment) {
    this.layers = this.layers.map((layer) =>
      layer.id === layerId ? { ...layer, fragments: [...layer.fragments, fragment] } : layer,
    );
  }

  change({
    dropBeforeIndex,
    draggableIndex,
    draggableId,
    containerId,
    containerType,
    previousContainerId,
  }: Drop) {
    const actualDropBeforeIndex =
      dropBeforeIndex === null
        ? null
        : dropBeforeIndex - (draggableIndex < dropBeforeIndex ? 1 : 0);

    switch (containerType) {
      case DraggableItems.MAIN_CONTAINER: {
        if (actualDropBeforeIndex === null) {
          const [item] = this.layers.splice(draggableIndex, 1);

          this.layers.push(item);

          return;
        }

        const [item] = this.layers.splice(draggableIndex, 1);
        this.layers.splice(actualDropBeforeIndex, 0, item);

        break;
      }

      case DraggableItems.LAYER: {
        if (previousContainerId === containerId) {
          this.layers = this.layers.map((layer) => {
            if (layer.id !== previousContainerId) return layer;

            const [item] = layer.fragments.splice(draggableIndex, 1);

            if (actualDropBeforeIndex === null) {
              layer.fragments.push(item);

              return layer;
            }

            layer.fragments.splice(actualDropBeforeIndex, 0, item);

            return layer;
          });

          return;
        }

        const previousLayer = this.layers.find((layer) => layer.id === previousContainerId);

        if (!previousLayer) return;

        const [item] = previousLayer.fragments.splice(draggableIndex, 1);

        this.layers = this.layers.map((layer) => {
          if (layer.id !== containerId) return layer;

          if (actualDropBeforeIndex === null) {
            layer.fragments.push(item);

            return layer;
          }

          layer.fragments.splice(actualDropBeforeIndex, 0, item);
          return layer;
        });

        break;
      }
    }
  }

  setActiveFragment(layerId: string, fragmentId: string | null) {
    this.layers = this.layers.map((layer) =>
      layer.id === layerId ? { ...layer, activeFragmentId: fragmentId } : layer,
    );
  }

  delete() {
    this.layers = this.layers.map((layer) =>
      layer.name === 'Third' ? { ...layer, fragments: [] } : layer,
    );
  }
}

export const layerStore = new LayerStore();
