import React, { useContext,useState } from 'react';
import { Item, Button, Label, Segment, Table, Menu, Icon, Tab, Confirm, Modal } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import InvoiceStroe from '../../../app/stores/invoiceStore';
import { Link } from 'react-router-dom';

const Invoice: React.FC = () => {
    
    const [open, setOpen] = useState(false);
    const invoiceStroe = useContext(InvoiceStroe);
    const {invoiceByDate: invoiceByDate, deleteInvoice: deleteInvoice, submitting, target} = invoiceStroe;
    return (
        <Segment clearing>
            <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Invoice Type</Table.HeaderCell>
                    <Table.HeaderCell>Invoice No</Table.HeaderCell>
                    <Table.HeaderCell>Issue Date</Table.HeaderCell>
                    <Table.HeaderCell>Subtotal</Table.HeaderCell>
                    <Table.HeaderCell>Location</Table.HeaderCell>
                    <Table.HeaderCell>Customer</Table.HeaderCell>
                    <Table.HeaderCell>Payment Staus</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
                
                <Table.Body>
                {invoiceByDate.map(invoice => (
                    <Table.Row key={invoice.id}>
                        <Table.Cell>{invoice.invoiceType}</Table.Cell>
                        <Table.Cell>{invoice.invoiceNo}</Table.Cell>
                        <Table.Cell>{invoice.issueDate}</Table.Cell>
                        <Table.Cell>{invoice.subtotal}</Table.Cell>
                        <Table.Cell>{invoice.location}</Table.Cell>
                        <Table.Cell>{invoice.customer}</Table.Cell>
                        <Table.Cell>{invoice.paymentStatus}</Table.Cell>
                        

                        <Table.Cell>
                        <Button.Group vertical size="mini">
                            <Button
                                as={Link}
                                to={`/dailymanagement/invoice/${invoice.id}`}
                                size="mini"
                                content="View"
                                color="blue"
                            />
                            <Modal 
                                style={{position: "relative", maxHeight: "150px"}}
                                open={open}
                                size= 'mini'
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}
                                trigger={<Button
                                    name={invoice.id}
                                    loading={target === invoice.id && submitting}
                                    //onClick={() => dispatch({type: "open", size: "mini"})}
                                    // onClick={(e) => deleteInvoice(e, invoice.id)}
                                    content="Delete"
                                    color = "red"
                                />}
                            >
                                <Modal.Content>
                                    <h6>Are you sure you want to delete this invoice ?</h6>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button size="tiny" onClick={() => setOpen(false)}>
                                    Cancel</Button>
                                    <Button size="tiny" color='red' onClick={(e) => deleteInvoice(e, invoice.id)}>
                                    Yes</Button>
                                </Modal.Actions>
                            </Modal>
                        </Button.Group>
                        </Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='9'>
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
            
    )
}
export default observer(Invoice);