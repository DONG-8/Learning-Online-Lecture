import React, { ReactElement, useContext } from "react";
import { contextProvider } from "./Carusel";

interface Props {
  direction: "prev" | "next";
  as: ReactElement;
}

export default function CaruselButton({ as, direction }: Props) {
  const context = useContext(contextProvider);

  if (context === null) {
    return <>Loading</>;
  }
  const isMove = context.isMove;
  const prevIndex = context.prevIndex;
  const nextIndex = context.nextIndex;
  const clickAction = direction === "prev" ? prevIndex : nextIndex;

  if (isMove === null || isMove === false) {
    return;
  }

  return (
    <div
      onClick={() => {
        clickAction();
      }}
    >
      {as}
    </div>
  );
}
