import styled from "styled-components";
import { ReactComponent as sortSvg } from "../../assets/icons/sort.svg";
import { textColor } from "../../app/theme";

export const SortIcon = styled(sortSvg)`
  & path {
    fill: ${textColor};
  }
`;
