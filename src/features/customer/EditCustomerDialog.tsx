import React, { useState, useEffect } from 'react'
import { ICustomer } from '../../_models/customer'
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';

const EditCustomerDialog: React.FC<{
  customer: ICustomer,
  open: boolean,
  closeDialog(): void,
  customerUpdated(id: number, customer: ICustomer): void
}> = ({ customer, open, closeDialog, customerUpdated }) => {
  const [editingCustomer, setEditingCustomer] = useState(customer);

  useEffect(() => {
    setEditingCustomer(customer)
  }, [customer, customerUpdated])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setEditingCustomer({ ...customer, [name]: value });
  }

  const updateCustomer = () => {
    customerUpdated(editingCustomer.id, editingCustomer);
    closeDialog();
  }

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={open}
      >
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <form action='put'
            onSubmit={(event) => {
              event.preventDefault();
              updateCustomer();
            }}>
            <TextField
              id='customer-name' label='Customer Name' name='name'
              value={editingCustomer.name} onChange={handleInputChange}
            />
            <DialogActions>
              <Button onClick={closeDialog}>Cancel</Button>
              <Button type='submit'>Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditCustomerDialog
