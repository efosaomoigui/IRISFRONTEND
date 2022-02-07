import React from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap-v5'

const AddRouteForm: React.FC = () => {
  return (
    <>
      <Form>
        <Row>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>RouteId</Form.Label>
            <Form.Control placeholder='RouteId'/>
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>Waybill</Form.Label>
            <Form.Control placeholder='Waybill No.' />
          </Form.Group>
        </Row>

        <Form.Group controlId='formGridAddress1'>
          <Form.Label>FirstName</Form.Label>
          <Form.Control placeholder='FirstName' />
        </Form.Group>

        <Form.Group controlId='formGridAddress2'>
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder='Apartment, studio, or floor' />
        </Form.Group>

        <Row>

          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>Departure</Form.Label>
            <Form.Control as='select'>
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>Destination</Form.Label>
            <Form.Control as='select'>
              <option>Choose...</option>
              <option>...</option>
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

export { AddRouteForm}
