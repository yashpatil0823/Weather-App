//api used : https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=c4cdabab9d96a56b3c8b2d8abd2eb49e
var requests = require('requests');
const http = require("http");
const fs= require("fs");
const homeFile = fs.readFileSync("home.html","utf-8");
const replaceVal=(tempVal,origVal)=>{
  let temperature = tempVal.replace("{%temp%}",origVal.main.temp);
  temperature = temperature.replace("{%temp_min%}",origVal.main.temp_min);
  temperature = temperature.replace("{%temp_max%}",origVal.main.temp_max);
  temperature = temperature.replace("{%tempstatus%}",origVal.weather[0].main);
  temperature = temperature.replace("{%location%}",origVal.name);
  temperature = temperature.replace("{%country%}",origVal.sys.country);
  return temperature;
} 
const server = http.createServer((req,res)=>{
    if(req.url="/"){
    requests('https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=c4cdabab9d96a56b3c8b2d8abd2eb49e&units=metric')
.on('data', (chunk)=> {
    const objdata =JSON.parse(chunk);
    const arrdata =[objdata];
//   console.log(arrdata[0].main.temp);

  const realtimedata = arrdata.map((val)=>replaceVal(homeFile,val)).join(""); 
    // console.log(realtimedata);
    res.write(realtimedata);
})
.on('end', (err) =>{
  if (err) return console.log('connection closed due to errors', err);
  res.end();
});
    }
});
server.listen(8000,"127.0.0.1");