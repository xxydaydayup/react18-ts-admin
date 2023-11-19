import Mock from 'mockjs'

Mock.mock('/user/list', 'get', {
    code: 0,
    msg: 'success',
    'list|5': [{ name: '@name', age: '@integer(18,25)' }]
})
console.log(22)
