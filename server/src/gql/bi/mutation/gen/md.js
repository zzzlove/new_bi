const mutationDefs = ` 

destroyControlCenterBudget(id: ID!): Boolean,

createControlCenterBudget(input_content: ControlCenterBudgetInput): ControlCenterBudget,

updateControlCenterBudget(id: ID!, input_content: ControlCenterBudgetInput): ControlCenterBudget,

updateManyControlCenterBudget(where_content: ControlCenterBudgetInput, input_content: ControlCenterBudgetInput): Boolean,

destroyRmControlCenterEquipment(id: ID!): Boolean,

createRmControlCenterEquipment(input_content: RmControlCenterEquipmentInput): RmControlCenterEquipment,

updateRmControlCenterEquipment(id: ID!, input_content: RmControlCenterEquipmentInput): RmControlCenterEquipment,

updateManyRmControlCenterEquipment(where_content: RmControlCenterEquipmentInput, input_content: RmControlCenterEquipmentInput): Boolean,

xRmControlCenterEquipmentaddToControlCenter(input_content: ControlCenterInput): RmControlCenterEquipment,

destroyMemberContract(id: ID!): Boolean,

restoreMemberContract(id: ID!): Boolean,

createMemberContract(input_content: MemberContractInput): MemberContract,

updateMemberContract(id: ID!, input_content: MemberContractInput): MemberContract,

updateManyMemberContract(where_content: MemberContractInput, input_content: MemberContractInput): Boolean,

xMemberContractaddToServicex(input_content: ServicexInput): MemberContract,

destroyRmControlCenterProfile(id: ID!): Boolean,

createRmControlCenterProfile(input_content: RmControlCenterProfileInput): RmControlCenterProfile,

updateRmControlCenterProfile(id: ID!, input_content: RmControlCenterProfileInput): RmControlCenterProfile,

updateManyRmControlCenterProfile(where_content: RmControlCenterProfileInput, input_content: RmControlCenterProfileInput): Boolean,

xRmControlCenterProfileaddToControlCenter(input_content: ControlCenterInput): RmControlCenterProfile,

destroyProfile(id: ID!): Boolean,

restoreProfile(id: ID!): Boolean,

createProfile(input_content: ProfileInput): Profile,

updateProfile(id: ID!, input_content: ProfileInput): Profile,

updateManyProfile(id: [ID], input_content: ProfileInput): Boolean,

destroyControlCenterStatus(id: ID!): Boolean,

createControlCenterStatus(input_content: ControlCenterStatusInput): ControlCenterStatus,

updateControlCenterStatus(id: ID!, input_content: ControlCenterStatusInput): ControlCenterStatus,

updateManyControlCenterStatus(where_content: ControlCenterStatusInput, input_content: ControlCenterStatusInput): Boolean,

destroyControlCenterAlterType(id: ID!): Boolean,

createControlCenterAlterType(input_content: ControlCenterAlterTypeInput): ControlCenterAlterType,

updateControlCenterAlterType(id: ID!, input_content: ControlCenterAlterTypeInput): ControlCenterAlterType,

updateManyControlCenterAlterType(where_content: ControlCenterAlterTypeInput, input_content: ControlCenterAlterTypeInput): Boolean,

destroyFinCodeActual(id: ID!): Boolean,

createFinCodeActual(input_content: FinCodeActualInput): FinCodeActual,

updateFinCodeActual(id: ID!, input_content: FinCodeActualInput): FinCodeActual,

updateManyFinCodeActual(where_content: FinCodeActualInput, input_content: FinCodeActualInput): Boolean,

destroyControlCenterRm(id: ID!): Boolean,

createControlCenterRm(input_content: ControlCenterRmInput): ControlCenterRm,

updateControlCenterRm(id: ID!, input_content: ControlCenterRmInput): ControlCenterRm,

updateManyControlCenterRm(where_content: ControlCenterRmInput, input_content: ControlCenterRmInput): Boolean,

destroyOpsCodeActual(id: ID!): Boolean,

createOpsCodeActual(input_content: OpsCodeActualInput): OpsCodeActual,

updateOpsCodeActual(id: ID!, input_content: OpsCodeActualInput): OpsCodeActual,

updateManyOpsCodeActual(where_content: OpsCodeActualInput, input_content: OpsCodeActualInput): Boolean,

destroySignClientDayMonitoring(id: ID!): Boolean,

createSignClientDayMonitoring(input_content: SignClientDayMonitoringInput): SignClientDayMonitoring,

updateSignClientDayMonitoring(id: ID!, input_content: SignClientDayMonitoringInput): SignClientDayMonitoring,

updateManySignClientDayMonitoring(where_content: SignClientDayMonitoringInput, input_content: SignClientDayMonitoringInput): Boolean,

destroyMemberCatService(id: ID!): Boolean,

createMemberCatService(input_content: MemberCatServiceInput): MemberCatService,

updateMemberCatService(id: ID!, input_content: MemberCatServiceInput): MemberCatService,

updateManyMemberCatService(where_content: MemberCatServiceInput, input_content: MemberCatServiceInput): Boolean,

destroyControlCenterActual(id: ID!): Boolean,

createControlCenterActual(input_content: ControlCenterActualInput): ControlCenterActual,

updateControlCenterActual(id: ID!, input_content: ControlCenterActualInput): ControlCenterActual,

updateManyControlCenterActual(where_content: ControlCenterActualInput, input_content: ControlCenterActualInput): Boolean,

destroyControlCenter(id: ID!): Boolean,

createControlCenter(input_content: ControlCenterInput): ControlCenter,

updateControlCenter(id: ID!, input_content: ControlCenterInput): ControlCenter,

updateManyControlCenter(id: [ID], input_content: ControlCenterInput): Boolean,

xControlCentersetChildren(id: ID!, subids: [Int]) : ControlCenter,

xControlCentercreateChildren(id: ID!, input_content: ControlCenterInput): ControlCenter,

xControlCenterremoveChildren(id: ID!, subids: [Int]): ControlCenter,

xControlCenteraddChildren(id: ID!, subids: [Int]): ControlCenter,

destroyCity(id: ID!): Boolean,

createCity(input_content: CityInput): City,

updateCity(id: ID!, input_content: CityInput): City,

updateManyCity(id: [ID], input_content: CityInput): Boolean,

destroyEquipmentActual(id: ID!): Boolean,

createEquipmentActual(input_content: EquipmentActualInput): EquipmentActual,

updateEquipmentActual(id: ID!, input_content: EquipmentActualInput): EquipmentActual,

updateManyEquipmentActual(where_content: EquipmentActualInput, input_content: EquipmentActualInput): Boolean,

destroyMemberActual(id: ID!): Boolean,

createMemberActual(input_content: MemberActualInput): MemberActual,

updateMemberActual(id: ID!, input_content: MemberActualInput): MemberActual,

updateManyMemberActual(where_content: MemberActualInput, input_content: MemberActualInput): Boolean,

destroyControlCenterAlter(id: ID!): Boolean,

createControlCenterAlter(input_content: ControlCenterAlterInput): ControlCenterAlter,

updateControlCenterAlter(id: ID!, input_content: ControlCenterAlterInput): ControlCenterAlter,

updateManyControlCenterAlter(where_content: ControlCenterAlterInput, input_content: ControlCenterAlterInput): Boolean,

`;

const mdMutationDefs = [mutationDefs]
export default mdMutationDefs;

//  2018-01-25 10:35:57.864287+08