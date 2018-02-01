const mutationDefs = ` 

destroyPricing(id: ID!): Boolean,

restorePricing(id: ID!): Boolean,

createPricing(input_content: PricingInput): Pricing,

updatePricing(id: ID!, input_content: PricingInput): Pricing,

updateManyPricing(id: [ID], input_content: PricingInput): Boolean,

destroyOrderSalesExtKh(id: ID!): Boolean,

restoreOrderSalesExtKh(id: ID!): Boolean,

createOrderSalesExtKh(input_content: OrderSalesExtKhInput): OrderSalesExtKh,

updateOrderSalesExtKh(id: ID!, input_content: OrderSalesExtKhInput): OrderSalesExtKh,

updateManyOrderSalesExtKh(id: [ID], input_content: OrderSalesExtKhInput): Boolean,

destroyRmExtOrderBilling(id: ID!): Boolean,

restoreRmExtOrderBilling(id: ID!): Boolean,

createRmExtOrderBilling(input_content: RmExtOrderBillingInput): RmExtOrderBilling,

updateRmExtOrderBilling(id: ID!, input_content: RmExtOrderBillingInput): RmExtOrderBilling,

updateManyRmExtOrderBilling(where_content: RmExtOrderBillingInput, input_content: RmExtOrderBillingInput): Boolean,

destroyOrderOpsExtUk(id: ID!): Boolean,

restoreOrderOpsExtUk(id: ID!): Boolean,

createOrderOpsExtUk(input_content: OrderOpsExtUkInput): OrderOpsExtUk,

updateOrderOpsExtUk(id: ID!, input_content: OrderOpsExtUkInput): OrderOpsExtUk,

updateManyOrderOpsExtUk(where_content: OrderOpsExtUkInput, input_content: OrderOpsExtUkInput): Boolean,

destroyServiceActual(id: ID!): Boolean,

createServiceActual(input_content: ServiceActualInput): ServiceActual,

updateServiceActual(id: ID!, input_content: ServiceActualInput): ServiceActual,

updateManyServiceActual(where_content: ServiceActualInput, input_content: ServiceActualInput): Boolean,

destroyServicex(id: ID!): Boolean,

createServicex(input_content: ServicexInput): Servicex,

updateServicex(id: ID!, input_content: ServicexInput): Servicex,

updateManyServicex(where_content: ServicexInput, input_content: ServicexInput): Boolean,

xServicexaddToControlCenter(input_content: ControlCenterInput): Servicex,

xServicexdestroyChildren(id: ID!) : Boolean,

xServicexcreateChildren(id: ID!, input_content: ServicexInput): Servicex,

xServicexupdateChildren(id: ID!, input_content: ServicexInput): Servicex,

xServicexremoveChildren(input_content: ServicexInput): Servicex,

xServicexaddToChildren(input_content: ServicexInput): Servicex,

destroyOrderSalesExtUk(id: ID!): Boolean,

restoreOrderSalesExtUk(id: ID!): Boolean,

createOrderSalesExtUk(input_content: OrderSalesExtUkInput): OrderSalesExtUk,

updateOrderSalesExtUk(id: ID!, input_content: OrderSalesExtUkInput): OrderSalesExtUk,

updateManyOrderSalesExtUk(where_content: OrderSalesExtUkInput, input_content: OrderSalesExtUkInput): Boolean,

destroyOrderOpsExtKh(id: ID!): Boolean,

restoreOrderOpsExtKh(id: ID!): Boolean,

createOrderOpsExtKh(input_content: OrderOpsExtKhInput): OrderOpsExtKh,

updateOrderOpsExtKh(id: ID!, input_content: OrderOpsExtKhInput): OrderOpsExtKh,

updateManyOrderOpsExtKh(where_content: OrderOpsExtKhInput, input_content: OrderOpsExtKhInput): Boolean,

`;

const sdMutationDefs = [mutationDefs]
export default sdMutationDefs;

//  2018-01-29 11:04:50.534518+00