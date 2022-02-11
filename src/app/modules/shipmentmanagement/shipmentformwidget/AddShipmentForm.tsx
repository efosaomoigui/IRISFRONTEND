import React from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap-v5'

const AddShipmentForm: React.FC = () => {
  return (
    <>
      <Form>
        <Row>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>Shipment Id</Form.Label>
            <Form.Control placeholder='Enter Shipment Id' />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>Waybill Number</Form.Label>
            <Form.Control placeholder='Enter Waybill Number' />
          </Form.Group>
        </Row>

        <Row className='mb-5'>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>firstName</Form.Label>
            <Form.Control placeholder='Enter First Name' />
            <Form.Control as='select'>
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>lastName</Form.Label>
            <Form.Control placeholder='Enter last Name' />
          </Form.Group>
          <Form.Control as='select'>
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
        </Row>

        <Button variant='primary' type='submit'>Submit</Button>
      </Form>
    </>
  )
}

export { AddShipmentForm}