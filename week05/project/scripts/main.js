/* ============================================
   The Red Gold Hub (TRGH) - Main JavaScript
   Nigeria's Palm Oil Industry Website
   ============================================ */

// ============================================
// DOM Elements Selection
// ============================================

const currentYearElement = document.getElementById("currentyear");
const lastModifiedElement = document.getElementById("lastModified");
const hamburger = document.querySelector(".hamburger");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");

// ============================================
// Utility Functions
// ============================================

//Get the current year

function getCurrentYear() {
	return new Date().getFullYear();
}

//Get the last modified date of the document

function getLastModifiedDate() {
	return document.lastModified;
}

/**
 * Update the footer with current year and last modified date
 */
function updateFooter() {
	if (currentYearElement) {
		currentYearElement.textContent = getCurrentYear();
	}
	if (lastModifiedElement) {
		lastModifiedElement.textContent = getLastModifiedDate();
	}
}

/**
 * Toggle mobile navigation menu
 */
function toggleMobileNav() {
	if (mainNav) {
		mainNav.classList.toggle("active");
	}
}

/**
 * Close mobile navigation menu
 */
function closeMobileNav() {
	if (mainNav) {
		mainNav.classList.remove("active");
	}
}

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
	const currentPage = window.location.pathname.split("/").pop() || "index.html";

	navLinks.forEach((link) => {
		const linkPage = link.getAttribute("href");
		if (linkPage === currentPage) {
			link.classList.add("active");
			link.setAttribute("aria-current", "page");
		} else {
			link.classList.remove("active");
			link.removeAttribute("aria-current");
		}
	});
}

// ============================================
// localStorage Functions
// ============================================


// Save data to localStorage
 
function saveToLocalStorage(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.error(`Error saving to localStorage: ${error.message}`);
	}
}

//  Retrieve data from localStorage

function getFromLocalStorage(key) {
	try {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	} catch (error) {
		console.error(`Error retrieving from localStorage: ${error.message}`);
		return null;
	}
}


//  Remove data from localStorage
 
function removeFromLocalStorage(key) {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.error(`Error removing from localStorage: ${error.message}`);
	}
}

/**
 * Clear all data from localStorage for this site
 */
function clearLocalStorage() {
	try {
		localStorage.clear();
	} catch (error) {
		console.error(`Error clearing localStorage: ${error.message}`);
	}
}

// ============================================
// Page Visit Counter (using localStorage)
// ============================================


//Increment and return page visit count

function incrementPageVisitCount() {
	const visitCount = getFromLocalStorage("pageVisitCount") || 0;
	const newCount = visitCount + 1;
	saveToLocalStorage("pageVisitCount", newCount);
	return newCount;
}

// Get the page visit count

function getPageVisitCount() {
	return getFromLocalStorage("pageVisitCount") || 0;
}

/**
 * Display page visit count in console (for demonstration)
 */
function displayVisitCount() {
	const count = incrementPageVisitCount();
	console.log(`Page visit count: ${count}`);
}

// ============================================
// Theme Preference (using localStorage)
// ============================================


// Save theme preference

function saveThemePreference(theme) {
	saveToLocalStorage("themePreference", theme);
}

//Get theme preference

function getThemePreference() {
	return getFromLocalStorage("themePreference") || "light";
}

// ============================================
// Form Data Storage (using localStorage)
// ============================================


//Save form data to localStorage

function saveFormData(formName, formData) {
	const existingData = getFromLocalStorage("formData") || {};
	existingData[formName] = {
		data: formData,
		timestamp: new Date().toISOString(),
	};
	saveToLocalStorage("formData", existingData);
}


//Retrieve form data from localStorage
 
function getFormData(formName) {
	const allFormData = getFromLocalStorage("formData");
	if (allFormData && allFormData[formName]) {
		return allFormData[formName].data;
	}
	return null;
}

// ============================================
// Data Objects and Arrays
// ============================================

/**
 * Nigeria Palm Oil Industry Data Object
 */
const nigeriaPalmOilData = {
	production: {
		annual: 1200000,
		primaryStates: ["Akwa Ibom", "Rivers", "Delta", "Edo", "Bayelsa"],
		sectors: {
			smallholder: 70,
			medium: 20,
			large: 10,
		},
	},
	consumption: {
		annual: 1700000,
		growthRate: 0.05,
	},
	imports: {
		annual: 500000,
		cost: 6000000000,
		sources: {
			malaysia: 60,
			indonesia: 30,
			others: 10,
		},
	},
	historical: {
		peakYear: 1965,
		peakProduction: 1800000,
		globalShare: 43,
	},
};

