import { FC, ReactNode, useState } from "react";
import { Accordion, Icon, Segment, Divider, Button, Grid } from 'semantic-ui-react';

interface AdditionalContentProps {
  children: ReactNode;
}

interface AdminAccordationItemProps {
  name: string;
  description: string;
  index: number;
  for: 'category' | 'item';
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
  name,
  description,
  index,
  children,
  price = null
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex);
  };

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
              <Button positive><Icon name="pencil"></Icon></Button>
              <Button.Or />
              <Button negative><Icon name="trash"></Icon></Button>
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

