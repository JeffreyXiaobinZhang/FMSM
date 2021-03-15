import React, { useContext, useEffect } from 'react';
import { Card, Image, Button, Table } from 'semantic-ui-react';
// import SORListStore from '../../../app/stores/sorlistStore';
import ThirdStore from '../../../app/stores/ThirdStore';

import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom';

interface DetailParams {
  name:string;
}

const Thirddetail: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const thirdStore0 = useContext(ThirdStore);
  const {
    thirdparty,
    loadThirdParty,
    loadingInitial
  } = thirdStore0;

  useEffect(() => {
    loadThirdParty(match.params.name);
  }, [loadThirdParty, match.params.name]);

   if (loadingInitial || !thirdparty) return <LoadingComponent content='Loading thirddetails1212 ...' /> 

  return (
    <Card fluid>
      {/* 加上公司logo */}
      <Image
        src={`/assets/categoryImages/${thirdparty!.companyName}.jpg`}
        //！.表示该参数可以为null
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Item ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {thirdparty!.companyName}</Card.Header>
        <Table definition>
    <Table.Body>
      {/* <Table.Row>
        <Table.Cell collapsing>ID</Table.Cell>
        <Table.Cell> {thirdparty!.id} </Table.Cell>
      </Table.Row> */}
      <Table.Row>
        <Table.Cell collapsing>Company Name</Table.Cell>
        <Table.Cell> {thirdparty!.companyName} </Table.Cell>
      </Table.Row>
      {/* <Table.Row>
        <Table.Cell collapsing>Status</Table.Cell>
        <Table.Cell> {thirdparty!.status} </Table.Cell>
      </Table.Row> */}
      <Table.Row>
        <Table.Cell collapsing>Type</Table.Cell>
        <Table.Cell> {thirdparty!.type} </Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell collapsing>Contact Person</Table.Cell>
        <Table.Cell> {thirdparty!.contactPerson} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Phone</Table.Cell>
        <Table.Cell> {thirdparty!.phone} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Email</Table.Cell>
        <Table.Cell> {thirdparty!.email} </Table.Cell>
      </Table.Row>
      {/* <Table.Row>
        <Table.Cell collapsing>Project</Table.Cell>
        <Table.Cell> {thirdparty!.project} </Table.Cell>
      </Table.Row> */}

      <Table.Row>
        <Table.Cell collapsing>Create Time</Table.Cell>
        <Table.Cell> {thirdparty!.createdAt} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Update Time</Table.Cell>
        <Table.Cell> {thirdparty!.updatedAt} </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link}
            to={`/dailymanagement/third-edit/${thirdparty.companyName}`}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={() => history.push('/dailymanagement/third')}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(Thirddetail);
