// Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});
  
// Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);
  
        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
function drawChart() {

    // Create the data table.
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'Topping');
          data.addColumn('number', 'Slices');
          data.addRows(table);
          
  
    // Set chart options
          var options = {'title': "",
                         };
  
    // Instantiate and draw our chart, passing in some options.
          var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
          chart.draw(data, options);
}

$("#chart_name").html("<h1>" + serverdata.vote + "</h1>");

if(auth) {
    var div = '<form class="form-inline my-2 my-lg-0" action="/login" method="POST">' +            
    '<button class="btn btn-danger my-2 my-sm-0" type="submit">' + 
        'Sign out' +
    '</button> ' +  '</form>';
    $("#login").remove();
    $("#login_field").html(div);
    $("#manage").css("display","");
}

$(window).resize(function(){
    drawChart();
})