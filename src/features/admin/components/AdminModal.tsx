import { FC } from "react";
import { ModalData } from "../AdminModels";
import { setModalData } from "../AdminSlice";
import { Modal, Button } from 'semantic-ui-react';
import { listCategory } from "../../shared/SharedAPI";
import { deleteCategory, deleteCategoryItem } from "../AdminAPI";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";

export const AdminModal: FC<ModalData> = ({ isOpen, type, action, data }) => {
  const dispatch = useAppDispatch();
  const { modalData } = useAppSelector((state: any) => state.admin);

  const updateData = async () => {
    await dispatch(listCategory());
    dispatch(setModalData({ isOpen: false }))
  }

  const onConfirm = async () => {
    if (modalData.type === 'category' && modalData.action === 'delete') {
      await dispatch(deleteCategory(modalData.data.categoryId))
      updateData();
    } else if (modalData.type === 'item' && modalData.action === 'delete') {
      await dispatch(deleteCategoryItem({ 
        categoryId: modalData.data.categoryId,
        itemId: modalData.data.itemId 
      }));
      updateData();
    }
  }

  return (
    <Modal
      size="mini"
      open={isOpen}
      onClose={() => { dispatch(setModalData({ isOpen: false })) }}
    >
      <Modal.Header>Delete Your { type }</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete this { type }</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => { dispatch(setModalData({ isOpen: false })) }}>
          No
        </Button>
        <Button positive onClick={onConfirm}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}