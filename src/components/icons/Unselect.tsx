import styled from "styled-components";
import { ReactComponent as unselectSvg } from "../../assets/icons/unselect.svg";
import { textColor } from "../../app/theme";

export const UnselectIcon = styled(unselectSvg)`
  & path {
    fill: ${textColor};
  }
`;
