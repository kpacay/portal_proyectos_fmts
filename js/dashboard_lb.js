import { getChartColors } from "./themeCharts.js";

const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const gridC = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
const lblC = isDark ? '#b0aea6' : '#73726c';

Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
Chart.defaults.font.size = 12;
Chart.register(ChartDataLabels);

const lbYears = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const lbIns = [17, 20, 30, 30, 30, 35, 45, 43, 50];
const lbCer = [10, 12, 12, 12, 17, 17, 23, 30, 32];
// BEG alineado al mismo eje que lbYears (2022 = índice 5)
const begIns = [null, null, null, null, null, 6, 5, 20, 28];
const begGrad = [null, null, null, null, null, 5, 3, 16, 21];

const charts = {};

function mk(id, cfg) {
    if (charts[id]) { charts[id].destroy(); delete charts[id]; }
    const canvas = document.getElementById(id);
    if (!canvas) return;
    charts[id] = new Chart(canvas, cfg);
}

function initLB() {
    const lbInsAcum = lbIns.reduce((acc, v, i) => {
        acc.push((acc[i - 1] || 0) + v);
        return acc;
    }, []);

    const ultimoCert = lbCer[lbCer.length - 1];

    mk('chartLB', {
        type: 'bar',
        data: {
            labels: [...lbYears, '2026'],
            datasets: [
                {
                    label: 'Inscritos',
                    data: [...lbIns, 55],
                    backgroundColor: 'rgba(24,95,165,0.65)',
                    yAxisID: 'y',
                    order: 2
                },
                {
                    label: 'Certificados',
                    data: [...lbCer, 38],
                    backgroundColor: 'rgba(91,159,224,0.75)',
                    yAxisID: 'y',
                    order: 2
                },

                // Línea acumulada
                {
                    label: 'Inscritos acumulados',
                    type: 'line',
                    data: [...lbInsAcum, null],
                    borderColor: '#185FA5',
                    backgroundColor: 'transparent',
                    borderWidth: 2.5,
                    pointRadius: 5,
                    pointBackgroundColor: '#185FA5',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 1.5,
                    tension: 0.3,
                    yAxisID: 'y2',
                    order: 1
                },

                // Línea de proyección certificados
                {
                    label: 'Proyección certificados',
                    type: 'line',
                    data: [
                        ...Array(lbCer.length - 1).fill(null),
                        ultimoCert,
                        38
                    ],
                    borderColor: '#5B9FE0',
                    borderDash: [6, 6],
                    borderWidth: 2,
                    pointRadius: [0, 4],
                    pointBackgroundColor: '#5B9FE0',
                    tension: 0.2,
                    yAxisID: 'y',
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false },
                datalabels: {
                    color: () => getChartColors().lbl
                }
            },
            scales: {
                x: {
                    ticks: { color: lblC, maxRotation: 45 },
                    grid: { display: false }
                },
                y: {
                    ticks: { color: lblC },
                    grid: { color: gridC },
                    beginAtZero: true,
                    position: 'left'
                },
                y2: {
                    ticks: { color: '#185FA5' },
                    grid: { display: false },
                    beginAtZero: true,
                    position: 'right'
                }
            }
        }
    });
}
function initBEG() {
    mk('chartBEG', {
        type: 'bar',
        data: {
            labels: ['2022', '2023', '2024', '2025', '2026 (proy.)'],
            datasets: [
                {
                    label: 'Inscritos',
                    data: [6, 5, 20, 28, 25],
                    backgroundColor: 'rgba(24,95,165,0.65)', yAxisID: 'y', order: 2
                },
                {
                    label: 'Graduados',
                    data: [5, 3, 16, 21, 24],
                    backgroundColor: 'rgba(91,159,224,0.75)', yAxisID: 'y', order: 2
                },
                {
                    label: 'Acumulado graduados',
                    type: 'line',
                    data: [5, 8, 24, 45, 69],
                    borderColor: '#185FA5', backgroundColor: 'transparent',
                    borderWidth: 2.5, pointRadius: 5, pointBackgroundColor: '#185FA5',
                    pointBorderColor: '#fff', pointBorderWidth: 1.5,
                    tension: 0.3, yAxisID: 'y2', order: 1
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { display: false }, tooltip: { mode: 'index', intersect: false },
                datalabels: {
                    color: () => getChartColors().lbl
                }
            },
            scales: {
                x: { ticks: { color: lblC }, grid: { display: false } },
                y: { ticks: { color: lblC }, grid: { color: gridC }, beginAtZero: true, position: 'left' },
                y2: { ticks: { color: '#185FA5' }, grid: { display: false }, beginAtZero: true, position: 'right' }
            }
        }
    });
}

function initProj() {
    mk('chartProjCombined', {
        type: 'line',
        data: {
            labels: [...lbYears, '2026'],
            datasets: [
                // LB inscritos — sólido hasta 2025
                {
                    label: 'LB inscritos',
                    data: [...lbIns, null],
                    borderColor: '#185FA5', backgroundColor: 'rgba(24,95,165,0.07)',
                    borderWidth: 2.5, pointRadius: 3, pointBackgroundColor: '#185FA5',
                    tension: 0.35, fill: true
                },
                // LB certificados — sólido hasta 2025
                {
                    label: 'LB certificados',
                    data: [...lbCer, null],
                    borderColor: '#5B9FE0', backgroundColor: 'transparent',
                    borderWidth: 2.5, pointRadius: 3, pointBackgroundColor: '#5B9FE0',
                    tension: 0.35
                },
                // BEG inscritos — sólido hasta 2025
                {
                    label: 'BEG inscritos',
                    data: [...begIns, null],
                    borderColor: '#1D9E75', backgroundColor: 'transparent',
                    borderWidth: 2.5, pointRadius: 3, pointBackgroundColor: '#1D9E75',
                    tension: 0.35
                },
                // BEG graduados — sólido hasta 2025
                {
                    label: 'BEG graduados',
                    data: [...begGrad, null],
                    borderColor: '#E07B2A', backgroundColor: 'transparent',
                    borderWidth: 2.5, pointRadius: 3, pointBackgroundColor: '#E07B2A',
                    tension: 0.35
                },
                // LB inscritos proy — punteado SOLO 2025→2026
                {
                    label: 'Inscritos 2026',
                    data: [...Array(8).fill(null), 50, 55],
                    borderColor: '#185FA5', borderDash: [6, 4],
                    borderWidth: 2, pointRadius: [0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
                    pointBackgroundColor: '#185FA5', pointBorderColor: '#fff', pointBorderWidth: 2,
                    tension: 0, fill: false
                },
                // LB certificados proy — punteado SOLO 2025→2026
                {
                    label: 'Meta LB cert.',
                    data: [...Array(8).fill(null), 32, 35],
                    borderColor: '#5B9FE0', borderDash: [6, 4],
                    borderWidth: 2, pointRadius: [0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
                    pointBackgroundColor: '#5B9FE0', pointBorderColor: '#fff', pointBorderWidth: 2,
                    tension: 0, fill: false
                },
                // BEG inscritos proy — punteado SOLO 2025→2026
                {
                    label: 'Inscritos BEG 2026',
                    data: [...Array(8).fill(null), 28, 25],
                    borderColor: '#1D9E75', borderDash: [6, 4],
                    borderWidth: 2, pointRadius: [0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
                    pointBackgroundColor: '#1D9E75', pointBorderColor: '#fff', pointBorderWidth: 2,
                    tension: 0, fill: false
                },
                // BEG graduados proy — punteado SOLO 2025→2026
                {
                    label: 'Meta BEG grad.',
                    data: [...Array(8).fill(null), 21, 24],
                    borderColor: '#E07B2A', borderDash: [6, 4],
                    borderWidth: 2, pointRadius: [0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
                    pointBackgroundColor: '#E07B2A', pointBorderColor: '#fff', pointBorderWidth: 2,
                    tension: 0, fill: false
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index', intersect: false,
                    filter: (item) => {
                        // En años anteriores a 2026 (índice 9) ocultar datasets punteados (4-7)
                        if (item.dataIndex < 9 && item.datasetIndex >= 4) return false;
                        // En 2026 ocultar datasets sólidos (0-3)
                        if (item.dataIndex === 9 && item.datasetIndex < 4) return false;
                        return item.parsed.y !== null;
                    },
                    callbacks: {
                        label: (ctx) => {
                            const v = ctx.parsed.y;
                            if (v === null || v === undefined) return null;
                            return ` ${ctx.dataset.label}: ${v}`;
                        }
                    }
                },
            },
            scales: {
                x: { ticks: { color: lblC, maxRotation: 45 }, grid: { display: false } },
                y: { ticks: { color: lblC }, grid: { color: gridC }, beginAtZero: true }
            }
        }
    });
}

// Mapa de qué init corre en cada tab
const tabInits = { lecciones: initLB, becas: initBEG, proyeccion: initProj };
const tabCharts = { lecciones: 'chartLB', becas: 'chartBEG', proyeccion: 'chartProjCombined' };

function switchTab(id, btn) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    btn.classList.add('active');
    // Inicializar gráfica lazy (solo si no existe aún) tras el repintado
    requestAnimationFrame(() => {
        if (!charts[tabCharts[id]]) {
            tabInits[id]();
        } else {
            charts[tabCharts[id]].resize();
        }
    });
}

function updateAll() {
    const ins = +document.getElementById('lb-ins').value;
    const cer = Math.min(+document.getElementById('lb-cer').value, ins);
    const grad = +document.getElementById('beg-grad').value;

    document.getElementById('lv-ins').textContent = ins;
    document.getElementById('lv-cer').textContent = cer;
    document.getElementById('bv-grad').textContent = grad;

    const tasa = ins > 0 ? Math.round((cer / ins) * 100) : 0;
    const ciIns = Math.round(((ins - 50) / 50) * 100);
    const ciCer = cer > 0 ? Math.round(((cer - 32) / 32) * 100) : -100;
    const begCrec = Math.round(((grad - 21) / 21) * 100);
    const begAcum = 45 + grad;
    const begPct = Math.min(Math.round((grad / 30) * 100), 100);

    document.getElementById('lb-tasa-lbl').textContent = tasa + '% · ' + cer + '/' + ins;
    document.getElementById('lb-bar').style.width = Math.min(tasa, 100) + '%';
    document.getElementById('lb-bar').style.background = tasa >= 60 ? '#1D9E75' : tasa >= 40 ? '#BA7517' : '#D85A30';
    document.getElementById('lb-p-ins').textContent = ins;
    document.getElementById('lb-p-cer').textContent = cer;
    document.getElementById('lb-p-ci').textContent = (ciIns >= 0 ? '+' : '') + ciIns + '%';
    document.getElementById('lb-p-cc').textContent = (ciCer >= 0 ? '+' : '') + ciCer + '%';

    document.getElementById('beg-crec-lbl').textContent = (begCrec >= 0 ? '+' : '') + begCrec + '%';
    document.getElementById('beg-bar').style.width = begPct + '%';
    document.getElementById('beg-bar').style.background = '#185FA5';
    document.getElementById('beg-p-grad').textContent = grad;
    document.getElementById('beg-p-acum').textContent = begAcum;
    document.getElementById('beg-p-crec').textContent = (begCrec >= 0 ? '+' : '') + begCrec + '%';

    const pc = charts['chartProjCombined'];
    if (pc) {
        // índices 4-7 son los segmentos punteados
        pc.data.datasets[4].data = [...Array(8).fill(null), 50, ins];
        pc.data.datasets[5].data = [...Array(8).fill(null), 32, cer];
        pc.data.datasets[6].data = [...Array(8).fill(null), 28, 25];
        pc.data.datasets[7].data = [...Array(8).fill(null), 21, grad];
        pc.update();
    }
}

// Inicializar la primera gráfica visible al cargar
window.addEventListener('DOMContentLoaded', initLB);

window.switchTab = switchTab;
