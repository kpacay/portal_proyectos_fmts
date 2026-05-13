export function getChartColors() {
    const styles = getComputedStyle(document.documentElement);

    return {
        grid: styles.getPropertyValue('--chart-grid').trim(),
        lbl: styles.getPropertyValue('--chart-label').trim()
    };
}
