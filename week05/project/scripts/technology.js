/* ============================================
   The Red Gold Hub (TRGH) - Technology Page JavaScript
   Nigeria's Palm Oil Industry Website
   ============================================ */

// ============================================
// DOM Elements Selection
// ============================================

const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");

// ============================================
// Tab Management Functions
// ============================================

/**
 * Switch to a specific tab
 * @param {string} tabId - The ID of the tab to switch to
 */
function switchTab(tabId) {
	// Remove active class from all buttons
	tabButtons.forEach((button) => {
		button.classList.remove("active");
		button.setAttribute("aria-selected", "false");
	});

	// Hide all panels
	tabPanels.forEach((panel) => {
		panel.style.display = "none";
		panel.classList.remove("active");
	});

	// Activate selected button
	const activeButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
	if (activeButton) {
		activeButton.classList.add("active");
		activeButton.setAttribute("aria-selected", "true");
	}

	// Show selected panel
	const activePanel = document.getElementById(`${tabId}-panel`);
	if (activePanel) {
		activePanel.style.display = "block";
		activePanel.classList.add("active");
	}

	// Save tab preference to localStorage
	window.TRGH.saveToLocalStorage("technologyTab", tabId);
}

/**
 * Initialize tabs with saved preference
 */
function initTabs() {
	// Check for saved tab preference
	const savedTab = window.TRGH.getFromLocalStorage("technologyTab");
	if (savedTab) {
		switchTab(savedTab);
	} else {
		// Default to first tab
		switchTab("processing");
	}
}

// ============================================
// Technology Data Objects
// ============================================

/**
 * Technology categories with detailed information
 */
