import { FC } from "react";
import { initialAddItem } from '../AdminConstants';
import { Accordion, Header } from "semantic-ui-react";
import AdminAccordationItem from "./AdminAccordationItem";
import { Category, Item } from '../../shared/SharedModels';
import { AdminCategoryItemForm } from "./AdminCategoryItemForm";

type CategoryAccordionProps = {
  category: Category;
  index: number;
}

export const AdminCategoryItem: FC<CategoryAccordionProps> = ({
  category,
  index
}) => {
  return (
    <>
      <AdminAccordationItem
        type="category"
        index={index}
        categoryId={category.id}
        name={category.name}
        description={category.description}>
        
        <AdminAccordationItem.AdditionalContent>
          <AdminCategoryItemForm
            mode="add"
            categoryId={category.id}
            initialValue={initialAddItem} />
          {
            Boolean(category.items.length) && (
              <Header as="h3">
                Menu items
              </Header>
            )
          }
          {
            category.items.map((item: Item, index: number) => {
              return (
                <Accordion key={item.id} styled fluid>
                  <AdminAccordationItem
                    type="item"
                    index={index}
                    categoryId={category.id}
                    itemId={item.id}
                    name={item.name}
                    price={item.price}
                    description={item.description} />
                </Accordion>
              )
            })
          }
        </AdminAccordationItem.AdditionalContent>

      </AdminAccordationItem>
    </>
  )
}