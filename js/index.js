window.addEventListener('DOMContentLoaded',event =>{
    document.getElementById('btnEnviar').addEventListener('click',btnEnviar);
    
})

/**
 * Se ejecuta al hacer click en el boton enviar
 */
function btnEnviar(){
    let nombre = document.querySelector('#inputNombre');
    let cedula = document.querySelector('#inputCedula');
    let email = document.querySelector('#inputEmail');
    let telefono = document.querySelector('#inputTelefono');
    let operacion = document.querySelector('#inputOperacion');

    let validacion = validar(nombre.value, cedula.value, telefono.value, email.value, operacion.value);

    if(validacion.nombre && validacion.cedula && validacion.telefono && validacion.email){
        // hacer peticion fetch post a http://api.mathjs.org/v4/ con el body { "expr": "2+3" }
        fetch('http://api.mathjs.org/v4/',{
            method: 'POST',
            body: JSON.stringify({ "expr": operacion.value }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(result => mostrarResultado(result))
        .catch(error => console.log('error', error));

    }else{
        if(!validacion.nombre){
            nombre.classList.add('is-invalid');
        }
        if(!validacion.cedula){
            cedula.classList.add('is-invalid');
        }
        if(!validacion.telefono){
            telefono.classList.add('is-invalid');
        }
        if(!validacion.email){
            email.classList.add('is-invalid');
        }
    }


}

/**
 * Valida que los campos no esten vacios y que sean correctos
 * @param {*} nombre 
 * @param {*} cedula 
 * @param {*} telefono 
 * @param {*} email 
 * @param {*} operacion 
 * @returns 
 */
function validar(nombre, cedula, telefono, email, operacion) {
    if(nombre == '' || cedula == '' || email == '' || telefono == '' || operacion == ''){
        alert('Todos los campos son obligatorios');
        return;
    }

    let nombreValido = validarNombre(nombre);
    let cedulaValida = cedula > 1000000000;
    let telefonoValido = telefono.length == 10 && telefono[0] == 3;
    let emailValido = validarEmail(email);

    return {
        nombre: nombreValido,
        cedula: cedulaValida,
        telefono: telefonoValido,
        email: emailValido
    }

    
}

/**
 * 
 * @param {String} email 
 * @returns {Boolean} Si el email es valido o no
 */
function validarEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * 
 * @param {String} nombreC 
 * @returns {Boolean} Si el nombre es valido o no
 */
function validarNombre(nombreC) {
    let nombre = nombreC.split(" ");
    let valido;

    if (nombre.length >= 3) {
        valido = true;
    } else {
        valido = false;
    }

    nombre.forEach(palabra => {
        if (palabra[0] != palabra[0].toUpperCase()) {
            valido = false;
            return;
            
        }
    });

    return valido;
}

/**
 * Muestra el resultado de la operacion en el html
 * @param {*} resultado 
 */
function mostrarResultado(resultado){
    if(resultado != null){
        document.querySelector('#resultado').innerHTML = resultado.result;
    }
}