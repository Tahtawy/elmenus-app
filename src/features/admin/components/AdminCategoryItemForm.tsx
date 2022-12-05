import { FC } from "react";
import { setModalData } from "../AdminSlice";
import { Formik, ErrorMessage } from 'formik';
import { initialAddItem } from '../AdminConstants';
import { listCategory } from '../../shared/SharedAPI';
import { CategoryItemFormValues } from '../AdminModels';
import { addCategoryItem, editCategoryItem } from '../AdminAPI';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { Button, Grid, Form, Header, Divider, Segment } from 'semantic-ui-react';

type AdminCategoryItemFormProps = {
  initialValue: CategoryItemFormValues;
  mode: 'add' | 'edit';
  categoryId?: string;
}

export const AdminCategoryItemForm: FC<AdminCategoryItemFormProps> = ({
  initialValue,
  mode,
  categoryId = ''
}) => {
  const dispatch = useAppDispatch();
  const { modalData } = useAppSelector((state: any) => state.admin);

  const validateCategoryItemForm = (values: CategoryItemFormValues) => {
    const errors: CategoryItemFormValues = {} as CategoryItemFormValues;
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.price) {
      errors.price = 'Price is required';
    }
    if (!values.description) {
      errors.description = 'Description is required';
    }
    return errors;
  }

  const onSubmitCategoryItemForm = async (values: CategoryItemFormValues, { resetForm }: any) => {
    try {
      if (mode === 'add') {
        await dispatch(addCategoryItem({
          ...values,
          categoryId
        }));
        resetForm({ values: initialAddItem });
      } else {
        await dispatch(editCategoryItem({
          categoryId: modalData.data.categoryId,
          itemId: modalData.data.itemId,
          data: values
        }));
        dispatch(setModalData({ action: 'close' }))
      }
      await dispatch(listCategory());
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header as='h3'>
        Add Category Item
      </Header>
      <Formik
        initialValues={initialValue}
        validate={validateCategoryItemForm}
        onSubmit={onSubmitCategoryItemForm}>
      {({
        values,
        dirty,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form size='large' onSubmit={handleSubmit}>
          <Segment>
            <Grid columns={3}>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Name <span className='required'>*</span></label>
                  <Form.Input
                    fluid
                    name="name"
                    placeholder='Name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <ErrorMessage name="name" component="div" />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Price <span className='required'>*</span></label>
                  <Form.Input
                    fluid
                    type="number"
                    name="price"
                    placeholder='Price'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                  />
                  <ErrorMessage name="price" component="div" />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={16}>
                <Form.Field>
                  <label>description <span className='required'>*</span></label>
                  <Form.TextArea
                    name="description"
                    placeholder='Description'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  <ErrorMessage name="description" component="div" />
                </Form.Field>
              </Grid.Column>
            </Grid>
            
            <Divider />

            <Button type="submit" disabled={!(isValid && dirty)}>
              Save
            </Button>
          </Segment>
        </Form>
      )}
      </Formik>
    </>
  )
};