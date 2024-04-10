import { styled } from "styled-components";
import {
  backgroundColor,
  blockColor,
  buttonColor,
  hoverColor,
  selectedColor,
  textColor,
} from "../../app/theme";

export const TableDiv = styled.div`
  background-color: ${blockColor};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 80%;
  height: 80%;
  padding: 20px;
  border-radius: 40px;
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
  border-bottom: 0.1vw solid ${textColor};
  background-color: ${(props) =>
    props.$rowSelected ? selectedColor : blockColor};
  font-size: 16px;
`;

export const Th = styled.th<{ $colCount?: number }>`
  width: calc((100%) / ${(props) => props.$colCount});
  text-align: center;
`;

export const Td = styled.td`
  vertical-align: middle;
  text-align: center;
`;

export const TablePaginationDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PaginationButton = styled.button`
  margin: auto;
  height: 48px;
  width: 48px;
  background-color: ${buttonColor};
  color: ${textColor};
  border-width: 1px;
  border-radius: 100%;
  font-size: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Select = styled.select`
  height: 48px;
  background-color: ${buttonColor};
  color: ${textColor};
  border-width: 1px;
  border-radius: 20px;
  font-size: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageText = styled.h1`
  color: ${textColor};
  font-size: 32px;
`;
