import { getChartColors } from "./themeCharts.js";

export function createBarChart(ctx, {
    labels,
    data,
    colors,
    max,
    lineData,
    total
}) {

    return new Chart(ctx, {
        data: {
            labels,
            datasets: [{
                type: 'bar',
                data,
                backgroundColor: colors,
                borderWidth: 0,
                hoverOffset: 6,
                order: 2,

                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    color: () => getChartColors().lbl,
                    font: {
                        weight: 'bold',
                        size: 12
                    },

                    formatter: (value, context) => {
                        const dataset = context.dataset.data;

                        const totalValue = total ??
                            dataset.reduce((a, b) => a + b, 0);

                        const percentage = totalValue > 0
                            ? ((value / totalValue) * 100).toFixed(1)
                            : 0;

                        return `${value}\n${percentage}%`;
                    }
                }
            },

            ...(lineData ? [{
                type: 'line',
                data: lineData,
                borderColor: '#ffffff',
                backgroundColor: '#ffffff',
                borderWidth: 2,
                tension: 0,
                pointRadius: 5,
                pointBackgroundColor: '#7F77DD',
                order: 1
            }] : [])]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: { display: false },

                tooltip: {
                    mode: 'index',
                    callbacks: {
                        label: function (context) {
                            const dataset = context.dataset.data;

                            const totalValue = total ??
                                dataset.reduce((a, b) => a + b, 0);

                            const value = context.raw;

                            const percentage = totalValue > 0
                                ? ((value / totalValue) * 100).toFixed(1)
                                : 0;

                            return `${value} (${percentage}%)`;
                        }
                    }
                }
            },

            scales: {
                x: {
                    ticks: { color: () => getChartColors().lbl },
                    grid: { display: true }
                },

                y: {
                    ticks: { color: () => getChartColors().lbl },
                    grid: { color: () => getChartColors().grid },
                    beginAtZero: true,
                    max: max
                }
            }
        }
    });
}

export function createGroupedLineChart(ctx, {
    labels,
    datasets,
    totals = [],
    baseLabel = 'Convocados',
    showLine = true,
    lineLabel = 'Crecimiento',
    lineDatasetIndex = 1,
    colors = [],
}) {

    return new Chart(ctx, {

        type: 'bar',

        data: {
            labels,

            datasets: [
                ...datasets.map((ds, i) => ({
                    type: 'bar',
                    ...ds,
                    backgroundColor: ds.backgroundColor || colors[i] || '#ccc'
                })),
                ...(showLine ? [{
                    type: 'line',
                    label: lineLabel,
                    data: datasets[lineDatasetIndex]?.data,
                    borderColor: '#7F77DD',
                    backgroundColor: 'transparent',
                    borderWidth: 2.5,
                    tension: 0.35,
                    pointRadius: 5,
                    pointBackgroundColor: '#7F77DD',
                    order: 1
                }] : [])
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {
                    mode: 'index'
                },

                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    color: () => getChartColors().lbl,
                    font: {
                        weight: 'bold',
                        size: 11
                    },

                    formatter: (value, context) => {

                        if (context.dataset.type === 'line') return '';

                        const chart = context.chart;
                        const index = context.dataIndex;

                        let base = null;

                        // Prioridad 1: totals manuales
                        if (totals[index] != null) {

                            base = totals[index];

                            // Prioridad 2: dataset base
                        } else if (baseLabel) {

                            const baseDataset = chart.data.datasets.find(
                                d => d.label === baseLabel
                            );

                            base = baseDataset?.data?.[index];

                            if (context.dataset.label === baseLabel) {
                                return value;
                            }

                            // Fallback: suma automática
                        } else {

                            base = chart.data.datasets
                                .filter(d => d.type === 'bar')
                                .reduce((sum, d) => {
                                    return sum + (Number(d.data?.[index]) || 0);
                                }, 0);
                        }

                        const percent = base > 0
                            ? ((value / base) * 100).toFixed(1)
                            : 0;

                        return `${value}\n${percent}%`;
                    }
                }
            },

            scales: {
                x: { stacked: false },
                y: {
                    stacked: false,
                    beginAtZero: true,
                    grid: { color: () => getChartColors().grid },
                    ticks: { color: () => getChartColors().lbl }
                }
            }
        }
    });
}
