import React from 'react';
import styled from 'styled-components';
interface ICellProps {
  width: number | string;
  height: number | string;
}

export function Cell({ width, height }: ICellProps) {
  return <StyledCell width={width} height={height} />;
}

const StyledCell = styled.div<ICellProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  box-sizing: border-box;
  border: 1px solid black;
`;
