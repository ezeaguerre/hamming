(function() {
	window.addEventListener( 'load', function () {
		var texto = document.getElementById( "entrada" );
		var resultado = document.getElementById( "resultado" );
		var boton = document.getElementById( "calcular" );

		boton.addEventListener( 'click', calcularYMostrarCodigHamming );
		texto.addEventListener( 'keydown', function(ev) {
			if (
					ev.key.startsWith( "Arrow" ) ||
					ev.key === "Home" ||
					ev.key === "End" ||
					ev.key === "Backspace" ||
					ev.key === "Delete" 
				)
				return;

			if ( ev.key === "0" || ev.key === "1" )
				return;

			if ( ev.key === "Enter" )
				calcularYMostrarCodigHamming();

			ev.preventDefault();
		} );

		function esPotenciaDeDos(n) {
			return (n & (n - 1)) === 0;
		}

		function calcularYMostrarCodigHamming() {
			var textoEntrada = texto.value.trim();

			if ( !textoEntrada.match( /^[01]+$/ ) ) {
				alert( "Debe ingresar un número binario" );
				return;
			}

			var bits = textoEntrada.length;
			var textoSalida = [];
			var textoParidad = '';
			var tamanoPalabra = 0;
			var indiceEntrada = 1;
			var indice = 0;
			var bitsDeParidad = 0;

			// Agregar bits de paridad
			while ( indice < bits ) {
				if ( esPotenciaDeDos( indiceEntrada ) ) {
					textoSalida.push( 'P' );
					bitsDeParidad++;
				} else {
					textoSalida.push( textoEntrada[ indice ] );
					indice++;
				}

				indiceEntrada++;
			}

			// Calcular los bits de paridad
			for ( indice = 0; indice < textoSalida.length; indice++ ) {
				if ( textoSalida[indice] == 'P' ) {
					var nro = indice + 1;
					var paridad = 0;
					var j;

					for ( j = 0; j < textoSalida.length; j++ ) {
						if ( j != indice && ((j+1) & nro) !== 0 ) {
							if ( textoSalida[j] == '1' )
								paridad++;
						}
					}

					var bitParidad = paridad % 2 ? '1' : '0';
					textoSalida[indice] = '<span style="color: red">' + bitParidad + '</span>';
					textoParidad = textoParidad + bitParidad;
				}
			}

			resultado.innerHTML =
				'<li>Bits a transmitir: <span style="color: blue; font-weight: bold">' + textoSalida.join( "" ) + "</span></li>" +
				"<li>Cantidad total de bits: " + (bits + bitsDeParidad) + "</li>" +
				"<li>Cantidad de bits de datos: " + bits + "</li>" +
				"<li>Cantidad de bits de paridad: " + bitsDeParidad + "</li>" +
				"<li>Bits de paridad: " + textoParidad + "</li>";
		}
	} );
})();
