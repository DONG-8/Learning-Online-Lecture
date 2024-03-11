import React, { useRef, useEffect, ReactElement, useState } from "react";

interface Props {
  children: ReactElement[];
}

export default function CarouselSubList({ children }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [childeWidths, setChildWidths] = useState<number[]>([]);

  const updataChildWidths = () => {
    const widths = Array.from(parentRef.current?.children || []).map(
      (child: Element) => {
        const styles = window.getComputedStyle(child as HTMLElement);
        const margin =
          parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
        return (child as HTMLElement).offsetWidth + margin;
      }
    );
    setChildWidths(widths);
  };

  useEffect(() => {
    updataChildWidths();
    window.addEventListener("resize", updataChildWidths);

    return () => {
      window.removeEventListener("resize", updataChildWidths);
    };
  }, []);
  console.log(childeWidths);

  // 버튼 클릭에 따른 width에 맞게 이동시키기
  // 
  useEffect(() => {});

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "blue",
        display: "flex",
        overflow: "hidden",
        flexWrap: "nowrap",
      }}
      ref={parentRef}
    >
      {children}
    </div>
  );
}
