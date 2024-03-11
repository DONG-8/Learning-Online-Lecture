import Carusel from "./components/carusel/Carusel";
import e2 from "./assets/image/e2.jpg";
import e1 from "./assets/image/e1.jpg";
import e3 from "./assets/image/e3.jpg";
import e4 from "./assets/image/e4.jpg";
import e5 from "./assets/image/e5.jpg";
import e6 from "./assets/image/e5.jpg";
import Card from "./components/Card/Card";
import Button from "./components/Button/Button";
import SliderButton from "./components/Button/SliderButton";
import CarouselSubList from "./components/carusel/CarouselSubList";
import { SliderComponent } from "./components/carusel/SliderComponent";
import Flex from "./styled-components/display/Flex";

export interface Timage {
  url: string;
  name: string;
}

const images: Timage[] = [
  { url: e1, name: "첫번째 이벤트" },
  { url: e2, name: "두번째 이벤트" },
  { url: e3, name: "세번째 이벤트" },
  { url: e5, name: "다섯번째 이벤트" },
  { url: e4, name: "네번째 이벤트" },
  { url: e6, name: "막번째 이벤트" },
];

function App() {
  return (
    <>
      <nav>아아아아ㅋㅋ</nav>
      <header>Dong-8의 실험실</header>
      {/* <section>
        <h2>캐러셀 커스텀하기</h2>
        <Carusel data={images}>
          <Carusel.Layer>
            <Carusel.Main as={<Card text="1" />} />
            <Carusel.Main as={<Card text="2" />} />
            <Carusel.Main as={<Card text="3" />} />
            <Carusel.Main as={<Card text="4" />} />
            <Carusel.Main as={<Card text="5" />} />
            <Carusel.Main as={<Card text="6" />} />
          </Carusel.Layer>
          <Carusel.Button as={<Button text="left" />} direction="prev" />
          <Carusel.Button as={<Button text="right" />} direction="next" />
        </Carusel>
      </section> */}
      <section>
        <Flex>
          <div>
            <button>1</button>
            <button>2</button>
          </div>
          <CarouselSubList>
            <SliderButton text={"아아"} key={1} />
            <SliderButton text={"가나다라"} key={2} />
            <SliderButton text={"가나다라마마마"} key={3} />
            <SliderButton text={"가나다라"} key={4} />
            <SliderButton text={"가나다라ㅇㅇ"} key={5} />
            <SliderButton text={"가나다라"} key={6} />
            <SliderButton text={"가나"} key={7} />
          </CarouselSubList>
        </Flex>
      </section>{" "}
    </>
  );
}

export default App;
