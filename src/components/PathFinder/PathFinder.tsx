import React from 'react';
import { Grid } from './Grid';

export function PathFinder() {
  return (
    <>
      <Grid rows={50} columns={50} startPoint={[10, 10]} endPoint={[30, 30]} />
    </>
  );
}
