for (var x = 0; x < serverdata.length; x++) {
    var table = [];
    var id = "chart_div" + x;
    var vote = serverdata[x].vote;
    var username = serverdata[x].username;
    var div = '<div align="center">' + '<a target="_blank" href="/user/' + username + "/" + vote + '">' +
    '<h3>'+ serverdata[x].vote + '</h3>' + '</a>' +  '</div>' + 
    '<div id="' + id + '" align="center">' + '</div>' +
    '<form class="form-inline my-2 my-lg-0" action="/user/' + username + "/" + vote + '/manage"' +
    ' method="POST" style="display:block">' +
    '<button class="btn btn-outline-success my-2 my-sm-0" type="submit" name="update" > ' +
        "Update" +
    '</button>' +  
    '<button class="btn btn-outline-danger my-2 my-sm-0" type="submit" name="delete" ' +
// Confirm delete 
    'onclick = "clicked(event)">' +
        'Delete' +
    '</button> ' +             
    '</form>' + '<br>'
    ;
    console.log(div);
    $("#all_chart").append(div);

    for (var i = 1; i < Object.keys(serverdata[x]).length -3; i++) {
        var key = "option" + i;
        table.push([serverdata[x][key].option, +serverdata[x][key].value]); 
    }
    chart (table,id);
}

// Confirm delete
function clicked (e) {
    if(!confirm("Are you sure?")) e.preventDefault ();
}
// Draw all chart with data:table at id
function chart (table,id) {

 
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
         var chart = new google.visualization.PieChart(document.getElementById(id));
         chart.draw(data, options);
}
}

 


