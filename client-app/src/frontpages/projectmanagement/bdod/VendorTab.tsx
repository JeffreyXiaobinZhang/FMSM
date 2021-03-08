import React, { useContext, useState, FormEvent } from 'react';
import { Tab, Grid, Header, Button, Table, Label, Form, Input, Segment, Item, Select } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

// import { IProjectTask } from '../../../app/models/projecttask';
// import ProjectStore from '../../../app/stores/projectStore';
// import ProjectSOREditForm from './ProjectSOREditForm';
import LoadingComponent from '../../../app/layout/LoadingComponent';
// import ProfileEditForm from './ProfileEditForm';
import {IProjectVendor} from '../../../app/models/projectvendor';
import ProjectStore from '../../../app/stores/projectStore';
import ProjectVendorEditForm from './ProjectVendorEditForm';


const VendorTab = () => {
  const projectStore = useContext(ProjectStore);
  const {
    projectsByDate: projectsByDate,
    projectvendorsByName: projectvendorsByName,
    project,
    selectedProjectVendor,
    deleteProject: deleteProject,
    loadProjectVendors: loadProjectVendors,
    createProjectVendor,
    deleteProjectVendor,
    editProjectVendor,
    selectProjectVendor,
    sorlistsByName,
    ThirdPartiesByName,
    submitting,
    editMode,
    target } = projectStore;

    const initializeForm: IProjectVendor = {
      id: '',
      createdAt: '',
      updatedAt: '',
      projectId: project!.id,
      companyName: '',
      status: '',
      attachment: '',
      remark: '',
      phone: '',
      email: ''
    };

  const [projectvendor, setProjectVendor] = useState<IProjectVendor>({
    id: '',
    createdAt: '',
    updatedAt: '',
    projectId: project!.id,
    companyName: '',
    status: '',
    attachment: '',
    remark: '',
    phone: '',
    email: ''
  });

  const venderOptions = ThirdPartiesByName.map(function (aa) {
    var option = { "key": aa.companyName, "text": aa.companyName, "value": aa.companyName }
    return option;
  }
  );

  const handleSubmit = () => {
    createProjectVendor(projectvendor).then(() => loadProjectVendors(projectvendor.projectId)).then(() => initializeForm && setProjectVendor(initializeForm));
  };


  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setProjectVendor({ ...projectvendor, [name]: value });
  };

  const status = [
    { key: 'Applied', text: 'Applied', value: 'Applied' },
    { key: 'Approved', text: 'Approved', value: 'Approved' },
    { key: 'Booking', text: 'Booking', value: 'Booking' },
    { key: 'Booked', text: 'Booked', value: 'Booked' }
  ];

  return (
    <Tab.Pane>

      <Grid>
        <Grid.Column width={16}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Field inline >
                <label>Vendor Name</label>
                <Select
                  required
                  onChange={(e, { name, value }) => setProjectVendor({ ...projectvendor, [name]: value })}
                  options={venderOptions}
                  search
                  name='companyName'
                  placeholder='Vendor Name'
                  value={projectvendor.companyName} 
                  />
              </Form.Field>
              <Form.Field inline >
                <label>Status</label>
                <Select
                  required
                  onChange={(e, { name, value }) => setProjectVendor({ ...projectvendor, [name]: value })}
                  options={status}
                  search
                  name='status'
                  placeholder='Status'
                  value={projectvendor.status} />
              </Form.Field>
              <Form.Field inline >
                <label>Remark</label>
                <Input
                  onChange={handleInputChange}
                  name='remark'
                  placeholder='Remark'
                  value={projectvendor.remark} />
              </Form.Field>

              <Button
                loading={submitting}
                floated='right'
                positive
                type='submit'
                content='Add'
              />
            </Form.Group>
          </Form>

        </Grid.Column>
      </Grid>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Attachment</Table.HeaderCell>
            <Table.HeaderCell>Remark</Table.HeaderCell>
            <Table.HeaderCell width={1}>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {projectvendorsByName.map(projectvendor => (
            <Table.Row key={projectvendor.id}>
              <Table.Cell>
                <Label>{projectvendor.companyName}</Label>
              </Table.Cell>
              <Table.Cell>{projectvendor.phone}</Table.Cell>
              <Table.Cell>{projectvendor.email}</Table.Cell>
              <Table.Cell> {projectvendor.status}</Table.Cell>
              <Table.Cell>{projectvendor.attachment}</Table.Cell>
              <Table.Cell>{projectvendor.remark}</Table.Cell>
              <Table.Cell>
                <Button.Group size='mini'>
                  <Button
                  onClick={() => selectProjectVendor(projectvendor.id)}
                    size='mini'
                    content='Edit'
                    color='blue'
                  />
                  <Button
                    name={projectvendor.id}
                    size='mini'
                    loading={target === projectvendor.id && submitting}
                    onClick={(e) => deleteProjectVendor(e, projectvendor.id)}
                    content='Delete'
                    color='red'
                  />
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      
      {selectedProjectVendor && editMode && (
          <ProjectVendorEditForm />
        )}
   
    </Tab.Pane>
  );
};

export default observer(VendorTab);