import React from 'react';
import styled from 'styled-components';
import { tCoords } from './PathFinder';

// type: 'start' | 'end',
interface ICellProps {
  width: number | string;
  height: number | string;
  isStartPoint: boolean;
  isEndPoint: boolean;
  coords: [number, number];
  handleDrop: (newCoords: tCoords) => void;
  handleDrag: (type: 'start' | 'end') => void;
  isVisited: boolean;
}
interface IMarkerProps {
  color: string;
  onDragStart: () => void;
}

export const MemoizedCell = React.memo(Cell);
export function Cell(props: ICellProps) {
  const {
    isStartPoint,
    isEndPoint,
    handleDrop,
    coords,
    handleDrag,
    isVisited,
  } = props;
  const isDraggable = isStartPoint || isEndPoint;

  function handleDragDrop() {
    handleDrop(coords);
  }

  return (
    <StyledCell
      {...props}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={handleDragDrop}
    >
      {isStartPoint ? (
        <Marker color="green" onDragStart={() => handleDrag('start')} />
      ) : null}
      {isEndPoint ? (
        <Marker color="red" onDragStart={() => handleDrag('end')} />
      ) : null}
    </StyledCell>
  );
}

const StyledCell = styled.div<ICellProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ isStartPoint, isEndPoint, isVisited }) => {
    // if (!isStartPoint && !isEndPoint && isVisited) {
    //   return 'yellow';
    // }
    if (isVisited) {
      return 'yellow';
    }
    return '';
  }};

  box-sizing: border-box;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Marker(props: IMarkerProps) {
  const { color, onDragStart } = props;
  return (
    <StyledMarker color={color} draggable={true} onDragStart={onDragStart} />
  );
}

const StyledMarker = styled.div<IMarkerProps>`
  width: 70%;
  height: 70%;
  border-radius: 100%;
  background-color: ${({ color }) => color};
`;
