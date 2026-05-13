import { createBarChart } from "./barChart.js";
import { getChartColors } from "./themeCharts.js";

const years = ['2022', '2023-2024', '2025'];

Chart.register(ChartDataLabels);

new Chart(document.getElementById('chartMain'), {
    type: 'bar',
    data: {
        labels: years,
        datasets: [
            { label: 'Directos', data: [114, 182, 99, null], backgroundColor: '#185FA5', stack: 'real', order: 2 },
            { label: 'Indirectos', data: [300, 492, 2056, null], backgroundColor: '#1D9E75', stack: 'real', order: 2 },
            {
                label: 'Tendencia total', type: 'line',
                data: [414, 674, 2155],
                borderColor: '#7F77DD', backgroundColor: 'transparent',
                borderWidth: 2.5, pointRadius: 5, pointBackgroundColor: '#7F77DD',
                tension: 0.35, order: 1, stack: undefined,
                segment: {
                    borderDash: ctx => ctx.p1DataIndex >= 3 ? [6, 4] : undefined,
                    borderColor: ctx => ctx.p1DataIndex >= 3 ? '#AFA9EC' : '#7F77DD',
                }
            }
        ]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: { display: false }, tooltip: { mode: 'index' },
            datalabels: { color: () => getChartColors().lbl }
        },
        scales: {
            x: {
                stacked: true, ticks: {
                    color: () => getChartColors().lbl
                }, grid: {
                    grid: {
                        display: true
                    }
                }
            },
            y: {
                stacked: true, ticks: {
                    color: () => getChartColors().lbl
                }, grid: {
                    color: () => getChartColors().grid
                }
            }
        }
    }
});


//2022
createBarChart(
    document.getElementById('chartCecresaD2022'),
    {
        labels: ['Niños', 'Mujeres', 'Educadoras', 'Gestor/a'],
        data: [42, 67, 4, 1],
        colors: ['#185FA5', '#185FA5', '#185FA5', '#185FA5'],
        max: 80
    }
)

createBarChart(
    document.getElementById('chartCecresaI2022'),
    {
        labels: ['Familias', 'Personas', 'Niños', 'Docentes'],
        data: [50, 250, 0, 0],
        colors: ['#185FA5', '#185FA5', '#185FA5', '#185FA5'],
        max: 300
    }
)

//2023-24

createBarChart(
    document.getElementById('chartCecresaD2023-24'),
    {
        labels: ['Niños', 'Mujeres', 'Educadoras', 'Gestor/a'],
        data: [90, 82, 8, 2],
        colors: ['#185FA5', '#185FA5', '#185FA5', '#185FA5'],
        max: 120
    }
)

createBarChart(
    document.getElementById('chartCecresaI2023-24'),
    {
        labels: ['Familias', 'Personas', 'Niños', 'Docentes'],
        data: [82, 410, 0, 0],
        colors: ['#185FA5', '#185FA5', '#185FA5', '#185FA5'],
        max: 500
    }
)



//2025
createBarChart(
    document.getElementById('chartCecresaD2025'),
    {
        labels: ['Niños', 'Mujeres', 'Educadoras', 'Gestor/a'],
        data: [49, 45, 4, 1],
        colors: ['#185FA5', '#185FA5', '#185FA5', '#185FA5'],
        max: 100
    }
)

createBarChart(
    document.getElementById('chartCecresaI2025'),
    {
        labels: ['Familias', 'Personas', 'Niños', 'Docentes'],
        data: [300, 1500, 247, 9],
        colors: ['#185FA5', '#185FA5', '#185FA5', '#185FA5'],
        max: 1500
    })



function switchTab(id, element) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

    document.getElementById('tab-' + id).classList.add('active');
    element.classList.add('active');
}

document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const id = btn.dataset.tab;
        switchTab(id, btn);
    });
});
window.switchTab = switchTab;