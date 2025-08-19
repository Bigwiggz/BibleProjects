
google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(drawChart);



function drawChart() {
var container = document.getElementById('timeline');
var chart = new google.visualization.Timeline(container);
var dataTable = new google.visualization.DataTable();

dataTable.addColumn({ type: 'string', id: 'Event' });
dataTable.addColumn({ type: 'string', id: 'Name' });
dataTable.addColumn({ type: 'date', id: 'Start' });
dataTable.addColumn({ type: 'date', id: 'End' });
dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
dataTable.addColumn({ type: 'string', role: 'tooltip' });

/*
dataTable.addRows([
    [ 'Event 1','Name 1', new Date(2023, 0, 1), new Date(2023, 0, 31), 'color: #00FF00','This is a tooltip 1' ],
    [ 'Event 1','Name 2', new Date(2023, 1, 1), new Date(2023, 1, 28), 'color: #ec8f6e','This is a tooltip 2' ],
    [ 'Event 1','Name 3', new Date(2023, 2, 1), new Date(2023, 2, 31), 'color: #f3b49f','This is a tooltip 3' ],
    [ 'Event 2','Name 1', new Date(2023, 1, 1), new Date(2023, 2, 31), 'color: #f3b49f','This is a tooltip 4' ],
    [ 'Event 2','Name 2', new Date(2023, 0, 1), new Date(2023, 0, 31), 'color: #e6693e','This is a tooltip 5' ],
    [ 'Event 2','Name 3', new Date(2023, 1, 1), new Date(2023, 1, 28), 'color: #ec8f6e','This is a tooltip 6' ],
    [ 'Event 3','Name 1', new Date(2023, 2, 1), new Date(2023, 2, 31), 'color: #f3b49f','This is a tooltip 7' ],
    [ 'Event 3','Name 2', new Date(2023, 1, 1), new Date(2023, 2, 31), 'color: #f3b49f','This is a tooltip 8' ],
    [ 'Event 3','Name 3', new Date(2023, 1, 1), new Date(2023, 2, 31), 'color: #f3b49f','This is a tooltip 9']
]);
*/

dataTable.addRows(testTimelineData);

let options = {
    fontSize: 20,
    timeline: { groupByRowLabel: false , barLabelStyle: { fontName: 'Arial'}},
    //width: 20000
  };


chart.draw(dataTable, options);
}
