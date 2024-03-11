import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { contextProvider } from "./Carusel";

interface Props {
  children: JSX.Element[];
}

const CaruselWrapper = styled.div`
  width: max-content;
  height: max-content;
  display: flex;
  margin: 0 auto;
`;

const Flex = styled.div`
  display: flex;
  width: max-content;
`;

export default function CaruselLayer({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const movingRef = useRef<HTMLDivElement>(null);
  const { index, setIsMove, prevIndex, nextIndex } =
    useContext(contextProvider);
  const [contentCount, setContentCount] = useState<number>(0);
  const [endList, setEndList] = useState<ReactElement[]>([]);
  const [startList, setStartList] = useState<ReactElement[]>([]);
  const [fs, setFs] = useState<boolean>(true);
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);
  const [tochedX, setTochedX] = useState(0);
  const [tochedY, setTochedY] = useState(0);
  // infinity의 여부에 따른 Layer 추가하기

  function checkContentSize() {
    if (!ref.current) return;
    if (!movingRef.current) return;
    const windowWidth = window.innerWidth;
    const totalContentsWidth = ref.current.offsetWidth;
    const contentWidth = totalContentsWidth / children.length;
    const visibleContentCount = Math.ceil(windowWidth / contentWidth);
    setContentCount(visibleContentCount);
    const width = 100 / (children.length + visibleContentCount * 2);
    if (totalContentsWidth > windowWidth) {
      movingRef.current.style.transform = `translateX(-${
        width * (visibleContentCount + index)
      }%)`;
      movingRef.current.style.transition = "";
    } else {
      movingRef.current.style.transform = "";
      movingRef.current.style.transition = "";
    }
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTochedX(e.changedTouches[0].pageX);
    setTochedY(e.changedTouches[0].pageY);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const distanceX = tochedX - e.changedTouches[0].pageX;
    const distanceY = tochedY - e.changedTouches[0].pageY;
    const vector = Math.abs(distanceX / distanceY);

    if (distanceX > 30 && vector > 2) {
      nextIndex();
    } else if (distanceX < -30 && vector > 2) {
      prevIndex();
    }
  };

  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpClientX(e.clientX);
    setMouseUpClientY(e.clientY);
  };

  useEffect(() => {
    const dragSpaceX = Math.abs(mouseDownClientX - mouseUpClientX);
    const dragSpaceY = Math.abs(mouseDownClientY - mouseUpClientY);
    const vector = dragSpaceX / dragSpaceY;

    if (mouseDownClientX !== 0 && dragSpaceX > 100 && vector > 2) {
      if (mouseUpClientX < mouseDownClientX) {
        nextIndex();
      } else if (mouseUpClientX > mouseDownClientX) {
        prevIndex();
      }
    }
  }, [mouseUpClientX]);

  useEffect(() => {
    // 한 화면에 보이는 컨텐츠의 수에 맞춰서, array를 수정해야함.
    // 자 컨텐츠 하나의 크기는 고정일까? 아니요
    // 각 컨텐츠의 크기를 매번 계산시켜야함
    if (fs) {
      setFs(false);
    }
    checkContentSize();
    window.addEventListener("resize", () => {
      checkContentSize();
    });
  }, [index]);

  useEffect(() => {
    // 컨텐츠 수가 바뀌면 node를 변경시켜준다.
    if (contentCount > children.length) {
      setIsMove(false);
      setEndList([]);
      setStartList([]);
    } else {
      setIsMove(true);
      setEndList([
        ...children.slice(children.length - contentCount, children.length),
      ]);
      setStartList([...children.slice(0, contentCount)]);
    }
  }, [contentCount]);

  useEffect(() => {
    if (!movingRef.current) return;
    if (fs) return;

    const contentWidth = 100 / (children.length + contentCount * 2);
    const StartPoint = contentWidth * (contentCount - 1);
    const EndPoint = contentWidth * (contentCount + children.length);
    if (index === -1) {
      movingRef.current.style.transform = `translateX(-${EndPoint}%)`;
      movingRef.current.style.transition = "";
    } else if (index === children.length) {
      movingRef.current.style.transform = `translateX(-${StartPoint}%)`;
      movingRef.current.style.transition = "";
    } else {
      movingRef.current.style.transform = `translateX(-${
        contentWidth * (contentCount + index)
      }%)`;
      movingRef.current.style.transition = `all 0.5s ease-in-out`;
    }
  }, [index]);

  return (
    <>
      <Flex
        ref={movingRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
      >
        {endList ? <>{endList}</> : null}
        <CaruselWrapper ref={ref}>{children}</CaruselWrapper>
        {startList ? <>{startList}</> : null}
      </Flex>
    </>
  );
}
