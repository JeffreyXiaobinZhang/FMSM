import React, { useContext, useEffect } from 'react';
import { Card, Image, Button, Table } from 'semantic-ui-react';
import TechnicianStore from '../../../app/stores/technicianStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom';

interface DetailParams {
  id: string;
}

const TechnicianDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const technicianStore = useContext(TechnicianStore);
  const {
    technician,
    loadTechnician,
    loadingInitial
  } = technicianStore;

  useEffect(() => {
    loadTechnician(match.params.id);
  }, [loadTechnician, match.params.id]);

   if (loadingInitial || !technician) return <LoadingComponent content='Loading Technician ...' /> 

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${technician!.name}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Item ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {technician!.name}</Card.Header>
        <Table definition>
    <Table.Body>
      <Table.Row>
        <Table.Cell collapsing>Email</Table.Cell>
        <Table.Cell> {technician!.email} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Type</Table.Cell>
        <Table.Cell> {technician!.type} </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to={`/hrmanagement/technician-edit/${technician.id}`}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={() => history.push('/hrmanagement/technician')}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(TechnicianDetails);
