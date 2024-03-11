import React from "react";

interface Props {
  text: string;
}

export default function Button(props: Props) {
  return <button>{props.text}</button>;
}
