interface IPerson {
  readonly id:number,
  name: string,
  age?: number
}

let viking: IPerson = {
  id: 1,
  name: 'viking',
  age: 12
}