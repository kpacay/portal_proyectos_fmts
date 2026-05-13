import { createBarChart } from "./barChart.js";
import { createDonutChart } from "./donutChart.js";
import { getChartColors } from "./themeCharts.js";

Chart.defaults.font.family = 'var(--font-sans)';
Chart.defaults.font.size = 12;
Chart.register(ChartDataLabels);

const years = ['2022', '2023', '2024', '2025', '2026'];

new Chart(document.getElementById('chartMain'), {
    type: 'bar',
    data: {
        labels: years,
        datasets: [
            { label: 'Alumnos', data: [27, 20, 23, 0, null], backgroundColor: '#185FA5', stack: 'real', order: 2 },
            { label: 'Docentes', data: [0, 0, 21, 0, null], backgroundColor: '#1D9E75', stack: 'real', order: 2 },
            { label: 'Profesionales', data: [0, 0, 269, 0, null], backgroundColor: '#BA7517', stack: 'real', order: 2 },
            { label: 'Comunidad', data: [0, 0, 0, 23, null], backgroundColor: '#D85A30', stack: 'real', order: 2 },
            {
                label: 'Tendencia total', type: 'line',
                data: [27, 20, 313, 23, 150],
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
            x: { stacked: true, ticks: { color: () => getChartColors().lbl }, grid: { display: false } },
            y: { stacked: true, ticks: { color: () => getChartColors().lbl }, grid: { color: () => getChartColors().grid } }
        }
    }
});

new Chart(document.getElementById('chartComparativa'), {
    type: 'bar',
    data: {
        labels: ['2022', '2023', '2024', '2025'],
        datasets: [
            { label: 'Alumnos', data: [27, 20, 23, 0], backgroundColor: '#185FA5' },
            { label: 'Docentes', data: [0, 0, 21, 0], backgroundColor: '#1D9E75' },
            { label: 'Otros profesionales', data: [0, 0, 269, 0], backgroundColor: '#BA7517' },
            { label: 'Comunidad', data: [0, 0, 0, 23], backgroundColor: '#D85A30' },
        ]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { mode: 'index' } },
        scales: {
            x: { ticks: { color: () => getChartColors().lbl }, grid: { display: false } },
            y: { ticks: { color: () => getChartColors().lbl }, grid: { color: () => getChartColors().grid }, beginAtZero: true }
        }
    }
});

//GRAFICA ACUMULADA
createDonutChart(
    document.getElementById('chartDonut'),
    {
        labels: ['Alumnos (70)', 'Docentes (21)', 'Profesionales (269)', 'Comunidad (23)'],
        data: [70, 21, 269, 23],
        colors: ['#185FA5', '#1D9E75', '#BA7517', '#D85A30']
    }
)

// GRAFICA 2022
createBarChart(
    document.getElementById('chartCeatec2022'),
    {
        labels: ['Inscritos', 'Finalizados'],
        data: [27, 27],
        lineData: [27, 27],
        colors: ['#185FA5', '#1D9E75'],
        max: 35,
        total: 27
    }
)

// GRAFICA 2023
createBarChart(
    document.getElementById('chartCeatec2023'),
    {
        labels: ['Inscritos', 'Finalizados'],
        data: [20, 20],
        lineData: [20, 20],
        colors: ['#185FA5', '#1D9E75'],
        max: 25,
        total: 20
    }
)

// GRAFICA 2024
createBarChart(
    document.getElementById('chartCeatec2024'),
    {
        labels: ['Inscritos', 'Finalizados'],
        data: [313, 289],
        lineData: [313, 289],
        colors: ['#185FA5', '#1D9E75'],
        max: 400,
        total: 313
    }
)

// GRAFICA 2025
createBarChart(
    document.getElementById('chartCeatec2025'),
    {
        labels: ['Inscritos', 'Finalizados'],
        data: [23, 17],
        lineData: [23, 17],
        colors: ['#185FA5', '#1D9E75'],
        max: 30,
        total: 23
    }
)



function updateProj() {
    const alu = +document.getElementById('s-alu').value;
    const doc = +document.getElementById('s-doc').value;
    const pro = +document.getElementById('s-pro').value;
    const com = +document.getElementById('s-com').value;
    document.getElementById('v-alu').textContent = alu;
    document.getElementById('v-doc').textContent = doc;
    document.getElementById('v-pro').textContent = pro;
    document.getElementById('v-com').textContent = com;
    const total = alu + doc + pro + com;
    const gap = total - 150;
    const pct = Math.min(Math.round((total / 150) * 100), 200);
    const crecimiento = Math.round(((total - 23) / 23) * 100);
    document.getElementById('p-total').textContent = total;
    document.getElementById('p-gap').textContent = gap === 0 ? '±0' : (gap > 0 ? '+' + gap : gap);
    document.getElementById('p-gap').style.color = gap >= 0 ? '#1D9E75' : '#D85A30';
    document.getElementById('p-pct-label').textContent = Math.min(pct, 100) + '% · ' + total + ' / 150';
    document.getElementById('target-bar').style.width = Math.min(pct, 100) + '%';
    document.getElementById('target-bar').style.background = gap < 0 ? '#D85A30' : gap === 0 ? '#1D9E75' : '#185FA5';
    document.getElementById('p-crecimiento').textContent = (crecimiento >= 0 ? '+' : '') + crecimiento + '%';
    document.getElementById('p-avg').textContent = Math.round(total / 4);
    projChart.data.datasets[1].data = [null, null, null, 23, total];
    projChart.update();
}

window.updateProj = updateProj;

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
