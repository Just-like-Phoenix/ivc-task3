import styled from "styled-components";
import { ReactComponent as arrowDownSvg } from "../../assets/icons/arrowDownward.svg";
import { textColor } from "../../app/theme";

export const ArrowDownIcon = styled(arrowDownSvg)`
  & path {
    fill: ${textColor};
  }
`;
