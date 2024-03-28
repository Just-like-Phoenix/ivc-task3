import styled from "styled-components";
import { ReactComponent as selectSvg } from "../../assets/icons/select.svg";
import { textColor } from "../../app/theme";

export const SelectIcon = styled(selectSvg)`
  & path {
    fill: ${textColor};
  }
`;
