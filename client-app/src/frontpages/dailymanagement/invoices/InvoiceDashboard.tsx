import React, { Fragment, useContext, useEffect } from 'react';
import { Grid, Segment, Dropdown, Search } from 'semantic-ui-react';
import Invoice from './Invoice'
import { observer } from 'mobx-react-lite';
import InvoiceStore from '../../../app/stores/invoiceStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import NavBarDaily from '../../../frontpages/dailymanagement/NavBarDaily';

const InvoiceDashboard: React.FC = () => {
    const invoiceStore = useContext(InvoiceStore);

    useEffect(() => {
        invoiceStore.loadInvoices();
    }, [invoiceStore]);

    if(invoiceStore.loadingInitial)
        return <LoadingComponent content='Loading Invoice' />;
    
    return (
    <Segment>
      <Grid>
      <Grid.Column width={4}> 
    <Dropdown
    // width={5}
     placeholder='Select Invoice Type'
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
        <Invoice />
      </Grid.Column>
      <Grid.Column width={2}>
        <h2></h2>
      </Grid.Column>
    </Grid>
    </Segment>
    );
};
export default observer(InvoiceDashboard);