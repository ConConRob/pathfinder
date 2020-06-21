import React from 'react';
import { Grid } from './Grid';

export function PathFinder() {
  return (
    <>
      <Grid rows={15} columns={40} startPoint={[10, 10]} endPoint={[30, 14]} />
    </>
  );
}
