// Import styled-components library to create styled React components
import styled from "styled-components";

/*
This code defines a styled container component using styled-components.

- The Container uses a background gradient from the theme.
- It sets the height to 100% of the viewport minus 80px (likely to account for a navbar/header).
- It limits the width to a maximum of 1400px, applies border radius, and adds spacing via padding and margin.
- It also enables vertical scrolling while hiding horizontal overflow.
- For smaller screens (max-width: 768px), it removes padding to maximize usable space.
- The Main component simply renders its children inside this styled Container.
*/

const Container = styled.div`
  background: ${(props) => props.theme.backgroundGradient}; // Themed background gradient
  height: calc(100vh - 80px); // Full height minus header/nav (80px)
  width: 100%;
  max-width: 1400px; // Limit width for readability on large screens
  color: ${(props) => props.theme.text}; // Themed text color
  overflow: hidden; // Prevent horizontal overflow
  overflow-y: scroll; // Enable vertical scroll if needed
  box-sizing: border-box; // Include padding/border in element size
  padding: 40px; // Standard internal spacing
  // padding-top: 200px; // Optional: vertical offset (currently commented out)
  border-radius: 30px; // Rounded corners for visual appeal
  margin: 20px; // External spacing around the container

  // Responsive styles for mobile/smaller devices
  @media screen and (max-width: 768px) {
    padding: 0; // Remove padding on small screens
  }
`;

// Main component wraps children in the styled Container
const Main = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default Main;
