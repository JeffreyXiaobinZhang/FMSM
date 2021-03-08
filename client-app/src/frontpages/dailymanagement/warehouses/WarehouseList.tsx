import React, { useContext } from 'react';
import { Item, Button, Label, Segment, Table, Menu, Icon } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import WarehouseStore from '../../../app/stores/warehouseStore';
import { Link } from 'react-router-dom';

const Warehouse: React.FC = () => {
  const warehouseStore = useContext(WarehouseStore);
  const {warehousesByPartNo: warehousesByPartNo,  deleteWarehouse: deleteWarehouse, submitting, target} = warehouseStore;
  return (
    <Segment clearing>
      <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Part No</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Stock</Table.HeaderCell>
        <Table.HeaderCell>Price ($)</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
        <Table.HeaderCell width={1}>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {warehousesByPartNo.map(warehouse => (
      
      <Table.Row key={warehouse.id}>
        <Table.Cell>
          <Label>{warehouse.partNo}</Label>
        </Table.Cell>
        <Table.Cell>{warehouse.name}</Table.Cell>
        <Table.Cell>{warehouse.stock}</Table.Cell>
        <Table.Cell>{warehouse.price}</Table.Cell>
        <Table.Cell>{warehouse.description}</Table.Cell>
        <Table.Cell>
        <Button.Group vertical size='mini'>
                <Button
                  as={Link}
                  to={`/dailymanagement/warehouse/${warehouse.id}`}
                  size='mini'
                  content='View'
                  color='blue'
                />
                <Button
                  name={warehouse.id}
                  size='mini'
                  loading={target === warehouse.id && submitting}
                  onClick={(e) => deleteWarehouse(e, warehouse.id)}
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

export default observer(Warehouse);
