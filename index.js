import * as my_dongle from 'bleuio'
document.getElementById('connect').addEventListener('click', function(){
  my_dongle.at_connect().then(()=>{
    my_dongle.at_central().then(()=>{
      repeatfunc()
       setInterval(()=>{
        repeatfunc()
      },15000)
    })
   
  })
})
document.getElementById('getData').addEventListener('click', function(){
  my_dongle.ati().then((data)=>console.log(data))
  
})
document.getElementById('getData').addEventListener('click', function(){
  my_dongle.at_central()
})
document.getElementById('getData').addEventListener('click', function(){
  
  my_dongle.stop(()=>{
    my_dongle.at_gapscan(2).then((x)=> {
      console.log(x)
    var unique = [];
    var uniqDev = [];
    x.map((val)=>{
      if(val[0]==='['){ //to show only devices with starts the name with '['
      if(unique.indexOf(val.slice(0, 4)) === -1) { //to remove duplicates
        unique.push(val.slice(0, 4)); 
        uniqDev.push(val); 
       
      } 
    }
    })
        
    })
  })
  
})



var pmval;
var pmvals;
const repeatfunc=()=>{ 
  my_dongle.at_findscandata('01D2F5',7).then((x)=> { //find the string
    let lastArr= x[x.length-1] 
      
      let advAr = lastArr.split(" ");
    let adv = advAr[advAr.length - 1];
    pmvals = adv.slice(42, 45);
      pmval = pmvals/10;
      console.log(pmval)
      
  })
  
}



var options = {
  type: "line",
  data: {
    datasets: [
      {
        label: "# PM10",
        data: [],
        borderColor: "pink",
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: "realtime",
        realtime: {
          duration: 200000,
          refresh: 1000,
          delay: 2000,
          onRefresh: (chart) => {
            const now = Date.now();
            chart.data.datasets.forEach((dataset) => {
              dataset.data.push({
                x: now,
                y: pmval,
              });
            });
          },
        },
      },
    },
  },
};

var ctx = document.getElementById("chartJSContainer").getContext("2d");
new Chart(ctx, options);



 


  



