import React, { useContext, useState, FormEvent } from 'react';
import { Tab, Grid, Header, Button, Table, Label, Form, Input, Segment, Item, Select } from 'semantic-ui-react';
import ProjectStore from '../../../app/stores/projectStore';
import ProjectSOREditForm from './ProjectSOREditForm';
import LoadingComponent from '../../../app/layout/LoadingComponent';
// import ProfileEditForm from './ProfileEditForm';
import { observer } from 'mobx-react-lite';
import { IProjectTask } from '../../../app/models/projecttask';

const SORTab = () => {
  const projectStore = useContext(ProjectStore);
  const {
    projectsByDate: projectsByDate,
    projecttasksByName: projecttasksByName,
    project,
    selectedProjectTask,
    deleteProject: deleteProject,
    loadProjectTasks: loadProjectTasks,
    createProjectTask,
    deleteProjectTask,
    editProjectTask,
    selectProjectTask,
    sorlistsByName,
    submitting,
    editMode,
    target } = projectStore;

  const [projecttask, setProjectTask] = useState<IProjectTask>({
    id: '',
    createdAt: '',
    updatedAt: '',
    projectId: project!.id,
    itemName: '',
    itemDescription: '',
    itemCategory: '',
    unitRate: 0,
    orderQty: 0,
    claimedQty: 0,
    currentValue: 0,
    remark: ''
  });

  const sorOptions = sorlistsByName.map(function (sor) {
    var option = { "key": sor.name, "text": sor.name, "value": sor.name }
    return option;
  }
  );

  const handleSubmit = () => {
      createProjectTask(projecttask).then(() => loadProjectTasks(projecttask.projectId));
  };


  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setProjectTask({ ...projecttask, [name]: value });
  };

  return (
    <Tab.Pane>

      <Grid>
        <Grid.Column width={16}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Field inline >
                <label>Item Id</label>
                <Select
                  required
                  onChange={(e, { name, value }) => setProjectTask({ ...projecttask, [name]: value })}
                  options={sorOptions}
                  search
                  name='itemName'
                  placeholder='Item Id'
                  value={projecttask.itemName} />
              </Form.Field>
              <Form.Field inline >
                <label>Order Qty</label>
                <Input
                  onChange={handleInputChange}
                  name='orderQty'
                  placeholder='Order Qty'
                  value={projecttask.orderQty} />
              </Form.Field>
              <Form.Field inline>
                <label>Claimed Qty</label>
                <Input
                  onChange={handleInputChange}
                  name='claimedQty'
                  placeholder='Claimed Qty'
                  value={projecttask.claimedQty} />
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
            <Table.HeaderCell>Item Id</Table.HeaderCell>
            <Table.HeaderCell>Item Description</Table.HeaderCell>
            <Table.HeaderCell>Item Category</Table.HeaderCell>
            <Table.HeaderCell>Unit Rate ($)</Table.HeaderCell>
            <Table.HeaderCell>Order Qty</Table.HeaderCell>
            <Table.HeaderCell>Claimed Qty</Table.HeaderCell>
            <Table.HeaderCell>Current Value ($)</Table.HeaderCell>
            <Table.HeaderCell>Remark</Table.HeaderCell>
            <Table.HeaderCell width={1}>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {projecttasksByName.map(projecttask => (

            <Table.Row key={projecttask.id}>
              <Table.Cell>
                <Label>{projecttask.itemName}</Label>
              </Table.Cell>
              <Table.Cell>{projecttask.itemDescription}</Table.Cell>
              <Table.Cell>{projecttask.itemCategory}</Table.Cell>
              <Table.Cell> {projecttask.unitRate}</Table.Cell>
              <Table.Cell>{projecttask.orderQty}</Table.Cell>
              <Table.Cell>{projecttask.claimedQty}</Table.Cell>
              <Table.Cell>{projecttask.currentValue}</Table.Cell>
              <Table.Cell>{projecttask.remark}</Table.Cell>
              <Table.Cell>
                <Button.Group size='mini'>
                  <Button
                  onClick={() => selectProjectTask(projecttask.id)}
                    size='mini'
                    content='Edit'
                    color='blue'
                  />
                  <Button
                    name={projecttask.id}
                    size='mini'
                    loading={target === projecttask.id && submitting}
                    onClick={(e) => deleteProjectTask(e, projecttask.id)}
                    content='Delete'
                    color='red'
                  />
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {selectedProjectTask && editMode && (
          <ProjectSOREditForm />
        )}
   
    </Tab.Pane>
  );
};

export default observer(SORTab);
