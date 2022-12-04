import { FC } from "react";
import { Container, Grid } from 'semantic-ui-react';
import { useAppSelector } from "../../shared/hooks";
import { AdminModal } from "../components/AdminModal";
import {  AdminMenuData } from '../components/AdminMenuData';
import {  AdminAddCategory } from '../components/AdminAddCategory';

export const Admin: FC = () => {
  const { modalData } = useAppSelector((state: any) => state.admin);

  return (
    <>
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

      <AdminModal
        type={modalData.type}
        action={modalData.action}
        isOpen={modalData.isOpen} />
    </>
  )
}