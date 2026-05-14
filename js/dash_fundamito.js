import { createDonutChart } from "./donutChart.js";
import { createGroupedLineChart } from "./barChart.js";
import { getChartColors } from "./themeCharts.js";

const isDark = matchMedia('(prefers-color-scheme: dark)').matches;
Chart.defaults.font.family = 'var(--font-sans)';
Chart.defaults.font.size = 12;
Chart.register(ChartDataLabels);

const years = ['2025', '2026'];

new Chart(document.getElementById('chartMain'), {
    type: 'bar',
    data: {
        labels: years,
        datasets: [
            { label: 'Alumnos', data: [3291, 4000], backgroundColor: '#185FA5', stack: 'real', order: 2 },
            { label: 'Docentes', data: [133, 130], backgroundColor: '#1D9E75', stack: 'real', order: 2 },
            { label: 'Escuelas', data: [22, 28], backgroundColor: '#BA7517', stack: 'real', order: 2 },
            {
                label: 'Tendencia total', type: 'line',
                data: [3446, 4158],
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
            datalabels: { color: () => getChartColors().lbl }
        },
        scales: {
            x: { stacked: true, ticks: { color: () => getChartColors().lbl }, grid: { display: false } },
            y: { stacked: true, ticks: { color: () => getChartColors().lbl, callback: v => v.toLocaleString() }, grid: { color: () => getChartColors().grid } }
        }
    }
});

createGroupedLineChart(document.getElementById('chartComparativa'), {
    labels: ['2025', '2026'],

    totals: [3424, 4130],

    datasets: [
        {
            label: 'Docentes',
            data: [84, 90],
            backgroundColor: '#1D9E75'
        },
        {
            label: 'Total Alumnos',
            data: [3291, 4000],
            backgroundColor: '#1B7F8E'
        },
        {
            label: 'Alumnos en plataforma',
            data: [410, 2100],
            backgroundColor: '#ddc53e'
        },
        {
            label: 'Escuelas',
            data: [21, 28],
            backgroundColor: '#BA7517'
        }
    ]
});

createDonutChart(
    document.getElementById('chartDonut'),
    {
        labels: ['Alumnos', 'Docentes', 'Escuelas'],
        data: [3291, 133, 22],
        colors: ['#185FA5', '#1D9E75', '#BA7517']
    }
)

let projChart = new Chart(document.getElementById('chartProj'), {
    type: 'line',
    data: {
        labels: years,
        datasets: [
            {
                label: 'Total histórico',
                data: [3446, null],
                borderColor: '#185FA5', backgroundColor: 'rgba(24,95,165,0.08)',
                borderWidth: 2.5, pointRadius: 5, pointBackgroundColor: '#185FA5',
                tension: 0.3, fill: true
            },
            {
                label: 'Proyección 2026',
                data: [3446, 4158],
                borderColor: '#7F77DD', backgroundColor: 'rgba(127,119,221,0.06)',
                borderWidth: 2.5, borderDash: [7, 4],
                pointRadius: [0, 6], pointBackgroundColor: '#7F77DD',
                tension: 0.3, fill: true
            }
        ]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw != null ? ctx.raw.toLocaleString() : '—'}` } }
        },
        scales: {
            x: { ticks: { color: () => getChartColors().lbl }, grid: { display: false } },
            y: { ticks: { color: () => getChartColors().lbl, callback: v => v.toLocaleString() }, grid: { color: () => getChartColors().grid }, beginAtZero: true }
        }
    }
});

function fmt(n) { return n.toLocaleString(); }

function updateProj() {
    const alu = +document.getElementById('s-alu').value;
    const doc = +document.getElementById('s-doc').value;
    const esc = +document.getElementById('s-esc').value;
    document.getElementById('v-alu').textContent = fmt(alu);
    document.getElementById('v-doc').textContent = doc;
    document.getElementById('v-esc').textContent = esc;

    const total = alu + doc + esc;
    const gap = alu - 2100;
    const pct = Math.min(Math.round((alu / 2100) * 100), 200);
    const crec = Math.round(((alu - 3424) / 3424) * 100);
    const ratio = doc > 0 ? (alu / doc).toFixed(1) : '—';

    document.getElementById('p-total').textContent = fmt(total);
    document.getElementById('p-gap').textContent = gap === 0 ? '±0' : (gap > 0 ? '+' + fmt(gap) : '−' + fmt(Math.abs(gap)));
    document.getElementById('p-gap').style.color = gap >= 0 ? '#1D9E75' : '#D85A30';
    document.getElementById('p-pct-label').textContent = Math.min(pct, 100) + '% · ' + fmt(alu) + ' / 2,100';
    document.getElementById('target-bar').style.width = Math.min(pct, 100) + '%';
    document.getElementById('target-bar').style.background = gap < 0 ? '#D85A30' : '#185FA5';
    document.getElementById('p-crec').textContent = (crec >= 0 ? '+' : '') + crec + '%';
    document.getElementById('p-ratio').textContent = ratio;

    projChart.data.datasets[1].data = [3658, total];
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