import React, { useContext, FormEvent, useState } from 'react';
import { Button, Form, Input, Select } from 'semantic-ui-react';
import ProjectStore from '../../../app/stores/projectStore';
import { observer } from 'mobx-react-lite';
// import { IProjectTask } from '../../../app/models/projecttask';
import {IProjectVendor} from '../../../app/models/projectvendor';

const ProjectVendorEditForm: React.FC = () => {
  const projectStore = useContext(ProjectStore);
  const { selectedProjectVendor: selectedprojectvendor, editProjectVendor, submitting, cancelFormOpen } = projectStore;

  const [projectvendor, setProjectVendor] = useState<IProjectVendor>(selectedprojectvendor!);

  const handleSubmit = () => {
    editProjectVendor(projectvendor);
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setProjectVendor({ ...projectvendor, [name]: value });
  };

  const status = [
    { key: 'Applied', text: 'Applied', value: 'Applied' },
    { key: 'Approved', text: 'Approved', value: 'Approved' },
    { key: 'Booking', text: 'Booking', value: 'Booking' },
    { key: 'Booked', text: 'Booked', value: 'Booked' }
  ];

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Field>
      &nbsp;&nbsp;&nbsp;<span style={{color: 'blue', fontSize: 22, fontWeight: "bold", textAlign: 'center'}}>{projectvendor!.companyName}:</span> 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Form.Field>

      <Form.Field inline>
        <label>status</label>
        {/* <Input onChange={handleInputChange} name='status' value={projectvendor!.status} /> */}
        <Select
          required
          onChange = {(e, { name, value }) => setProjectVendor({ ...projectvendor, [name]: value })}
          options={status}
          search
          name='status'
          placeholder='Status'
          value={projectvendor.status} 
        />
      </Form.Field>
      
      <Form.Field inline>
        <label>attachment</label>
        <Input onChange={handleInputChange} name='attachment' value={projectvendor!.attachment} />
      </Form.Field>
      <Form.Field inline>
        <label>Remark</label>
        <Input onChange={handleInputChange} name='remark' value={projectvendor!.remark} />
      </Form.Field>
      </Form.Group>
      <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
      <Button
        onClick={cancelFormOpen}
        floated='right'
        type='button'
        content='Cancel'
      />
      
    </Form>
  );
};

export default observer(ProjectVendorEditForm);
