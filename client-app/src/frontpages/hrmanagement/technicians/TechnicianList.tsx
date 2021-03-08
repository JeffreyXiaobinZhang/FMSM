import React, { useContext } from 'react';
import { Item, Button, Label, Segment, Table, Menu, Icon } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import TechnicianStore from '../../../app/stores/technicianStore';
import { Link } from 'react-router-dom';

const Technician: React.FC = () => {
  const technicianStore = useContext(TechnicianStore);
  const {techniciansByName: techniciansByName,  deleteTechnician: deleteTechnician, submitting, target} = technicianStore;
  return (
    <Segment clearing>
      <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell width={1}>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {techniciansByName.map(technician => (
      
      <Table.Row key={technician.id}>
        <Table.Cell>
          <Label>{technician.name}</Label>
        </Table.Cell>
        <Table.Cell>{technician.email}</Table.Cell>
        <Table.Cell>{technician.type}</Table.Cell>
        <Table.Cell>
        <Button.Group vertical size='mini'>
                <Button
                  as={Link}
                  to={`/hrmanagement/technician/${technician.id}`}
                  size='mini'
                  content='View'
                  color='blue'
                />
                <Button
                  name={technician.id}
                  size='mini'
                  loading={target === technician.id && submitting}
                  onClick={(e) => deleteTechnician(e, technician.id)}
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

export default observer(Technician);
