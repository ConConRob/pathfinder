import React, { useState, useEffect } from 'react';
import { Cell } from './Cell';
import styled from 'styled-components';
import { tCoords, IDisplayCommand, DisplayType, tMaterial } from './PathFinder';
import { generateId } from '../../util';
import { useIsMouseDown } from '../../hooks';

interface IGridProps {
  rows: number;
  columns: number;
  startPoint: tCoords;
  endPoint: tCoords;
  walls: { coord: tCoords; material: tMaterial }[];
  setStartOrEndCoords: (type: 'start' | 'end', newCoords: tCoords) => void;
  toggleGraphItem: (coords: tCoords) => void;
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
  toggleGraphItem,
  walls,
}: IGridProps) {
  const [currentDragTarget, setCurrentDragTarget] = useState<
    'start' | 'end' | null
  >(null);
  const isMouseDown = useIsMouseDown();

  useEffect(() => {
    if (isMouseDown) {
    }
  }, [isMouseDown]);

  const rowsMapper = Array(rows).fill(null);
  const columnsMapper = Array(columns).fill(null);

  function handleEnterCell(coords: tCoords) {
    if (isMouseDown) {
      toggleGraphItem(coords);
    }
  }

  function handleClickCell(coords: tCoords) {
    toggleGraphItem(coords);
  }

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
            key={generateId(columnI, rowI)}
            isStartPoint={columnI === startPoint[0] && rowI === startPoint[1]}
            isEndPoint={columnI === endPoint[0] && rowI === endPoint[1]}
            wallType={
              walls.find(
                (wall) => wall.coord[0] === columnI && wall.coord[1] === rowI
              )?.material || 'Clear'
            }
            width={` ${(1 / columns) * 100}%`}
            height={`${(1 / rows) * 100}%`}
            coords={[columnI, rowI]}
            handleDrop={handleDrop}
            handleDrag={handleDrag}
            onClick={() => handleClickCell([columnI, rowI])}
            onMouseEnter={() => handleEnterCell([columnI, rowI])}
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
  width: 1400px;
`;
