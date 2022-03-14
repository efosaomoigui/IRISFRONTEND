import {ChangeEvent, FC, FormEvent, useEffect, useRef, useState} from 'react'

import {KTSVG} from '../../../../../_iris/helpers'
import {StepperComponent} from '../../../../../_iris/assets/ts/components'
import {Formik, Form, FormikValues, useFormikContext} from 'formik'
import {
  createAccountSchemas,
  ICreateAccount,
  inits,
} from '../../../wizards/components/CreateAccountWizardHelper'

import {Step3} from '../../../wizards/components/steps/Step3'
import {Step2} from '../../../wizards/components/steps/Step2'
import {Step1} from '../../../wizards/components/steps/Step1'
import {Button, Nav} from 'react-bootstrap-v5'
import {Step6} from '../../../wizards/components/steps/Step6'
import { Step4 } from '../../../wizards/components/steps/Step4'
import { Step5 } from '../../../wizards/components/steps/Step5' 

const HorizontalShipmentCapture: FC = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [initValues] = useState<ICreateAccount>(inits)
  const [isSubmitButton, setSubmitButton] = useState(false)
  const [radioState, setRadioState] = useState("mailandparcel");

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totatStepsNumber! - 1)
    stepper.current.goPrev()
    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
  }
  console.log("==> ", initValues)

  const submitStep = (values: ICreateAccount, actions: FormikValues) => {
    if (!stepper.current) {
      return
    }

    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totatStepsNumber! - 1)
    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex])

    if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
      stepper.current.goNext()
    } else {
      stepper.current.goto(1) 
      actions.resetForm()
    }
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>)=> {
    const newValue = e.target.value;
    setRadioState(newValue)
    console.log("}==> ", newValue);
 }

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

  return (
    <div className='card'>
      <div className='card-body'>
        <Nav
          ref={stepperRef}
          className='stepper stepper-links d-flex flex-column pt-15 nav'
          id='kt_create_account_stepper'
        >
          <div className='stepper-nav mb-11'>
            <div className='stepper-item current' data-kt-stepper-element='nav'>
              <h3 className='stepper-title'>General Information</h3>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <h3 className='stepper-title'>Shipper Details</h3>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <h3 className='stepper-title'>Package Information</h3>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <h3 className='stepper-title'>Shipment Summary</h3>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <h3 className='stepper-title'>Make Payment</h3>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <h3 className='stepper-title'>Complete</h3>
            </div>
          </div>

          <Formik
            validationSchema={currentSchema}
            initialValues={initValues}
            onSubmit={submitStep}
            onChange={handleOnChange}
          >
            {({values, handleChange}) => (
              <Form className='mx-auto mw-900px w-100 pt-8 pb-10' id='kt_create_account_form'>
                <div className='current' data-kt-stepper-element='content'>
                  <Step1 handleClick={handleOnChange} />
                </div>

                <div data-kt-stepper-element='content'>
                  <Step2 values={values}  />
                </div>

                <div data-kt-stepper-element='content'>
                  <Step3 radioState={radioState} values={values} /> 
                </div>

                <div data-kt-stepper-element='content'>
                  <Step4 values={values} />
                </div>

                <div data-kt-stepper-element='content'>
                  <Step5 />
                </div>

                <div data-kt-stepper-element='content'>
                  <Step6 />
                </div>

                <div className='d-flex flex-stack pt-2'>
                  <div className='mr-2'>
                    <Button
                      onClick={prevStep}
                      type='button'
                      style={{width: '100%'}}
                      className='btn btn-lg btn-primary me-3'
                      data-kt-stepper-action='previous'
                    >
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr063.svg'
                        className='svg-icon-4 me-1'
                      />
                      Back
                    </Button>
                  </div>

                  <div>
                    <Button
                      type='submit'
                      style={{width: '100%'}}
                      className='btn btn-lg btn-primary me-3'
                    >
                      <span className='indicator-label'>
                        {!isSubmitButton && 'Continue'}
                        {isSubmitButton && 'Submit'}
                        <KTSVG
                          path='/media/icons/duotune/arrows/arr064.svg'
                          className='svg-icon-3 ms-2 me-0'
                        />
                      </span>
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Nav>
      </div>
    </div>
  )
}

export {HorizontalShipmentCapture}
