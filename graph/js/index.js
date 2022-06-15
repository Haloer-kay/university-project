import { getData, link, locaGraph, linkFen, locaFen, nextGL ,addGraph} from "./data.js"
import { getNextFirst, getNextSecond, getInfo } from "./request.js"

let btnGraph = document.querySelector(".btnGraph")
let btnFen = document.querySelector(".btnFen")
let nextBtn = document.querySelector(".btnNext")
let btnAdd=document.querySelector(".btnAdd")

let postData = {}
let localData = {}
let status

//生成原始图
btnGraph.onclick = async () => {
    btnFen.style.display = "block"
    nextBtn.style.display = "block"
    let dfnh3 = document.querySelector(".dfnh3")
    let lowh3 = document.querySelector(".lowh3")
    dfnh3.innerHTML = ""
    lowh3.innerHTML = ""
    let text = document.querySelector(".text")
    if (text.value.trim() == "") {
        return
    }
    let strArray = text.value.trim().split(/[(\r\n\s)\r\n\s]+/)
    let numArray = []
    for (let i = 0; i < strArray.length; i++) {
        numArray[i] = parseInt(strArray[i])
    }
    localData = getData(strArray)
    localData = getData(strArray)
    postData = getData(numArray)
    var myChart = echarts.init(document.querySelector('.main'));
    // 指定图表的配置项和数据
    let option = {
        title: {
            text: '原图'
        },
        
        tooltip: {},
        animationDurationUpdate: function(idx) {
            // 越往后的数据延迟越大
            return idx * 100;
        },
        animationEasingUpdate: 'bounceIn',
        series: [
            {
                type: 'graph',
                layout: 'force',
                force: {	
                    repulsion: 1000,	
                    edgeLength: 150,
                },
                //设置圆大小
                symbolSize: 50,
                //设置是否拖动
                roam: true,
                
                label: {
                    show: true,
                    textStyle: {
                        fontSize: '18px'
                    },
                },
                edgeSymbol: ['none', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    fontSize: 20
                },

                data: locaGraph(localData.size),
                links: link(localData.data),
                lineStyle: {
                    opacity: 0.9,
                    width: 2,
                }
            }
        ],
    };
    let nextInit = postData
    nextInit["code"] = "create"
    const next = await getNextFirst(nextInit)
    status = next.data.status
    console.log(status);
    myChart.setOption(option);
}
let addFlag=0
btnAdd.onclick = async () => {
    addFlag++;
    btnFen.style.display = "block"
    nextBtn.style.display = "block"
    let dfnh3 = document.querySelector(".dfnh3")
    let lowh3 = document.querySelector(".lowh3")
    dfnh3.innerHTML = ""
    lowh3.innerHTML = ""
    let text = document.querySelector(".text")
    if (text.value.trim() == "") {
        return
    }
    let strArray = text.value.trim().split(/[(\r\n\s)\r\n\s]+/)
    let numArray = []
    for (let i = 0; i < strArray.length; i++) {
        numArray[i] = parseInt(strArray[i])
    }
    localData = getData(strArray)
    localData = getData(strArray)
    postData = getData(numArray)
    var myChart = echarts.init(document.querySelector('.main'));
    // 指定图表的配置项和数据
    let option = {
        title: {
            text: '原图'
        },
        
        tooltip: {},
        animationDurationUpdate: function(idx) {
            // 越往后的数据延迟越大
            return idx * 100;
        },
        animationEasingUpdate: 'bounceIn',
        series: [
            {
                type: 'graph',
                layout: 'force',
                force: {	
                    repulsion: 1000,	
                    edgeLength: 150,
                },
                //设置圆大小
                symbolSize: 50,
                //设置是否拖动
                roam: true,
                
                label: {
                    show: true,
                    textStyle: {
                        fontSize: '18px'
                    },
                },
                edgeSymbol: ['none', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    fontSize: 20
                },

                data: addGraph(localData.size,addFlag),
                links: link(localData.data),
                lineStyle: {
                    opacity: 0.9,
                    width: 2,
                }
            }
        ],
    };
    let nextInit = postData
    nextInit["code"] = "create"
    const next = await getNextFirst(nextInit)
    status = next.data.status
    console.log(status);
    myChart.setOption(option);
}

//生成强连通分量
btnFen.onclick = async () => {
    try{
        var result = await getInfo(postData)
        var scg = result.data.scg
    }catch(error){
        console.log(error);
    }
    console.log("scg", scg);
    //发送next请求
    var newChart = echarts.init(document.querySelector('.newmain'));
    // 指定图表的配置项和数据
    let newOption = {
        title: {
            text: '强连通分量'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                type: 'graph',
                layout: 'force',
                force: {	
                    repulsion: 1000,	
                    edgeLength: 150,
                },
                //设置圆大小
                symbolSize: 50,
                //设置是否拖动
                // roam: true,
                label: {
                    show: true,
                    textStyle: {
                        fontSize: '18px'
                    },
                },
                edgeSymbol: ['none', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    fontSize: 20
                },
                data: locaFen(localData.size, scg),
                links: linkFen(localData.data, scg),
                lineStyle: {
                    opacity: 0.9,
                    width: 2,
                }
            }
        ],

    };
    newChart.setOption(newOption);
}
//next按钮点击事件
nextBtn.addEventListener("click", async () => {
    let dfnh3 = document.querySelector(".dfnh3")
    let lowh3 = document.querySelector(".lowh3")
    if (status == "success") {
        console.log("second");
        let nextData = postData;
        nextData["code"] = "next"
        try{
            var nowData = await getNextSecond(nextData)
        }catch(error){
            console.log(error);
        }
        dfnh3.innerHTML = "dfn:[" + nowData.data.dfn.slice(1,nowData.data.dfn.length) + "]"
        lowh3.innerHTML = "low:[" + nowData.data.low.slice(1,nowData.data.low.length)  + "]"
        console.log(nowData.data, "nowData");
        let dfn = nowData.data.dfn
        let newscg = nowData.data.scg
        // let {dfn,scg}=nowData.data
        console.log(dfn, newscg);
        var myChart = echarts.init(document.querySelector('.main'));
        console.log(localData, "nextBtn");
        const data = nextGL(localData.size, localData.data, dfn, newscg).tempArr
        const links = nextGL(localData.size, localData.data, dfn, newscg).linkArr
        let option = {
            title: {
                text: '原图'
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    force: {	
                        repulsion: 1000,	
                        edgeLength: 150,
                    },
                    //设置圆大小
                    symbolSize: 50,
                    //设置是否拖动
                    roam: true,
                    label: {
                        show: true,
                        textStyle: {
                            fontSize: '18px'
                        },
                    },
                    edgeSymbol: ['none', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        fontSize: 20
                    },

                    // data: nextRed(localData.size,dfn),
                    // links: nextLink(localData.data,newscg),
                    data: data,
                    links: links,
                    lineStyle: {
                        opacity: 0.9,
                        width: 2,
                    }
                }
            ],
        };

        myChart.setOption(option);

    } else {
        console.log(status, "next");
        console.log("next-error");
    }
})

