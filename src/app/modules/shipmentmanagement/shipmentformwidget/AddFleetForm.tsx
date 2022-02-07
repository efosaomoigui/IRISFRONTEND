import React from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap-v5'

const AddFleetForm: React.FC = () => {
  return (
    <>
      <Form>
        <Row>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>Fleet Name</Form.Label>
            <Form.Control placeholder='Enter Name of Fleet' />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>Registration number</Form.Label>
            <Form.Control placeholder='Enter your reg Number' />
          </Form.Group>
        </Row>

        <Form.Group as={Col} controlId='formGridState'>
          <Form.Label>Fleet Model</Form.Label>
          <Form.Control as='select'>
            <option>Choose...</option>
            <option>Chevrolet</option>
            <option>Merecedes</option>
          </Form.Control>
        </Form.Group>

        <Row>

          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>Fleet Type</Form.Label>
            <Form.Control as='select'>
              <option>Choose...</option>
              <option>Truck</option>
              <option>Motorcycle</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>Fleet Make</Form.Label>
            <Form.Control as='select'>
              <option>Choose...</option>
              <option>Chevrolet</option>
              <option>Mercedes</option>
            </Form.Control>
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

export { AddFleetForm}
