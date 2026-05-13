import { createDonutChart } from "./donutChart.js";
import { createBarChart, createGroupedLineChart } from "./barChart.js"
import { getChartColors } from "./themeCharts.js";

Chart.defaults.font.family = 'var(--font-sans)';
Chart.register(ChartDataLabels);

// ── Resumen: cobertura horizontal ──
createGroupedLineChart(document.getElementById('chartCobertura'), {
    labels: ['2023', '204', '2025', '2026'],

    baseLabel: 'Convocados',

    datasets: [
        {
            label: 'Convocados',
            data: [794, 100, 1144, 1009],
            backgroundColor: '#1B7F8E'
        },
        {
            label: 'Atendidos',
            data: [700, 54, 930, 771],
            backgroundColor: '#1D9E75'
        },
        {
            label: 'Ausentes',
            data: [94, 46, 214, 238],
            backgroundColor: '#BA7517'
        }
    ]
});


// ── Resumen: resultados dona ──
createDonutChart(
    document.getElementById('chartResultados'),
    {
        labels: ['Estado Normal: 2107', 'Desnutrición Moderada: 47', 'Desnutrición Severa:24'],
        data: [2107, 47, 24],
        colors: ['#1D9E75', '#BA7517', '#D85A30'],
        total: 2455
    }
)

// ── Indicadores: 2023 ──
createBarChart(document.getElementById('chartIndicadores'), {
    labels: ['Niños convocados', 'Niños atendidos', 'Niños ausentes'],
    data: [794, 700, 94],
    colors: ['#1B7F8E', '#1D9E75', '#BA7517'],
    max: 900,
    total: 794
})

// ── Indicadores: 2024 ──
createBarChart(document.getElementById('ind2024'), {
    labels: ['Niños convocados', 'Niños atendidos', 'Niños ausentes'],
    data: [100, 54, 46],
    colors: ['#1B7F8E', '#1D9E75', '#BA7517'],
    max: 100,
    total: 100
})

// ── Indicadores: 2025 ──
createBarChart(document.getElementById('ind2025Finca'), {
    labels: ['Niños convocados', 'Niños atendidos', 'Niños ausentes'],
    data: [70, 42, 28],
    colors: ['#1B7F8E', '#1D9E75', '#BA7517'],
    max: 90,
    total: 70
})

createBarChart(document.getElementById('ind2025Fabrica'), {
    labels: ['Niños convocados', 'Niños atendidos', 'Niños ausentes'],
    data: [1074, 888, 186],
    colors: ['#1B7F8E', '#1D9E75', '#BA7517'],
    max: 1400,
    total: 1074
})

// -- Indicadores 2026 --
createBarChart(document.getElementById('ind2026F'), {
    labels: ['Niños convocados', 'Niños atendidos', 'Niños ausentes'],
    data: [1009, 771, 238],
    colors: ['#1B7F8E', '#1D9E75', '#BA7517'],
    max: 1400,
    total: 1009
})

// ── Resultados: dona nutricional ──
createDonutChart(
    document.getElementById('chartDonutNutri'),
    {
        labels: ['Estado Normal', 'Desnutrición Moderada', 'Desnutrición Severa'],
        data: [2107, 47, 24],
        colors: ['#1D9E75', '#BA7517', '#D85A30'],
        total: 2455
    }
)

// ── Resultados: barras horizontales nutricionales ──
new Chart(document.getElementById('chartBarNutri'), {
    type: 'bar',
    data: {
        labels: ['Estado Normal', 'Desnutrición'],
        datasets: [{
            data: [2107, 71],
            backgroundColor: ['#1D9E75', '#D85A30'],
            borderRadius: 5
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: { label: ctx => ` ${ctx.raw} niños` }
            },
            datalabels: {
                color: () => getChartColors().lbl
            }
        },
        scales: {
            x: { ticks: { color: () => getChartColors().lbl }, grid: { color: () => getChartColors().grid }, beginAtZero: true },
            y: { ticks: { color: () => getChartColors().lbl }, grid: { display: false } }
        }
    }
});

function switchTab(id, e) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    e.target.classList.add('active');
}

window.switchTab = switchTab;