import styled from "styled-components"
import { ILayer } from "@models"
import { useBooleanToggle } from "@hooks"
import { modalStore } from "@store"

type LayerProps = ILayer

export const Layer = ({name, activeFragmentId, fragments, id} : LayerProps) => {
    const [isShowFragments, toggleShowFragments] = useBooleanToggle(true);

    const handleOpenModal = () => {
        modalStore.setFileModalVisibility(id);
    }



    const fragmentItems = isShowFragments ? fragments.map((fragment, index) => {
        return(
            <FragmentWrapper>
                <ImageWrapper>
                    <Img src = {fragment.image.src} alt = ' '></Img>
                </ImageWrapper>
                <NameContainer>
                    <FragmentName>{fragment.name}</FragmentName>
                </NameContainer>
            </FragmentWrapper>
        )   
    })
    : null
    
        return (
        <Wrapper>
            <LayerConainer>
                {name}
                <Options>
                    <Button onClick={handleOpenModal}>add</Button>
                </Options>
            </LayerConainer>
            <Items>
                {fragmentItems}
            </Items>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    width: 100%;
    min-height: 3rem;
    background-color: #FF0000;
    margin: 1rem 0 0 0;
    align-items: center;
    // padding: 0 0 0 .5rem;
`

const LayerConainer = styled.div`
    width: 100%;
    height: 3rem;
    background-color: #FF00FF;
    display: flex;
    align-items: center;
`

const Options = styled.div`

`

const Button = styled.button`
    padding: 0.3125rem 0.625rem 0.3125rem 0.625rem;
`
const Items = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, auto));
    grid-gap: 0.5rem;
`

const FragmentWrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    
`
const NameContainer = styled.div`
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
`

const FragmentName = styled.p`
    overflow: hidden;   
    text-overflow: ellipsis;
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
  overflow: hidden;
`;

const Img = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;
