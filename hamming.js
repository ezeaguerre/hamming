(function() {
	window.addEventListener( 'load', function () {
		var texto = document.getElementById( "entrada" );
		var resultado = document.getElementById( "resultado" );
		var boton = document.getElementById( "calcular" );

		boon.addEventListener( 'click', calcularYMostrarCodigHamming );
		texto.addEventListener( 'keydown', function(ev) {
			if ( ev.keyCode === 13 )
				calcularYMostrarCodigHamming();
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
			var tamanoPalabra = 0;
			var indiceEntrada = 1;
			var indice = 0;

			// Agregar bits de paridad
			while ( indice < bits ) {
				if ( esPotenciaDeDos( indiceEntrada ) ) {
					textoSalida.push( 'P' );
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

					textoSalida[indice] = paridad % 2 ? '1' : '0';
				}
			}

			resultado.innerHTML = textoSalida.join( "" );
		}
	} );
})();