const technologyData = {
	processing: {
		name: "Processing",
		icon: "🏭",
		technologies: [
			{
				name: "Automated Processing Mills",
				description: "Modern processing mills use automated systems to increase efficiency and reduce waste.",
				benefits: ["Higher oil extraction rates", "Reduced labor costs", "Consistent product quality", "Lower environmental impact"],
				capacity: "60 tons/hour",
				extractionRate: "23-25%",
			},
			{
				name: "Mechanical Sterilization",
				description: "Advanced sterilization technology uses continuous mechanical systems instead of traditional batch processing.",
				benefits: ["Continuous operation", "Reduced steam consumption", "Better fruit softening", "Improved oil recovery"],
				energySavings: "40%",
			},
			{
				name: "Quality Control Systems",
				description: "Automated quality control systems use sensors and AI to monitor oil quality in real-time.",
				benefits: ["Real-time FFA monitoring", "Moisture content analysis", "Color measurement", "Automated rejection systems"],
			},
			{
				name: "Waste-to-Energy Systems",
				description: "Modern mills convert waste products into energy, using empty fruit bunches and palm kernel shells as biomass fuel.",
				benefits: ["Reduced energy costs", "Lower carbon footprint", "Additional revenue streams", "Zero waste operations"],
			},
		],
	},
	farming: {
		name: "Farming",
		icon: "🌱",
		technologies: [
			{
				name: "High-Yield Seedlings",
				description: "Tenera hybrid seedlings produce up to 10 times more oil than traditional varieties.",
				benefits: ["Thin shell, thick mesocarp", "Early maturity (3-4 years)", "Disease resistance", "Adaptability to local conditions"],
				yield: "30 tons/hectare/year",
			},
			{
				name: "Precision Irrigation",
				description: "Drip irrigation systems deliver water and nutrients directly to plant roots.",
				benefits: ["Water conservation", "Fertilizer efficiency", "Reduced labor requirements", "Improved crop uniformity"],
				waterSavings: "60%",
				yieldIncrease: "30-50%",
			},
			{
				name: "Mechanized Harvesting",
				description: "Modern harvesting equipment reduces labor dependency and increases efficiency.",
				benefits: ["Reduced labor costs", "Faster harvesting cycles", "Reduced fruit damage", "Improved safety"],
				capacity: "5 hectares/day",
			},
			{
				name: "Soil Monitoring Systems",
				description: "IoT sensors monitor soil moisture, pH, and nutrient levels in real-time.",
				benefits: ["Real-time monitoring", "Predictive analytics", "Mobile app integration", "Automated alerts"],
			},
		],
	},
	digital: {
		name: "Digital",
		icon: "💻",
		technologies: [
			{
				name: "Mobile Farm Management Apps",
				description: "Smartphone applications help farmers manage their operations and access market prices.",
				benefits: ["Crop tracking", "Market price updates", "Weather forecasts", "Expert consultation"],
			},
			{
				name: "E-Commerce Platforms",
				description: "Digital marketplaces connect farmers directly with buyers, eliminating middlemen.",
				benefits: ["Better price discovery", "Reduced transaction costs", "Market access", "Transparent pricing"],
			},
			{
				name: "Data Analytics",
				description: "Big data analytics help optimize production, predict yields, and identify market trends.",
				benefits: ["Yield prediction", "Market analysis", "Supply chain optimization", "Risk assessment"],
			},
			{
				name: "Blockchain Traceability",
				description: "Blockchain technology ensures product authenticity and enables premium pricing.",
				benefits: ["Supply chain transparency", "Quality verification", "Premium market access", "Consumer trust"],
			},
		],
	},
	sustainability: {
		name: "Sustainability",
		icon: "♻️",
		technologies: [
			{
				name: "Zero-Waste Processing",
				description: "Circular economy approaches convert all by-products into valuable resources.",
				benefits: ["Empty fruit bunches → Biomass fuel", "Palm kernel shells → Activated carbon", "POME → Biogas", "Fiber → Animal feed"],
			},
			{
				name: "Agroforestry Systems",
				description: "Integrating palm oil with other crops and trees creates diverse, resilient ecosystems.",
				benefits: ["Biodiversity conservation", "Soil improvement", "Additional income streams", "Climate resilience"],
			},
			{
				name: "Renewable Energy Integration",
				description: "Solar and biomass energy systems power operations, reducing dependence on fossil fuels.",
				benefits: ["Solar-powered processing", "Biomass boilers", "Energy storage systems", "Grid independence"],
			},
			{
				name: "Certification Systems",
				description: "RSPO and other certification standards ensure sustainable production practices.",
				benefits: ["Market differentiation", "Premium pricing", "International market access", "Environmental compliance"],
			},
		],
	},
};

// ============================================
// Technology Display Functions
// ============================================

/**
 * Generate technology card HTML
 * @param {Object} tech - Technology object
 * @returns {string} HTML string
 */
function generateTechnologyCard(tech) {
	const benefitsList = tech.benefits
		.map((benefit) => `<li>${benefit}</li>`)
		.join("");

	return `
		<div class="card">
			<h3>${tech.name}</h3>
			<p>${tech.description}</p>
			<p><strong>Benefits:</strong></p>
			<ul>
				${benefitsList}
			</ul>
		</div>
	`;
}

/**
 * Display technologies for a category
 * @param {string} categoryId - Category ID
 */
function displayTechnologies(categoryId) {
	const category = technologyData[categoryId];
	if (!category) return;

	const technologiesHTML = category.technologies
		.map((tech) => generateTechnologyCard(tech))
		.join("");

	const panel = document.getElementById(`${categoryId}-panel`);
	if (panel) {
		const gridContainer = panel.querySelector(".grid-2");
		if (gridContainer) {
			gridContainer.innerHTML = technologiesHTML;
		}
	}
}

/**
 * Display all technologies
 */
function displayAllTechnologies() {
	Object.keys(technologyData).forEach((categoryId) => {
		displayTechnologies(categoryId);
	});
}

// ============================================
// Technology Comparison Functions
// ============================================

/**
 * Get technology comparison data
 * @returns {Array} Comparison data array
 */
