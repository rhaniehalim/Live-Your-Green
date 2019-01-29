var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: ["China", "USA", "India", "Russia", "Japan", "Germany", "Mexico", "Korea", "United Kingdom", "Brazil", "Rest of the World"],
        datasets: [{
            label: "Countries",
            data: [27.2, 15.6, 6.3, 4.6, 3.9, 2.3, 1.8, 1.7, 1.7, 1.5, 33.4],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(0, 128, 128, 0.8)',
                'rgba(0, 51, 102, 0.8)',
                'rgba(102, 0, 102, 0.8)',
                'rgba(218, 165, 32, 0.8)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(0, 128, 128, 1)',
                'rgba(0, 51, 102, 1)',
                'rgba(102, 0, 102, 1)',
                'rgba(218, 165, 32, 1)'
            ],
            borderWidth: 1
        }]
    },
   
});
