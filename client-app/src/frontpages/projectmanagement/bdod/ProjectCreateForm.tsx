import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button, Dropdown } from 'semantic-ui-react';
import { IProject as IProject } from '../../../app/models/project';
import {v4 as uuid} from 'uuid';
import ProjectStore from '../../../app/stores/projectStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

const ProjectCreateForm: React.FC<RouteComponentProps> = ({
  match,
  history
}) => {
  const projectStore = useContext(ProjectStore);
  const {createProject, editProject: editProject, submitting} = projectStore;

  const [project, setProject] = useState<IProject>({
    id: '',
    createdAt: '',
    updatedAt: '',
    projectCode: '',
    jobType: '',
    orderNumber: '',
    materialOrderNo: '',
    status: '',
    address: '',
    jobStartDate: '',
    estimatedCompletionDate: '',
    startTime: '',
    endTime: '',
    invoiceNo: '',
    remark: ''
  });

  const handleSubmit = () => {
      createProject(project).then(() => history.push(`/projectmanagement/project`));
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setProject({ ...project, [name]: value });
  };

  const status = [
    { key: 'Started', text: 'Started', value: 'Started' },
    { key: 'In-Progress', text: 'In-Progress', value: 'In-Progress' },
    { key: 'Completed', text: 'Completed', value: 'Completed' },
    { key: 'Claim Submitted', text: 'Claim Submitted', value: 'Claim Submitted' },
    { key: 'Payment Received', text: 'Payment Received', value: 'Payment Received' },
    { key: 'Closed', text: 'Closed', value: 'Closed' },
    { key: 'Onhold', text: 'Onhold', value: 'Onhold' },
    { key: 'Cancel', text: 'Cancel', value: 'Cancel' }
  ];

  const type = [
    { key: 'BDOD', text: 'BDOD', value: 'BDOD' }
  ];
  
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label='Project Code'
          required
          onChange={handleInputChange}
          name='projectCode'
          placeholder='Project Code'
          value={project.projectCode}
        />
        <Form.Select
          label='Job Type'
          required
          width={2}
          onChange={(e, { name, value }) => setProject({ ...project, [name]: value })}
          name='jobType'
          placeholder='Job Type'
          options={type}
          value={project.jobType}
        />
        <Form.Input
          label='Order Number'
          required
          onChange={handleInputChange}
          name='orderNumber'
          placeholder='Order Number'
          value={project.orderNumber}
        />
        <Form.Input
          label='Material Order No'
          required
          onChange={handleInputChange}
          name='materialOrderNo'
          placeholder='Material Order No'
          value={project.materialOrderNo}
        />
        <Form.Select
          label='Status'
          required
          width={2}
          onChange={(e, { name, value }) => setProject({ ...project, [name]: value })}
          options={status}
          name='status'
          placeholder='Status'
          value={project.status}
        />
        <Form.Input
          label='Address'
          onChange={handleInputChange}
          name='address'
          placeholder='Address'
          value={project.address}
        />
        <Form.Group widths='equal'>
        <Form.Input
          label='Job Start Date'
          required
          onChange={handleInputChange}
          name='jobStartDate'
          type='date'
          placeholder='Job Start Date'
          value={project.jobStartDate}
        />
          <Form.Input
          label='Estimated Completion Date'
          required
          onChange={handleInputChange}
          name='estimatedCompletionDate'
          type='date'
          placeholder='Estimated Completion Date'
          value={project.estimatedCompletionDate}
        />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
          label='Start Time'
          onChange={handleInputChange}
          name='startTime'
          type='time'
          placeholder='Start Time'
          value={project.startTime}
        />
        <Form.Input
          label='End Time'
          onChange={handleInputChange}
          name='endTime'
          type='time'
          placeholder='End Time'
          value={project!.endTime}
        />
        </Form.Group>
        <Form.Input
          label='Invoice No'
          onChange={handleInputChange}
          name='invoiceNo'
          placeholder='Invoice No.'
          value={project.invoiceNo}
        />
        <Form.TextArea
          label='Remark'
          onChange={handleInputChange}
          name='remark'
          rows={2}
          placeholder='Remark'
          value={project.remark}
        />
        <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
        <Button
          onClick={() => history.push('/projectmanagement/project')}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(ProjectCreateForm);
