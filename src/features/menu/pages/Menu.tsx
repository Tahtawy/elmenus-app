import { FC, useMemo, useEffect } from "react";
import { setFiltredCategory } from '../MenuSlice';
import { CategorySelectItem } from '../MenuModels';
import { Container, Grid } from 'semantic-ui-react';
import { ItemsList } from "../components/ItemsList";
import { Category } from '../../shared/SharedModels';
import { listCategory } from "../../shared/SharedAPI";
import { MenuCategories } from "../components/MenuCategories";
import { useAppDispatch, useAppSelector } from '../../shared/hooks';


export const Menu: FC = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state: any) => state.shared);
  const { selectedCategory, filtredCategory } = useAppSelector((state: any) => state.menu);

  useEffect(() => {
    dispatch(listCategory());
  }, []);

  useEffect(() => {
    if (selectedCategory)
      dispatch(setFiltredCategory({ categories, selectedCategory }));
  }, [selectedCategory]);

  const categoryNames: CategorySelectItem[] = useMemo(() => {
    const names = categories.map((category: Category) => {
      return { name: category.name, id: category.id }
    });
    return names;
  }, [categories]);

  return (
    <Container className="menu_wrapper">
      <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <MenuCategories categoryNames={categoryNames} />
            </Grid.Column>
            <Grid.Column width={12}>
              <ItemsList items={filtredCategory.items} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    </Container>
  )
}
