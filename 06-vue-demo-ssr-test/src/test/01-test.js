let numbers = [1,2,3,4,99]
function test () {
    // console.error(...arguments)
    numbers.push(...arguments)
    console.error(numbers, ...numbers)
}
test(1,2,3,456,99999188888,8888,9999)
let nums = [...numbers]
nums[0] = 'xxxxx'
console.log(nums,">>>",numbers)

nums.filter((ss,index) =>{
    console.log(ss, index, 'DDDDDD')
})