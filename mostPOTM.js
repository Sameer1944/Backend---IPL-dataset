import csvToJson from "csvtojson"; 
async function find() {
  let matches = await csvToJson().fromFile("./matches.csv");

  //1.Coping the player_of_the_match column to array
  const Arr=matches.map(item => item.player_of_match)

  //2.init an object 
  const obj={};
  Arr.forEach(player_of_match =>{
    if(!obj[player_of_match]){
      obj[player_of_match]=1;
    }
    else{
      obj[player_of_match]+=1;
    }
  })
//3. featching a key with max value
let max = 0;
let maxKey = "";

for(let char in obj){
  if(obj[char]> max){
    max = obj[char];
    maxKey= char;
  }
}
//4.Printing the output
console.log(maxKey,"has won 'Player of the match'",max,"times!!!");

console.log("-------------------------------------------------------------------------------------------------------");

//5.Printing the count of each player 
//   console.log(obj);
}  

find();