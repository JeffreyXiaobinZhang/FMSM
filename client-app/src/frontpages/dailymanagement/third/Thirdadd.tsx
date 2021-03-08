import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

// import { ISORList } from '../../../app/models/sorlist';
import { IThirdparty } from '../../../app/models/thirdparty';
// import SORListStore from '../../../app/stores/sorlistStore';
import ThirdStore from '../../../app/stores/ThirdStore';

const Thirdadd: React.FC<RouteComponentProps> = ({
  match,
  history
}) => {
  const thirdStore0 = useContext(ThirdStore);
  const {
    createThirdParty,
    editThirdParty,
    submitting,
    thirdparty: initialFormState,
    loadThirdParty,
    clearThirdParty
  } = thirdStore0;

  const [thirdparty, setAdd] = useState<IThirdparty>({
    id: '',
    createdAt: '',
    updatedAt: '',
    companyName: '',
    status: '',
    type: '',
    contactPerson: '',
    phone:'',
    email:'',
    project:''
  });

  const handleSubmit = () => {
    createThirdParty(thirdparty).then(() => history.push(`/dailymanagement/third`));
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setAdd({ ...thirdparty, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label='ID'
          required
          onChange={handleInputChange}
          name='id'
          placeholder='Item Id'
          value={thirdparty.id}
        />
        <Form.Input
          label='Created At'
          required
          onChange={handleInputChange}
          name='createdAt'
          placeholder='createdAt'
          value={thirdparty.createdAt}
        />
        <Form.Input
          label='Updated At'
          onChange={handleInputChange}
          name='updatedAt'
          placeholder='Updated At'
          value={thirdparty.updatedAt}
        />
        <Form.Input
        label='Company Name'
        required
          onChange={handleInputChange}
          name='companyName'
          placeholder='Company Name'
          value={thirdparty.companyName}
        />
        <Form.Input
        label='Status'
          onChange={handleInputChange}
          name='status'
          placeholder='Status'
          value={thirdparty.status}
        />
        <Form.Input
        label='Type'
          onChange={handleInputChange}
          name='type'
          placeholder='Type'
          value={thirdparty.type}
        />
        <Form.Input
        label='Contact Person'
          onChange={handleInputChange}
          name='contactPerson'
          placeholder='Contact Person'
          value={thirdparty.contactPerson}
        />
        <Form.Input
        label='Phone'
          onChange={handleInputChange}
          name='phone'
          placeholder='Phone'
          value={thirdparty.phone}
        />
        <Form.Input
        label='Email'
          onChange={handleInputChange}
          name='email'
          placeholder='Email'
          value={thirdparty.email}
        />
        <Form.Input
        label='Project'
          onChange={handleInputChange}
          name='project'
          placeholder='Project'
          value={thirdparty.project}
        />
        <Button
          loading={submitting}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          onClick={() => history.push('/dailymanagement/third')}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(Thirdadd);
