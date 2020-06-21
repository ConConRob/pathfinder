import React, { useState } from 'react';
import { Cell } from './Cell';
import styled from 'styled-components';

interface IGridProps {
  rows: number;
  columns: number;
  startPoint: [number, number];
  endPoint: [number, number];
}

interface IStyledProps {
  rows: number;
  columns: number;
}

export function Grid({ rows, columns, startPoint, endPoint }: IGridProps) {
  const rowsMapper = Array(rows).fill(null);
  const columnsMapper = Array(columns).fill(null);

  return (
    <StyledGrid columns={columns} rows={rows}>
      {rowsMapper.map((_, rowI) =>
        columnsMapper.map((_, columnI) => (
          <Cell
            isStartPoint={columnI === startPoint[0] && rowI === startPoint[1]}
            isEndPoint={columnI === endPoint[0] && rowI === endPoint[1]}
            width={` ${(1 / columns) * 100}%`}
            height={`${(1 / rows) * 100}%`}
          />
        ))
      )}
    </StyledGrid>
  );
}

const StyledGrid = styled.div<IStyledProps>`
  width: 98%;
  display: flex;
  flex-wrap: wrap;
  height: 700px;
  width: 100%;
`;
