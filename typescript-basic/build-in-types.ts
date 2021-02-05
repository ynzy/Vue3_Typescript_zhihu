// global objects
const a: Array<number> = [1,2,3]
const date = new Date()
date.getTime()

const reg = /abc/
reg.test('abc')

// build-in object
Math.pow(2, 3)

// DOM and BOM
let body = document.body
let allLis = document.querySelectorAll('li')
allLis.keys()

document.addEventListener('click', (e) => {
  e.preventDefault()
})
// Utility Types