import React, {useState} from 'react'
import {Alert} from 'react-bootstrap-v5'

interface Props{
    type: string
    message:string
    heading? : string
}

const ErrorAlert = ({type, message, heading}: Props) => {
  return (
    <Alert variant={type}>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>
        {message}
      </p>
    </Alert>
  )
}

export default ErrorAlert
