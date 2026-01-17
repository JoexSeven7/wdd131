document.addEventListener('DOMContentLoaded', function () {
	const yearSpan = document.getElementById('year');
	if (yearSpan) {
		yearSpan.textContent = new Date().getFullYear();
	}

	const lastModifiedSpan = document.getElementById('lastModified');
	if (lastModifiedSpan) {
		lastModifiedSpan.textContent = document.lastModified;
	}

	const hamburger = document.createElement('button');
	hamburger.textContent = '☰';
	hamburger.style.display = 'none';
	hamburger.style.background = 'none';
	hamburger.style.border = 'none';
	hamburger.style.fontSize = '1.5rem';
	hamburger.style.cursor = 'pointer';
	hamburger.style.color = 'white';

	const nav = document.querySelector('nav');
	if (nav) {
		nav.insertBefore(hamburger, nav.firstChild);

		hamburger.addEventListener('click', function () {
			const navList = nav.querySelector('ul');
			if (navList.style.display === 'none' || navList.style.display === '') {
				navList.style.display = 'flex';
				hamburger.textContent = 'X';
			} else {
				navList.style.display = 'none';
				hamburger.textContent = '☰';
			}
		});

		function checkScreenSize() {
			if (window.innerWidth < 768) {
				hamburger.style.display = 'block';
				nav.querySelector('ul').style.display = 'none';
			} else {
				hamburger.style.display = 'none';
				nav.querySelector('ul').style.display = 'flex';
			}
		}

		checkScreenSize();

		window.addEventListener('resize', checkScreenSize);
	}
});
