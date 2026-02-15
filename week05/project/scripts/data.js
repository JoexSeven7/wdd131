/* ============================================
   The Red Gold Hub (TRGH) - Data Page JavaScript
   Nigeria's Palm Oil Industry Website
   ============================================ */

// ============================================
// DOM Elements Selection
// ============================================

const yearFilter = document.getElementById("year-filter");
const filteredDataDisplay = document.getElementById("filtered-data-display");
const productionTableBody = document.getElementById("production-table-body");
const investmentCalculator = document.getElementById("investment-calculator");
const calculatorResult = document.getElementById("calculator-result");

// ============================================
// Production Data Array
// ============================================

const productionData = [
	{ year: 2018, production: 1050000, consumption: 1450000, imports: 400000, importCost: 4500000000, gap: 400000 },
	{ year: 2019, production: 1100000, consumption: 1500000, imports: 400000, importCost: 4800000000, gap: 400000 },
	{ year: 2020, production: 1080000, consumption: 1550000, imports: 470000, importCost: 5200000000, gap: 470000 },
	{ year: 2021, production: 1150000, consumption: 1600000, imports: 450000, importCost: 5500000000, gap: 450000 },
	{ year: 2022, production: 1180000, consumption: 1650000, imports: 470000, importCost: 5800000000, gap: 470000 },
	{ year: 2023, production: 1200000, consumption: 1700000, imports: 500000, importCost: 6000000000, gap: 500000 },
];

// ============================================
// Utility Functions
// ============================================

//Format number with commas and K/M/B suffixes

function formatMetric(num) {
	if (num >= 1000000000) {
		return `$${(num / 1000000000).toFixed(1)}B`;
	} else if (num >= 1000000) {
		return `${(num / 1000000).toFixed(1)}M`;
	} else if (num >= 1000) {
		return `${(num / 1000).toFixed(0)}K`;
	}
	return num.toString();
}

//Format number with commas
 
function formatNumber(num) {
	return num.toLocaleString();
}


//Format currency

function formatCurrency(amount) {
	return `$${formatNumber(amount)}`;
}

// ============================================
// Data Filtering Functions
// ============================================


//Filter data by selected year
 
function filterDataByYear(selectedYear) {
	if (selectedYear === "all") {
		return productionData;
	}
	return productionData.filter((data) => data.year.toString() === selectedYear);
}

// Display filtered data
 
function displayFilteredData(data) {
	if (!filteredDataDisplay) return;

	if (data.length === 0) {
		filteredDataDisplay.innerHTML = `<p>No data available for the selected year.</p>`;
		return;
	}

	if (data.length === 1) {
		const item = data[0];
		filteredDataDisplay.innerHTML = `
			<h3>${item.year} Statistics</h3>
			<p><strong>Production:</strong> ${formatNumber(item.production)} metric tons</p>
			<p><strong>Consumption:</strong> ${formatNumber(item.consumption)} metric tons</p>
			<p><strong>Imports:</strong> ${formatNumber(item.imports)} metric tons</p>
			<p><strong>Import Cost:</strong> ${formatCurrency(item.importCost)}</p>
			<p><strong>Supply Gap:</strong> ${formatNumber(item.gap)} metric tons</p>
		`;
	} else {
		const totalProduction = data.reduce((sum, item) => sum + item.production, 0);
		const totalConsumption = data.reduce((sum, item) => sum + item.consumption, 0);
		const totalImports = data.reduce((sum, item) => sum + item.imports, 0);
		const totalCost = data.reduce((sum, item) => sum + item.importCost, 0);
		const avgGap = data.reduce((sum, item) => sum + item.gap, 0) / data.length;

		filteredDataDisplay.innerHTML = `
			<h3>Summary for Selected Years</h3>
			<p><strong>Total Production:</strong> ${formatNumber(totalProduction)} metric tons</p>
			<p><strong>Total Consumption:</strong> ${formatNumber(totalConsumption)} metric tons</p>
			<p><strong>Total Imports:</strong> ${formatNumber(totalImports)} metric tons</p>
			<p><strong>Total Import Cost:</strong> ${formatCurrency(totalCost)}</p>
			<p><strong>Average Supply Gap:</strong> ${formatNumber(Math.round(avgGap))} metric tons</p>
		`;
	}

	// Save filter preference to localStorage
	window.TRGH.saveToLocalStorage("dataYearFilter", yearFilter.value);
}

// ============================================
// Table Population Functions
// ============================================


// Populate the production table with data

function populateProductionTable(data) {
	if (!productionTableBody) return;

	productionTableBody.innerHTML = "";

	data.forEach((item) => {
		const row = document.createElement("tr");
		row.innerHTML = `
			<td>${item.year}</td>
			<td>${formatNumber(item.production)}</td>
			<td>${formatNumber(item.consumption)}</td>
			<td>${formatNumber(item.imports)}</td>
			<td>${formatCurrency(item.importCost)}</td>
			<td>${formatNumber(item.gap)}</td>
		`;
		productionTableBody.appendChild(row);
	});
}

/**
 * Initialize the production table
 */
function initProductionTable() {
	// Check for saved filter preference
	const savedFilter = window.TRGH.getFromLocalStorage("dataYearFilter");
	if (savedFilter && yearFilter) {
		yearFilter.value = savedFilter;
	}

	const filteredData = filterDataByYear(yearFilter ? yearFilter.value : "all");
	populateProductionTable(filteredData);
}

