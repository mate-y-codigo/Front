import { modalStatisticsHtml } from '../components/modalStatisticsHtml.js'


function chartWeightRender(seriesWeight, categories) {
    var options = {
        theme: {
            mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        },
        chart: {
            background: document.documentElement.classList.contains('dark') ? '#45556c' : '#ffffff',
            foreColor: '#f0f0f0'
        },
        colors: document.documentElement.classList.contains('dark') ? ['#3c0366'] : ['#005f78'], // color de la serie
        grid: {
            borderColor: document.documentElement.classList.contains('dark') ? '#62748e' : '#90a1b9'
        },
        tooltip: {
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        },
        title: {
            text: 'Evolución del Peso',
            align: 'center'
        },
        series: [{
            name: 'Peso (Kg)',
            data: seriesWeight
        }],
        chart: {
            height: 350,
            type: 'area',
            zoom: { enabled: false }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        xaxis: {
            type: 'date',
            categories: categories,
            title: { text: 'Fecha' },
            labels: {
                rotate: -45
            },
            tickAmount: 12
        },
        yaxis: {
            title: { text: 'Peso (kg)' }
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy'
            },
        },
    };
    var chartWeight = new ApexCharts(document.querySelector("#chart-weight"), options);
    chartWeight.render();
}

function chartVolumeRender(seriesVolume, seriesRep, categories) {
    var options = {
        theme: {
            mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        },
        chart: {
            background: document.documentElement.classList.contains('dark') ? '#45556c' : '#ffffff',
            foreColor: '#f0f0f0'
        },
        colors: document.documentElement.classList.contains('dark') ? ['#9810fa', '#ddd6ff'] : ['#005f78', '#00d3f2'], // color de la serie
        grid: {
            borderColor: document.documentElement.classList.contains('dark') ? '#62748e' : '#90a1b9'
        },
        tooltip: {
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        },

        title: {
            text: 'Evolución del Volumen',
            align: 'center'
        },
        series: [{
            name: 'Volumen',
            data: seriesVolume
        },
        {
            name: 'Repeticiones',
            data: seriesRep
        }],

        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 5,
                borderRadiusApplication: 'end'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: categories,
            tickAmount: 12
        },
        yaxis: [
            {
                title: { text: 'Peso (kg)' },
                min: 0
            },
            {
                opposite: true,
                title: { text: 'Repeticiones' },
                min: 0
            }
        ],
        fill: {
            opacity: 1
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy'
            },
        }
    };

    var chartVolume = new ApexCharts(document.querySelector("#chart-volume"), options);
    chartVolume.render();
}


/** modal statistics render */
export function modalStatisticsRender(exerciseProgress) {
    const statistics = document.getElementById('modal-open-statistics-excercise');
    statistics.innerHTML = modalStatisticsHtml(exerciseProgress);

    const categories = exerciseProgress.sessions.map(entry => entry.date);
    const seriesWeight = exerciseProgress.sessions.map(entry => entry.weight);
    const seriesVolume = exerciseProgress.sessions.map(entry => entry.weight * entry.reps);
    const seriesRep = exerciseProgress.sessions.map(entry => entry.reps);

    chartWeightRender(seriesWeight, categories);
    chartVolumeRender(seriesVolume, seriesRep, categories);
}