const typeDefs = ` 


type ChartSimpleXY{x: String, y: Int}

type ChartSimpleCY{c: String, y: Int}

type ChartSimpleXCY{x: String, c: String, y: Int}

type ChartSimpleXCCY{x: String, c1: String, c2: String, y: Int}

type ChartSimpleXCYY{x: String, c: String, y1: Int, y2: Int}

`;

const biDefsTypeDefs = [typeDefs]
export { biDefsTypeDefs };