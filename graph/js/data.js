export const colorArr = [
    "#03fc62",
    '#c71585',
    "#0a95e6",
    "pink",
    "orange",
    'yellow',
    "black",
    'red',
]
export const location = [
    {
        name: '1',
        draggable: true,
        itemStyle: {
            normal: {

            }
        }
    },
    {
        name: '2',
        draggable: true,
        itemStyle: {
            normal: {

            }
        }
    },
    {
        name: '3',
        draggable: true,
        itemStyle: {
            normal: {

            }
        }
    },
    {
        name: '4',
        draggable: true,
        itemStyle: {
            normal: {

            }
        }
    },
    {
        name: '5',
        draggable: true,
        itemStyle: {
            normal: {

            }
        }
    },

    {
        name: '6',
        draggable: true,
        itemStyle: {
            normal: {

            }
        }
    },
    {
        name: '7',
        itemStyle: {
            normal: {

            }
        }
    },
    {
        name: '8',
        itemStyle: {
            normal: {

            }
        }
    },
    {
        name: '9',
        itemStyle: {
            normal: {

            }
        }
    },
    {
        name: '10',
        itemStyle: {
            normal: {

            }
        }
    },
]
//用于通过数组生成需要的对象格式
export function getData(arr) {
    let len = arr.length;
    let n = 2; //假设每行显示4个
    let lineNum = len % 2 === 0 ? len / 2 : Math.floor((len / 2) + 1);
    let newArr = [];
    for (let i = 0; i < lineNum; i++) {
        // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
        let temp = arr.slice(i * n, i * n + n);
        newArr.push(temp);
    }
    let size = newArr[0]
    let data = []
    newArr.forEach((item, index) => {
        if (index != 0) {
            data[index - 1] = item
        }
    })
    const dataObj = {
        size,
        data,
    }
    return dataObj;
}
//根据输入数据进行连接(线)
export function link(arr) {
    let linkArr = []
    for (let i = 0; i < arr.length; i++) {
        let m = arr[i][0]
        let n = arr[i][1]
        let tempObj = {
            source: m,
            target: n,
        }
        tempObj.lineStyle = {}
        linkArr.push(tempObj)
    }
    console.log(linkArr);
    return linkArr
}
//根据输入数据展示需要的图(点)
export function locaGraph(arr) {
    let tempArr = []
    for (let i = 0; i < arr[0]; i++) {
        location[i].itemStyle.normal = {}
        tempArr.push(location[i])
    }

    return tempArr
}
export function addGraph(arr,addFlag) {
    let tempArr = []
    for (let i = 0; i < parseInt(arr[0])+addFlag; i++) {
       let currentObj={
            name: String(i+1),
            itemStyle: {
            normal: {

            }
        }
        }
        tempArr.push(currentObj)
    }

    return tempArr
}
//通过输入和请求的数据展示强连通分量（设置点）
export function linkFen(arr, scg) {
    let linkArr = []
    for (let i = 0; i < arr.length; i++) {
        let m = arr[i][0]
        let n = arr[i][1]
        let tempObj = {
            source: m,
            target: n,
            lineStyle: {

            }
        }

        linkArr.push(tempObj)
    }
    for (let i = 0; i < scg.length; i++) {
        scg[i] = scg[i].reverse()
    }
    let k = 0
    for (let i = 0; i < scg.length; i++) {
        for (let j = 0; j < linkArr.length; j++) {
            if (scg[i].find(item => item == linkArr[j].source) && scg[i].find(item => item == linkArr[j].target)) {
                linkArr[j].lineStyle["color"] = colorArr[k]
                linkArr[j].lineStyle["width"] = 5
            }
        }
        k++
    }

    console.log("linkFen", linkArr,);
    return linkArr
}
//通过输入和请求的数据展示强连通分量（设置连线）
export function locaFen(arr, scg) {
    let tempArr = []
    for (let i = 0; i < arr[0]; i++) {
        tempArr.push(location[i])
    }
    console.log("locaFen", tempArr);
    let t = 0
    for (let i = 0; i < scg.length; i++) {
        for (let j = 0; j < scg[i].length; j++) {
            tempArr[scg[i][j] - 1].itemStyle.normal["color"] = colorArr[t]
        }
        t++
    }
    for (let i = 0; i < arr[0]; i++) {
        console.log(tempArr[i], t);
    }
    return tempArr
}
//为next点击事件返回
export function nextGL(size, data, dfn, newscg) {
    let tempArr = []
    for (let i = 0; i < size[0]; i++) {
        location[i].itemStyle.normal = {}
        tempArr.push(location[i])
    }
    dfn.forEach((item, index) => {
        if (item != 0) {
            tempArr[index - 1].itemStyle.normal["color"] = "red"
        }
    })
    if (newscg.length == 0) {
        let linkArr = []
        for (let i = 0; i < data.length; i++) {
            let m = data[i][0]
            let n = data[i][1]
            let tempObj = {
                source: m,
                target: n,
            }
            tempObj.lineStyle = {}
            linkArr.push(tempObj)
        }
        console.log(linkArr);
        return { tempArr, linkArr }
    } else {
        let t = 0
        for (let i = 0; i < newscg.length; i++) {
            for (let j = 0; j < newscg[i].length; j++) {
                tempArr[newscg[i][j] - 1].itemStyle.normal["color"] = colorArr[t]
            }
            t++
        }

        let linkArr = []
        for (let i = 0; i < data.length; i++) {
            let m = data[i][0]
            let n = data[i][1]
            let tempObj = {
                source: m,
                target: n,
                lineStyle: {

                }
            }

            linkArr.push(tempObj)
        }
        for (let i = 0; i < newscg.length; i++) {
            newscg[i] = newscg[i].reverse()
        }
        let k = 0
        for (let i = 0; i < newscg.length; i++) {
            for (let j = 0; j < linkArr.length; j++) {
                if (newscg[i].find(item => item == linkArr[j].source) && newscg[i].find(item => item == linkArr[j].target)) {
                    linkArr[j].lineStyle["color"] = colorArr[k]
                    linkArr[j].lineStyle["width"] = 5
                }
            }
            k++
        }
        return { tempArr, linkArr }

    }
}