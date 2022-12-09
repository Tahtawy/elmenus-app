import { FC } from "react";
import { Item as ItemModel } from '../../shared/SharedModels';
import { Segment, Item, Message } from 'semantic-ui-react';

type ItemsListProps = {
  items: ItemModel[];
}

export const ItemsList: FC<ItemsListProps> = ({ items }) => {
  return (
    <Item.Group divided>
      {
        items ? (
          items.map((item: ItemModel) => {
            return (
              <Item key={item.id}>
                <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' />

                <Item.Content>
                  <Item.Header as='a'>{ item.name }</Item.Header>
                  <Item.Description>
                    <p>{ item.description }</p>
                  </Item.Description>
                  <Item.Extra>
                    <div>
                      <Segment textAlign="center" color="orange" floated="right" inverted>{ `${item.price} EGP` }</Segment>
                    </div>
                  </Item.Extra>
                </Item.Content>
              </Item>
            )
          })
        )
        : (
          <Message>
            <p>
              Please select category!
            </p>
          </Message>
        )
      }
    </Item.Group>
  )
}