// Which venue results in a win for Batting first team and vice versa?
import csvToJson from "csvtojson";
let matches = await csvToJson().fromFile("./matches.csv");

let finalObjBat;
let finalObjField;

async function getBatVenue() {
    let venues=[]

    matches.filter(item=>{
        if(item['toss_winner']==item['winner'] && item['toss_decision']=='bat'){
            venues.push(item['venue'])
        }
    })

    let res = venues.reduce((acc, cur) => (!acc[cur] ? acc[cur] = 1 : acc[cur]++, acc), {})
    const sortedObj = Object.entries(res).sort((a,b) => b[1]-a[1]);
    finalObjBat = Object.fromEntries(sortedObj);
    // console.log(finalObjBat)
    //console.log(Object.keys(finalObjBat)[0]+", Results in win for Batting");
}

async function getFieldVenue() {
    let venues=[]

    matches.filter(item=>{
        if(item['toss_winner']==item['winner'] && item['toss_decision']=='field'){
            venues.push(item['venue'])
        }
    })

    let res = venues.reduce((acc, cur) => (!acc[cur] ? acc[cur] = 1 : acc[cur]++, acc), {})
    const sortedObj = Object.entries(res).sort((a,b) => b[1]-a[1]);
    finalObjField = Object.fromEntries(sortedObj);
    // console.log(finalObjField)
    //console.log(Object.keys(finalObjField)[0]+", Results in win for Fielding");
}

function getFormatted(){
    // console.log(finalObjBat)
    // console.log(finalObjField)
    let format=[]
    for(let kbat in finalObjBat){
        for(let kboll in finalObjField){
            if(kboll==kbat){
                let obj={}
                obj['venue']=kbat;
                obj['teamsWinBattingFirst']=finalObjBat[kbat]
                obj['teamsWinBowlingFirst']= finalObjField[kboll]
                format.push(obj)
            }
        }
    }
    console.log(format)
}

getBatVenue();
getFieldVenue();
getFormatted();
