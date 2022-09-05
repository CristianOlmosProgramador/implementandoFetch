

// Variables Globales


const dni = document.querySelector("#dni");
const nombre = document.querySelector("#nombre");
const promedio = document.querySelector("#promedio");
const estado = document.querySelector("#estado");
const selectAsignaturas = document.querySelector("#asignaturas");
const nombreEncargado = document.querySelector("#from_name");

const btnEnviarMail = document.getElementById('button');

const arrParaMail = [];

// dejo el boton enviar email bloqueado. 

const btnEmail = document.querySelector("#enviarMail");
const btnPromedioFinal = document.querySelector("#promedio1");
const btnLimpiar = document.querySelector("#clear");

btnEnviarMail.disabled = true;
btnPromedioFinal.disabled = true;


document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();


   btnEnviarMail.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_c4ge78g';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
        btnEnviarMail.value = 'Enviar Email';
    
        Swal.fire(
            'Excelente!',
            'El email se envio correctamente',
            'success'
          )

          limpiar();

    }, (err) => {
        btnEnviarMail.value = 'Enviar Email';
        Swal.fire(
            'Error!',
            'no fue posible enviar el email',
            'error'
          )
    });
});

// btnEmail.addEventListener('click', ()=>{



    
// });

const limpiar = ()=>{
    dni.value = ''; 
    nombre.value = '';
    promedio.value = ''; 
    estado.value = '';
    dni.disabled = false;
    nombre.disabled = false;
    btnEnviarMail.disabled = true;
    btnPromedioFinal.disabled = true;
    nombreEncargado.value = '';
}


btnLimpiar.addEventListener('click', ()=>{

    limpiar();

});


class Calificaciones extends Array {
    sum(key) {
        return this.reduce((a, b) => a + (b[key] || 0), 0);
    }
}


btnPromedioFinal.addEventListener('click', ()=>{

    const traerCalificaciones = ObtenerRegistroNotasAsignatura(); 

        if(traerCalificaciones == null){

            consultaRegistro();
                
         }else{


            const buscarAlumno = traerCalificaciones.filter((elemento,indice,array)=>{
                return elemento.dni == dni.value && elemento.asignatura == selectAsignaturas[selectAsignaturas.selectedIndex].innerText;
            }) ; 
            
            console.log('buscarAlumno')
            console.log(buscarAlumno)

        
            const obtenerPromedioPrimeraCalificacion = buscarAlumno.reduce((a, b) => a + (parseInt(b['notaUno'])) + (parseInt(b['notaDos'])) + (parseInt(b['notaTres'])|| 0), 0);

            const promFinalNotaUno = obtenerPromedioPrimeraCalificacion / 3
            console.log(promFinalNotaUno);

            promedio.value =  promFinalNotaUno;
            
            if(promFinalNotaUno > 4){
                estado.value = "APROBADO";
                estado.style.color = "green";
            }else{
                estado.value = "REPROBADO";
                estado.style.color = "Red";
            }

          
            // dni.disabled = true;
            // estado.disabled = true; 
            // promedio.disabled = true;
            
         }

});


const promedioNotas = (notaFinal)=>{

    return parseFloat(notaFinal) /4;  

}


function ObtenerRegistroNotasAsignatura(){

    const obtenerRegistroNotas = localStorage.getItem("Registro notas asignatura");
    console.log("Ver array desde función existe alumno " + typeof JSON.parse(obtenerRegistroNotas));

    let JSONotas = JSON.parse(obtenerRegistroNotas);
    // console.log(JSONotas);

    return JSONotas;

}


const consultaRegistro = ()=>{ 
    Swal.fire({
        title: 'No se encuentran registros para el DNI ingresado',
        text: "¿Que desea realizar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ingresar Calificaciones',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Intentar con otro DNI',
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire(
             window.open('ingresoCalificaciones.html','_self')
        )
        }else{
            limpiar();
        }
       
    })
}



dni.addEventListener('keyup', (e)=>{

    if (e.keyCode === 13) {

        console.log('hice enter');

         const traerAlumnos = ObtenerRegistroNotasAsignatura(); 
        
        if(traerAlumnos == null){

            consultaRegistro();
        
        }else{
            
            const buscarAlumno = traerAlumnos.find((elemento,indice,array)=>{
                return elemento.dni == dni.value
            })    

            if(buscarAlumno == undefined){
                consultaRegistro();
                // limpiarCampos();
            

            }else{

                const buscarAlumnoporRut = traerAlumnos.filter((elemento,indice,array)=>{
                    return elemento.dni == dni.value 
                })    

                if(buscarAlumnoporRut.length > 0){
                    
                    for (const prop of buscarAlumnoporRut) {
                        // para obtener los datos en las cajas de texto.
                        nombre.value = buscarAlumnoporRut[0]["nombrecompleto"];
                        // dni.disabled = true;
                        // nombre.disabled = true;
                        btnEnviarMail.disabled = false;
                        btnPromedioFinal.disabled = false;
                    }
                    
                    }else{
                        // asignaturaNoCoincide();
                        // desactivarNotas();
                    
                    }
                
            }
        }

    }   

});


