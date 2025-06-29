// Import a solid icon (circle-dot) from FontAwesome
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";

// Import FontAwesomeIcon component to render the icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import motion from framer-motion to animate components
import { motion } from "framer-motion";

// Import styled-components for writing CSS-in-JS
import styled from "styled-components";

// Create a styled <span> component that supports motion animations
const Span = styled(motion.span)`
  margin: auto; // Center the loader horizontally
`;

/*
This functional component `Loader` displays an animated loading indicator.
- Uses FontAwesome's dot icon to represent the loader visually
- Uses framer-motion's `animate` prop to create a vertical bounce animation
- The animation moves the icon up and down repeatedly (infinity loop)
*/
const Loader = () => {
  return (
    <Span
      // Define vertical bounce animation using translateY
      animate={{ translateY: [0, -20, 0, -10, 0] }}
      transition={{ 
        ease: "easeInOut",    // Smooth easing for natural motion
        duration: 1,          // Total duration of one cycle
        repeat: Infinity      // Infinite animation loop
      }}
    >
      {/* Render the circle-dot icon */}
      <FontAwesomeIcon icon={faCircleDot} />
    </Span>
  );
};

export default Loader;
