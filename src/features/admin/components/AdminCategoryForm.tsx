import { FC } from 'react';
import { setModalData } from '../AdminSlice';
import { Formik, ErrorMessage } from 'formik';
import { AddCategoryAPIBody } from '../AdminModels';
import { listCategory } from '../../shared/SharedAPI';
import { initialAddCategory } from '../AdminConstants';
import { addCategory, editCategory } from '../AdminAPI';
import { Button, Form, Divider, Segment } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';

type AdminCategoryFormProps = {
  initialValue: AddCategoryAPIBody;
  mode: 'add' | 'edit';
  id?: string;
}

export const AdminCategoryForm: FC<AdminCategoryFormProps> = ({
  initialValue,
  mode,
  id = ''
}) => {
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
      if (mode === 'add') {
        await dispatch(addCategory(values));
        resetForm({ values: initialAddCategory });
      } else {
        await dispatch(editCategory({
          categoryId: modalData.data.categoryId,
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
      <Formik
        validateOnMount={true}
        initialValues={initialValue}
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
              { mode === 'add' ? 'Save' : 'Update' }
            </Button>
          </Segment>
        </Form>
      )}
      </Formik>
    </>
  )
}