import React, { useState } from 'react';
import styled from 'styled-components';
import { tAlgorithm, tMaterial } from './PathFinder';
import { ReactComponent as PlaySvg } from '../../icons/play.svg';
import { ReactComponent as ResetSvg } from '../../icons/refresh.svg';
import { ReactComponent as MazeSvg } from '../../icons/maze.svg';
import { ReactComponent as HamburgerSvg } from '../../icons/hamburger.svg';
import { ReactComponent as CloseSvg } from '../../icons/close.svg';

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
  const [showMenu, setShowMenu] = useState(true);
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
    <>
      <StyledMenuButton>
        {!showMenu ? (
          <HamburgerSvg onClick={() => setShowMenu(true)} />
        ) : (
          <CloseSvg onClick={() => setShowMenu(false)} />
        )}
      </StyledMenuButton>
      <StyledMenu showMenu={showMenu}>
        <div className="button-container">
          <button id="play" onClick={play}>
            <PlaySvg />
          </button>
          <button id="refresh" onClick={reset}>
            <ResetSvg />
          </button>

          <button id="maze" onClick={generateMaze}>
            <MazeSvg />
          </button>
        </div>
        <div className="menu-algorithm-select">
          <label>Algorithm</label>
          <select value={algorithm} onChange={algorithmChange}>
            <option value="dijkstras">Dijkstra's</option>
            <option value="dfs">Depth First Search</option>
            <option value="bfs">Breadth First Search</option>
          </select>
        </div>

        <div className="menu-paint-type">
          <p>Paint Type</p>
          <input
            type="radio"
            id="wall-radio"
            name="material"
            value={'Wall'}
            onChange={materialChange}
            checked={material === 'Wall'}
          />
          <label>Wall</label>

          <input
            type="radio"
            id="sand-radio"
            name="material"
            value={'Sand'}
            onChange={materialChange}
            checked={material === 'Sand'}
          />
          <label>Sand</label>

          <input
            type="radio"
            id="brush-radio"
            name="material"
            value={'Clear'}
            onChange={materialChange}
            checked={material === 'Clear'}
          />
          <label>Brush</label>
        </div>
      </StyledMenu>
    </>
  );
}

const StyledMenuButton = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 100;
  svg {
    width: 40px;
    height: 40px;
  }
`;
const StyledMenu = styled.div<{ showMenu: boolean }>`
  padding: 30px;
  border-left: 3px solid #000000;
  border-bottom: 3px solid #000000;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  background: white;
  top: ${({ showMenu }) => (showMenu ? '0' : '-100vh')};
  transition: top 1s;
  right: 10px;
  .button-container {
  }
  button {
    margin: 15px;
    &:first-of-type {
      margin-top: 0;
    }

    cursor: pointer;
    width: 90px;
    height: 90px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s;
    &:hover {
      box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
      border-radius: 80%;
    }
    &:focus {
      outline: 0;
    }
    svg {
      width: 40px;
      height: 40px;
    }
    &#play {
      svg {
        polygon {
          color: black;
        }
      }
    }
    &#refresh {
      svg {
        path {
          fill: black;
        }
      }
    }
    &#maze {
      svg {
        path {
          fill: black;
        }
      }
    }
  }
  .menu-algorithm-select {
    label {
      display: block;
      text-align: center;
    }
  }
  .menu-paint-type {
  }
`;
