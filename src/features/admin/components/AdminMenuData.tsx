import { FC, useEffect } from "react";
import { Header, Accordion } from 'semantic-ui-react';
import { Category } from "../../shared/SharedModels";
import { listCategory } from "../../shared/SharedAPI";
import { AdminCategoryItem } from "./AdminCategoryItem";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";

export const AdminMenuData: FC = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state: any) => state.shared) || [];

  useEffect(() => {
    dispatch(listCategory());
  }, []);

  return (
    <>
      <Header as='h2' color='teal'>
        Menu Data
      </Header>
      <Accordion styled fluid>
        {
          categories.map((category: Category, index: number) => {
            return (
              <AdminCategoryItem key={category.id} category={category} index={index} />
            )
          })
        }
      </Accordion>
    </>
  )
}