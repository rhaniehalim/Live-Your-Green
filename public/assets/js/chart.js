require(['path/to/chartjs/dist/Chart.js'], function(Chart){
    var ctx = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });



});
