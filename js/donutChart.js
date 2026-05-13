import { getChartColors } from "./themeCharts.js";
export function createDonutChart(ctx, {
    labels,
    data,
    colors,
    total
}) {

    return new Chart(ctx, {

        type: 'doughnut',

        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: colors,
                borderWidth: 0,
                hoverOffset: 6
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',

            plugins: {

                legend: { display: false },

                datalabels: {

                    color: () => getChartColors().lbl,

                    formatter: (value, context) => {

                        const dataset = context.chart.data.datasets[0].data;

                        const baseTotal = total ?? dataset.reduce((a, b) => a + (b ?? 0), 0);

                        const pct = baseTotal > 0
                            ? (value / baseTotal) * 100
                            : 0;

                        if (pct < 2) return '';

                        return `${pct.toFixed(1)}%`;
                    },

                    anchor: (ctx) => {

                        const dataset = ctx.dataset.data;

                        const baseTotal = total ?? dataset.reduce((a, b) => a + (b ?? 0), 0);

                        const value = dataset[ctx.dataIndex];

                        const pct = baseTotal > 0
                            ? (value / baseTotal) * 100
                            : 0;

                        return pct < 5 ? 'end' : 'center';
                    },

                    align: (ctx) => {

                        const dataset = ctx.dataset.data;

                        const baseTotal = total ?? dataset.reduce((a, b) => a + (b ?? 0), 0);

                        const value = dataset[ctx.dataIndex];

                        const pct = baseTotal > 0
                            ? (value / baseTotal) * 100
                            : 0;

                        return pct < 5 ? 'end' : 'center';
                    }
                }
            }
        },

        plugins: [ChartDataLabels]
    });
}