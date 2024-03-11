import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  width: 400px;
  min-width: 15rem;
  padding: 10px;
  height: 200px;
  margin: 0px;
  background-color: black;
  border-radius: 10px;
  color: white;
  @media screen and (max-width: 758px) {
    width: 200px;
    min-width: 5rem;
    padding: 10px;
    height: 400px;
  }
`;

interface Props {
  text: string;
}

export default function Card({ text }: Props) {
  return <CardWrapper>{text}</CardWrapper>;
}
