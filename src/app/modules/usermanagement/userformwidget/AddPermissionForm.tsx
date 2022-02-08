import React from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap-v5'

const AddPermissionForm: React.FC = () => {
  return (
    <>
      <Form>
        
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>Id</Form.Label>
            <Form.Control placeholder='Enter Id' />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>RoleId</Form.Label>
            <Form.Control placeholder='Enter role id' />
          </Form.Group>
      

        <Row className='mb-5'>
          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>Claim type</Form.Label>
            <Form.Control as='select'>
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId='formGridState'>
            <Form.Label>Claim Value</Form.Label>
            <Form.Control as='select'>
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Button variant='primary' type='submit'>Submit</Button>
      </Form>
    </>
  )
}

export { AddPermissionForm}
