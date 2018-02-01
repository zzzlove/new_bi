const mutationDefs = ` 

destroyCubeData(id: ID!): Boolean,

createCubeData(input_content: CubeDataInput): CubeData,

updateCubeData(id: ID!, input_content: CubeDataInput): CubeData,

updateManyCubeData(where_content: CubeDataInput, input_content: CubeDataInput): Boolean,

destroyChartData(id: ID!): Boolean,

createChartData(input_content: ChartDataInput): ChartData,

updateChartData(id: ID!, input_content: ChartDataInput): ChartData,

updateManyChartData(where_content: ChartDataInput, input_content: ChartDataInput): Boolean,

destroyChartTitle(id: ID!): Boolean,

createChartTitle(input_content: ChartTitleInput): ChartTitle,

updateChartTitle(id: ID!, input_content: ChartTitleInput): ChartTitle,

updateManyChartTitle(where_content: ChartTitleInput, input_content: ChartTitleInput): Boolean,

`;

const biMutationDefs = [mutationDefs]
export default biMutationDefs;

//  2017-11-02 13:07:41.442523+08