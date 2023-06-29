const ballFile= 'jsonDataBall.json'
const matchFile='jsonDataMatches.json'
const fs= require('fs')



fs.readFile(ballFile, "utf8", (err,data) => {
    if(err){
        console.error(err)
        return
    }
    // console.log(JSON.parse(data).length)
    
})

fs.readFile(matchFile, "utf8", (err,data) => {
    if(err){
        console.error(err)
        return
    }
    // console.log(JSON.parse(data).length)
    data = JSON.parse(data)
    console.log(typeof data)
    let x= data[230]["date"].slice(0,4)
    let a= data.filter(item => item["date"].slice(0,4)=='2016').map(item => ({
        id: item["id"],
        date: item["date"]
    }))
    console.log(a)
    
})

function calculatedata(data){
    console.log(JSON.parse(data).length)
}