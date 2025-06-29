// Import styled-components for creating styled React components with CSS-in-JS
import styled from "styled-components";

/*
This styled component creates a responsive container (`MainCenter`) that:
- Centers its children both vertically and horizontally using flexbox
- Uses a background gradient from the theme
- Has a maximum width of 1400px, rounded corners, and internal padding
- Adjusts layout for smaller screens via media queries
- Also applies custom styles to any <button> inside the container
*/

const Container = styled.div`
  background: ${(props) => props.theme.body}; // Fallback background from theme
  height: calc(100vh - 50px); // Take full viewport height minus header space
  // width: calc(100vw - 80px); // Optional: commented full-width layout
  color: ${(props) => props.theme.text}; // Text color from theme
  overflow: hidden; // Prevent scrollbars
  display: flex; // Enable flexbox layout
  flex-direction: column; // Stack children vertically
  align-items: center; // Horizontally center children
  justify-content: center; // Vertically center children

  // Override background with gradient from theme
  background: ${(props) => props.theme.backgroundGradient};

  width: 100%; // Full width
  max-width: 1400px; // Constrain max width for large screens
  box-sizing: border-box; // Include padding in total width/height
  padding: 40px; // Add spacing inside the container
  border-radius: 30px; // Rounded corners for visual appeal

  // Style for any <button> inside this container
  button {
    padding: 14px 0px; // Top & bottom spacing
    border: 1px solid ${(props) => props.theme.accent}; // Border with theme accent
    border-radius: 5px; // Rounded corners
    width: 200px; // Fixed button width
    text-align: center; // Center text
    text-decoration: none;
    font-size: small;
    transition: all 0.25s ease; // Smooth hover transitions
    overflow: hidden;
    cursor: pointer;
    color: ${(props) => props.theme.text}; // Text color
    background-color: transparent; // No background by default

    // Hover effects
    &:hover {
      letter-spacing: 1.2px; // Animate spacing for text
      color: ${(props) => props.theme.accent}; // Accent color on hover
      border: 1px solid ${(props) => props.theme.text}; // Invert border
    }

    // Responsive style for small screens
    @media screen and (max-width: 1000px) {
      margin: 0;
    }
  }
`;

// Functional component that renders children inside the styled container
const MainCenter = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default MainCenter;
