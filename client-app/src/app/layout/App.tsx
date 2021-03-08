import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBarDaily from '../../frontpages/dailymanagement/NavBarDaily';
import NavBarProject from '../../frontpages/projectmanagement/NavBarProject';
import NavBarHRmanagement from '../../frontpages/hrmanagement/NavBarHRmanagement';
import SORListDashboard from '../../frontpages/dailymanagement/sorlists/SORListDashboard';
import ProjectDashboard from '../../frontpages/projectmanagement/bdod/ProjectDashboard';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../frontpages/home/Home';
import SORListEditForm from '../../frontpages/dailymanagement/sorlists/SORListEditForm';
import SORListDetails from '../../frontpages/dailymanagement/sorlists/SORListDetails';
import SORListCreateForm from '../../frontpages/dailymanagement/sorlists/SORListCreateForm';
import ProjectEditForm from '../../frontpages/projectmanagement/bdod/ProjectEditForm';
import ProjectDetails from '../../frontpages/projectmanagement/bdod/ProjectDetails';
import ProjectCreateForm from '../../frontpages/projectmanagement/bdod/ProjectCreateForm';
import TechnicianDashboard from '../../frontpages/hrmanagement/technicians/TechnicianDashboard';
import TechnicianEditForm from '../../frontpages/hrmanagement/technicians/TechnicianEditForm';
import TechnicianDetails from '../../frontpages/hrmanagement/technicians/TechnicianDetails';
import TechnicianCreateForm from '../../frontpages/hrmanagement/technicians/TechnicianCreateForm';
import WarehouseEditForm from '../../frontpages/dailymanagement/warehouses/WarehouseEditForm';
import WarehouseDetails from '../../frontpages/dailymanagement/warehouses/WarehouseDetails';
import WarehouseCreateForm from '../../frontpages/dailymanagement/warehouses/WarehouseCreateForm';
import WarehouseDashboard from '../../frontpages/dailymanagement/warehouses/WarehouseDashboard';
import InvoiceEditForm from '../../frontpages/dailymanagement/invoices/InvoiceEditForm';
import InvoiceDetails from '../../frontpages/dailymanagement/invoices/InvoiceDetails';
import InvoiceCreateForm from '../../frontpages/dailymanagement/invoices/InvoiceCreateForm';
import InvoiceDashboard from '../../frontpages/dailymanagement/invoices/InvoiceDashboard';

import Third0 from '../../frontpages/dailymanagement/third/Third0';
import Thirdlist from '../../frontpages/dailymanagement/third/Thirdlist';
import Thirddetail from '../../frontpages/dailymanagement/third/Thirddetail';
import Thirdedit from '../../frontpages/dailymanagement/third/Thirdedit';
import Thirdadd from '../../frontpages/dailymanagement/third/Thirdadd';

const App: React.FC<RouteComponentProps> = ({ location }) => {

  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route
        // path={'/(.+)'}
        path={'/dailymanagement'}
        render={() => (
          <Fragment>
            <NavBarDaily />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/dailymanagement/sorlist' component={SORListDashboard} />
              <Route path='/dailymanagement/sorlist/:id' component={SORListDetails} />
              <Route path='/dailymanagement/sorlist-create' component={SORListCreateForm} />
              <Route path='/dailymanagement/sorlist-edit/:id' component={SORListEditForm} />

              <Route exact path='/dailymanagement/warehouse' component={WarehouseDashboard} />
              <Route path='/dailymanagement/warehouse/:id' component={WarehouseDetails} />
              <Route path='/dailymanagement/warehouse-create' component={WarehouseCreateForm} />
              <Route path='/dailymanagement/warehouse-edit/:id' component={WarehouseEditForm} />

              <Route exact path='/dailymanagement/invoice' component={InvoiceDashboard} />
              <Route path='/dailymanagement/invoice/:id' component={InvoiceDetails} />
              <Route path='/dailymanagement/invoice-create' component={InvoiceCreateForm} />
              <Route path='/dailymanagement/invoice-edit/:id' component={InvoiceEditForm} />
            </Container>

            <Container style={{ marginTop: '7em' }}>
              {/* <Route exact path='/dailymanagement/third' component={Third0} /> */}
              <Route exact path='/dailymanagement/third' component={Thirdlist} />
              <Route path='/dailymanagement/third/:name' component={Thirddetail} />
              <Route path='/dailymanagement/third-edit/:name' component={Thirdedit} />
              <Route path='/dailymanagement/thirdAdd/' component={Thirdadd} />
              {/* <Route path='/dailymanagement/third-edit/:id' component={SORListEditForm} /> */}
            </Container>
            
          </Fragment>
        )}        
      />

       <Route
        // path={'/(.+)'}
        path={'/hrmanagement'}
        render={() => (
          <Fragment>
            <NavBarHRmanagement />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/hrmanagement/technician' component={TechnicianDashboard} />
              <Route path='/hrmanagement/technician/:id' component={TechnicianDetails} />
              <Route path='/hrmanagement/technician-create' component={TechnicianCreateForm} />
              <Route path='/hrmanagement/technician-edit/:id' component={TechnicianEditForm} />
            </Container>
          </Fragment>
        )}        
      />

      <Route
        // path={'/(.+)'}
        path={'/projectmanagement'}
        render={() => (
          <Fragment>
            <NavBarProject />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/projectmanagement/project' component={ProjectDashboard} />
              <Route path='/projectmanagement/project/:id' component={ProjectDetails} />
              <Route path='/projectmanagement/project-create' component={ProjectCreateForm} />
              <Route path='/projectmanagement/project-edit/:id' component={ProjectEditForm} />
            </Container>
          </Fragment>
        )}        
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
