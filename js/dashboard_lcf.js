import { createDonutChart } from "./donutChart.js";
import { createBarChart } from "./barChart.js";
import { getChartColors } from "./themeCharts.js";

Chart.defaults.font.size = 12;
Chart.register(ChartDataLabels);

const years = ['2024', '2025', '2026'];

new Chart(document.getElementById('chartMain'), {
    type: 'bar',
    data: {
        labels: years,
        datasets: [
            { label: 'Alumnos', data: [157, 387, null], backgroundColor: '#185FA5', stack: 'real', order: 2 },
            { label: 'Docentes', data: [6, 20, null], backgroundColor: '#1D9E75', stack: 'real', order: 2 },
            { label: 'Escuelas', data: [1, 5, null], backgroundColor: '#BA7517', stack: 'real', order: 2 },
            {
                label: 'Tendencia total', type: 'line',
                data: [164, 412, 450],
                borderColor: '#7F77DD', backgroundColor: 'transparent',
                borderWidth: 2.5, pointRadius: 5, pointBackgroundColor: '#7F77DD',
                tension: 0.35, order: 1, stack: undefined,
                segment: {
                    borderDash: ctx => ctx.p1DataIndex >= 1 ? [6, 4] : undefined,
                    borderColor: ctx => ctx.p1DataIndex >= 1 ? '#AFA9EC' : '#7F77DD',
                }
            }
        ]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: { display: false }, tooltip: { mode: 'index' },
            datalabels: {
                color: () => getChartColors().lbl
            }
        },
        scales: {
            x: { stacked: true, ticks: { color: () => getChartColors().lbl }, grid: { display: false } },
            y: { stacked: true, ticks: { color: () => getChartColors().lbl }, grid: { color: () => getChartColors().grid } }
        }
    }
});

//resumen
createDonutChart(
    document.getElementById('chartDonut'), {
    labels: ['Alumnos (544)', 'Docentes (26)', 'Escuelas (6)'],
    data: [544, 226, 6],
    colors: ['#185FA5', '#1D9E75', '#BA7517']
}
)

//2024 - SEGUNDO Y TERCERO PRIMARIA 
createBarChart(
    document.getElementById('2024preS-T'), {
    labels: ['Deficiente', 'Puede mejorar', 'Buena', 'Excelente'],
    data: [10, 8, 6, 15],
    colors: ['#185FA5', '#185FA5', '#185FA5', '#185FA5'],
    max: 30
})

createBarChart(
    document.getElementById('2024postS-T'), {
    labels: ['Deficiente', 'Puede mejorar', 'Buena', 'Excelente'],
    data: [4, 7, 4, 24],
    colors: ['#185FA5', '#185FA5', '#185FA5', '#185FA5'],
    max: 30
})

//2024 - CUARTO A SEXTO
createBarChart(
    document.getElementById('2024preC-S'), {
    labels: ['Muy bajo', 'Bajo', 'Moderadamente bajo', 'Dentro de la normalidad', 'Moderadamente alto', 'Alto', 'Muy alto'],
    data: [13, 10, 5, 15, 14, 1, 0],
    colors: ['#185FA5', '#185FA5', '#185FA5', '#185FA5', '#185FA5', '#185FA5', '#185FA5'],
    max: 25
})

createBarChart(
    document.getElementById('2024postC-S'), {
    labels: ['Muy bajo', 'Bajo', 'Moderadamente bajo', 'Dentro de la normalidad', 'Moderadamente alto', 'Alto', 'Muy alto'],
    data: [8, 10, 5, 14, 19, 0, 2],
    colors: ['#185FA5', '#185FA5', '#185FA5', '#185FA5', '#185FA5', '#185FA5', '#185FA5'],
    max: 25
})

//2025
// SEGUNDO Y TERCERO PRIMARIA 
createBarChart(
    document.getElementById('preS-T'), {
    labels: ['Deficiente', 'Puede mejorar', 'Buena', 'Excelente'],
    data: [40, 10, 14, 12],
    colors: ['#185FA5', '#185FA5', '#185FA5', '#185FA5'],
    max: 50
})

