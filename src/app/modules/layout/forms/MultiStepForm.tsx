import {Button, Step, StepLabel, Stepper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import {Form, Formik, FormikConfig, FormikHelpers, FormikValues} from 'formik'
import React, {useState} from 'react'
import StepFormNavigation from './StepFormNavigation'
import Container from '@mui/material/Container'

import Check from '@mui/icons-material/Check'
import SettingsIcon from '@mui/icons-material/Settings'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import VideoLabelIcon from '@mui/icons-material/VideoLabel'
import StepConnector, {stepConnectorClasses} from '@mui/material/StepConnector'
import {StepIconProps} from '@mui/material/StepIcon'
import {styled} from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import {Grid, Typography} from '@material-ui/core'

const useStyles = makeStyles({
  rootx: {
    color: 'white',
    fontSize: '30em',
    fontWeight: 'bold',
  },
})

interface Props extends FormikConfig<FormikValues> {
  children: React.ReactNode
}

const MultiStepForm = ({children, initialValues, onSubmit}: Props) => {
  const [stepNumber, setStepNumber] = useState(0)
  const steps = React.Children.toArray(children) as React.ReactElement[]
  const classes = useStyles()

  const [snapShot, setSnapShot] = useState(initialValues)

  const step = steps[stepNumber]
  const totalSteps = steps.length
  const isLastStep = stepNumber === totalSteps - 1

  const next = (values: FormikValues) => {
    setStepNumber(stepNumber + 1)
    setSnapShot(values)
  }

  const previous = (values: FormikValues) => {
    setStepNumber(stepNumber - 1)
    setSnapShot(values)
  }

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values)
    }

    if (isLastStep) {
      return onSubmit(values, actions)
    } else {
      actions.setTouched({})
      next(values)
    }
  }

  const ColorlibConnector = styled(StepConnector)(({theme}) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }))

  const ColorlibStepIconRoot = styled('div')<{
    ownerState: {completed?: boolean; active?: boolean}
  }>(({theme, ownerState}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
  }))

  function ColorlibStepIcon(props: StepIconProps) {
    const {active, completed, className} = props

    const icons: {[index: string]: React.ReactElement} = {
      1: <SettingsIcon />,
      2: <GroupAddIcon />,
      3: <VideoLabelIcon />,
    }

    return (
      <ColorlibStepIconRoot ownerState={{completed, active}} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    )
  }

  return (
    <>
      <Formik
        initialValues={snapShot}
        onSubmit={handleSubmit}
        validationSchema={step.props.validationSchema}
      >
        {(formik) => (
          <Form>
            <Stepper activeStep={stepNumber} connector={<ColorlibConnector />}>
              {steps.map((currentStep) => {
                const label = currentStep.props.stepName
                return (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      <Typography variant='h5' component='h5'>
                        {label}
                      </Typography>
                    </StepLabel>
                  </Step>
                )
              })}
            </Stepper>
            <Container sx={{width: '80%'}}>{step}</Container>

            <StepFormNavigation
              isLastStep={isLastStep}
              hasPrevious={stepNumber > 0}
              onBackClick={() => previous(formik.values)}
            />
            {/* <Button className={classes.root}>Hook</Button>; */}
          </Form>
        )}
      </Formik>
    </>
  )
}

export default MultiStepForm

export const FormStep = ({stepName = '', children}: any) => children