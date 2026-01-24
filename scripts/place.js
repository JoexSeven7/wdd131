document.addEventListener('DOMContentLoaded', () => {
	// Footer dates
	document.getElementById('currentyear').textContent = new Date().getFullYear();
	document.getElementById('lastModified').textContent = document.lastModified;

	// Wind Chill Calculation
	const temp = parseFloat(document.getElementById('temp').textContent);
	const wind = parseFloat(document.getElementById('wind').textContent);

	function calculateWindChill(temperature, windSpeed, units = 'C') {
		return units === 'C' 
			? (temperature <= 10 && windSpeed > 4.8) 
				? (13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16)).toFixed(1) 
				: null
			: (temperature <= 50 && windSpeed > 3) 
				? (35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16)).toFixed(1) 
				: null;
	}

	const windChill = calculateWindChill(temp, wind, 'C');
	document.getElementById('windchill').textContent = windChill ? `${windChill}°C` : 'N/A';
});
