import React, { useContext, useEffect } from 'react';
import { Card, Image, Button, Item, Table, Menu, Input, Segment, Tab, Grid, Message } from 'semantic-ui-react';
import ProjectStore from '../../../app/stores/projectStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ProjectTab from '../../../frontpages/projectmanagement/bdod/ProjectTab';
import { Link } from 'react-router-dom';

interface DetailParams {
  id: string;
}

const ProjectDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const projectStore = useContext(ProjectStore);
  const { project, loadProject, deleteProjectTask, 
    loadProjectTasks, loadProjectVendors, loadTaskAssignments, loadTechnicians, loadProjectLogs, loadSORLists, loadThirdParties, loadWarehouseLogs, loadProjectStocks, loadingInitial, reload } = projectStore;

  useEffect(() => {
    loadProject(match.params.id);
    loadProjectTasks(match.params.id);
    loadProjectVendors(match.params.id);
    // loadTaskAssignments(match.params.id);
    loadTechnicians();
    loadProjectLogs(match.params.id);
    loadSORLists();
    loadThirdParties();
    loadWarehouseLogs(match.params.id);
    loadProjectStocks(match.params.id);
  }, [match.params.id]);

    // useEffect(() => {
    //   loadProjectTasks(match.params.id);
    //   }, []); 

      useEffect(() => {
        loadTaskAssignments(match.params.id);
        }, [reload]); 

  if (loadingInitial || !project) return <LoadingComponent content='Loading Project ...' /> 
  
  //    if (projectStore.loadingInitial)
  // return <LoadingComponent content='Loading Tasks' />;

  return (
    <Segment>
      <Grid>
      <Grid.Column width={10}>
      <span style={{color: 'blue', backgroundColor: 'red', fontSize:16}}>
        Project Code:&nbsp;&nbsp;&nbsp;</span> {project!.projectCode}<br></br>
      <span style={{color: 'blue'}}>Order Number:&nbsp;&nbsp;&nbsp;</span> {project!.orderNumber}<br></br>
      &nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: 'blue'}}>Create Time:&nbsp;&nbsp;&nbsp;</span> {project!.createdAt}<br></br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: 'blue'}}>Job Type:&nbsp;&nbsp;&nbsp;</span> {project!.jobType}<br></br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: 'blue'}}>Address:&nbsp;&nbsp;&nbsp;</span> {project!.address}<br></br>
        
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: 'blue'}}>Remark:&nbsp;&nbsp;&nbsp;</span> {project!.remark}<br></br>  
        </Grid.Column>
        <Grid.Column width={6}>
      <span style={{color: 'blue'}}>Material Order No:&nbsp;&nbsp;&nbsp;</span> {project!.materialOrderNo}<br></br>
      <span style={{color: 'blue'}}>Job Start Date:&nbsp;&nbsp;&nbsp;</span> {project!.jobStartDate}<br></br>
      <span style={{color: 'blue'}}>Estimated Completion Date:&nbsp;&nbsp;&nbsp;</span> {project!.estimatedCompletionDate}<br></br>
      <span style={{color: 'blue'}}>Start Time:&nbsp;&nbsp;&nbsp;</span> {project!.startTime}<br></br>
      <span style={{color: 'blue'}}>End Time:&nbsp;&nbsp;&nbsp;</span> {project!.endTime}<br></br>
      <span style={{color: 'blue'}}>Invoice No.:&nbsp;&nbsp;&nbsp;</span> {project!.invoiceNo}<br></br> 
           <Button
            onClick={() => history.push('/projectmanagement/project')}
            color='grey'
            floated='right'
            content='Cancel'
          />
          <Button
            as={Link} to={`/projectmanagement/project-edit/${project.id}`}
            color='blue'
            floated='right'
            content='Edit'
          />
          
        </Grid.Column>
      </Grid>
    
    <ProjectTab />
    </Segment>
  );
};

export default observer(ProjectDetails);