// ============================================
// Investment Calculator Functions
// ============================================



//Calculate investment potential
 
function calculateInvestmentPotential(investment, capacity, price) {
	// Calculate annual revenue
	const annualRevenue = capacity * price;

	// Calculate profit margin (estimated 25% for palm oil processing)
	const profitMargin = 0.25;
	const annualProfit = annualRevenue * profitMargin;

	// Calculate ROI (return on investment)
	const roi = (annualProfit / investment) * 100;

	// Calculate payback period in years
	const paybackPeriod = investment / annualProfit;

	// Calculate 5-year projected profit
	const fiveYearProfit = annualProfit * 5;

	return {
		annualRevenue,
		annualProfit,
		roi,
		paybackPeriod,
		fiveYearProfit,
	};
}


// Display calculator results

function displayCalculatorResults(results) {
	if (!calculatorResult) return;

	calculatorResult.style.display = "block";
	calculatorResult.innerHTML = `
		<h3>Investment Analysis Results</h3>
		<div class="grid-2">
			<div>
				<p><strong>Annual Revenue:</strong> ${formatCurrency(results.annualRevenue)}</p>
				<p><strong>Annual Profit:</strong> ${formatCurrency(results.annualProfit)}</p>
			</div>
			<div>
				<p><strong>ROI:</strong> ${results.roi.toFixed(2)}%</p>
				<p><strong>Payback Period:</strong> ${results.paybackPeriod.toFixed(2)} years</p>
			</div>
		</div>
		<p><strong>5-Year Projected Profit:</strong> ${formatCurrency(results.fiveYearProfit)}</p>
		<p style="margin-top: 1rem; font-size: 0.9rem; color: var(--color-text-secondary);">
			* These are estimates based on current market conditions. Actual results may vary.
		</p>
	`;

	// Save calculation to localStorage
	window.TRGH.saveFormData("investmentCalculator", {
		timestamp: new Date().toISOString(),
		results: results,
	});
}

// Handle investment calculator form submission
 
function handleCalculatorSubmit(event) {
	event.preventDefault();

	const investment = parseFloat(document.getElementById("investment-amount").value);
	const capacity = parseFloat(document.getElementById("production-capacity").value);
	const price = parseFloat(document.getElementById("market-price").value);

	// Validate inputs
	if (isNaN(investment) || investment < 100) {
		alert("Please enter a valid investment amount (minimum $100).");
		return;
	}

	if (isNaN(capacity) || capacity < 100) {
		alert("Please enter a valid production capacity (minimum 100 MT/year).");
		return;
	}

	if (isNaN(price) || price < 500) {
		alert("Please enter a valid market price (minimum $500/MT).");
		return;
	}

	// Calculate and display results
	const results = calculateInvestmentPotential(investment, capacity, price);
	displayCalculatorResults(results);
}

// ============================================
// Data Analysis Functions
// ============================================


// Calculate year-over-year growth rate

function calculateGrowthRate(currentYear, previousYear) {
	if (previousYear === 0) return 0;
	return ((currentYear - previousYear) / previousYear) * 100;
}

//Get production trend analysis
 
function getProductionTrendAnalysis() {
	const sortedData = [...productionData].sort((a, b) => a.year - b.year);
	const growthRates = [];

	for (let i = 1; i < sortedData.length; i++) {
		const rate = calculateGrowthRate(sortedData[i].production, sortedData[i - 1].production);
		growthRates.push({ year: sortedData[i].year, rate });
	}

	const avgGrowthRate = growthRates.reduce((sum, item) => sum + item.rate, 0) / growthRates.length;
	const isIncreasing = avgGrowthRate > 0;

	return {
		growthRates,
		avgGrowthRate,
		isIncreasing,
		trend: isIncreasing ? "Positive" : "Negative",
	};
}

//Get import dependency analysis

function getImportDependencyAnalysis() {
	const totalConsumption = productionData.reduce((sum, item) => sum + item.consumption, 0);
	const totalImports = productionData.reduce((sum, item) => sum + item.imports, 0);
	const dependencyRate = (totalImports / totalConsumption) * 100;

	return {
		totalConsumption,
		totalImports,
		dependencyRate,
		status: dependencyRate > 30 ? "High" : dependencyRate > 20 ? "Moderate" : "Low",
	};
}

// ============================================
// Event Listeners
// ============================================

/**
 * Initialize event listeners for data page
 */
function initDataPageEventListeners() {
	// Year filter change
	if (yearFilter) {
		yearFilter.addEventListener("change", () => {
			const selectedYear = yearFilter.value;
			const filteredData = filterDataByYear(selectedYear);
			populateProductionTable(filteredData);
			displayFilteredData(filteredData);
		});
	}

	// Investment calculator form submission
	if (investmentCalculator) {
		investmentCalculator.addEventListener("submit", handleCalculatorSubmit);
	}
}

// ============================================
// Initialization
// ============================================

/**
 * Initialize the data page
 */
function initDataPage() {
	// Initialize production table
	initProductionTable();

	// Initialize event listeners
	initDataPageEventListeners();

	// Log initialization
	console.log("Data page initialized successfully");
	console.log("Production trend analysis:", getProductionTrendAnalysis());
	console.log("Import dependency analysis:", getImportDependencyAnalysis());
}

// Run initialization when DOM is ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initDataPage);
} else {
	initDataPage();
}
