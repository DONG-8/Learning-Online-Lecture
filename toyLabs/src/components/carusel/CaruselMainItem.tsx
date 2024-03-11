import { ReactElement } from "react";

interface Props {
  as: ReactElement;
}

export default function CaruselMainItem(props: Props) {
  // 감싸진 div의 넓이를 계산함, 들어오게 된 item 의 수에 맞춰 계산해야함.
  // infinity를 기본으로 시작점에 대한 계산 필요
  // -> 모바일 환경에서는 좌에서 우로 이동하는것이 일반적인 UI 구성이기 때문에
  return <>{props.as}</>;
}
