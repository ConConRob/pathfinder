import React from 'react';
import styled from 'styled-components';
interface ICellProps {
  width: number | string;
  height: number | string;
  isStartPoint: boolean;
  isEndPoint: boolean;
}

export function Cell(props: ICellProps) {
  console.log(props);
  return <StyledCell {...props} />;
}

const StyledCell = styled.div<ICellProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ isStartPoint, isEndPoint }) => {
    if (isStartPoint) {
      return 'green';
    } else if (isEndPoint) {
      return 'red';
    } else {
      return 'white';
    }
  }};

  box-sizing: border-box;
  border: 1px solid black;
`;
