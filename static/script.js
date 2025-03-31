document.addEventListener("DOMContentLoaded", function() {
    const type_counts = {
        'Gram-negative bacterium': 50,
        'Gram-positive bacterium': 40,
        'Acid-fast bacterium': 10
    };

    const category_counts = {
        'Industrial': 40,
        'Probiotic': 20,
        'Pathogen': 30,
        'Other': 10
    };

    renderCharts({type_counts, category_counts});
    renderDataInfo({type_counts, category_counts});
});

function renderCharts(data) {
    const typeCtx = document.getElementById('typeChart').getContext('2d');
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');

    new Chart(typeCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(data.type_counts),
            datasets: [{
                label: 'Type Distribution',
                data: Object.values(data.type_counts),
                backgroundColor: 'skyblue'
            }]
        }
    });

    new Chart(categoryCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(data.category_counts),
            datasets: [{
                data: Object.values(data.category_counts),
                backgroundColor: ['#ff6384','#36a2eb','#ffce56','#8bc34a','#9c27b0']
            }]
        }
    });
}

function renderDataInfo(data) {
    document.getElementById('dataInfo').innerHTML = `
        <h4>Data Summary:</h4>
        <ul>
            <li><strong>Total Bacterial Types:</strong> ${Object.keys(data.type_counts).length}</li>
            <li><strong>Total Categories:</strong> ${Object.keys(data.category_counts).length}</li>
            <li><strong>Bacterial Types:</strong> ${Object.keys(data.type_counts).join(', ')}</li>
            <li><strong>Categories:</strong> ${Object.keys(data.category_counts).join(', ')}</li>
        </ul>
    `;
}
