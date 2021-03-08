import React, { useContext, useEffect } from 'react';
import { Card, Image, Button, Table } from 'semantic-ui-react';
import SORListStore from '../../../app/stores/sorlistStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom';

interface DetailParams {
  id: string;
}

const SORListDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const sorlistStore = useContext(SORListStore);
  const {
    sorlist,
    loadSORList,
    loadingInitial
  } = sorlistStore;

  useEffect(() => {
    loadSORList(match.params.id);
  }, [loadSORList, match.params.id]);

   if (loadingInitial || !sorlist) return <LoadingComponent content='Loading SOR ...' /> 

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${sorlist!.name}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Item ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {sorlist!.name}</Card.Header>
        <Table definition>
    <Table.Body>
      <Table.Row>
        <Table.Cell collapsing>Job Type</Table.Cell>
        <Table.Cell> {sorlist!.jobType} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Category</Table.Cell>
        <Table.Cell> {sorlist!.category} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Description</Table.Cell>
        <Table.Cell> {sorlist!.description} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Unit Rate</Table.Cell>
        <Table.Cell> {sorlist!.unitRate} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Type</Table.Cell>
        <Table.Cell> {sorlist!.type} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>UOM</Table.Cell>
        <Table.Cell> {sorlist!.uom} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Remark</Table.Cell>
        <Table.Cell> {sorlist!.remark} </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to={`/dailymanagement/sorlist-edit/${sorlist.name}`}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={() => history.push('/dailymanagement/sorlist')}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(SORListDetails);
