import React, { useState } from 'react';
import { MemoizedCell, Cell } from './Cell';
import styled from 'styled-components';
import { tCoords } from './PathFinder';
import { generateId } from '../../util';

interface IGridProps {
  rows: number;
  columns: number;
  startPoint: tCoords;
  endPoint: tCoords;
  visitedCoords: tCoords[];
  setStartOrEndCoords: (type: 'start' | 'end', newCoords: tCoords) => void;
}

interface IStyledProps {
  rows: number;
  columns: number;
}

export function Grid({
  rows,
  columns,
  startPoint,
  endPoint,
  setStartOrEndCoords,
  visitedCoords,
}: IGridProps) {
  const [currentDragTarget, setCurrentDragTarget] = useState<
    'start' | 'end' | null
  >(null);

  const rowsMapper = Array(rows).fill(null);
  const columnsMapper = Array(columns).fill(null);

  function handleDrop(newCoords: tCoords) {
    if (currentDragTarget) {
      setStartOrEndCoords(currentDragTarget, newCoords);
    }
    setCurrentDragTarget(null);
  }

  function handleDrag(type: 'start' | 'end') {
    setCurrentDragTarget(type);
  }

  return (
    <StyledGrid columns={columns} rows={rows}>
      {rowsMapper.map((_, rowI) =>
        columnsMapper.map((_, columnI) => (
          <Cell
            key={`${columnI}.${rowI}`}
            isStartPoint={columnI === startPoint[0] && rowI === startPoint[1]}
            isEndPoint={columnI === endPoint[0] && rowI === endPoint[1]}
            isVisited={
              !!visitedCoords.find(
                (coord) => coord[0] === columnI && coord[1] === rowI
              )
            }
            visitNumber={visitedCoords.findIndex(
              (coord) => coord[0] === columnI && coord[1] === rowI
            )}
            width={` ${(1 / columns) * 100}%`}
            height={`${(1 / rows) * 100}%`}
            coords={[columnI, rowI]}
            handleDrop={handleDrop}
            handleDrag={handleDrag}
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
