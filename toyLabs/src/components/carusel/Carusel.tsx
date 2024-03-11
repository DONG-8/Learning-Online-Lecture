import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import CaruselMainItem from "./CaruselMainItem";
import CaruselLayer from "./CaruselLayer";
import CaruselButton from "./CaruselButton";

type Timage = {
  url: string;
  name: string;
};
// 캐러셀 즉 여러가지 항목들을 보여주기 위한 곳에서 필요한 액션이 무엇인가.
interface Props {
  data: Timage[];
  children: JSX.Element[]; // children 타입 나눠주면 좋을듯
  // center: boolean;
  // direction: "X" | "Y";
  // auto: boolean;
}

interface myContextType {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  setIsMove: Dispatch<SetStateAction<boolean | null>>;
  isMove: boolean | null;
  prevIndex: () => void;
  nextIndex: () => void;
}

export const contextProvider = createContext<myContextType | null>(null);

export default function Carusel({ data, children }: Props) {
  const [index, setIndex] = useState<number>(0);
  const [isMove, setIsMove] = useState<boolean | null>(null);
  const prevIndex = () => {
    setIndex((prev) => prev - 1);
  };
  const nextIndex = () => {
    setIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (index === -1) {
      setIndex(data.length - 1);
    } else if (index === data.length) {
      setIndex(0);
    }
  }, [index]);

  return (
    <contextProvider.Provider
      value={{
        index,
        prevIndex,
        nextIndex,
        setIndex,
        setIsMove,
        isMove,
      }}
    >
      <div style={{ overflowX: "hidden" }}>{children}</div>
    </contextProvider.Provider>
  );
}

Carusel.Main = CaruselMainItem;
Carusel.Layer = CaruselLayer;
Carusel.Button = CaruselButton;
