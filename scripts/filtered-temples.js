// Filtered Temple Album JavaScript

// Temple data array
const temples = [
	{
		templeName: 'Aba Nigeria',
		location: 'Aba, Nigeria',
		dedicated: '2005, August, 7',
		area: 11500,
		imageUrl:
			'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg',
	},
	{
		templeName: 'Manti Utah',
		location: 'Manti, Utah, United States',
		dedicated: '1888, May, 21',
		area: 74792,
		imageUrl:
			'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg',
	},
	{
		templeName: 'Payson Utah',
		location: 'Payson, Utah, United States',
		dedicated: '2015, June, 7',
		area: 96630,
		imageUrl:
			'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg',
	},
	{
		templeName: 'Yigo Guam',
		location: 'Yigo, Guam',
		dedicated: '2020, May, 2',
		area: 6861,
		imageUrl:
			'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg',
	},
	{
		templeName: 'Washington D.C.',
		location: 'Kensington, Maryland, United States',
		dedicated: '1974, November, 19',
		area: 156558,
		imageUrl:
			'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg',
	},
	{
		templeName: 'Lima Perú',
		location: 'Lima, Perú',
		dedicated: '1986, January, 10',
		area: 9600,
		imageUrl:
			'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg',
	},
	{
		templeName: 'Mexico City Mexico',
		location: 'Mexico City, Mexico',
		dedicated: '1983, December, 2',
		area: 116642,
		imageUrl:
			'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg',
	},
	{
		templeName: 'Bogotá Colombia',
		location: 'Carrera Bogotá, Distrito Capital Colombia',
		dedicated: '1999, April, 24',
		area: 53500,
		imageUrl:
			'https://churchofjesuschristtemples.org/assets/img/temples/bogota-colombia-temple/bogota-colombia-temple-7733-main.jpg',
	},
	{
		templeName: 'Tokyo Japan',
		location: 'Tokyo, Japan',
		dedicated: '1980, October, 27',
		area: 53000,
		imageUrl:
			'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tokyo-japan/400x250/tokyo-japan-temple-lds-86844-wallpaper.jpg',
	},
	{
		templeName: 'Sydney Australia',
		location: 'Sydney, Australia',
		dedicated: '1984, September, 20',
		area: 30657,
		imageUrl:
			'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sydney-australia/400x250/sydney-australia-temple-lds-1027920-wallpaper.jpg',
	},
	{
		templeName: 'Paris France',
		location: 'Paris, France',
		dedicated: '2017, May, 21',
		area: 32600,
		imageUrl:
			'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/paris-france/400x250/paris-france-temple-lds-1170067-wallpaper.jpg',
	},
	{
		templeName: 'Kiev Ukraine',
		location: 'Kiev, Ukraine',
		dedicated: '2010, August, 23',
		area: 25800,
		imageUrl:
			'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/kyiv-ukraine/400x250/kyiv-ukraine-temple-lds-1169863-wallpaper.jpg',
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
			this.style.outline = '2px solid #3498db';
			this.style.outlineOffset = '2px';
		});

		link.addEventListener('blur', function () {
			this.style.outline = 'none';
		});
	});
});
