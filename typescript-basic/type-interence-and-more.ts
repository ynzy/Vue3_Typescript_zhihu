let str = '123'


// union types 联合类型
let numberOrString: number | string
numberOrString = '123'
numberOrString = 123
numberOrString.toString()

function getLength(input: string | number): number {
  // 类型断言，把不确定的类型判定成我们确定的类型
  const str = input as string
  if (str.length) {
    return str.length
  } else {
    const number = input as number
    return number.toString().length
  }
}

// type guard 类型守卫

function getLength2(input: string | number): number {
  if (typeof input === 'string') {
    return input.length
  } else {
    return input.toString().length
  }
}