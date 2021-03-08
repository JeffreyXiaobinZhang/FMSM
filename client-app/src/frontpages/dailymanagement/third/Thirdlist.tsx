import React, { Fragment, useContext, useEffect } from 'react';
import { Grid,Button, Segment, Dropdown, Search } from 'semantic-ui-react';
import Third0 from './Third0';
import { observer } from 'mobx-react-lite';
// import SORListStore from '../../../app/stores/sorlistStore';
import ThirdStore from '../../../app/stores/ThirdStore';

import LoadingComponent from '../../../app/layout/LoadingComponent';
import NavBarDaily from '../NavBarDaily';
import { Link } from 'react-router-dom';

const Thirdlist: React.FC = () => {

  const thirdStore0 = useContext(ThirdStore);

  // const {ThirdPartiesByName: ThirdPartiesByName,  deleteThirdParty: deleteThirdParty, submitting, target} = thirdStore0;

  useEffect(() => {
    thirdStore0.loadThirdParties();
  }, [thirdStore0]);

  if (thirdStore0.loadingInitial)
    return <LoadingComponent content='Loading Third Parties' />;

  return (
    <Segment>
      <Grid>

        <Grid.Column width={4}> 
          <Dropdown
            // width={5}
            placeholder='Select a Third Party'
            selection
          />
        </Grid.Column>

        <Grid.Column width={4}> 
          <Search
            />
        </Grid.Column>

         <Grid.Column width={4}>
          <Button 
            size = 'big' 
            as={Link}
            to={`/dailymanagement/thirdAdd/`}
            color = 'green' 
            icon = 'add' 
            content = 'Add' 
          />
 
        {/* {ThirdPartiesByName.map(thirdlist => ( */}
         
           
         {/* <button
           name={thirdlist.name}
           size='mini'
           loading={target === thirdlist.id && submitting}
           onClick={(e) => deleteThirdParty(e, thirdlist.name)}
           // content='Delete'
           icon = 'add'
           color='green'
         /> */}
       </Grid.Column>

        {/* ))} */}

      </Grid>
    
      <Grid>
        <Grid.Column width={16}>
          <Third0 />
        </Grid.Column>

      </Grid>

    </Segment>
  );
};

export default observer(Thirdlist);
