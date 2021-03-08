import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { ISORList } from '../../../app/models/sorlist';
import { v4 as uuid } from 'uuid';
import SORListStore from '../../../app/stores/sorlistStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

interface DetailParams {
  id: string;
}

const SORListForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const sorlistStore = useContext(SORListStore);
  const {
    createSORList,
    editSORList,
    submitting,
    sorlist: initialFormState,
    loadSORList,
    clearSORList
  } = sorlistStore;

  const [sorlist, setSORList] = useState<ISORList>({
    name: '',
    createdAt: '',
    updatedAt: '',
    jobType: '',
    category: '',
    description: '',
    unitRate: 0,
    type: '',
    uom: '',
    remark: ''
  });
  

   
  useEffect(() => {
    loadSORList(match.params.id).then(
      () => initialFormState && setSORList(initialFormState)
    );

    return () => {
      clearSORList()
    }
  }, [loadSORList, clearSORList, match.params.id, initialFormState]);
  

  const handleSubmit = () => { 
  /**   editSORList(sorlist).then(() => history.push(`/dailymanagement/sorlist/${sorlist.name}`));   */
     editSORList(sorlist).then(() => history.push(`/dailymanagement/sorlist`));
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setSORList({ ...sorlist, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label='Job Type'
          onChange={handleInputChange}
          name='jobType'
          placeholder='Job Type'
          value={sorlist.jobType}
        />
        <Form.Input
          label='Category'
          onChange={handleInputChange}
          name='category'
          placeholder='Category'
          value={sorlist.category}
        />
        <Form.TextArea
          label='Description'
          onChange={handleInputChange}
          name='description'
          rows={2}
          placeholder='Description'
          value={sorlist.description}
        />
        <Form.Input
          label='Unit Rate'
          required
          onChange={handleInputChange}
          name='unitRate'
          placeholder='Unit Rate'
          value={sorlist.unitRate}
        />
        <Form.Input
          label='Type'
          onChange={handleInputChange}
          name='type'
          placeholder='Type'
          value={sorlist.type}
        />
        <Form.Input
          label='UOM'
          onChange={handleInputChange}
          name='uom'
          placeholder='UOM'
          value={sorlist.uom}
        />
        <Form.Input
          label='Remark'
          onChange={handleInputChange}
          name='remark'
          placeholder='Remark'
          value={sorlist.remark}
        />
        <Button
          loading={submitting}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          onClick={() => history.push('/dailymanagement/sorlist')}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(SORListForm);
