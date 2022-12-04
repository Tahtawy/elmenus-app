import { FC } from "react";
import { Accordion, Header } from "semantic-ui-react";
import AdminAccordationItem from "./AdminAccordationItem";
import { Category, Item } from '../../shared/SharedModels';
import { AdminAddCategoryItem } from "./AdminAddCategoryItem";

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
          <AdminAddCategoryItem categoryId={category.id} />
          {
            category.items.length && (
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