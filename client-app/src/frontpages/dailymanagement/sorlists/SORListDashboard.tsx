import React, { Fragment, useContext, useEffect } from 'react';
import { Grid, Segment, Dropdown, Search } from 'semantic-ui-react';
import SORList from './SORList';
import { observer } from 'mobx-react-lite';
import SORListStore from '../../../app/stores/sorlistStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import NavBarDaily from '../../../frontpages/dailymanagement/NavBarDaily';

const SORListDashboard: React.FC = () => {

  const sorlistStore = useContext(SORListStore);

  useEffect(() => {
    sorlistStore.loadSORLists();
  }, [sorlistStore]);

  if (sorlistStore.loadingInitial)
    return <LoadingComponent content='Loading SORs' />;

  return (
    <Segment>
      <Grid>
      <Grid.Column width={4}> 
    <Dropdown
    // width={5}
     placeholder='Select SOR Type'
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
        <SORList />
      </Grid.Column>
      <Grid.Column width={2}>
        <h2></h2>
      </Grid.Column>
    </Grid>
    </Segment>
  );
};

export default observer(SORListDashboard);
