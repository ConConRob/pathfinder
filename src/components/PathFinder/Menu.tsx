import React from 'react';
import styled from 'styled-components';
import { tAlgorithm, tMaterial } from './PathFinder';
interface IMenuProps {
  algorithm: tAlgorithm;
  setAlgorithm: (name: tAlgorithm) => void;
  material: tMaterial;
  setMaterial: (name: tMaterial) => void;
  generateMaze: () => void;
  reset: () => void;
  play: () => void;
}

export function Menu(props: IMenuProps) {
  const {
    algorithm,
    setAlgorithm,
    material,
    setMaterial,
    generateMaze,
    reset,
    play,
  } = props;

  function materialChange(event: React.ChangeEvent<HTMLInputElement>) {
    const v = event.target.value;
    if (v === 'Sand' || v === 'Clear' || v === 'Wall') {
      setMaterial(v);
    }
  }
  function algorithmChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const v = event.target.value;
    if (v === 'Dijkstras' || v === 'Dfs' || v === 'Bfs') {
      setAlgorithm(v);
    }
  }
  return (
    <StyledMenu>
      <button onClick={play}>Play</button>
      <button onClick={reset}>RESET</button>

      <button onClick={generateMaze}>Generate Maze</button>
      <select value={algorithm} onChange={algorithmChange}>
        <option value="dijkstras">Dijkstra's</option>
        <option value="dfs">Depth First Search</option>
        <option value="bfs">Breadth First Search</option>
      </select>
      <div>
        <input
          type="radio"
          id="wall-radio"
          name="material"
          value={'Wall'}
          onChange={materialChange}
          checked={material === 'Wall'}
        />
        <label>Wall</label>
        <br />
        <input
          type="radio"
          id="sand-radio"
          name="material"
          value={'Sand'}
          onChange={materialChange}
          checked={material === 'Sand'}
        />
        <label>Sand</label>
        <br />

        <input
          type="radio"
          id="brush-radio"
          name="material"
          value={'Clear'}
          onChange={materialChange}
          checked={material === 'Clear'}
        />
        <label>Brush</label>

        <br />
      </div>
    </StyledMenu>
  );
}

const StyledMenu = styled.div``;
