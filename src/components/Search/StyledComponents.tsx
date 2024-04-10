import { styled } from "styled-components";
import {
  backgroundColor,
  blockColor,
  buttonColor,
  hoverColor,
  selectedColor,
  textColor,
} from "../../app/theme";

export const SearchDiv = styled.div`
  background-color: ${blockColor};

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  width: 80%;
  padding: 20px;
  border-radius: 40px;
`;

export const SearchInput = styled.input`
  background-color: ${buttonColor};
  color: ${textColor};

  height: 48px;
  width: 100%;
  border-radius: 20px;
  font-size: 24px;
`;
