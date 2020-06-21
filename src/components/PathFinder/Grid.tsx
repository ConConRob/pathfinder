import React from 'react';
import { Cell } from './Cell';
import styled from 'styled-components';

interface IGridProps {
  rows: number;
  columns: number;
}

interface IStyledProps {
  rows: number;
  columns: number;
}

export function Grid({ rows, columns }: IGridProps) {
  return (
    <StyledGrid columns={columns} rows={rows}>
      {Array(rows * columns).fill(
        <Cell
          width={`${(1 / columns) * 100}%`}
          height={`${(1 / rows) * 100}%`}
        />
      )}
    </StyledGrid>
  );
}

const StyledGrid = styled.div<IStyledProps>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: 700px;
  width: 100%;
`;
