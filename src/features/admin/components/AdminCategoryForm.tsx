import { FC, useEffect } from 'react';
import { setModalData } from '../AdminSlice';
import { Formik, ErrorMessage } from 'formik';
import { AddCategoryAPIBody } from '../AdminModels';
import { initialAddCategory } from '../AdminConstants';
import { addCategoryAPI, editCategoryAPI } from '../AdminAPI';
import { Button, Form, Divider, Segment } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { addCategory, editCategories } from '../../shared/SharedSlice';

export const AdminCategoryForm: FC = () => {
  const dispatch = useAppDispatch();
  const { modalData } = useAppSelector((state: any) => state.admin);

  const validateCategoryForm = (values: AddCategoryAPIBody) => {
    const errors: AddCategoryAPIBody = {} as AddCategoryAPIBody;
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.description) {
      errors.description = 'Description is required';
    }
    return errors;
  }
  
  const onSubmitCategoryForm = async (values: AddCategoryAPIBody, { resetForm }: any) => {
    try {
      let response: any;
      if (modalData.action === 'add') {
        response = await dispatch(addCategoryAPI(values));
        resetForm({ values: initialAddCategory });
        dispatch(addCategory(response.payload));
      } else {
        response = await dispatch(editCategoryAPI({
          categoryId: modalData.data.categoryId,
          data: values
        }));
        const { index } = modalData.data;
        dispatch(editCategories({ index , data: response.payload }))
        dispatch(setModalData({ action: 'add' }));
      }
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <>
      <Formik
        validateOnMount={true}
        initialValues={modalData.data.formData}
        validate={validateCategoryForm}
        onSubmit={onSubmitCategoryForm}>
      {({
        values,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form size='large' onSubmit={handleSubmit}>
          <Segment>
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
            
            <Divider />

            <Button type="submit" disabled={!(isValid)}>
              { modalData.action === 'add' ? 'Save' : 'Update' }
            </Button>
          </Segment>
        </Form>
      )}
      </Formik>
    </>
  )
}