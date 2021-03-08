import React, { Fragment, useContext, useEffect } from 'react';
import { Grid, Segment, Dropdown, Search } from 'semantic-ui-react';
import TechnicianList from './TechnicianList';
import { observer } from 'mobx-react-lite';
import TechnicianStore from '../../../app/stores/technicianStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import NavBarDaily from '../../dailymanagement/NavBarDaily';

const TechnicianDashboard: React.FC = () => {

  const technicianStore = useContext(TechnicianStore);

  useEffect(() => {
    technicianStore.loadTechnicians();
  }, [technicianStore]);

  if (technicianStore.loadingInitial)
    return <LoadingComponent content='Loading Technicians' />;

  return (
    <Segment>
      <Grid>
      <Grid.Column width={4}> 
    <Dropdown
    // width={5}
     placeholder='Select Technician Type'
     selection
      />
      </Grid.Column>
      <Grid.Column width={4}> 
      <Search
        />
        </Grid.Column>
    </Grid>
    <Grid>
      <Grid.Column width={14}>
        <TechnicianList />
      </Grid.Column>
      <Grid.Column width={2}>
        <h2></h2>
      </Grid.Column>
    </Grid>
    </Segment>
  );
};

export default observer(TechnicianDashboard);
