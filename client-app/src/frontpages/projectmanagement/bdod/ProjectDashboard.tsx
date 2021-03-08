import React, { useState, useContext, useEffect } from 'react';
import { Grid, Segment, Dropdown, Button } from 'semantic-ui-react';
import ProjectList from './ProjectList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ProjectStore from '../../../app/stores/projectStore';

const ProjectDashboard: React.FC = () => {
  const projectStore = useContext(ProjectStore);
  const {loadProjectsStatus: loadProjectStatus} = projectStore;
  const status = [
    { key: 'started', text: 'Started', value: 'started' },
    { key: 'on-going', text: 'On-going', value: 'on-going' },
    { key: 'completed', text: 'Completed', value: 'completed' }
  ];

  const [currentStatus, setStatus]: any = useState('all');

  useEffect(() => {
    projectStore.loadProjects();
  }, [projectStore]);

  if (projectStore.loadingInitial)
  return <LoadingComponent content='Loading Projects' />;

  return (
    <Segment>
      <Dropdown
   // width={5}
    placeholder='Select Project Status'
    // floating
    onChange={(e, { value }) => setStatus(value)}
    selection
    options={status}
  //  value={currentStatus}
     />
     <Button
   //  onClick={() => selectProject(currentStatus)}
     onClick={(e) => loadProjectStatus(e, currentStatus)}
     content='Submit'
     color='green'
     />
    <Grid>
      <Grid.Column width={14}>
        <ProjectList />
      </Grid.Column>
      <Grid.Column width={2}>
      <h2></h2>
      </Grid.Column>
    </Grid>
    </Segment>
  );
};

export default observer(ProjectDashboard);
