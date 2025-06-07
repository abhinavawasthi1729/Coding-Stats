import styled from "styled-components";
/*This styled component creates a container (MainCenter) that
 centers its children both horizontally and vertically within the viewport. 
 It has a background gradient, a maximum width of 1400px, and padding around
  its content. The container adjusts its padding for smaller screens using a
   media query. Additionally, it styles buttons within the container with a hover effect.

*/

const Container = styled.div`
  background: ${(props) => props.theme.body};
  height: calc(100vh - 50px);
  //width: calc(100vw - 80px);
  color: ${(props) => props.theme.text};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //padding-top: 200px;

  background: ${(props) => props.theme.backgroundGradient};
  //height: calc(100vh - 80px);
  //width: calc(100vw - 80px);
  width: 100%;
  max-width: 1400px;
  color: ${(props) => props.theme.text};
  //overflow: hidden;
  //overflow-y: scroll;
  box-sizing: border-box;
  padding: 40px;
  //padding-top: 200px;
  border-radius: 30px;

  button {
    padding: 14px 0px;
    border: 1px solid ${(props) => props.theme.accent};
    border-radius: 5px;
    width: 200px;
    text-align: center;
    text-decoration: none;
    font-size: small;
    transition: all 0.25s ease;
    overflow: hidden;
    cursor: pointer;
    color: ${(props) => props.theme.text};
    background-color: transparent;

    &:hover {
      letter-spacing: 1.2px;
      color: ${(props) => props.theme.accent};
      border: 1px solid ${(props) => props.theme.text};
    }

    @media screen and (max-width: 1000px) {
      margin: 0;
    }
  }
`;

const MainCenter = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default MainCenter;
