import {Card} from 'react-bootstrap-v5'
import HorizontalNonLinearStepper from './CaptureShipmentStepper'
import {HorizontalShipmentCapture} from './HorizontalShipmentCapture'

export function CaptureDomesticShipment() {
  return (
    <div className='row g-5 g-xxl-12'>
      <div className='col-xl-12'>
        <Card border='primary'>
          {/* <Card.Header>Header</Card.Header> */}
          <Card.Body>
            {/* <Card.Title>Primary Card Title</Card.Title> */}
            <Card.Text>
            <HorizontalNonLinearStepper />
            </Card.Text>
          </Card.Body>
        </Card>
        {/* <HorizontalNonLinearStepper /> */}
        {/* <FeedsWidget6 className='mb-5 mb-xxl-8' /> */}
      </div>
    </div>
  )
}
