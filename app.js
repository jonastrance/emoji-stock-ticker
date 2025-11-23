// Random stock items with emojis
const stockItems = [
    { name: "Pizza Slices", emoji: "🍕", ticker: "PZZA" },
    { name: "Lonely Socks", emoji: "🧦", ticker: "SOCK" },
    { name: "Anxiety Levels", emoji: "😰", ticker: "ANXTY" },
    { name: "Coffee Addiction", emoji: "☕", ticker: "CFEE" },
    { name: "Avocado Toast", emoji: "🥑", ticker: "AVCD" },
    { name: "Procrastination", emoji: "😴", ticker: "PRCR" },
    { name: "Dad Jokes", emoji: "👨", ticker: "DJOKE" },
    { name: "Wifi Signal", emoji: "📶", ticker: "WIFI" },
    { name: "Monday Blues", emoji: "💙", ticker: "MNDY" },
    { name: "Cat Videos", emoji: "🐱", ticker: "MEOW" },
    { name: "Toilet Paper", emoji: "🧻", ticker: "TPPR" },
    { name: "Indoor Plants", emoji: "🪴", ticker: "PLNT" },
    { name: "Selfie Sticks", emoji: "🤳", ticker: "SELF" },
    { name: "Left Earbuds", emoji: "🎧", ticker: "EARBUD" },
    { name: "Motivational Quotes", emoji: "💪", ticker: "MOTIV" },
    { name: "Banana Bread", emoji: "🍌", ticker: "BNBRD" },
    { name: "Zoom Fatigue", emoji: "🥱", ticker: "ZOOM" },
    { name: "Dogecoin Dreams", emoji: "🐕", ticker: "DOGE" },
    { name: "Impulse Buys", emoji: "🛒", ticker: "IMPLSE" },
    { name: "Broken Dreams", emoji: "💔", ticker: "BRKN" },
    { name: "Rubber Duckies", emoji: "🦆", ticker: "DUCK" },
    { name: "Existential Dread", emoji: "🌀", ticker: "EXST" },
    { name: "Bubble Wrap", emoji: "🫧", ticker: "BBLWRP" },
    { name: "Unicorn Startups", emoji: "🦄", ticker: "UNCRN" },
    { name: "Rage Quit Points", emoji: "😡", ticker: "RAGE" }
];

let currentChart = null;
let currentData = null;

// Generate random stock data
function generateStockData() {
    const points = 30;
    const data = [];
    let value = Math.random() * 100 + 50;
    
    for (let i = 0; i < points; i++) {
        // Add some volatility
        const change = (Math.random() - 0.5) * 20;
        value = Math.max(10, value + change);
        data.push(value);
    }
    
    return data;
}

// Generate date labels
function generateLabels(count) {
    const labels = [];
    const now = new Date();
    
    for (let i = count - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    
    return labels;
}

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

// Format market cap
function formatMarketCap(value) {
    if (value >= 1000000000) {
        return `$${(value / 1000000000).toFixed(2)}B`;
    } else if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
        return `$${(value / 1000).toFixed(2)}K`;
    }
    return formatCurrency(value);
}

// Calculate percentage change
function calculateChange(data) {
    if (data.length < 2) return 0;
    const start = data[0];
    const end = data[data.length - 1];
    return ((end - start) / start) * 100;
}

// Create or update chart
function createChart(stockItem, data) {
    const ctx = document.getElementById('stockChart').getContext('2d');
    const labels = generateLabels(data.length);
    
    // Destroy existing chart
    if (currentChart) {
        currentChart.destroy();
    }
    
    // Determine if positive or negative trend
    const change = calculateChange(data);
    const isPositive = change >= 0;
    const lineColor = isPositive ? '#10b981' : '#ef4444';
    const gradientColor1 = isPositive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)';
    const gradientColor2 = isPositive ? 'rgba(16, 185, 129, 0)' : 'rgba(239, 68, 68, 0)';
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, gradientColor1);
    gradient.addColorStop(1, gradientColor2);
    
    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${stockItem.name} (${stockItem.ticker})`,
                data: data,
                borderColor: lineColor,
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: lineColor,
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return `Value: ${formatCurrency(context.parsed.y)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        },
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 11
                        },
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// Update stock info display
function updateStockInfo(stockItem, data) {
    const currentValue = data[data.length - 1];
    const change = calculateChange(data);
    const isPositive = change >= 0;
    const marketCap = currentValue * (Math.random() * 10000000 + 1000000);
    
    document.getElementById('stockName').textContent = `${stockItem.name} (${stockItem.ticker})`;
    document.getElementById('stockEmoji').textContent = stockItem.emoji;
    document.getElementById('currentValue').textContent = formatCurrency(currentValue);
    
    const changeElement = document.getElementById('changeValue');
    changeElement.textContent = `${isPositive ? '+' : ''}${change.toFixed(2)}%`;
    changeElement.className = `stat-value ${isPositive ? 'change-positive' : 'change-negative'}`;
    
    document.getElementById('marketCap').textContent = formatMarketCap(marketCap);
}

// Generate random chart
function generateRandomChart() {
    const randomItem = stockItems[Math.floor(Math.random() * stockItems.length)];
    const data = generateStockData();
    
    currentData = { stockItem: randomItem, data: data };
    
    updateStockInfo(randomItem, data);
    createChart(randomItem, data);
}

// Export chart as PNG
function exportChart() {
    if (!currentChart) {
        alert('Please generate a chart first!');
        return;
    }
    
    const canvas = document.getElementById('stockChart');
    const url = canvas.toDataURL('image/png');
    
    // Create download link
    const link = document.createElement('a');
    const stockItem = currentData.stockItem;
    link.download = `${stockItem.ticker}_stock_chart_${Date.now()}.png`;
    link.href = url;
    link.click();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('generateBtn').addEventListener('click', generateRandomChart);
    document.getElementById('exportBtn').addEventListener('click', exportChart);
    
    // Generate initial chart
    generateRandomChart();
});
