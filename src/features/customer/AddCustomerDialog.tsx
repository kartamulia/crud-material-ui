import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core'
import { ICustomer } from '../../_models/customer';

const AddCustomerDialog: React.FC<{
  open: boolean,
  closeDialog(): void,
  customerCreated(customer: ICustomer): void
}> = ({
  open,
  closeDialog,
  customerCreated
}) => {
    const newCustomer: ICustomer = {
      id: 0,
      name: ''
    }

    const [customer, setCustomer] = useState(newCustomer);

    const cancelAddCustomer = () => {
      closeDialog();
    }

    const saveCustomer = () => {
      customerCreated(customer);
      closeDialog();
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;
      setCustomer({ ...customer, [name]: value });
    }

    return (
      <Dialog
        open={open}
        onClose={closeDialog}
      >
        <DialogTitle>
          Add Customer
        </DialogTitle>
        <DialogContent>
          <form id='addCustomerDialog' action='post'
            onSubmit={(event) => {
              event.preventDefault();
              saveCustomer();
            }}
          >
            <TextField id='customer-name' label='Customer Name'
              name='name'
              value={customer.name}
              onChange={handleInputChange} />
            <DialogActions>
              <Button onClick={cancelAddCustomer}>Cancel</Button>
              <Button type='submit'>Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

export default AddCustomerDialog
