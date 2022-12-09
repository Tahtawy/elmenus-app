import { FC } from 'react';
import { Message, Grid } from 'semantic-ui-react'

type ErrorPageProps = {
  message: string;
}

export const ErrorPage: FC<ErrorPageProps> = ({ message }) => {
  return (
    <Grid centered>
      <Grid.Column width={6}>
        <Message negative>
          <p>{ message }</p>
        </Message>
      </Grid.Column>
    </Grid>
  )
}