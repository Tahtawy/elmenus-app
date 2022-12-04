import { FC } from "react";
import { Container, Grid } from 'semantic-ui-react';
import {  AdminAddCategory } from '../components/AdminAddCategory';
import {  AdminMenuData } from '../components/AdminMenuData';

export const Admin: FC = () => {
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            <AdminAddCategory />
          </Grid.Column>
          <Grid.Column width={11}>
            <AdminMenuData />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}