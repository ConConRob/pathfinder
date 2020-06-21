import React, { useState } from 'react';
import { Grid } from './Grid';

export type tCoords = [number, number];

export function PathFinder() {
  const [startCoords, setStartCoords] = useState<tCoords>([10, 10]);
  const [endCoords, setEndCoords] = useState<tCoords>([30, 14]);

  function setStartOrEndCoords(type: 'start' | 'end', newCoords: tCoords) {
    if (type === 'start') {
      setStartCoords(newCoords);
    } else if (type === 'end') {
      setEndCoords(newCoords);
    }
  }

  console.log(startCoords);
  console.log(endCoords);
  return (
    <>
      <Grid
        rows={15}
        columns={40}
        startPoint={startCoords}
        endPoint={endCoords}
        setStartOrEndCoords={setStartOrEndCoords}
      />
    </>
  );
}
