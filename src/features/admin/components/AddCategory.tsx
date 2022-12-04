import { FC } from 'react';
import { addCategory } from '../AdminAPI';
import { Formik, ErrorMessage } from 'formik';
import { AddCategoryAPIBody } from '../AdminModels';
import { initialAddCategory } from '../AdminConstants';
import { useAppDispatch } from '../../../features/core/hooks/redux';
import { Button, Form, Header, Divider, Segment } from 'semantic-ui-react';

export const AddCategory: FC = () => {
  const dispatch = useAppDispatch();

  const validateAddCategory = (values: AddCategoryAPIBody) => {
    const errors: AddCategoryAPIBody = {} as AddCategoryAPIBody;
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.description) {
      errors.description = 'Description is required';
    }
    return errors;
  }

  const onSubmitAddCategory = async (values: AddCategoryAPIBody, { resetForm }: any) => {
    try {
      await dispatch(addCategory(values));
      resetForm({ values: initialAddCategory })
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header as='h2' color='teal'>
        Add Category
      </Header>
      <Formik
        initialValues={initialAddCategory}
        validate={validateAddCategory}
        onSubmit={onSubmitAddCategory}>
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
                fluid
                name="description"
                placeholder='Description'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              <ErrorMessage name="description" component="div" />
            </Form.Field>
            
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
}