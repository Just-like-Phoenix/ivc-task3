import styled from "styled-components";
import { ReactComponent as arrowUpSvg } from "../../assets/icons/arrowUpward.svg";
import { textColor } from "../../app/theme";

export const ArrowUpIcon = styled(arrowUpSvg)`
  & path {
    fill: ${textColor};
  }
`;
