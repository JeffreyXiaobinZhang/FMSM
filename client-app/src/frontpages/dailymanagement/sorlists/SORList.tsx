import React, { useContext } from 'react';
import { Item, Button, Label, Segment, Table, Menu, Icon } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import SORListStore from '../../../app/stores/sorlistStore';
import { Link } from 'react-router-dom';

const SORList: React.FC = () => {
  const sorlistStore = useContext(SORListStore);
  const {sorlistsByName: sorlistsByName,  deleteSORList: deleteSORList, submitting, target} = sorlistStore;
  return (
    <Segment clearing>
      <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Item Id</Table.HeaderCell>
        <Table.HeaderCell>Job Type</Table.HeaderCell>
        <Table.HeaderCell>Category</Table.HeaderCell>
        <Table.HeaderCell>Unit Rate</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>UOM</Table.HeaderCell>
        <Table.HeaderCell width={1}>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {sorlistsByName.map(sorlist => (
      
      <Table.Row key={sorlist.name}>
        <Table.Cell>
          <Label>{sorlist.name}</Label>
        </Table.Cell>
        <Table.Cell>{sorlist.jobType}</Table.Cell>
        <Table.Cell>{sorlist.category}</Table.Cell>
        <Table.Cell> {sorlist.unitRate}</Table.Cell>
        <Table.Cell>{sorlist.type}</Table.Cell>
        <Table.Cell>{sorlist.uom}</Table.Cell>
        <Table.Cell>
        <Button.Group vertical size='mini'>
                <Button
                  as={Link}
                  to={`/dailymanagement/sorlist/${sorlist.name}`}
                  size='mini'
                  content='View'
                  color='blue'
                />
                <Button
                  name={sorlist.name}
                  size='mini'
                  loading={target === sorlist.id && submitting}
                  onClick={(e) => deleteSORList(e, sorlist.name)}
                  content='Delete'
                  color='red'
                />
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    ))}
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='6'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
    </Segment>
  );
};

export default observer(SORList);
