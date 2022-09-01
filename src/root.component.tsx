import React from 'react';

import { TextField, Button, Icon, Paper, Typography } from '@mui/material';
import { Formik } from 'formik';
import { Provider, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import store from './store';
import { addTask } from './store/slices/task';

const Form: React.VFC = () => {
  const dispatch = useDispatch();

  const formSchema = Yup.object().shape({
    text: Yup.string().required('This is required'),
  });

  return (
    <Formik
      initialValues={{
        text: '',
      }}
      validationSchema={formSchema}
      onSubmit={(data, helpers): void => {
        dispatch(addTask({ ...data, completed: false }));
        helpers.resetForm();
      }}
    >
      {({ values, errors, touched, handleChange, handleSubmit, handleBlur }): JSX.Element => (
        <form
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-around',
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Add a text"
            style={{ width: '85%' }}
            name="text"
            value={values.text}
            onChange={handleChange}
            error={Boolean(touched.text && errors.text)}
            helperText={touched.text && errors.text}
            onBlur={handleBlur}
            variant="standard"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
            style={{ width: '10%' }}
          >
            Add
          </Button>
        </form>
      )}
    </Formik>
  );
};

const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <Typography variant="h3">To-Do App</Typography>
      <Paper style={{ padding: 20 }} sx={{ mb: '15px' }}>
        <Form />
      </Paper>
    </Provider>
  );
};

export default Root;
