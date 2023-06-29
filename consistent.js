import csvToJson from "csvtojson"
async function consistent(){
    let matches = await csvToJson().fromFile("./IPL_Matches_2008_2022.csv");
    let deliveries = await csvToJson().fromFile("./IPL_Ball_by_Ball_2008_2022.csv");

    // Array to store seasons
    let yearArr=[]
    for(let i=0; i<matches.length; i++){
    yearArr.push(matches[i]["Season"])
    }
    yearArr = [...new Set(yearArr)]                    // Remove Duplicates using Set property
    

    // function to calculate average of Players' scores in a season
    function avg(arr){
        var total = 0;
        var count = 0;

        arr.forEach(function(item, index) {
        total += item;
        count++;});

        return total / count;
    }

    // function to calculate coefficient of variation of Players' scores in a season
    function coeffOfVar(arr){
        let sd = 0;
        let av = avg(arr)
        for(let i=0; i<arr.length; i++){
            sd += (arr[i]-av)**2
        }
        return Math.sqrt(sd/arr.length)/av;
    }



    // For every season
    for(let i = 0; i < yearArr.length; i++){                                                // change 1 to yearArr.length
        let idList= matches.filter(item => item["Season"]==yearArr[i]).map(item => item["ID"])

        let thisSeasonDeliveries = deliveries.filter(item => idList.includes(item["ID"]))

        let sznPlayersobj = {}


        // For every match
        for (let j=0; j<idList.length; j++){                                                // change 1 to idList.length
            let thisMatchDeliveries = thisSeasonDeliveries.filter(item => item["ID"] == idList[j])
            let matchPlayersObj = [...JSON.parse(matches.filter(item => item["ID"]== idList[j])[0]["Team1Players"].replace(/'/g,'"')),...JSON.parse(matches.filter(item => item["ID"]== idList[j])[0]["Team2Players"].replace(/'/g,'"'))]

            
            // Create an empty array 
            for(let a=0; a<matchPlayersObj.length; a++){
                if(sznPlayersobj.hasOwnProperty(matchPlayersObj[a])==false){
                    sznPlayersobj[matchPlayersObj[a]] = []
                }
            }
            
            // For every ball add players' scores per ball to their key in the object
            let matchScores = {}
            for(let ballNo=0; ballNo<thisMatchDeliveries.length; ballNo++){
                if(matchScores.hasOwnProperty(thisMatchDeliveries[ballNo]["batter"])){
                    matchScores[thisMatchDeliveries[ballNo]["batter"]] += parseInt(thisMatchDeliveries[ballNo]["batsman_run"])
                } else{
                    matchScores[thisMatchDeliveries[ballNo]["batter"]] = parseInt(thisMatchDeliveries[ballNo]["batsman_run"])
                }
            }

            for(let batsman in matchScores){
                sznPlayersobj[batsman].push(matchScores[batsman])
            }
            


        }
        // Object to hold Coefficient of variation of Players' scores per season
        let variationObj = {}
        for(let player in sznPlayersobj){
            if (sznPlayersobj[player].length > 2){                          // Batsman must have played in more than 2 matches
                variationObj[player] = coeffOfVar(sznPlayersobj[player])
            }
        }

        // Object with Most consistent batsman every year
        let consistentBatsmen = {"Season": yearArr[i]}
        for(let key in variationObj){
            if(variationObj[key] < 0.5 && avg(sznPlayersobj[key])>40){
                consistentBatsmen[key] = {"Coefficient of Variation": variationObj[key], "Average": avg(sznPlayersobj[key]), "Scores": sznPlayersobj[key]}
            }
        }

        console.log(consistentBatsmen)

    }

}
consistent();
