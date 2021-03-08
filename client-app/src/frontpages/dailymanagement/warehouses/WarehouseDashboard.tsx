import React, { Fragment, useContext, useEffect } from 'react';
import { Grid, Segment, Dropdown, Search } from 'semantic-ui-react';
import WarehouseList from './WarehouseList';
import { observer } from 'mobx-react-lite';
import WarehouseStore from '../../../app/stores/warehouseStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import NavBarDaily from '../../dailymanagement/NavBarDaily';

const WarehouseDashboard: React.FC = () => {

  const warehouseStore = useContext(WarehouseStore);

  useEffect(() => {
    warehouseStore.loadWarehouses();
  }, [warehouseStore]);

  if (warehouseStore.loadingInitial)
    return <LoadingComponent content='Loading Warehouses' />;

  return (
    <Segment>
      <Grid>
      <Grid.Column width={4}> 
    <Dropdown
    // width={5}
     placeholder='Select Warehouse Type'
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
        <WarehouseList />
      </Grid.Column>
      <Grid.Column width={2}>
        <h2></h2>
      </Grid.Column>
    </Grid>
    </Segment>
  );
};

export default observer(WarehouseDashboard);
