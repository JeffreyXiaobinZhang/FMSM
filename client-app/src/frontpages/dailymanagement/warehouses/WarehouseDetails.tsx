import React, { useContext, useEffect } from 'react';
import { Card, Image, Button, Table } from 'semantic-ui-react';
import WarehouseStore from '../../../app/stores/warehouseStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom';

interface DetailParams {
  id: string;
}

const WarehouseDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const warehouseStore = useContext(WarehouseStore);
  const {
    warehouse,
    loadWarehouse,
    loadingInitial
  } = warehouseStore;

  useEffect(() => {
    loadWarehouse(match.params.id);
  }, [loadWarehouse, match.params.id]);

   if (loadingInitial || !warehouse) return <LoadingComponent content='Loading Warehouse ...' /> 

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${warehouse!.partNo}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Item ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {warehouse!.name}</Card.Header>
        <Table definition>
    <Table.Body>
      <Table.Row>
        <Table.Cell collapsing>Name</Table.Cell>
        <Table.Cell> {warehouse!.name} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Stock</Table.Cell>
        <Table.Cell> {warehouse!.stock} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Price</Table.Cell>
        <Table.Cell> {warehouse!.price} </Table.Cell>
      </Table.Row><Table.Row>
        <Table.Cell collapsing>Description</Table.Cell>
        <Table.Cell> {warehouse!.description} </Table.Cell>
      </Table.Row><Table.Row>
        <Table.Cell collapsing>Supplier</Table.Cell>
        <Table.Cell> {warehouse!.supplier} </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to={`/dailymanagement/warehouse-edit/${warehouse.id}`}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={() => history.push('/dailymanagement/warehouse')}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(WarehouseDetails);
