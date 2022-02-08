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
            <Form.Label>routeName</Form.Label>
            <Form.Control placeholder='Waybill No.' />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId='formGridState'>
          <Form.Label>departureCentreId</Form.Label>
          <Form.Control placeholder='FirstName' />
        </Form.Group>

          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>destinationCentreId</Form.Label>
          <Form.Control placeholder='Apartment, studio, or floor' />
        </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>dispatchFee</Form.Label>
            <Form.Control placeholder='Enter Dispatch Fee' />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>loaderFee</Form.Label>
            <Form.Control placeholder='Enter Loader Fee' />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>captainFee</Form.Label>
            <Form.Control placeholder='Enter Captain Fee' />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>mainRouteId</Form.Label>
            <Form.Control as='select'>
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>routeType</Form.Label>
            <Form.Control as='select'>
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
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

        <Button variant='primary' type='submit'>Submit</Button>
      </Form>
    </>
  )
}

export { AddRouteForm}
