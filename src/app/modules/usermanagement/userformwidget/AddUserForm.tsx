<<<<<<< HEAD
import React from 'react'
import clsx from 'clsx'
import {makeStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import {Button, Form} from 'react-bootstrap-v5'
=======
import clsx from 'clsx'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap-v5'
import * as Yup from 'yup'
import agent from '../../../../setup/axios/AxiosAgent'
import LoadingComponent from '../../../LoadingComponent'
import { IUserModel } from '../../auth/models/AuthInterfaces'
>>>>>>> 5d9201172a00d9238c38f41895bcf992cf1a4762

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}))

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
]

function AddUserForm() {
  const classes = useStyles()
  const [values, setValues] = React.useState({
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  })

  const handleChange = (name: string) => (event: {target: {value: any}}) => {
    setValues({...values, [name]: event.target.value})
  }

  return (
    <>
      <Form>
        <div className='container'>
          <div className='row gy-5 g-xl-12'>
            <div className='col-xl-6'>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' />
              </Form.Group>
            </div>
            <div className='col-xl-6'>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' />
              </Form.Group>
            </div>
          </div>
        </div>
{/* 
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group> */}

      </Form>
    </>
  )
}

<<<<<<< HEAD
export {AddUserForm}
=======
export { AddUserForm }

>>>>>>> 5d9201172a00d9238c38f41895bcf992cf1a4762
