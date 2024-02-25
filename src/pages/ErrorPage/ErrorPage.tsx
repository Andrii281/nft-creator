import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ROUTES } from '@router';

export const ErrorPage = () => {
  return (
    <PageContainer>
      <ContentContainer>
        <ImageContainer>
          <Image src='https://www.acarnet.com/assets/images/acarnet-404.gif' alt='Error page' />
        </ImageContainer>
        <Text>Something went wrong</Text>
        <ControlsContainer>
          <Button to={ROUTES.INDEX}>Go back</Button>
        </ControlsContainer>
      </ContentContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 2em;

  min-height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25em;
`;

const ImageContainer = styled.div``;

const Image = styled.img``;

const Text = styled.p`
  text-align: center;
  font-size: 18px;
`;

const ControlsContainer = styled.div`
  text-align: center;
`;

const Button = styled(Link)`
  padding: .75em 2em;
  background: #2070be;
  border-radius: 10px;
  color: #fff;

  &:visited {
    color: #fff;
  }

  &:hover {
    background: #2e85da;
  }
`;
