import React from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap-v5'

const ViewFleetForm: React.FC = () => {
  return (
    <>
      <Form>
        <Row>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>Fleet Id</Form.Label>
            <Form.Control placeholder='Enter Fleet Id' />
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
            <Form.Label>registrationNumber</Form.Label>
            <Form.Control placeholder='Enter registration Number' />
          </Form.Group>
          <Form.Control as='select'>
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
        </Row>

        <Row>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>chassisNumber</Form.Label>
            <Form.Control placeholder='Enter Chasis Number' />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>engineNumber</Form.Label>
            <Form.Control placeholder='Enter registration Number' />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>fleetType</Form.Label>
            <Form.Control placeholder='Enter Fleet type' />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>capacity</Form.Label>
            <Form.Control placeholder='Enter Capacity' />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>fleetModel</Form.Label>
            <Form.Control placeholder='Enter Fleet model' />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>FleetMake</Form.Label>
            <Form.Control placeholder='Enter Fleet Make' />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>description</Form.Label>
            <Form.Control placeholder='describe the type of fleet' />
          </Form.Group>
        </Row>

        <Form.Group as={Col} controlId='formGridState'>
          <Form.Label>ownerId</Form.Label>
          <Form.Control as='select'>
            <option>Choose...</option>
          </Form.Control>
        </Form.Group>

        <Form.Group id='formGridCheckbox'>
          <Form.Check type='checkbox' label='status' />
        </Form.Group>

        <Button variant='primary' type='submit'>View Fleet</Button>
      </Form>
    </>
  )
}

export { ViewFleetForm}
