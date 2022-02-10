import React from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap-v5'

const AddWalletForm: React.FC = () => {
  return (
    <>
      <Form>
        <Row>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>FirstName</Form.Label>
            <Form.Control placeholder='Enter First Name' />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>LastName</Form.Label>
            <Form.Control placeholder='Enter Last Name' />
          </Form.Group>
        </Row>

        <Form.Group controlId='formGridAddress1'>
          <Form.Label>WalletId</Form.Label>
          <Form.Control placeholder='Enter WalletId' />
        </Form.Group>

        <Row className='mb-5'>
          <Form.Group as={Col} controlId='formGridCity'>
            <Form.Label>City</Form.Label>
            <Form.Control />
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

        <Form.Group id='formGridCheckbox'>
          <Form.Check type='checkbox' label='Check me out' />
        </Form.Group>

        <Button variant='primary' type='submit'>Submit</Button>
      </Form>
    </>
  )
}

export {AddWalletForm}
