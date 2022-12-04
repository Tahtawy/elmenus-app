import { FC } from "react";
import { Container, Grid } from 'semantic-ui-react';
import {  AddCategory } from '../components/AddCategory';

export const Admin: FC = () => {
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            <AddCategory />
          </Grid.Column>
          <Grid.Column width={11}>
            <p>right</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}