import {Card} from 'react-bootstrap-v5'
import {Formik, Form, FormikValues} from 'formik'
import HorizontalNonLinearStepper from './CaptureShipmentStepper'
import {HorizontalShipmentCapture} from './HorizontalShipmentCapture'
import {
  createAccountSchemas,
  ICreateAccount,
  inits,
} from '../../../wizards/components/CreateAccountWizardHelper'
import {useState} from 'react'

export function CaptureDomesticShipment() {
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [initValues] = useState<ICreateAccount>(inits)
  const [isSubmitButton, setSubmitButton] = useState(false)

  const submitStep = (values: ICreateAccount, actions: FormikValues) => {
    console.log('submit')
  }

  return (
    <div className='row g-5 g-xxl-12'>
      <div className='col-xl-12'>
        <Card border='primary'>
          {/* <Card.Header>Header</Card.Header> */}
          <Card.Body>
            {/* <Card.Title>Primary Card Title</Card.Title> */}
            <Card.Text>
              <Formik
                validationSchema={currentSchema}
                initialValues={initValues}
                onSubmit={submitStep}
              >
                {() => (
                  <Form className='mx-auto mw-900px w-100 pt-15 pb-10' id='kt_create_account_form'>
                    <HorizontalNonLinearStepper />
                  </Form>
                )}
              </Formik>
            </Card.Text>
          </Card.Body>
        </Card>
        {/* <HorizontalNonLinearStepper /> */}
        {/* <FeedsWidget6 className='mb-5 mb-xxl-8' /> */}
      </div>
    </div>
  )
}
