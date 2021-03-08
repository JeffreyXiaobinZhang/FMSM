import React, { useContext, FormEvent, useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import ProjectStore from '../../../app/stores/projectStore';
import { observer } from 'mobx-react-lite';
import { IProjectTask } from '../../../app/models/projecttask';

const ProjectSOREditForm: React.FC = () => {
  const projectStore = useContext(ProjectStore);
  const { selectedProjectTask: selectedprojecttask, editProjectTask, submitting, cancelFormOpen } = projectStore;

  const [projecttask, setProjectTask] = useState<IProjectTask>(selectedprojecttask!);

  const handleSubmit = () => {
    editProjectTask(projecttask);
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setProjectTask({ ...projecttask, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Field>
      &nbsp;&nbsp;&nbsp;<span style={{color: 'blue', fontSize: 22, fontWeight: "bold", textAlign: 'center'}}>{projecttask!.itemName}:</span> 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Form.Field>
      <Form.Field inline>
        <label>Order Qty</label>
        <Input onChange={handleInputChange} name='orderQty' value={projecttask!.orderQty} />
      </Form.Field>
      <Form.Field inline>
        <label>Claimed Qty</label>
        <Input onChange={handleInputChange} name='claimedQty' value={projecttask!.claimedQty} />
      </Form.Field>
      <Form.Field inline>
        <label>Remark</label>
        <Input onChange={handleInputChange} name='remark' value={projecttask!.remark} />
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

export default observer(ProjectSOREditForm);
