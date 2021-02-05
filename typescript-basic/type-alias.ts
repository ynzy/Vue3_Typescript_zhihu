let sum: (x: number, y: number) => number
const result = sum(1,2)
type PlusType = (x: number, y: number) => number
let sum2: PlusType
const res = sum2(3, 4)
type StrOrNum = string | number
let result3: StrOrNum = '123'
result3 = 12

const str: 'name' = 'name'
const number: 1 = 1

type Directions = 'Up' | 'Down' | 'Left' | 'Right'
let toWhere: Directions = 'Right'