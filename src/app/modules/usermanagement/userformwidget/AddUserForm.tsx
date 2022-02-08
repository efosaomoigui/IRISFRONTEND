import React from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap-v5'

const AddUserForm: React.FC = () => {
  return (
    <>
      <Form>
        <Row className='mb-5'>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder='Enter email' />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>
        </Row>
        <Row className='mb-5'>
        <Form.Group controlId='formGridAddress1'>
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder='1234 Main St' />
        </Form.Group>
        </Row>
        <Row className='mb-5'>
        <Form.Group controlId='formGridAddress2'>
          <Form.Label>Phone No.</Form.Label>
          <Form.Control placeholder='Enter Phone Number' />
        </Form.Group>
        </Row>

        <Row className='mb-5'>
          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>City</Form.Label>
            <Form.Control as='select'>
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>State</Form.Label>
            <Form.Control as='select'>
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId='formGridZip'>
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>
        <Row className='mb-5'>
          <Form.Group id='formGridCheckbox'>
            <Form.Check type='checkbox' label='Check me out' />
          </Form.Group>
        </Row>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  )
}

export {AddUserForm}
