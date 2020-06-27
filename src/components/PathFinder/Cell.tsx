import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { tCoords, DisplayType } from './PathFinder';

// make saved last state happen at this level

// type: 'start' | 'end',
interface ICellProps {
  width: number | string;
  height: number | string;
  isStartPoint: boolean;
  isEndPoint: boolean;
  isWall: boolean;
  coords: [number, number];
  handleDrop: (newCoords: tCoords) => void;
  handleDrag: (type: 'start' | 'end') => void;
  onClick: () => void;
  onMouseEnter: () => void;
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
    onClick,
    onMouseEnter,
    isWall,
    height,
    width,
  } = props;

  function handleDragDrop() {
    handleDrop(coords);
  }

  return (
    <StyledCell
      isWall={isWall}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={handleDragDrop}
      height={height}
      width={width}
      data-x={coords[0]}
      data-y={coords[1]}
      onMouseDown={onClick}
      onMouseEnter={onMouseEnter}
    >
      {isStartPoint ? (
        <Marker color="green" onDragStart={() => handleDrag('start')} />
      ) : null}
      {isEndPoint ? (
        <Marker color="red" onDragStart={() => handleDrag('end')} />
      ) : null}
      {isStartPoint || isEndPoint ? null : <div className="item"></div>}
    </StyledCell>
  );
}

interface IStyledCellProps {
  width: string | number;
  height: string | number;
  isWall: boolean;
}

const StyledCell = styled.div<IStyledCellProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 6px;
  /* FOR IF VISITED TIMING */

  /* FOR IF PATH TIME */
  background-color: ${({ isWall }) => {
    if (isWall) {
      return 'black';
    }
    return 'white';
  }};

  /* VISIT PATH */
  @keyframes visited {
    from {
      background-color: white;
      border-radius: 100%;
      width: 0;
      height: 0;
    }
    25% {
      background-color: yellow;
      border-radius: 100%;
      width: 50%;
      height: 50%;
    }
    55% {
      background-color: yellow;
      border-radius: 100%;
    }
    90% {
      background-color: orange;
    }
    to {
      background-color: red;
      border-radius: 5px;
      width: 100%;
      height: 100%;
    }
  }
  .item {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: white;

    transition: background-color 0.5s;
    ${({ isWall }) => (isWall ? 'background-color:black !important;' : '')}
    &.path {
      background-color: blue;
    }

    &.visit {
      animation: visited;

      background-color: red;
      animation-duration: 0.5s;
    }

    &.undo-visit {
      animation: visited;
      animation-direction: reverse;

      background-color: red;
      animation-duration: 0.5s;
    }
  }
  box-sizing: border-box;

  border: 1px solid rgba(0, 0, 0, 0.1);

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
