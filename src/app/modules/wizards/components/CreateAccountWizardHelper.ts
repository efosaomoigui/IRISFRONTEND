import * as Yup from 'yup'

export interface ICreateAccount {
  shipmentCategory: string
  shipperFullName: string
  shipperAddress: string
  shipperPhoneNumber: string
  receiverFullName: string
  receiverAddress: string
  receiverPhoneNumber: string
  departure: string
  destination: string
  weight: string
  ton: string
  accountPlan: string
  businessName: string
  businessDescriptor: string
  businessType: string
  businessDescription: string
  businessEmail: string
  nameOnCard: string
  cardNumber: string
  cardExpiryMonth: string
  cardExpiryYear: string
  cardCvv: string
  saveCard: string
}

const createAccountSchemas = [
  Yup.object({
    shipmentCategory: Yup.string().required().label('Shipment Type'),
  }),
  Yup.object({
    shipperFullName: Yup.string().required().label('Shipper Full Name'),
    shipperAddress: Yup.string().required().label('Shipper Address'),
    shipperPhoneNumber: Yup.string().required().label('Shipper Phone'),
    receiverFullName: Yup.string().required().label('Receiver Full Name'),
    receiverAddress: Yup.string().required().label('Receiver Address'),
    receiverPhoneNumber: Yup.string().required().label('Receiver Phone'),
    departure: Yup.string().required().label('Departure'),
    destination: Yup.string().required().label('Destination'),
  }),
  Yup.object({
    businessName: Yup.string().required().label('Business Name'),
    weight: Yup.string()
    .when("shipmentCategory", {
      is: "mailandparcel",
      then: Yup.string().required().label("Weight is required")
    }),
    ton: Yup.string()
    .when("shipmentCategory", {
      is: "TruckLoad",
      then: Yup.string().required().label("Weight (ton) is required")
    }),
    businessDescriptor: Yup.string().required().label('Shortened Descriptor'),
    businessType: Yup.string().required().label('Corporation Type'),
    businessEmail: Yup.string().required().label('Contact Email'),
  }),
  Yup.object({
    nameOnCard: Yup.string().required().label('Name On Card'),
    cardNumber: Yup.string().required().label('Card Number'),
    cardExpiryMonth: Yup.string().required().label('Expiration Month'),
    cardExpiryYear: Yup.string().required().label('Expiration Year'),
    cardCvv: Yup.string().required().label('CVV'),
  }),
]

const inits: ICreateAccount = {
  shipmentCategory: 'mailandparcel',
  shipperFullName: '',
  shipperAddress: '',
  shipperPhoneNumber: '',
  receiverFullName: '',
  receiverAddress: '',
  receiverPhoneNumber: '',
  departure: 'LOS',
  destination: 'ABA',
  weight: '',
  ton: '',
  accountPlan: '1',
  businessName: 'Keenthemes Inc.',
  businessDescriptor: 'KEENTHEMES',
  businessType: '1',
  businessDescription: '',
  businessEmail: 'corp@support.com',
  nameOnCard: 'Max Doe',
  cardNumber: '4111 1111 1111 1111',
  cardExpiryMonth: '1',
  cardExpiryYear: '2025',
  cardCvv: '123',
  saveCard: '1',
}

export {createAccountSchemas, inits}
