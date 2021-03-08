import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IWarehouse } from '../../../app/models/warehouse';
import { v4 as uuid } from 'uuid';
import WarehouseStore from '../../../app/stores/warehouseStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

interface DetailParams {
  id: string;
}

const WarehouseForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const warehouseStore = useContext(WarehouseStore);
  const {
    createWarehouse,
    editWarehouse,
    submitting,
    warehouse: initialFormState,
    loadWarehouse,
    clearWarehouse
  } = warehouseStore;

  const [warehouse, setWarehouse] = useState<IWarehouse>({
    id: '',
    createdAt: '',
    updatedAt: '',
    partNo: '',
    name: '',
    stock: 0,
    price: 0,
    description: '',
    supplier: '',
    url: ''
  });
  

   
  useEffect(() => {
    loadWarehouse(match.params.id).then(
      () => initialFormState && setWarehouse(initialFormState)
    );

    return () => {
      clearWarehouse()
    }
  }, []);
  

  const handleSubmit = () => { 
     editWarehouse(warehouse).then(() => history.push(`/dailymanagement/warehouse`));
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setWarehouse({ ...warehouse, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label='Part No'
          onChange={handleInputChange}
          name='partNo'
          placeholder='Part No'
          value={warehouse.partNo}
        />
        <Form.Input
          label='Name'
          onChange={handleInputChange}
          name='name'
          placeholder='Name'
          value={warehouse.name}
        />
        <Form.Input
          label='Stock'
          onChange={handleInputChange}
          name='stock'
          placeholder='Stock'
          value={warehouse.stock}
        />
        <Form.Input
          label='Price ($)'
          onChange={handleInputChange}
          name='price'
          placeholder='Price'
          value={warehouse.price}
        />
        <Form.Input
          label='Description'
          onChange={handleInputChange}
          name='description'
          placeholder='Description'
          value={warehouse.description}
        />
        <Form.Input
          label='Supplier'
          onChange={handleInputChange}
          name='supplier'
          placeholder='Supplier'
          value={warehouse.supplier}
        />
        <Button
          loading={submitting}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          onClick={() => history.push('/dailymanagement/warehouse')}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(WarehouseForm);
