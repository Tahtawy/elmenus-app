import { FC } from "react";
import { listCategory } from '../../shared/SharedAPI';
import { addCategoryItem } from '../AdminAPI';
import { Formik, ErrorMessage } from 'formik';
import { AddCategoryItemFormValues } from '../AdminModels';
import { initialAddItem } from '../AdminConstants';
import { useAppDispatch } from '../../shared/hooks';
import { Button, Grid, Form, Header, Divider, Segment } from 'semantic-ui-react';

type AdminAddCategoryItem = {
  categoryId: string;
}

export const AdminAddCategoryItem: FC<AdminAddCategoryItem> = ({
  categoryId
}) => {
  const dispatch = useAppDispatch();

  const validateAddCategory = (values: AddCategoryItemFormValues) => {
    const errors: AddCategoryItemFormValues = {} as AddCategoryItemFormValues;
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

  const onSubmitAddCategory = async (values: AddCategoryItemFormValues, { resetForm }: any) => {
    try {
      await dispatch(addCategoryItem({
        ...values,
        categoryId
      }));
      resetForm({ values: initialAddItem });
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
        initialValues={initialAddItem}
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