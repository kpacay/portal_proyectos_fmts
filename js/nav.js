fetch('nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav-placeholder').innerHTML = data;

        const themeToggle = document.getElementById('themeToggle');

        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            document.documentElement.setAttribute(
                'data-theme',
                prefersDark ? 'dark' : 'light'
            );
        }

        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');

            if (current === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌙';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️';
            }
            Object.values(Chart.instances).forEach(chart => {
                chart.update();
            });
        });

        const currentTheme = document.documentElement.getAttribute('data-theme');

        themeToggle.textContent = currentTheme === 'dark'
            ? '☀️'
            : '🌙';



    });