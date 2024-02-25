import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ROUTES } from '@router';

export const Header = () => {
  return (
    <StyledHeader>
      <StyledLink to={ROUTES.INDEX}>logo</StyledLink>
      <div>menu</div>
      <StyledLink to={ROUTES.LAYERS}>Go to layers page</StyledLink>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  height: var(--headerHeight);
  padding: 1.25em 2em;
  border-bottom: 1px solid var(--gray-300);
  display: flex;
  align-items: center;
  gap: 20px;
`;


const StyledLink = styled(Link)`
  color: crimson;
  font-size: 24px;
`;