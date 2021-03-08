import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { ITechnician } from '../../../app/models/technician';
import { v4 as uuid } from 'uuid';
import TechnicianStore from '../../../app/stores/technicianStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';


const TechnicianCreateForm: React.FC<RouteComponentProps> = ({
  match,
  history
}) => {
  const technicianStore = useContext(TechnicianStore);
  const {
    createTechnician,
    editTechnician,
    submitting,
    technician: initialFormState,
    loadTechnician,
    clearTechnician
  } = technicianStore;

  const [technician, setTechnician] = useState<ITechnician>({
    id: '',
    createdAt: '',
    updatedAt: '',
    email: '',
    name: '',
    type: ''
  });


  const handleSubmit = () => {
      createTechnician(technician).then(() => history.push(`/hrmanagement/technician`));
  };


  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setTechnician({ ...technician, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label='Email'
          required
          onChange={handleInputChange}
          name='email'
          placeholder='Email'
          value={technician.email}
        />
        <Form.Input
          label='Name'
          required
          onChange={handleInputChange}
          name='name'
          placeholder='Name'
          value={technician.name}
        />
        <Form.Input
          label='Type'
          onChange={handleInputChange}
          name='type'
          placeholder='Type'
          value={technician.type}
        />
        <Button
          loading={submitting}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          onClick={() => history.push('/hrmanagement/technician')}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(TechnicianCreateForm);
