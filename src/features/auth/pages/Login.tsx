import { FC } from "react";
import { login } from '../AuthAPI';
import { LoginAPIBody } from '../AuthModels';
import { Formik, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { initialLoginValue } from '../AuthConstants';
import { useAppDispatch } from '../../../features/core/hooks/redux';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';

export const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validateLogin = (values: LoginAPIBody) => {
    const errors: LoginAPIBody = {} as LoginAPIBody;
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    return errors;
  }

  const onSubmitLogin = async (values: LoginAPIBody) => {
    try {
      await dispatch(login(values));
      navigate('/menu');
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='red' textAlign='center'>
          <Image src='/assets/logo.webp' /> Log-in to your account
        </Header>
        <Formik
          initialValues={initialLoginValue}
          validate={validateLogin}
          onSubmit={onSubmitLogin}>

        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form size='large' onSubmit={handleSubmit}>
            <Segment>
              <Form.Input
                fluid
                name="email"
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <ErrorMessage name="email" component="div" />
              <Form.Input
                fluid
                name="password"
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <ErrorMessage name="password" component="div" />

              <Button type="submit" color='red' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
        )}
        </Formik>
      </Grid.Column>
    </Grid>
  );
}