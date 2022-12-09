import { FC, ReactNode, useState } from "react";
import { setModalData } from "../AdminSlice";
import { useAppDispatch } from "../../shared/hooks";
import { Accordion, Icon, Segment, Divider, Button, Grid } from 'semantic-ui-react';

interface AdditionalContentProps {
  children: ReactNode;
}

interface AdminAccordationItemProps {
  categoryId: string;
  itemId?: string;
  name: string;
  description: string;
  index: number;
  parentIndex?: number;
  type: 'category' | 'item';
  children?: ReactNode;
  price?: number | null;
}

interface CompoundComponetsProps {
  AdditionalContent: FC<AdditionalContentProps>;
}

const AdditionalContent: FC<AdditionalContentProps> = ({ children }) => {
  return <>{ children }</>
}

const AdminAccordationItem: FC<AdminAccordationItemProps> & CompoundComponetsProps = ({
  categoryId,
  itemId,
  name,
  description,
  type,
  index,
  parentIndex,
  children,
  price = null
}) => {
  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex);
  };

  const onOpenModal = (e: any, action: string) => {
    e.stopPropagation();
    let data: any = {};
    if (action === 'delete')
      data = { categoryId, itemId, index, parentIndex };
    else {
      if (type === 'category')
        data = { categoryId, itemId, index, formData: { name, description } };
      else
        data = { 
          categoryId,
          itemId,
          index,
          parentIndex,
          formData: { name, description, price } 
        };
    }

    dispatch(setModalData({
      isOpen: true,
      action,
      data,
      type
    }))
  }

  return (
    <>
      <Accordion.Title
        active={index === activeIndex}
        index={index}
        onClick={handleClick}
      >
        <Grid verticalAlign='middle' columns={2}>
          <Grid.Column floated='left'>
            <Icon name='dropdown' />
            { name }
          </Grid.Column>
          <Grid.Column floated='right'>
            <Button.Group floated="right">
              <Button onClick={
                (e) => { 
                  onOpenModal(e, 'edit') 
                }} positive><Icon name="pencil"></Icon></Button>
              <Button.Or />
              <Button onClick={
                (e) => { 
                  onOpenModal(e, 'delete') 
                }} negative>
                <Icon name="trash"></Icon>
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid>
      </Accordion.Title>

      <Accordion.Content active={index === activeIndex}>
        <Segment secondary>
          { description }
        </Segment>
        
          { 
            price && (
              <Grid className="price">
                <Grid.Column width={3} floated="right">
                  <Segment textAlign="center" inverted color="orange">{ `${price} EGP` }</Segment>
                </Grid.Column>
              </Grid>
            )
          }
        
        <Divider />
        { children }
      </Accordion.Content>
    </>
  )
}

AdminAccordationItem.AdditionalContent = AdditionalContent;

export default AdminAccordationItem;

