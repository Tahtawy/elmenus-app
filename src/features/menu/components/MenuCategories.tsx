import { FC, useMemo, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { CategorySelectItem } from '../MenuModels';
import { setSelectedCategory } from '../MenuSlice';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';

type MenuCategoriesProps = {
  categoryNames: CategorySelectItem[]
}

export const MenuCategories: FC<MenuCategoriesProps> = ({ categoryNames }) => {
  const dispatch = useAppDispatch();
  const { selectedCategory } = useAppSelector((state: any) => state.menu);

  const onSelectCategory = (categorieName: string) => {
    dispatch(setSelectedCategory(categorieName));
  };

  return (
    <Menu size='massive' vertical fluid>
      <Menu.Item>
        <Menu.Header>Categories</Menu.Header>
        
        <Menu.Menu>
          {
            categoryNames.map((item: CategorySelectItem) => {
              return (
                <Menu.Item
                  key={item.id}
                  name={ item.name }
                  active={selectedCategory === item.name}
                  onClick={() => { onSelectCategory(item.name) }}
                />
              )
            })
          }
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  )
}

