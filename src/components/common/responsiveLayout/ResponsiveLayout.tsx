import { FC } from "react";
import * as S from "./styled";
import useViewportDimensions from "@hooks/useWindowDimensions";

type ownProp = {
  children: JSX.Element;
};

const ResponsiveLayout: FC<ownProp> = ({ children }) => {
  const { windowWidth } = useViewportDimensions();
  return <S.Container maxwidth={windowWidth}>{children}</S.Container>;
};

export default ResponsiveLayout;
