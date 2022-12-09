import { FC } from "react";
import { ModalData } from "../AdminModels";
import { setModalData } from "../AdminSlice";
import { Modal, Button } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { deleteCategoryAPI, deleteCategoryItemAPI } from "../AdminAPI";
import { deleteCategories, deleteCategoryItem } from "../../shared/SharedSlice";

export const AdminDeleteModal: FC<ModalData> = ({ type, action }) => {
  const dispatch = useAppDispatch();
  const { modalData } = useAppSelector((state: any) => state.admin);

  const close = () => {
    dispatch(setModalData({ action: 'close' }));
  }

  const onConfirm = async () => {
    if (modalData.type === 'category') {
      await dispatch(deleteCategoryAPI(modalData.data.categoryId));
      dispatch(deleteCategories({ index: modalData.data.index }));
    } else if (modalData.type === 'item') {
      await dispatch(deleteCategoryItemAPI({ 
        categoryId: modalData.data.categoryId,
        itemId: modalData.data.itemId 
      }));
      const { index, parentIndex } = modalData.data;
      dispatch(deleteCategoryItem({ index, parentIndex }));
    }
    dispatch(setModalData({ action: 'add' }));
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