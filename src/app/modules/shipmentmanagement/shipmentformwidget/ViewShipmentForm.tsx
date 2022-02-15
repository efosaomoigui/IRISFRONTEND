import React from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap-v5'

const ViewShipmentForm: React.FC = () => {
  return (
    <>
      <Form>
        <Row>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>ShipmentId</Form.Label>
            <Form.Control placeholder='ShipmentId'/>
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>wayBillNumber</Form.Label>
            <Form.Control placeholder='Waybill No.' />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId='formGridState'>
          <Form.Label>firstName</Form.Label>
          <Form.Control placeholder='FirstName' />
        </Form.Group>

        <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>lastName</Form.Label>
            <Form.Control placeholder='Last Name' />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} id='formGridCheckbox'>
            <Form.Check type='checkbox' label='isSubRoute' />
          </Form.Group>
          <Form.Group as={Col} id='formGridCheckbox'>
            <Form.Check type='checkbox' label='availableAtTerminal' />
          </Form.Group>
          <Form.Group as={Col} id='formGridCheckbox'>
            <Form.Check type='checkbox' label='availableOnline' />
          </Form.Group>
        </Row>

        <Button variant='primary' type='submit'>View Shipments</Button>
      </Form>
    </>
  )
}

export { ViewShipmentForm}
