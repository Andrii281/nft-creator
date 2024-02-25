import styled from "styled-components";
import { Layer } from "./components/Later";
import { observer } from "mobx-react-lite";
import { layerStore } from "@store";

export const LayersPage = observer(() => {
  console.log('layerStore: ', layerStore.layers)
  const layerItems = layerStore.layers.map((layer, index) => (
      <Layer {...layer} key = {index}/>
  ));
  return (
    <LayersPageStyled>
      {layerItems}
      {/* <Layer/> */}
      <h2>Layers will be here yes</h2>
      <p>hello andrii</p>
    </LayersPageStyled>
  );
})

const LayersPageStyled = styled.main`
  margin: 2rem 0 0 0;
  padding: 0 1.5rem 0 1.5rem;
`;