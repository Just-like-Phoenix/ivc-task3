import { styled } from "styled-components";
import {
  blockColor,
  buttonColor,
  hoverColor,
  selectedColor,
  textColor,
} from "../../app/theme";

export const TablePaginationDiv = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Table = styled.table`
  width: 100%;
  height: 90%;
  color: ${textColor};
  border-collapse: collapse;
  && tbody > tr:hover > td {
    background: ${hoverColor};
  }
`;

export const Tr = styled.tr<{ $rowSelected: boolean }>`
  border-bottom: 0.1vw solid
    ${(props) => (props.$rowSelected ? selectedColor : textColor)};
  font-size: 1.5vw;
`;

export const Th = styled.th<{ $colCount?: number }>`
  width: calc((100%) / ${(props) => props.$colCount});
  text-align: center;
`;

export const Td = styled.td`
  vertical-align: middle;
  text-align: center;
`;
export const Button = styled.button`
  margin: auto;
  height: 1.8vw;
  background-color: ${buttonColor};
  color: ${textColor};
  border-width: 0.1vw;
  font-size: 1.2vw;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Select = styled.select`
  height: 1.8vw;
  background-color: ${buttonColor};
  color: ${textColor};
  border-width: 0.1vw;
  font-size: 1.2vw;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageText = styled.h1`
  color: ${textColor};
  font-size: 1.5vw;
`;

export const TableDiv = styled.div`
  background-color: ${blockColor};

  width: 80vw;
  height: 80svh;
  padding: 20px 20px 0px 20px;
  border-radius: 20px;
`;
