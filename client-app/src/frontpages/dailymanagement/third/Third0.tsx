import React, { useContext } from 'react';
import { Item, Button, Label, Segment, Table, Menu, Icon } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ThirdStore from '../../../app/stores/ThirdStore';
import { Link } from 'react-router-dom';

const Third0: React.FC = () => {
  const thirdStore0 = useContext(ThirdStore);
  const {ThirdPartiesByName: ThirdPartiesByName,  deleteThirdParty: deleteThirdParty, submitting, target} = thirdStore0;
  return (
    <Segment clearing>
      <Table celled>
    <Table.Header>
      <Table.Row>
        {/* <Table.HeaderCell>Item Id</Table.HeaderCell>
        <Table.HeaderCell>Created Time</Table.HeaderCell>
        <Table.HeaderCell>Updated Time</Table.HeaderCell> */}
        <Table.HeaderCell>CompanyName</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>ContactPerson</Table.HeaderCell>
        <Table.HeaderCell>Phone</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        {/* <Table.HeaderCell>Status</Table.HeaderCell> */}
        {/* <Table.HeaderCell>Project</Table.HeaderCell> */}
        <Table.HeaderCell width={1}>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {ThirdPartiesByName.map(thirdlist => (
      
      <Table.Row key={thirdlist.companyName}>
        {/* <Table.Cell>{thirdlist.Id}</Table.Cell>
        <Table.Cell>{thirdlist.createdAt}</Table.Cell>
        <Table.Cell> {thirdlist.updatedAt}</Table.Cell> */}
        <Table.Cell>{thirdlist.companyName}</Table.Cell>
        <Table.Cell>{thirdlist.type}</Table.Cell>
        <Table.Cell>{thirdlist.contactPerson}</Table.Cell>
        <Table.Cell>{thirdlist.phone}</Table.Cell>
        <Table.Cell>{thirdlist.email}</Table.Cell>
        {/* <Table.Cell>{thirdlist.status}</Table.Cell> */}
        {/* <Table.Cell>{thirdlist.project}</Table.Cell> */}
        <Table.Cell>
        <Button.Group size='mini'>
          {/* link to detail and edit */}
                <Button
                  as={Link}
                  to={`/dailymanagement/third/${thirdlist.companyName}`}
                  size='mini'
                  // content='View'
                  color='blue'
                  icon = 'edit'
                />
          {/* link to delete
                <Button
                name={thirdlist.name}
                size='mini'
                loading={target === thirdlist.id && submitting}
                onClick={(e) => deleteThirdParty(e, thirdlist.name)}
                // content='Delete'
                icon = 'add'
                color='green'
              /> */}
          {/* link to delete */}
                <Button
                  name={thirdlist.companyName}
                  size='mini'
                  loading={target === thirdlist.companyName && submitting}
                  onClick={(e) => deleteThirdParty(e, thirdlist.companyName)}
                  // content='Delete'
                  icon = 'delete'
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

export default observer(Third0);
