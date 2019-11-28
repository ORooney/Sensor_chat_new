var dps = [];   //dataPoints. 
var chart;
var startTime;





$(document).on("pagecreate", "#chartPage", function () {
	
	//store start time in unixtime 
	startTime = Date.now();
	
	getData();


	//set uplistener for button
	$('#addButton').on('click', function() {
	
		getData();
		
	});
	
	//setup chart
    chart = new CanvasJS.Chart("chartContainer",{
      	title :{
      		text: "A random chart"
      	},
      	axisX: {						
      		title: "Random Values"
      	},
      	axisY: {						
      		title: "Time (seconds)"
      	},
      	data: [{
      		type: "line",
      		dataPoints : dps
      	}]
   	});
	
	  
});




function getData(){

	watchID = navigator.accelerometer.watchAcceleration(updateChart , accelerometerError, accelerometerOptions);

}





function updateChart(data) {
      	
      	//set new random y values
      	yVal = data.y;
		
		//x value is time since start 
		xVal = data.x;
      	
		//add them to the data points to draw
		dps.push({x: xVal,y: yVal});
      	
		//don't let the chart get too big 
		//if there are more than 100 data points then start removing older data points
      	if (dps.length >  100 )
      	{
      		dps.shift();				
      	}

		//redraw the chart
      	chart.render();		
	  }
