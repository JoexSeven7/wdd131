// Temple Album JavaScript

document.addEventListener('DOMContentLoaded', function () {
	// Initialize hamburger menu
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
		link.addEventListener('click', function () {
			hamburger.classList.remove('active');
			navMenu.classList.remove('active');
		});
	});

	// Update footer with current year and last modified date
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

	// Add smooth scrolling for navigation links
	navLinks.forEach((link) => {
		link.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			if (href === '#') {
				e.preventDefault();
				// Smooth scroll to top
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				});
			}
		});
	});

	// Ensure images are visible immediately
	const images = document.querySelectorAll('figure img');
	images.forEach((img) => {
		img.style.opacity = '1';
	});

	// Add keyboard navigation support
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && navMenu.classList.contains('active')) {
			hamburger.classList.remove('active');
			navMenu.classList.remove('active');
		}
	});

	// Add focus management for accessibility
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