function getTechnologyComparison() {
	return [
		{
			aspect: "Oil Extraction Rate",
			traditional: "15-18%",
			modern: "23-25%",
			improvement: "+40%",
		},
		{
			aspect: "Processing Time",
			traditional: "48-72 hours",
			modern: "2-4 hours",
			improvement: "-95%",
		},
		{
			aspect: "Labor Requirement",
			traditional: "High",
			modern: "Low",
			improvement: "-70%",
		},
		{
			aspect: "Energy Efficiency",
			traditional: "Low",
			modern: "High",
			improvement: "+60%",
		},
		{
			aspect: "Product Quality",
			traditional: "Variable",
			modern: "Consistent",
			improvement: "+50%",
		},
		{
			aspect: "Waste Generation",
			traditional: "High",
			modern: "Minimal",
			improvement: "-80%",
		},
	];
}

/**
 * Display technology comparison table
 */
function displayTechnologyComparison() {
	const comparisonData = getTechnologyComparison();
	const tableBody = document.querySelector(".data-table tbody");

	if (!tableBody) return;

	tableBody.innerHTML = comparisonData
		.map(
			(row) => `
			<tr>
				<td>${row.aspect}</td>
				<td>${row.traditional}</td>
				<td>${row.modern}</td>
				<td><strong>${row.improvement}</strong></td>
			</tr>
		`
		)
		.join("");
}

// ============================================
// Investment Opportunity Functions
// ============================================

/**
 * Get investment opportunities data
 * @returns {Array} Investment opportunities array
 */
function getInvestmentOpportunities() {
	return [
		{
			category: "Processing Infrastructure",
			icon: "🏗️",
			description: "Invest in modern processing mills with capacity ranging from 5 to 60 tons per hour.",
			roi: "25-35%",
			timeframe: "5 years",
		},
		{
			category: "Seedling Nurseries",
			icon: "🌱",
			description: "Establish high-yield seedling production facilities. Demand exceeds supply by 40%.",
			roi: "30-40%",
			timeframe: "4 years",
		},
		{
			category: "Digital Platforms",
			icon: "💻",
			description: "Develop farm management apps and e-commerce platforms. Market growing at 25% annually.",
			roi: "40-50%",
			timeframe: "3 years",
		},
	];
}

/**
 * Display investment opportunities
 */
function displayInvestmentOpportunities() {
	const opportunities = getInvestmentOpportunities();
	const cards = document.querySelectorAll(".grid-3 .card");

	if (cards.length < 3) return;

	opportunities.forEach((opp, index) => {
		if (cards[index]) {
			cards[index].innerHTML = `
				<h3>${opp.icon} ${opp.category}</h3>
				<p>${opp.description}</p>
				<p><strong>Expected ROI:</strong> ${opp.roi} over ${opp.timeframe}</p>
			`;
		}
	});
}

// ============================================
// Event Listeners
// ============================================

/**
 * Initialize event listeners for technology page
 */
function initTechnologyPageEventListeners() {
	// Tab button clicks
	tabButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const tabId = button.getAttribute("data-tab");
			switchTab(tabId);
		});

		// Keyboard navigation
		button.addEventListener("keydown", (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				const tabId = button.getAttribute("data-tab");
				switchTab(tabId);
			}
		});
	});
}

// ============================================
// Initialization
// ============================================

/**
 * Initialize the technology page
 */
function initTechnologyPage() {
	// Initialize tabs
	initTabs();

	// Initialize event listeners
	initTechnologyPageEventListeners();

	// Display all technologies
	displayAllTechnologies();

	// Display comparison table
	displayTechnologyComparison();

	// Display investment opportunities
	displayInvestmentOpportunities();

	// Log initialization
	console.log("Technology page initialized successfully");
	console.log("Available technology categories:", Object.keys(technologyData));
}

// Run initialization when DOM is ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initTechnologyPage);
} else {
	initTechnologyPage();
}
