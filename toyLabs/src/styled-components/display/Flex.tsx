import styled from "styled-components";

interface Props {
  direction?: string;
  width?: string;
  height?: string;
  backgroundcolor?: string;
  jc?: string;
  ai?: string;
  wrap?: string;
  ac?: string;
}

const Flex = styled.div<Props>`
  display: flex;
  width: ${(props) => (props.width ? props.width : "100%")};
  background-color: ${(props) =>
    props.backgroundcolor ? props.backgroundcolor : "white"};
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  justify-content: ${(props) => (props.jc ? props.jc : "")};
`;

export default Flex;
