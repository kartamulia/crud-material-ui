import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Grid, Typography, Divider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { ICustomer } from '../../_models/customer';
import AddCustomerDialog from './AddCustomerDialog';
import EditCustomerDialog from './EditCustomerDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    }
  })
)

const customersData: ICustomer[] = [
  { id: 1, name: 'Muhammad Yamin' },
  { id: 2, name: 'Vitri Mareta' },
  { id: 3, name: 'Muhammad Karim' },
]

const Customers = () => {
  const classes = useStyles();
  const [customers, setCustomers] = useState(customersData)
  const [creatingCustomer, setCreatingCustomer] = useState(false);

  // Create New Customer
  const createCustomer = () => {
    setCreatingCustomer(true);
  }

  const closeCustomerDialog = () => {
    setCreatingCustomer(false);
  }

  const onCustomerCreated = (customer: ICustomer) => {
    customer.id = customers.length + 1;
    setCustomers([customer, ...customers])
  }

  // Edit Customer
  const emptyCustomer: ICustomer = { id: 0, name: '' }
  const [editCustomer, setEditCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(emptyCustomer);

  const cancelEditCustomer = () => {
    setEditCustomer(false);
  }

  const openEditCustomerDialog = (customer: ICustomer) => {
    console.log(customer);

    setEditCustomer(true);
    setEditingCustomer({ id: customer.id, name: customer.name });
  }

  const updateCustomer = (id: number, updatedCustomer: ICustomer) => {
    // setCustomers(customers.map((customer) => (customer.id === id ? customer : customer)));
    setCustomers(customers.map(customer => (customer.id === id ? updatedCustomer : customer)))
  }

  // Delete Customer
  const deleteCustomer = (id: number) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'>
        <Typography>Customers</Typography>
        <IconButton
          onClick={createCustomer}
        ><AddIcon /></IconButton>
      </Grid>
      <Divider />
      <List>
        {customers.map((customer) => (
          <ListItem key={customer.id}>
            <ListItemText primary={customer.name} secondary={customer.id} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => openEditCustomerDialog(customer)}><EditIcon /></IconButton>
              <IconButton onClick={() => deleteCustomer(customer.id)}><DeleteIcon /></IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <AddCustomerDialog
        open={creatingCustomer}
        closeDialog={closeCustomerDialog}
        customerCreated={onCustomerCreated} />
      <EditCustomerDialog
        customer={editingCustomer}
        open={editCustomer}
        closeDialog={cancelEditCustomer}
        customerUpdated={updateCustomer}
      />
    </div>
  )
}

export default Customers
