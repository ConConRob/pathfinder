import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { tCoords, DisplayType, tMaterial } from './PathFinder';

// make saved last state happen at this level

// type: 'start' | 'end',
interface ICellProps {
  width: number | string;
  height: number | string;
  isStartPoint: boolean;
  isEndPoint: boolean;
  wallType: tMaterial;
  coords: [number, number];
  handleDrop: (newCoords: tCoords) => void;
  handleDrag: (type: 'start' | 'end') => void;
  onClick: () => void;
  onMouseEnter: () => void;
}

interface IMarkerProps {
  type: 'start' | 'end';
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
    wallType,
    height,
    width,
  } = props;

  function handleDragDrop() {
    handleDrop(coords);
  }

  return (
    <StyledCell
      wallType={wallType}
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
        <div
          className="item start"
          draggable={true}
          onDragStart={() => handleDrag('start')}
        />
      ) : null}
      {isEndPoint ? (
        <div
          className="item end"
          draggable={true}
          onDragStart={() => handleDrag('end')}
        />
      ) : null}
      {isStartPoint || isEndPoint ? null : <div className="item"></div>}
    </StyledCell>
  );
}

interface IStyledCellProps {
  width: string | number;
  height: string | number;
  wallType: tMaterial;
}

const StyledCell = styled.div<IStyledCellProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 6px;
  /* FOR IF VISITED TIMING */
  background-color: white;
  ${({ wallType }) => {
    switch (wallType) {
      case 'Wall':
        return 'background-color:black !important;';
      case 'Sand':
        return 'background-color:yellow;';
      case 'Clear':
        return '';
    }
  }}

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
    70% {
      background-color: orange;
    }
    80% {
      background-color: red;
      border-radius: 5px;
      width: 100%;
      height: 100%;
    }
    to {
      width: 70%;
      height: 70%;
    }
  }
  .item {
    width: 70%;
    height: 70%;
    border-radius: 5px;
    background-color: none;

    transition: background-color 0.5s;

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

      background-color: none;
      animation-duration: 0.5s;
    }
    &.found {
      transform: scale(1.2, 1.2);
      background-color: yellow;
      border-radius: 30px;
    }
    &.start {
      width: 70%;
      height: 70%;
      border-radius: 100%;
      background-color: green;
    }
    &.end {
      width: 70%;
      height: 70%;
      border-radius: 100%;
      background-color: red;
    }
  }
  box-sizing: border-box;

  border: 1px solid rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;
`;

function Marker(props: IMarkerProps) {
  const { type, onDragStart } = props;
  return <div className={type} draggable={true} onDragStart={onDragStart} />;
}
