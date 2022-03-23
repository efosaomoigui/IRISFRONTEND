import * as Yup from 'yup'

export interface ICreateAccount {
  shipmentCategory: string
  shipperFullName: string
  shipperAddress: string
  shipperPhoneNumber: string
  receiverFullName: string
  receiverAddress: string
  receiverPhoneNumber: string
  route: string
  itemsA: Array<{
    ton:string 
    t_shipmentDescription:string
    t_shipmentType:number
    LineTotal:number
  }>
  itemsB: Array<{
    weight:string
    length:string
    breadth:string
    height:string
    m_shipmentDescription:string
    LineTotal:number
  }>
  grandTotal:number
  grandTotalArray:number[]
  paymentMethod:string
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
    route: Yup.string().required().label('Route'),
  }),
  Yup.object({
    itemsA: Yup.array()
     .of(
       Yup.object().shape({
         ton: Yup.string().when("shipmentCategory", {
          is: "TruckLoad",
          then: Yup.string().required().label("Weight (ton) is required")
        }), 
       })
     ),
    itemsB: Yup.array()
     .of(
       Yup.object().shape({
        weight: Yup.string().when("shipmentCategory", {
          is: "mailandparcel",
          then: Yup.string().required().label("Weight (kg) is required")
        }), 
       })
     )
  }),
  // Yup.object({
  //   nameOnCard: Yup.string().required().label('Name On Card'),
  //   cardNumber: Yup.string().required().label('Card Number'),
  //   cardExpiryMonth: Yup.string().required().label('Expiration Month'),
  //   cardExpiryYear: Yup.string().required().label('Expiration Year'),
  //   cardCvv: Yup.string().required().label('CVV'),
  // }),
]

const inits: ICreateAccount = {
  shipmentCategory: 'mailandparcel',
  shipperFullName: '',
  shipperAddress: '',
  shipperPhoneNumber: '',
  receiverFullName: '',
  receiverAddress: '',
  receiverPhoneNumber: '',
  route: '',
  itemsA: [{
    ton:'10',
    t_shipmentDescription:'',
    t_shipmentType:1,
    LineTotal:0.00
  }] ,
  itemsB: [{
    weight:'',
    length:'',
    breadth:'',
    height:'',
    m_shipmentDescription:'',
    LineTotal:0.0
  }],
  grandTotal:0,
  grandTotalArray:[0],
  paymentMethod: ''
}

export {createAccountSchemas, inits}
