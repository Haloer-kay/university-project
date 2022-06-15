//向后端发送原始数据
export function getInfo(postData){
    return axios({
        url:"http://127.0.0.1:8888/",
        method:'post',
        data:JSON.stringify(postData)
    })
}
//初始化next
export  function getNextFirst(nextData){
    return axios({
        url:"http://127.0.0.1:8888/next",
        method:'post',
        data:JSON.stringify(nextData)
    })
}
//得到next后的每一步数据
export function getNextSecond(nextData){
    return axios({
        url:"http://127.0.0.1:8888/next",
        method:'post',
        data:JSON.stringify(nextData)
    })
}   