/**
 * Production data array by year
 */
const productionDataArray = [
	{ year: 2018, production: 1050000, consumption: 1450000, imports: 400000, importCost: 4500000000, gap: 400000 },
	{ year: 2019, production: 1100000, consumption: 1500000, imports: 400000, importCost: 4800000000, gap: 400000 },
	{ year: 2020, production: 1080000, consumption: 1550000, imports: 470000, importCost: 5200000000, gap: 470000 },
	{ year: 2021, production: 1150000, consumption: 1600000, imports: 450000, importCost: 5500000000, gap: 450000 },
	{ year: 2022, production: 1180000, consumption: 1650000, imports: 470000, importCost: 5800000000, gap: 470000 },
	{ year: 2023, production: 1200000, consumption: 1700000, imports: 500000, importCost: 6000000000, gap: 500000 },
];

/**
 * Technology categories array
 */
const technologyCategories = [
	{
		id: "processing",
		name: "Processing",
		technologies: [
			{ name: "Automated Processing Mills", benefit: "Higher extraction rates" },
			{ name: "Mechanical Sterilization", benefit: "Reduced energy consumption" },
			{ name: "Quality Control Systems", benefit: "Consistent product quality" },
			{ name: "Waste-to-Energy Systems", benefit: "Zero waste operations" },
		],
	},
	{
		id: "farming",
		name: "Farming",
		technologies: [
			{ name: "High-Yield Seedlings", benefit: "10x more oil per hectare" },
			{ name: "Precision Irrigation", benefit: "60% less water usage" },
			{ name: "Mechanized Harvesting", benefit: "Reduced labor costs" },
			{ name: "Soil Monitoring Systems", benefit: "Real-time data" },
		],
	},
	{
		id: "digital",
		name: "Digital",
		technologies: [
			{ name: "Mobile Farm Management Apps", benefit: "Better farm management" },
			{ name: "E-Commerce Platforms", benefit: "Direct market access" },
			{ name: "Data Analytics", benefit: "Optimized production" },
			{ name: "Blockchain Traceability", benefit: "Supply chain transparency" },
		],
	},
	{
		id: "sustainability",
		name: "Sustainability",
		technologies: [
			{ name: "Zero-Waste Processing", benefit: "Circular economy" },
			{ name: "Agroforestry Systems", benefit: "Biodiversity conservation" },
			{ name: "Renewable Energy Integration", benefit: "Lower carbon footprint" },
			{ name: "Certification Systems", benefit: "Premium market access" },
		],
	},
];

// ============================================
// Array Methods Demonstrations
// ============================================

// Filter production data by year range

function filterProductionByYear(startYear, endYear) {
	return productionDataArray.filter((data) => data.year >= startYear && data.year <= endYear);
}

//Get total production across all years

function getTotalProduction() {
	return productionDataArray.reduce((total, data) => total + data.production, 0);
}

//Get average import cost

function getAverageImportCost() {
	const totalCost = productionDataArray.reduce((total, data) => total + data.importCost, 0);
	return totalCost / productionDataArray.length;
}

//Find production data for a specific year
 
function findProductionByYear(year) {
	return productionDataArray.find((data) => data.year === year) || null;
}

//Get all years from production data
 
function getAllYears() {
	return productionDataArray.map((data) => data.year);
}

//Check if any year has production above threshold
 
function hasProductionAboveThreshold(threshold) {
	return productionDataArray.some((data) => data.production > threshold);
}

//Check if all years have positive production
 
function allYearsHavePositiveProduction() {
	return productionDataArray.every((data) => data.production > 0);
}


// Sort production data by year (descending)
 
function sortProductionByYearDesc() {
	return [...productionDataArray].sort((a, b) => b.year - a.year);
}

// ============================================
// Template Literals Usage
// ============================================


//Generate production summary string

function generateProductionSummary(data) {
	return `In ${data.year}, Nigeria produced ${formatNumber(data.production)} metric tons of palm oil, 
	consumed ${formatNumber(data.consumption)} metric tons, and imported ${formatNumber(data.imports)} metric tons 
	at a cost of $${formatNumber(data.importCost)}. The supply gap was ${formatNumber(data.gap)} metric tons.`;
}


//Format large numbers with commas

function formatNumber(num) {
	return num.toLocaleString();
}

//Generate technology category HTML
 
