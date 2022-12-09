import { FC } from "react";
import { useAppSelector } from "../../shared/hooks";
import { initialAddCategory } from "../AdminConstants";
import { Container, Grid, Header } from 'semantic-ui-react';
import {  AdminMenuData } from '../components/AdminMenuData';
import { AdminEditModal } from "../components/AdminEditModal";
import { AdminDeleteModal } from "../components/AdminDeleteModal";
import {  AdminCategoryForm } from '../components/AdminCategoryForm';

export const Admin: FC = () => {
  const { modalData } = useAppSelector((state: any) => state.admin);

  return (
    <>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <Header as='h2' color='teal'>
                Add Category
              </Header>
              <AdminCategoryForm />
            </Grid.Column>
            <Grid.Column width={11}>
              <AdminMenuData />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

      {
        modalData.action === 'delete' && (
          <AdminDeleteModal type={modalData.type} action={modalData.action} />
        )
      }

      {
        modalData.action === 'edit' && (
          <AdminEditModal type={modalData.type} action={modalData.action} />
        )
      }
    </>
  )
}