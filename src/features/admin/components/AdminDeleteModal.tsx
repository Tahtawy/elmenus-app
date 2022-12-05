import { FC } from "react";
import { ModalData } from "../AdminModels";
import { setModalData } from "../AdminSlice";
import { Modal, Button } from 'semantic-ui-react';
import { listCategory } from "../../shared/SharedAPI";
import { deleteCategory, deleteCategoryItem } from "../AdminAPI";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";

export const AdminDeleteModal: FC<ModalData> = ({ type, action }) => {
  const dispatch = useAppDispatch();
  const { modalData } = useAppSelector((state: any) => state.admin);

  const close = () => {
    dispatch(setModalData({ action: 'close' }));
  }

  const updateData = async () => {
    await dispatch(listCategory());
    dispatch(setModalData({ action: 'close' }));
  }

  const onConfirm = async () => {
    if (modalData.type === 'category') {
      await dispatch(deleteCategory(modalData.data.categoryId))
    } else if (modalData.type === 'item') {
      await dispatch(deleteCategoryItem({ 
        categoryId: modalData.data.categoryId,
        itemId: modalData.data.itemId 
      }));
    }
    await updateData();
  }

  return (
    <Modal
      size="mini"
      open={action === 'delete'}
      onClose={close}
    >
      <Modal.Header>Delete Your { type }</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete this { type }</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={close}>
          No
        </Button>
        <Button positive onClick={onConfirm}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}