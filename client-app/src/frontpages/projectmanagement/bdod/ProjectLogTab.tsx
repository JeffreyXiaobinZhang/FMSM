import React, { useContext, useState, FormEvent } from 'react';
import { Tab, Grid, Header, Button, Table, Label, Form, Input, Segment, Item } from 'semantic-ui-react';
import ProjectStore from '../../../app/stores/projectStore';
import ProjectSOREditForm from './ProjectSOREditForm';
import LoadingComponent from '../../../app/layout/LoadingComponent';
// import ProfileEditForm from './ProfileEditForm';
import { observer } from 'mobx-react-lite';
import { IProjectLog } from '../../../app/models/projectlog';

const ProjectLogTab = () => {
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
    loadProjectLogs,
    createProjectLog,
    projectlogsByDate,
    submitting,
    editMode,
    target } = projectStore;

  const [projectlog, setProjectLog] = useState<IProjectLog>({
    id: '',
    createdAt: '',
    updatedAt: '',
    projectId: project!.id,
    notes: ''
  });

  const handleSubmit = () => {
     !addMode && projectlog.notes && createProjectLog(projectlog).then(() => loadProjectLogs(projectlog.projectId));
  };

  const [addMode, setAddMode] = useState(false);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setProjectLog({ ...projectlog, [name]: value });
  };

  return (
    <Tab.Pane>

      <Grid>
        <Grid.Column width={16}>
          <Form onSubmit={handleSubmit}>
       
              <Button
                loading={submitting}
                floated='right'
                positive
                type='submit'
                content={addMode ? 'Submit' : 'Add'}
                onClick={() => setAddMode(!addMode)}
              />
              {addMode && 
            <Form.TextArea
            label='Notes'
            onChange={handleInputChange}
            name='notes'
            rows={2}
            placeholder='Notes'
            value={projectlog.notes}
          />
          }
   
          </Form>

        </Grid.Column>
      </Grid>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={3}>Date</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {projectlogsByDate.map(projectlog => (

            <Table.Row key={projectlog.id}>
              <Table.Cell>
                <Label>{projectlog.createdAt.substr(0,19)}</Label>
              </Table.Cell>
              <Table.Cell>{projectlog.notes}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
   
    </Tab.Pane>
  );
};

export default observer(ProjectLogTab);
