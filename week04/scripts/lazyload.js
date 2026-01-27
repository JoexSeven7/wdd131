document.addEventListener('DOMContentLoaded', () => {
	// Footer dates
	document.getElementById('currentyear').textContent = new Date().getFullYear();
	document.getElementById('lastModified').textContent = document.lastModified;
});
