import React from 'react'
import { Button, Form } from 'react-bootstrap-v5'

const AddRoleForm: React.FC = () => {
  return (
    <>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Role Name</Form.Label>
          <Form.Control  placeholder="Enter role name" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export { AddRoleForm }

