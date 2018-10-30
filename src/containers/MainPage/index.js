import React from 'react';
import { Grid, Cell } from 'styled-css-grid';

import Navigation from '../../components/Styled/Navigation';
import VidSearchForm from '../../components/VidSearchForm';

const mainPage = props => (
  <Grid
    columns={'minmax(0 , 1fr) minmax(30rem, 120rem) minmax(0 , 1fr)'}
    rows={' minmax(4.5rem ,auto) 1fr minmax(45px,auto)'}
    gap={'0'}>
    <Cell width={3}>
      <Navigation />
    </Cell>
    <Cell />
    <Cell>
      <VidSearchForm />
    </Cell>
    <Cell />
  </Grid>
);

export default mainPage;