createBarChart(
    document.getElementById('postS-T'), {
    labels: ['Deficiente', 'Puede mejorar', 'Buena', 'Excelente'],
    data: [27, 11, 15, 23],
    colors: ['#185FA5', '#185FA5', '#185FA5', '#185FA5'],
    max: 50
})

//2025 - CUARTO A SEXTO
createBarChart(
    document.getElementById('2025preC-S'), {
    labels: ['Muy bajo', 'Bajo', 'Moderadamente bajo', 'Dentro de la normalidad', 'Moderadamente alto', 'Alto', 'Muy alto'],
    data: [7, 8, 7, 21, 10, 2, 2],
    colors: ['#185FA5', '#185FA5', '#185FA5', '#185FA5', '#185FA5', '#185FA5', '#185FA5'],
    max: 25
})

createBarChart(
    document.getElementById('2025postC-S'), {
    labels: ['Muy bajo', 'Bajo', 'Moderadamente bajo', 'Dentro de la normalidad', 'Moderadamente alto', 'Alto', 'Muy alto'],
    data: [6, 6, 0, 18, 12, 7, 8],
    colors: ['#185FA5', '#185FA5', '#185FA5', '#185FA5', '#185FA5', '#185FA5', '#185FA5'],
    max: 25
})

let projChart = new Chart(document.getElementById('chartProj'), {
    type: 'line',
    data: {
        labels: years,
        datasets: [
            {
                label: 'Total histórico',
                data: [163, 407, null],
                borderColor: '#185FA5', backgroundColor: 'rgba(24,95,165,0.08)',
                borderWidth: 2.5, pointRadius: 5, pointBackgroundColor: '#185FA5',
                tension: 0.3, fill: true
            },
            {
                label: 'Proyección 2026',
                data: [null, 412, 445],
                borderColor: '#7F77DD', backgroundColor: 'rgba(127,119,221,0.06)',
                borderWidth: 2.5, borderDash: [7, 4],
                pointRadius: [0, 0, 6], pointBackgroundColor: '#7F77DD',
                tension: 0.3, fill: true
            }
        ]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw ?? '—'}` } },
            datalabels: { color: () => getChartColors().lbl }
        },
        scales: {
            x: {
                ticks: {
                    color: () => getChartColors().lbl
                }, grid: {
                    display: true

                }
            },
            y: {
                ticks: {
                    color: () => getChartColors().lbl
                }, grid: {
                    color: () => getChartColors().grid
                }, beginAtZero: true
            }
        }
    }
});

function updateProj() {
    const alu = +document.getElementById('s-alu').value;
    const doc = +document.getElementById('s-doc').value;
    const esc = +document.getElementById('s-esc').value;
    document.getElementById('v-alu').textContent = alu;
    document.getElementById('v-doc').textContent = doc;
    document.getElementById('v-esc').textContent = esc;
    const total = alu + doc + esc;
    const gap = alu - 420;
    const pct = Math.min(Math.round((alu / 420) * 100), 200);
    const crec = Math.round(((alu - 387) / 387) * 100);
    const ratio = doc > 0 ? (alu / doc).toFixed(1) : '—';
    document.getElementById('p-total').textContent = total;
    document.getElementById('p-gap').textContent = gap === 0 ? '±0' : (gap > 0 ? '+' + gap : gap);
    document.getElementById('p-gap').style.color = gap >= 0 ? '#1D9E75' : '#D85A30';
    document.getElementById('p-pct-label').textContent = Math.min(pct, 100) + '% · ' + alu + ' / 420';
    document.getElementById('target-bar').style.width = Math.min(pct, 100) + '%';
    document.getElementById('target-bar').style.background = gap < 0 ? '#D85A30' : '#185FA5';
    document.getElementById('p-crec').textContent = (crec >= 0 ? '+' : '') + crec + '%';
    document.getElementById('p-ratio').textContent = ratio;
    projChart.data.datasets[1].data = [null, 412, total];
    projChart.update();
}

function switchTab(id, e) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    e.target.classList.add('active');
}


window.switchTab = switchTab;
window.updateProj = updateProj;