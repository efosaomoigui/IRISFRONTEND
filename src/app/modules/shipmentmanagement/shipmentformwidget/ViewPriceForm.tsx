import React from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap-v5'

const ViewPriceForm: React.FC = () => {
  return (
    <>
      <Form>
        <Row>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>Id</Form.Label>
            <Form.Control placeholder='Id'/>
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>wayBillPrice</Form.Label>
            <Form.Control placeholder='Waybill Price.' />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId='formGridState'>
          <Form.Label>routePrice</Form.Label>
          <Form.Control placeholder='Route Price' />
        </Form.Group>

          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>currency</Form.Label>
          <Form.Control placeholder='Currency' />
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

        <Button variant='primary' type='submit'>View Routes</Button>
      </Form>
    </>
  )
}

export { ViewPriceForm}
