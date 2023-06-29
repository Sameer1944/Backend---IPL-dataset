// Extra runs conceeded per year per team

import csvToJson from "csvtojson";
async function helloWorld() {
 let matches = await csvToJson().fromFile("./matches.csv");
 let deliveries = await csvToJson().fromFile("./deliveries.csv");


let yearArr=[]
for(let i=0; i<matches.length; i++){
    yearArr.push(parseInt(matches[i]["date"].slice(0,4)))
}

for(let yr = Math.min(...yearArr); yr <= Math.max(...yearArr); yr++)
 {let idList= matches.filter(item => item["date"].slice(0,4)==yr).map(item => item["id"])

 
 let filteredDeliveries = deliveries.filter(item => idList.includes(item["id"]))

 let extraRunsPerTeam = {Year: yr}

 for(let i=0; i<filteredDeliveries.length; i++){
    if(extraRunsPerTeam.hasOwnProperty(filteredDeliveries[i].bowling_team)){
        extraRunsPerTeam[filteredDeliveries[i].bowling_team] += parseInt(filteredDeliveries[i].extra_runs)
    } else{
        extraRunsPerTeam[filteredDeliveries[i].bowling_team] = parseInt(filteredDeliveries[i].extra_runs)
    }
 }
console.log(extraRunsPerTeam)
}

}

helloWorld();