function generateTechnologyCategoryHTML(category) {
	const technologiesHTML = category.technologies
		.map(
			(tech) => `
			<div class="card">
				<h3>${tech.name}</h3>
				<p>${tech.benefit}</p>
			</div>
		`
		)
		.join("");

	return `
		<div class="technology-category">
			<h2>${category.name}</h2>
			<div class="grid-2">
				${technologiesHTML}
			</div>
		</div>
	`;
}

// ============================================
// Conditional Branching Examples
// ============================================


// Get production status message

function getProductionStatus(production) {
	if (production >= 1500000) {
		return "Excellent - Meeting domestic demand";
	} else if (production >= 1200000) {
		return "Good - Close to meeting demand";
	} else if (production >= 1000000) {
		return "Moderate - Significant import dependency";
	} else if (production >= 500000) {
		return "Low - High import dependency";
	} else {
		return "Critical - Severe import dependency";
	}
}


//Get investment recommendation

function getInvestmentRecommendation(budget) {
	if (budget >= 10000000) {
		return "Consider investing in large-scale processing mills (30-60 tons/hour capacity)";
	} else if (budget >= 5000000) {
		return "Consider investing in medium-scale processing mills (10-30 tons/hour capacity)";
	} else if (budget >= 1000000) {
		return "Consider investing in small-scale processing mills (5-10 tons/hour capacity)";
	} else if (budget >= 100000) {
		return "Consider investing in seedling nurseries or farm management technology";
	} else {
		return "Consider partnering with existing investors or starting with smallholder farmer support";
	}
}

//Validate email format
 
function validateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}


//Validate phone number (Nigeria format)

function validatePhone(phone) {
	const phoneRegex = /^(\+234|0)?[789]\d{9}$/;
	return phoneRegex.test(phone.replace(/\s/g, ""));
}

// ============================================
// Event Listeners
// ============================================

/**
 * Initialize event listeners
 */
function initEventListeners() {
	// Hamburger menu toggle
	if (hamburger) {
		hamburger.addEventListener("click", toggleMobileNav);
		hamburger.addEventListener("keydown", (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				toggleMobileNav();
			}
		});
	}

	// Close mobile nav when clicking on a link
	navLinks.forEach((link) => {
		link.addEventListener("click", closeMobileNav);
	});

	// Close mobile nav when clicking outside
	document.addEventListener("click", (event) => {
		if (mainNav && mainNav.classList.contains("active")) {
			if (!mainNav.contains(event.target) && !hamburger.contains(event.target)) {
				closeMobileNav();
			}
		}
	});

	// Handle page visibility change for analytics
	document.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "visible") {
			displayVisitCount();
		}
	});
}

// ============================================
// Initialization
// ============================================

/**
 * Initialize the application
 */
function init() {
	// Update footer
	updateFooter();

	// Set active navigation link
	setActiveNavLink();

	// Initialize event listeners
	initEventListeners();

	// Display visit count
	displayVisitCount();

	// Update industry update dates
	updateIndustryUpdateDates();

	// Log initialization
	console.log("The Red Gold Hub initialized successfully");
	console.log(`Current page: ${window.location.pathname}`);
	console.log(`Theme preference: ${getThemePreference()}`);
}

/**
 * Update industry update dates on home page
 */
function updateIndustryUpdateDates() {
	const updateDate1 = document.getElementById("update-date-1");
	const updateDate2 = document.getElementById("update-date-2");

	if (updateDate1) {
		updateDate1.textContent = "January 2024";
	}
	if (updateDate2) {
		updateDate2.textContent = "February 2024";
	}
}

// Run initialization when DOM is ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}

// ============================================
// Export functions for use in other scripts
// ============================================

// Make functions available globally for other scripts
window.TRGH = {
	// localStorage functions
	saveToLocalStorage,
	getFromLocalStorage,
	removeFromLocalStorage,
	clearLocalStorage,
	saveFormData,
	getFormData,
	saveThemePreference,
	getThemePreference,

	// Data objects
	nigeriaPalmOilData,
	productionDataArray,
	technologyCategories,

	// Array methods
	filterProductionByYear,
	getTotalProduction,
	getAverageImportCost,
	findProductionByYear,
	getAllYears,
	hasProductionAboveThreshold,
	allYearsHavePositiveProduction,
	sortProductionByYearDesc,

	// Utility functions
	formatNumber,
	generateProductionSummary,
	generateTechnologyCategoryHTML,
	getProductionStatus,
	getInvestmentRecommendation,
	validateEmail,
	validatePhone,

	// Navigation functions
	toggleMobileNav,
	closeMobileNav,
};
