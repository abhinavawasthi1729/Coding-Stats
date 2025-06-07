import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import styled from "styled-components";
const Span = styled(motion.span)`
  margin: auto;
`;

/*This code defines a styled loader component using styled-components and 
framer-motion library. The loader consists of a spinning animation using 
translateY property and FontAwesomeIcon for the dot icon.
*/
const Loader = () => {
  return (
    <Span
      animate={{ translateY: [0, -20, 0, -10, 0] }}
      transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
    >
      <FontAwesomeIcon icon={faCircleDot} />
    </Span>
  );
};

export default Loader;
