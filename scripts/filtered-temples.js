// Filtered Temple Album JavaScript

// Temple data array
const temples = [
	{
		templeName: 'Aba Nigeria',
		location: 'Aba, Nigeria',
		dedicated: '2005, August, 7',
		area: 11500,
		imageUrl: 'images/aba.jpg',
	},
	{
		templeName: 'Manti Utah',
		location: 'Manti, Utah, United States',
		dedicated: '1888, May, 21',
		area: 74792,
		imageUrl: 'images/manti.jpg',
	},
	{
		templeName: 'Payson Utah',
		location: 'Payson, Utah, United States',
		dedicated: '2015, June, 7',
		area: 96630,
		imageUrl: 'images/payson.jpg',
	},
	{
		templeName: 'Yigo Guam',
		location: 'Yigo, Guam',
		dedicated: '2020, May, 2',
		area: 6861,
		imageUrl: 'images/yigo.jpg',
	},
	{
		templeName: 'Washington D.C.',
		location: 'Kensington, Maryland, United States',
		dedicated: '1974, November, 19',
		area: 156558,
		imageUrl: 'images/washington.jpg',
	},
	{
		templeName: 'Lima Perú',
		location: 'Lima, Perú',
		dedicated: '1986, January, 10',
		area: 9600,
		imageUrl: 'images/lima-peru.jpg',
	},
	{
		templeName: 'Mexico City Mexico',
		location: 'Mexico City, Mexico',
		dedicated: '1983, December, 2',
		area: 116642,
		imageUrl: 'images/albuquerque.jpg',
	},
	{
		templeName: 'Bogotá Colombia',
		location: 'Carrera Bogotá, Distrito Capital Colombia',
		dedicated: '1999, April, 24',
		area: 53500,
		imageUrl: 'images/bogota.jpg',
	},
	{
		templeName: 'Tokyo Japan',
		location: 'Tokyo, Japan',
		dedicated: '1980, October, 27',
		area: 53000,
		imageUrl: 'images/tokyo.jpg',
	},
	{
		templeName: 'Sydney Australia',
		location: 'Sydney, Australia',
		dedicated: '1984, September, 20',
		area: 30657,
		imageUrl: 'images/sydney.jpg',
	},
	{
		templeName: 'Paris France',
		location: 'Paris, France',
		dedicated: '2017, May, 21',
		area: 32600,
		imageUrl: 'images/paris.jpg',
	},
	{
		templeName: 'Barcelona Spain',
		location: 'Barcelona, Spain',
		dedicated: '2010, August, 23',
		area: 25800,
		imageUrl: 'images/barcelona.jpg',
	},
];

document.addEventListener('DOMContentLoaded', function () {
	// Initialize the page
	init();

	function init() {
		// Set up hamburger menu
		initHamburgerMenu();

		// Set up navigation filter links
		initFilterLinks();

		// Display all temples by default
		displayTemples(temples);

		// Update footer with current year and last modified date
		updateFooterDates();
	}

	// Initialize hamburger menu
	function initHamburgerMenu() {
		const hamburger = document.querySelector('.hamburger');
		const navMenu = document.querySelector('nav ul');

		if (hamburger && navMenu) {
			hamburger.addEventListener('click', function () {
				hamburger.classList.toggle('active');
				navMenu.classList.toggle('active');
			});
		}

		// Close mobile menu when clicking on a link
		const navLinks = document.querySelectorAll('nav ul li a');
		navLinks.forEach((link) => {
			link.addEventListener('click', function (e) {
				e.preventDefault();
				hamburger.classList.remove('active');
				navMenu.classList.remove('active');
			});
		});
	}

	// Initialize filter links
	function initFilterLinks() {
		const filterLinks = document.querySelectorAll('nav a[data-filter]');

		filterLinks.forEach((link) => {
			link.addEventListener('click', function (e) {
				e.preventDefault();

				// Remove active class from all links
				filterLinks.forEach((l) => l.classList.remove('active'));

				// Add active class to clicked link
				this.classList.add('active');

				// Get filter value and filter temples
				const filter = this.getAttribute('data-filter');
				filterTemples(filter);
			});
		});

		// Set Home as active by default
		document.querySelector('nav a[data-filter="home"]').classList.add('active');
	}

	// Filter temples based on criteria
	function filterTemples(filter) {
		let filteredTemples;

		switch (filter) {
			case 'old':
				// Temples built before 1900
				filteredTemples = temples.filter((temple) => {
					const year = parseInt(temple.dedicated.split(',')[0]);
					return year < 1900;
				});
				break;
			case 'new':
				// Temples built after 2000
				filteredTemples = temples.filter((temple) => {
					const year = parseInt(temple.dedicated.split(',')[0]);
					return year > 2000;
				});
				break;
			case 'large':
				// Temples larger than 90,000 square feet
				filteredTemples = temples.filter((temple) => temple.area > 90000);
				break;
			case 'small':
				// Temples smaller than 10,000 square feet
				filteredTemples = temples.filter((temple) => temple.area < 10000);
				break;
			case 'home':
			default:
				// Show all temples
				filteredTemples = temples;
				break;
		}

		displayTemples(filteredTemples);
	}

	// Display temples in the grid
	function displayTemples(templesToDisplay) {
		const templeGrid = document.getElementById('temple-grid');

		// Clear existing content
		templeGrid.innerHTML = '';

		if (templesToDisplay.length === 0) {
			templeGrid.innerHTML = '<div class="no-results">No temples found matching this criteria.</div>';
			return;
		}

		// Create temple cards
		templesToDisplay.forEach((temple) => {
			const card = document.createElement('div');
			card.className = 'temple-card';

			card.innerHTML = `
                <img src="${temple.imageUrl}" 
                     alt="${temple.templeName}" 
                     loading="lazy" 
                     width="400" 
                     height="250">
                <div class="temple-info">
                    <h3>${temple.templeName}</h3>
                    <p class="location">📍 ${temple.location}</p>
                    <p class="dedicated">📅 Dedicated: ${temple.dedicated}</p>
                    <p class="area">📐 Area: ${temple.area.toLocaleString()} sq ft</p>
                </div>
            `;

			templeGrid.appendChild(card);
		});
	}

	// Update footer with dates
	function updateFooterDates() {
		const yearElement = document.getElementById('year');
		const lastModifiedElement = document.getElementById('lastModified');

		if (yearElement) {
			const currentYear = new Date().getFullYear();
			yearElement.textContent = currentYear;
		}

		if (lastModifiedElement) {
			const lastModified = new Date(document.lastModified);
			const options = {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				timeZoneName: 'short',
			};
			lastModifiedElement.textContent = lastModified.toLocaleDateString('en-US', options);
		}
	}

	// Add keyboard navigation support
	document.addEventListener('keydown', function (e) {
		const navMenu = document.querySelector('nav ul');
		const hamburger = document.querySelector('.hamburger');

		if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
			hamburger.classList.remove('active');
			navMenu.classList.remove('active');
		}
	});

	// Add focus management for accessibility
	const navLinks = document.querySelectorAll('nav ul li a');
	navLinks.forEach((link) => {
		link.addEventListener('focus', function () {
			this.style.outline = ' #16222a';
			this.style.outlineOffset = '1px';
		});

		link.addEventListener('blur', function () {
			this.style.outline = 'none';
		});
	});
});
