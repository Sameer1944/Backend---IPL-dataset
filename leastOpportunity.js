import csvToJson from "csvtojson";
var oneArr = [];

async function find() {
  try {
    let matches = await csvToJson().fromFile("IPL_Matches_2008_2022.csv");
    // console.log(matches);

    const team1List = matches.map(item =>
      JSON.parse(item['Team1Players'].replace(/'/g, '"'))
    );
    const team2List = matches.map(item =>
      JSON.parse(item['Team2Players'].replace(/'/g, '"'))
    );
    const combinedList = [...team1List, ...team2List];

    let res = combinedList.flat(10).reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});
    const sortedArray = Object.entries(res).sort((a, b) => b[1] - a[1]);
    const sortedObject = Object.fromEntries(sortedArray);
    // console.log(sortedObject);

    for (const [key, value] of Object.entries(sortedObject)) {
      if (value === 1) {
        oneArr.push(key);
        // console.log(a, b);
      }
    }

    let globalArray = [];
    matches.filter(item => {
      let parsedT1 = JSON.parse(item['Team1Players'].replace(/'/g, '"'));
      for (let i = 0; i < Object.keys(sortedObject).length; i++) {
        if (parsedT1.indexOf(sortedArray[i][0]) >= 0) {
          let dict = {};
          dict['leastopportunityPlayer'] = parsedT1[parsedT1.indexOf(sortedArray[i][0])];
          dict['Season'] = item['Season'];
          dict['noofmatchesplayed'] = sortedObject[sortedArray[i][0]];
          const isDuplicate = globalArray.some(entry => {
        return (
          entry.name === dict['name'] &&
          entry.Season === dict['Season'] &&
          entry.noofmatchesplayed === dict['noofmatchesplayed']
        );
      });

      if (!isDuplicate) {
        globalArray.push(dict);
      }

        }
      }
    });
    globalArray.sort((a, b) => a['noofmatchesplayed']-b['noofmatchesplayed']);

     console.log(globalArray);

  } catch (error) {
    console.error(error);
  }
}

find()
