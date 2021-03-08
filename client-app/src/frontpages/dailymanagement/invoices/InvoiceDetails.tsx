import React, { useContext, useEffect } from 'react';
import { Card, Image, Button, Table } from 'semantic-ui-react';
import InvoiceStore from '../../../app/stores/invoiceStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom';

interface DetailParams {
    id: string;
}

const InvoiceDetails: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history
}) => {
    const invoiceStore = useContext(InvoiceStore);
    const {
        invoice,
        loadInvoice,
        loadingInitial
    } = invoiceStore;

    useEffect(() => {
        loadInvoice(match.params.id);
    }, [loadInvoice, match.params.id]);

    if(loadingInitial || !invoice) 
        return <LoadingComponent content="Loading invoice ..." />
    
    return (
    <Card fluid>
      {/* <Image
        src={`/assets/categoryImages/${sorlist!.name}.jpg`}
        wrapped
        ui={false}
      /> */}
      <Card.Content>
        <Card.Header>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Item ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {invoice!.id}</Card.Header>
        <Table definition>
    <Table.Body>
      <Table.Row>
        <Table.Cell collapsing>Invoice Type</Table.Cell>
        <Table.Cell> {invoice!.invoiceType} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Invoice No</Table.Cell>
        <Table.Cell> {invoice!.invoiceNo} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Order No</Table.Cell>
        <Table.Cell> {invoice!.orderNo} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Issue Date</Table.Cell>
        <Table.Cell> {invoice!.issueDate} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Subtotal</Table.Cell>
        <Table.Cell> {invoice!.subtotal} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Location</Table.Cell>
        <Table.Cell> {invoice!.location} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Contract No</Table.Cell>
        <Table.Cell> {invoice!.contractNo} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Customer</Table.Cell>
        <Table.Cell> {invoice!.customer} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Payment Status</Table.Cell>
        <Table.Cell> {invoice!.paymentStatus} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Reference No</Table.Cell>
        <Table.Cell> {invoice!.referenceNo} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Remark</Table.Cell>
        <Table.Cell> {invoice!.remark} </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to={`/dailymanagement/invoice-edit/${invoice.id}`}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={() => history.push('/dailymanagement/invoice')}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
    );
};

export default observer(InvoiceDetails);
