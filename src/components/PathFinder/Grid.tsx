import React, { useState, useEffect } from 'react';
import { Cell } from './Cell';
import styled from 'styled-components';
import { tCoords, IDisplayCommand, DisplayType } from './PathFinder';
import { generateId } from '../../util';
import { useIsMouseDown } from '../../hooks';

interface IGridProps {
  rows: number;
  columns: number;
  startPoint: tCoords;
  endPoint: tCoords;
  walls: tCoords[];
  displayCommand: IDisplayCommand | null;
  setStartOrEndCoords: (type: 'start' | 'end', newCoords: tCoords) => void;
  toggleGraphItem: (coords: tCoords) => void;
  nextCommand: () => void;
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
  displayCommand,
  nextCommand,
}: IGridProps) {
  const [currentDragTarget, setCurrentDragTarget] = useState<
    'start' | 'end' | null
  >(null);

  const [maintainedCommands, setMaintainedCommands] = useState<
    IDisplayCommand[]
  >([]);
  useEffect(() => {
    if (displayCommand) {
      setMaintainedCommands((c) => [displayCommand, ...c]);
    }
  }, [displayCommand]);

  const rowsMapper = Array(rows).fill(null);
  const columnsMapper = Array(columns).fill(null);

  const isMouseDown = useIsMouseDown();

  function findLastMaintainedCommand(x: number, y: number) {
    for (let maintainedCommand of maintainedCommands) {
      const index = maintainedCommand.coords.findIndex((coord) => {
        return coord[0] === x && coord[1] === y;
      });

      if (index !== -1) {
        return {
          index,
          coord: maintainedCommand.coords[index],
          command: maintainedCommand.command,
        };
      }
    }
  }

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
            isWall={
              !!walls.find((coord) => coord[0] === columnI && coord[1] === rowI)
            }
            displayType={
              findLastMaintainedCommand(columnI, rowI)
                ? findLastMaintainedCommand(columnI, rowI)?.command
                : DisplayType.Untouched
            }
            displayNumber={
              findLastMaintainedCommand(columnI, rowI)
                ? findLastMaintainedCommand(columnI, rowI)?.index
                : -1
            }
            isLastCommand={
              maintainedCommands[0]
                ? maintainedCommands[0].coords[
                    maintainedCommands[0].coords.length - 1
                  ][0] === columnI &&
                  maintainedCommands[0].coords[
                    maintainedCommands[0].coords.length - 1
                  ][1] === rowI
                : false
            }
            width={` ${(1 / columns) * 100}%`}
            height={`${(1 / rows) * 100}%`}
            coords={[columnI, rowI]}
            handleDrop={handleDrop}
            handleDrag={handleDrag}
            onClick={() => handleClickCell([columnI, rowI])}
            onMouseEnter={() => handleEnterCell([columnI, rowI])}
            nextCommand={nextCommand}
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
  width: 700px;
`;
