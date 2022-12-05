import { FC } from "react";
import { ModalData } from "../AdminModels";
import { setModalData } from "../AdminSlice";
import { AdminCategoryForm } from "./AdminCategoryForm";
import { AdminCategoryItemForm } from "./AdminCategoryItemForm";
import { Modal, Grid, Icon, Button } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from "../../shared/hooks";

export const AdminEditModal: FC<ModalData> = ({ type, action, data }) => {
  const dispatch = useAppDispatch();
  const { modalData } = useAppSelector((state: any) => state.admin);

  const close = () => {
    dispatch(setModalData({ action: 'close' }));
  }

  return (
    <Modal
      size="tiny"
      open={action === 'edit'}
      onClose={close}
    >
      <Modal.Header>
        <Grid verticalAlign="middle">
          <Grid.Column floated="left" width={14}>
            Edit Your { type }
          </Grid.Column>
          <Grid.Column floated="right" width={2}>
            <Button onClick={close} icon>
              <Icon name="close"></Icon>
            </Button>
          </Grid.Column>
        </Grid>
      </Modal.Header>
      <Modal.Content>
        {
          modalData.type === 'category' ? (
            <AdminCategoryForm initialValue={modalData.data.formData} mode="edit" />
          ): (
            <AdminCategoryItemForm initialValue={modalData.data.formData} mode="edit" />
          )
        }
      </Modal.Content>
    </Modal>
  )
}