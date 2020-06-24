import React from 'react';
import styled from 'styled-components';
import { tCoords, DisplayType } from './PathFinder';
import { CELL_DELAY_TIME_MS } from '../../constants';

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
  isLastCommand: boolean;
  // runNextCommand: () => void;
  displayNumber: number | undefined;
  displayType: DisplayType | undefined;
  nextCommand: () => void;
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
    displayType,
    isLastCommand,
    nextCommand,
    displayNumber,
  } = props;

  function handleDragDrop() {
    handleDrop(coords);
  }
  const animationEnd = isLastCommand || undefined;

  function handleLastAnimation(event: React.AnimationEvent<HTMLDivElement>) {
    nextCommand();
  }
  return (
    <StyledCell
      onAnimationEnd={animationEnd && handleLastAnimation}
      className="item"
      {...props}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={handleDragDrop}
    >
      {}
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

const StyledCell = styled.div<ICellProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
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
    /* DEFAULT VALUES */
    width: 100%;
    height: 100%;
    border-radius: 5px;
    /* HANDLE TIMING */
    /* transition-delay: 100ms;
    animation-delay: 100ms; */
    /* animation-direction: reverse; */

    ${({ displayType, displayNumber }) => {
      // VISIT TIMING

      switch (displayType) {
        case DisplayType.Path: {
          return `
          transition-delay: ${(displayNumber || 0) * CELL_DELAY_TIME_MS}ms;
          animation-delay: ${(displayNumber || 0) * CELL_DELAY_TIME_MS}ms;
          background-color: blue;
          `;
        }
        case DisplayType.Visit: {
          debugger;
          return `
          animation: visited;
          transition-delay: ${(displayNumber || 0) * CELL_DELAY_TIME_MS}ms;
          animation-delay: ${(displayNumber || 0) * CELL_DELAY_TIME_MS}ms;
          background-color:red;
          animation-duration: .5s;
          `;
        }
        case DisplayType.UndoVisit: {
          return `animation: visited;
          animation-direction:reverse;
          transition-delay: ${(displayNumber || 0) * CELL_DELAY_TIME_MS}ms;
          animation-delay: ${(displayNumber || 0) * CELL_DELAY_TIME_MS}ms;
          animation-duration: .5s;
          `;
        }
        default:
          return ``;
      }
    }}
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
