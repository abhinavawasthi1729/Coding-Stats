import styled from "styled-components";
/*This code defines a styled container component using styled-components. 
The container has a background gradient, sets the height to fill the viewport 
minus 80px, limits the maximum width to 1400px, and applies padding and margin.
 It also adjusts padding for smaller screens using a media query. The Main component renders 
 its children inside this container.
*/
const Container = styled.div`
  background: ${(props) => props.theme.backgroundGradient};
  height: calc(100vh - 80px);
  /* //width: calc(100vw - 80px); */
  width: 100%;
  max-width: 1400px;
  color: ${(props) => props.theme.text};
  overflow: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 40px;
  //padding-top: 200px;
  border-radius: 30px;
  margin: 20px;


  @media screen and (max-width: 768px){
    padding: 0;
  }

`;

const Main = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default Main;
