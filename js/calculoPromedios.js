 
    //Importaciones 

    import {traerAlumnosLocalStorge} from './BuscarCalificaciones.js'
    import {alumnoNoEncontrado} from './BuscarCalificaciones.js'


    class Promedio{

        constructor(dni, nombreCompletoAlumno,notaUno, notaDos, notaTres){
            this.dni = dni; 
            this.nombreCompletoAlumno = nombreCompletoAlumno; 
            this.notaUno = notaUno;
            this.notaDos = notaDos; 
            this.notaTres = notaTres;
        }

        agregar(objpromedio){
            return arrPromedios.push(objpromedio);
        }
    
    }

    // Declaración de variables. 

    const dni = document.querySelector('#dni');
    const nombreCompletoAlumno = document.querySelector('#nombreAlumnoCompleto'); 
    const notaUno = document.querySelector('#Nota1');
    const notaDos = document.querySelector('#Nota2');
    const notaTres = document.querySelector('#Nota3');
    const btnPromediar = document.querySelector('#promediarCalificaciones1');
    const btnCerrar = document.querySelector('#cerrar');
    const selectAsignaturas = document.querySelector("#asignaturas");
    const arrPromedios = [];
    

     const desactivarNotas1 = ()=>{ 
        notaUno.disabled = true; 
        notaDos.disabled = true; 
        notaTres.disabled = true; 
    }

    

    // Validaciones para campos vacios. 

    function validacionesCamposVacios(){

        if(dni.value===""){
            swal("Ingrese Dni alumno ", "El campo Dni no puede ser vacio", "warning");
            return false;
        }else if(nombreCompletoAlumno.value===""){
            swal("Ingrese El nombre del alumno", "El campo nombre de alumno no puede ser vacio", "warning");
            return false;
        }else if(notaUno.value===""){
            swal("Ingrese La primera nota", "El campo nota 1 no puede ser vacio", "warning");
            return false;
        }else if(notaDos.value===""){
            swal("Ingrese La segunda nota", "El campo nota 2 no puede ser vacio", "warning");
            return false;
        }else if(notaTres.value===""){
            swal("Ingresela tercera nota", "El campo nota 3 no puede ser vacio", "warning");
            return false;     
        } 
        else{
            return true;
        }

    }


    // Validación para las calificaciones. 

    function validarCalificaciones(){

        if(notaUno.value > 7 || notaDos.value > 7  || notaTres.value > 7){
            swal("Notas", "Las calificaciones ingresadas no pueden ser mayor a 7", "warning");
            return false;
        }else{
            return true;
        }
    }


    function obtenerPromedio(){
        let resultado =  (parseFloat(notaUno.value)+ parseFloat(notaDos.value)+ parseFloat(notaTres.value)) /3;  
        return resultado;
    }

    function crearTablaHtml(obj, result, obs){
        const tabla = document.getElementById('addtabla');
        const fila  = document.createElement('tr');  

        const obtenerObj = obj;
        let{dni, nombre, primeraCalificacion, segundaCalificacion,terceraCalificacion} = obtenerObj

        fila.innerHTML=`<td> ${dni} </td><td> ${nombre} </td><td> ${primeraCalificacion} </td><td> ${segundaCalificacion} </td><td> ${terceraCalificacion} </td><td> ${result.toFixed(1)} </td><td> ${obs} </td>`;
        fila.style.backgroundColor = "#64b5f6";
        
        tabla.appendChild(fila);
  
    }

    const obs = (result)=>{
          //Variable obserbacion
          let  obs =0;
          if(result >=4){
              obs ="!Aprobado¡ &#x2714";
              return obs;
          }else{
          obs ="!Reprobado &#x274c";
          return obs;
          }   
    }

    

    btnPromediar.addEventListener('click', ()=>{

        // Primero valida que los campos no esten vacios. 
        if(validacionesCamposVacios()){
            // si se cumple ejecuta validacion para notas 
            if(validarCalificaciones()){

                //Promediar la suma de las notas entre 3
                let resultado = obtenerPromedio();    
                let observacion = obs(resultado);
                let obtenerValores = llenarObj(); 

                crearTablaHtml(obtenerValores, resultado, observacion);
                LimpiarCampos();
                 
            }

        }

    });


    const llenarObj = ()=>{
        const objRegistro = {
            dni: dni.value, 
            nombre: nombreCompletoAlumno.value, 
            primeraCalificacion: notaUno.value, 
            segundaCalificacion: notaDos.value, 
            terceraCalificacion : notaTres.value
        }

        return objRegistro
    }


    const LimpiarCampos = ()=>{

        dni.value = '';
        nombreCompletoAlumno.value = ''; 
        notaUno.value = ''; 
        notaDos.value = ''; 
        notaTres.value = '';
    
    }


    // para cerrar sessión. 

    btnCerrar.addEventListener('click', ()=>{

        
    Swal.fire({
        title: '¿Está seguro que desea cerrar su sessión?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'SI',
        denyButtonText: 'NO',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then((result) => {
        if (result.isConfirmed) {
      
         window.open('index.html');
        } else if (result.isDenied) {
        }
      })


    });


    function existeAlumno1(arr){

        let dniAlumno = document.querySelector('#dni');
        let dniUtilizar = dniAlumno.value;

    
        const alumnosLocalStorage = traerAlumnosLocalStorge();
        console.log("array alumnos ultimo"+ alumnosLocalStorage);
    
        const buscarAlumno = alumnosLocalStorage.find((elemento,indice,array)=>{
            return elemento.dni == dniUtilizar
        })    
    
        console.log(buscarAlumno);
    
        if(buscarAlumno == undefined){
         
            console.log('no se encuentra dni asociado en la base de datos');
        }else{
            
  
        }


    }

    function traerAlumnosLocalStorge1(){

    const obtenerAlumnosLS = localStorage.getItem("Datos Alumnos");
    console.log("Ver array desde función existe alumno " + typeof JSON.parse(obtenerAlumnosLS));

    let jsonAlumnos1 = JSON.parse(obtenerAlumnosLS);
    console.log(jsonAlumnos1);

    return jsonAlumnos1;

    }

    dni.addEventListener('keyup', (e)=>{

        if (e.keyCode === 13) {

            console.log('hice enter');

            const traerAlumnos = traerAlumnosLocalStorge1(); 
            console.log(traerAlumnos);

            if(traerAlumnos == null){
            
                console.log('no se encuentran registros');
                //alumnoNoEncontrado();
             
            }else{
                
                const buscarAlumno = traerAlumnos.find((elemento,indice,array)=>{
                    return elemento.dni == dni.value
                })    

                if(buscarAlumno == undefined){
      
                    existeAlumno1();
                  

                }else{
    
                    const buscarAlumnoporRut = traerAlumnos.filter((elemento,indice,array)=>{
                        return elemento.dni == dni.value && elemento.asignatura == selectAsignaturas[selectAsignaturas.selectedIndex].innerText;
                    })    

                    console.log('abajo resultado esperado')
                    console.log(buscarAlumnoporRut);

                    if(buscarAlumnoporRut.length > 0){
                        
                        for (const prop of buscarAlumnoporRut) {
                            // para obtener los datos en las cajas de texto.
                            nombreCompletoAlumno.value = buscarAlumnoporRut[0]["nombrecompleto"];
                            notaUno.value = buscarAlumnoporRut[0]["notaUno"];
                            notaDos.value = buscarAlumnoporRut[0]["notaDos"];
                            notaTres.value = buscarAlumnoporRut[0]["notaTres"];
                          }

                          if (notaUno.value == '' && notaDos.value =='' && notaTres.value == ''){
                                    console.log('campos de notas vacios'); 
                          }else{
                            console.log('dejar editar'); 
                            activarNotas();
                          }
                          
                         }else{
                            desactivarNotas1();
                          }
                      
                }
            }

        }   

    });