function iniciar() {
    mostrar(); 
}

function agregar() {
    var tarea = document.getElementById('tarea').value;
    if (tarea.trim() !== '') {
        let clave = 'tarea_' + new Date().getTime(); 
        localStorage.setItem(clave, tarea);
        mostrar();
        document.getElementById('tarea').value = '';
    }
}

function mostrar() {
    var cajadatos = document.getElementById('tareaagregada');
    cajadatos.innerHTML = '';

    for (var f = 0; f < localStorage.length; f++) {
        var clave = localStorage.key(f);
        if (clave.startsWith('tarea_')) {
            var valor = localStorage.getItem(clave);

            // Crear contenedor para la tarea y el botón
            var div = document.createElement('div');
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';
            div.style.margin = '5px 0';

            // Texto de la tarea
            var texto = document.createElement('span');
            texto.textContent = valor;

            // Botón OK
            var boton = document.createElement('button');
            boton.textContent = 'OK';
            boton.onclick = (function(claveCopia) {
                return function() {
                    localStorage.removeItem(claveCopia);
                    mostrar();
                };
            })(clave);

            // Agregar texto y botón al div
            div.appendChild(texto);
            div.appendChild(boton);

            // Agregar div al contenedor principal
            cajadatos.appendChild(div);
        }
    }
}

window.addEventListener('load', iniciar, false);
