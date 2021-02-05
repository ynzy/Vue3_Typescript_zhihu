function echo<T>(arg: T): T {
  return arg
}


const result = echo(true)

function swap<T,U>(tuple: [T,U]): [U, T] {
  return [tuple[1],tuple[0]]
}

const result2 = swap(['123', 321])


function echoWithArr<T>(arg:T[]): T[] {
  console.log(arg.length);
  return arg
}

const arrs = echoWithArr([1, 2])

interface IWithLength {
  length: number
}

function echoWithLength<T extends IWithLength>(arg: T): T{
  console.log(arg.length);
  return arg
}

const str = echoWithLength('str')
const obj = echoWithLength({ length: 10 })
const arr2 = echoWithLength([1, 2, 3])
// const num = echoWithLength(112)

class Queue<T> {
  private data = [];
  push(item:T) {
    return this.data.push(item)
  }
  pop(): T {
    return this.data.shift()
  }
}

const queue = new Queue<number>()
queue.push(1)
console.log(queue.pop().toFixed())

interface KeyPair<T,U> {
  key: T
  value: U
}

let kp1: KeyPair<number, string> = {key:1,value:'str'}
let kp2: KeyPair<string, number> = { key: '1', value: 2 }
let arr: number[] = [1, 2, 3]
let arrTwo: Array<number> = [1,2,3]