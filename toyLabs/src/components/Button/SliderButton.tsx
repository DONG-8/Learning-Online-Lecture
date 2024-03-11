import React from "react";
import styled from "styled-components";

const Button = styled.span`
  min-width: fit-content;
  width: max-content;
  padding: 4px 10px;
  margin: 5px;
  height: 24px;
  background-color: white;
  border-color: green;
  white-space: nowrap;
`;

interface Props {
  text: string;
  key?: number;
}

export default function SliderButton({ text, key }: Props) {
  return <Button>{text}</Button>;
}
