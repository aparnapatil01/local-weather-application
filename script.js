'use strict';

(function() {
	function initializeCode() {
		const key = '1710750078137222e4ff7611428dffdb';
		const latLngUrl = 'http://ip-api.com/json';
		const tempFromLatLng = 'http://api.openweathermap.org/data/2.5/weather';

		function kelToCel(temperature) {
			return temperature - 273.15;
		}

		function generateIcon(des) {
			const status = des.toLowerCase();
			let icon;
			
			$('#weather-description .status').text(des);
			icon = 
				(status === 'thunderstom') ? 'thunderstom' :
				(status === 'dizzle') ? 'dizzle' :
				(status === 'clouds') ? 'clouds':
				(status === 'rain') ? 'rain' :
				(status === 'snow') ? 'snow' :
				'clear';
			$('#weather-description .icon').append(`<img src='images/${icon}-icon.png'>`);
		}

		/**
		 * latLngUrl to fetch lat, lng from IP address
		 * tempFromLatLng to fetch weather details from lat, lng
		*/
		$.when($.get(latLngUrl))
			.done((response) => {
		    $.get(tempFromLatLng, { "lat":response.lat, "lon":response.lon, appid:key }, (data) => {
		  		const city = data.name;
		  		const country = data.sys.country;
		    	const tempInKelvin = data.main.temp;
		    	const weatherStatus = data.weather[0].main;

		  		$('#weather-details > .location').text(city)
		  			.append(', ')
		  			.append(country);
		  		$('#weather-details .temp').text(Math.round(kelToCel(tempInKelvin)));
					generateIcon(weatherStatus);
			});
		});

		function toggleTemp() {
	 		let unit = $('#temp-unit').text();
	 		let temp = $('#weather-details .temp').text();

	 		if(unit === 'c') {
	 			const celToFar =  eval(Number(temp) *  9/5 + 32);
	 			$('#weather-details .temp').text(Math.round(celToFar));
	 			$('#temp-unit').text('f');
	 		}else {
	 			const farToCel =  eval((Number(temp) - 32) * 5/9);
	 			$('#weather-details .temp').text(Math.round(farToCel));
	 			$('#temp-unit').text('c');
	 		}
	 	}

		// FIXME: check why alternative click not working
	 	$(document).on('click', '#temp-unit', toggleTemp);
	} // end initializeCode

	$(document).ready(initializeCode());
})();