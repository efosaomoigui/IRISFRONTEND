import React, {ChangeEvent, useState} from 'react'
import {Modal} from 'react-bootstrap-v5'
import {Button, Form, Segment} from 'semantic-ui-react'
import {KTSVG} from '../../../../_iris/helpers'
import {IUserModel} from '../../auth/models/AuthInterfaces'
import {v4 as uuid} from 'uuid'
import agent from '../../../../setup/axios/AxiosAgent'
import {Formik} from 'formik'
import {off} from 'process'

interface Props {
  userVal: IUserModel
}

export default function GenericForm1({userVal}: Props) {
  // const [user, setUser] = useState<IUserModel>({});

  //   function handleCreateOrEditActivity(user: IUserModel) {
  //     user.id ? setUser(user)
  //   }

  const initialState: IUserModel = {
    userId: '',
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    phonenumber: '',
    age: '70',
    designation: '',
    department: '',
    pictureUrl: '',
    isActive: false,
    organisation: '',
    status: 1,
  }

  const [user, setUser] = useState(initialState)

//   function handleSubmit() {
//     if (user.userId.length === 0) {
//       user.userId = uuid()
//       let newUser = {...user}
//       console.log('The user: ', user)
//       agent.Users.create(newUser).then((response) => {
//         console.log(response)
//       })
//       console.log('The Forms id: ', user.userId)
//     }
//   }

//   function handleChange(event: ChangeEvent<HTMLInputElement>) {
//     const {name, value} = event.target
//     setUser({...user, [name]: value})
//   }

  return (
    <>
      <Formik initialValues={userVal} enableReinitialize onSubmit={(values) => console.log('formik values: ', values)}>
        {({values:user, handleChange, handleSubmit}) => (
          <Form onSubmit={handleSubmit} autoComplete='off'>
            <div className='modal-dialog modal-dialog-centered mw-900px'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h2>Create User</h2>

                  <div
                    className='btn btn-sm btn-icon btn-active-color-primary'
                    data-bs-dismiss='modal'
                  >
                    <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                  </div>
                </div>

                <div className='modal-body py-lg-10 px-lg-10'>
                  <Form.Input
                    placeholder='firstName'
                    value={user.userName}
                    name='userName'
                    onChange={handleChange}
                  />
                  <Form.Input
                    placeholder='firstName'
                    value={user.firstName}
                    name='firstName'
                    onChange={handleChange}
                  />
                  <Form.Input
                    placeholder='lastName'
                    value={user.lastName}
                    name='lastName'
                    onChange={handleChange}
                  />
                  <Form.Input
                    placeholder='email'
                    value={user.email}
                    name='email'
                    onChange={handleChange}
                  />
                  <Form.Input
                    placeholder='password'
                    value={user.password}
                    name='password'
                    onChange={handleChange}
                  />
                  <Form.Input
                    placeholder='phone'
                    value={user.phonenumber}
                    name='phonenumber'
                    onChange={handleChange}
                  />
                </div>

                <Modal.Footer>
                  <Button
                    floated='right'
                    positive
                    type='submit'
                    variant='secondary'
                    content='Submit'
                  ></Button>
                  <Button floated='right' positive type='button' content='Cancel'></Button>
                </Modal.Footer>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
