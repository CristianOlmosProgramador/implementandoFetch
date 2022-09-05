    
   export class Asignatura{

        constructor(dni, nombreCOmpleto,asignatura,notaUno, notaDos, notaTres){
            this.dni = dni; 
            this.nombrecompleto = nombreCOmpleto;
            this.asignatura = asignatura;
            this.notaUno = notaUno;
            this.notaDos = notaDos; 
            this.notaTres = notaTres;
        }
    
    }

    // Declaración de variables. 

    const dni = document.querySelector('#dni');
    const nombreCompletoAlumno = document.querySelector('#nombreAlumnoCompleto'); 
    const notaUno = document.querySelector('#Nota1');
    const notaDos = document.querySelector('#Nota2');
    const notaTres = document.querySelector('#Nota3');

	const formulario = document.querySelector("#form");

     const  btnPromediar = document.getElementById('promediarCalificaciones');


    const btnCerrar = document.querySelector('#cerrar');
    const selectAsignaturas = document.querySelector("#asignaturas");
    

    const llenarObjeto = ()=> {
    
        const objRegistro = {
            dniAlumno : dni.value, 
            nombreAlumnos : nombreCompletoAlumno.value, 
            asignaturaTexto : selectAsignaturas[selectAsignaturas.selectedIndex].innerText,
            primeraCalificacion : notaUno.value, 
            segundaCalificacion : notaDos.value, 
            terceraCalificacion : notaTres.value
        }

        return objRegistro
    }
  
   

    if(btnPromediar){
        btnPromediar.addEventListener('click', ()=>{
         
       
    
            // Primero valida que los campos no esten vacios. 
            if(validacionesCamposVacios()){
                
                if(validarAlumnoNotas()){
                    registrar(); 
                    
                }else{
                    MensajeAlumnoExiste();
                }
           
            }
    
        });
      }

  

    const verCombo = ()=>{
        console.log(selectAsignaturas[selectAsignaturas.selectedIndex].value)

    }

    const arrPromedios = [];
    

        const objFormulario = {
            dni : dni.value, 
            nombre : nombreCompletoAlumno.value, 
            primeraCalificacion : notaUno.value, 
            segundaCalificacion : notaDos.value, 
            terceraCalificacion  : notaTres.value
        }

        const recorreObjFormulario  = ()=>{

            const obtenerObjeto = llenarObjeto(); 
            console.log(obtenerObjeto);


      

            // obtenerObjeto.forEach(element => {

            //     if(element == null){
            //         swal(`Ingrese ${input.name}, El campo ${input.name} no puede ser vacío`);
            //     }

            // });
        


        }


    // Validaciones para campos vacios. 

     function validacionesCamposVacios(){


        // let elementos = document.querySelectorAll("input[type=text], input[type=number]")
        // console.log('elementos'); 
        // console.log(elementos);

        // elementos.forEach((elemento) => {
        //     if(elemento.value == ''){
        //         swal(`Ingrese ${elemento.name}`, `El campo  ${elemento.name} no puede estar vacio`, "warning");
        //         return false;
        //     }
 
        //   });

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

    function crearTablaHtml(dni,nombrecompleto, asginatura, notaUno, notaDos, notaTres){
        const objetoCreaTabla = llenarObjeto(); 

        let {dniAlumno,nombreAlumnos,asignaturaTexto,primeraCalificacion, segundaCalificacion, terceraCalificacion} = objetoCreaTabla

        const tabla = document.getElementById('addtabla');
        const fila  = document.createElement('tr');  

        fila.innerHTML=`<td> ${dniAlumno} </td><td> ${nombreAlumnos} </td><td> ${asignaturaTexto} </td><td> ${primeraCalificacion} </td><td> ${segundaCalificacion} </td><td> ${terceraCalificacion} </td>`;
        fila.style.backgroundColor = "#64b5f6";
        
        tabla.appendChild(fila);
  
    }

    const obs = (result)=>{
          //Variable obserbacion
          let  obs =0;
          if(result >=4){
              obs =value="!Aprobado¡ &#x2714";
              return obs;
          }else{
          obs =value="!Reprobado &#x274c";
          return obs;
          }   
    }

    
   

    const registrarAsignatura = ()=>{
        
        let objetoPrueba = llenarObjeto()
        console.log('objeto de la función') 
        console.log(objetoPrueba);

        let {dniAlumno,nombreAlumnos,primeraCalificacion, segundaCalificacion, terceraCalificacion, asignaturaTexto} = objetoPrueba
        
        const ingresarRegistro = new Asignatura(dniAlumno,nombreAlumnos,asignaturaTexto,primeraCalificacion, segundaCalificacion, terceraCalificacion);
        arrPromedios.push(ingresarRegistro); 
        
        console.log(ingresarRegistro);

        const JSONRegistro = JSON.stringify(arrPromedios)
        console.log("Alumnos" + JSONRegistro);

        localStorage.setItem("Registro notas asignatura", JSONRegistro);
    }
  
    


    const registrar = ()=>{

        // let dniIng = dni.value;
        // let nombreAlumnoIng = nombreCompletoAlumno.value; 
        // let notaUnoIng = notaUno.value; 
        // let notaDosIng = notaDos.value; 
        // let notaTresIng = notaTres.value; 
        // let asigIng = selectAsignaturas[selectAsignaturas.selectedIndex].innerText;

        // console.log(asigIng);

        registrarAsignatura();
        crearTablaHtml();
        LimpiarCampos();
           
    
}
    
    const existeAlumnoPromedio = ()=>{

        let dniUtilizar = dni.value;
    
        const buscarAlumnoPromedio = arrPromedios.find((elemento,indice,array)=>{
            return elemento.dni == dniUtilizar
        })    
    
        console.log(buscarAlumnoPromedio);
    
        if(buscarAlumnoPromedio == undefined){
            registrar();
            MensajeExitoso();
          
            return true;
          
        }else{
            // si está el alumno lo ingreso al nuevo array de alumno buscado. 
            MensajeAlumnoExiste(); 
            console.log('ya se calcularon las notas para este dni. por favor vuelva a intentar con uno diferente');
            return false;
        }
    
    }

    const MensajeExitoso = ()=>{
        swal("Registro exitoso", "Gracias... se calcularon correctamente las calificaciones", "success");
        return true;
    }
    
    const MensajeAlumnoExiste = ()=>{
        swal("No es posible guardar cambios", "El alumno ingresado, ya tiene las calificacion para la asignatura seleccionada", "warning");
        return false;
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

    console.log(arrPromedios);



    function existeAlumno(){

            const traerAlumnos = traerAlumnosLocalStorge(); 
            console.log(traerAlumnos);

            if(traerAlumnos == null){
                alert('no hay alumnos registrados')
            }else{
                
                const buscarAlumno = traerAlumnos.find((elemento,indice,array)=>{
                    return elemento.dni == dni.value
                })    

                if(buscarAlumno == undefined){
                    alert('no exisite alumno'); 
                }else{
    
                    const buscarAlumnoporRut = traerAlumnos.filter((elemento,indice,array)=>{
                        return elemento.dni == dni.value
                    })    

                    console.log(buscarAlumnoporRut);

                    if(buscarAlumnoporRut.length > 0){
                    
                 
                         }else{
                          
                          }
                      
                }
        

    }

    
    function traerAlumnosLocalStorge(){

    const obtenerAlumnosLS = localStorage.getItem("Datos Alumnos");
    console.log("Ver array desde función existe alumno " + typeof JSON.parse(obtenerAlumnosLS));

    let jsonAlumnos1 = JSON.parse(obtenerAlumnosLS);
    console.log(jsonAlumnos1);

    return jsonAlumnos1;

    }

    const buscarNotasAlumnos = ()=>{
      
            const obtenerNotasAsignaturas = localStorage.getItem("Registro notas asignatura");
            console.log("Ver array desde función existe alumno " + typeof JSON.parse(obtenerAlumnosLS));
        
            let jsonAlumnos1 = JSON.parse(obtenerNotasAsignaturas);
            console.log(jsonAlumnos1);
        
            return jsonAlumnos1;

        
    }

   

    const buscarAlumnoAsignatura = ()=>{
      
            let dniValidar = dni.value;

            const notasLocalStorage = buscarNotasLocalStorage();
            console.log(notasLocalStorage);

    }

    
    const buscarNotasLocalStorage = ()=>{

        const obtenerNotas = localStorage.getItem("Registro notas asignatura");

        let JSONUsuarios = JSON.parse(obtenerNotas);
        console.log(JSONUsuarios);
                    
        return JSONUsuarios;
                    
    }
    }


    const obtenerDatosNotas = ()=>{ 

        const obtenerDatosNotas = localStorage.getItem("Registro notas asignatura");
       
        let jsonAlumnos1 = JSON.parse(obtenerDatosNotas);
        console.log(jsonAlumnos1);
    
        return jsonAlumnos1;


    }

    const validarAlumnoNotas = ()=>{ 

        const obtenerDatosNotas1 = obtenerDatosNotas(); 
    
        if(obtenerDatosNotas1 == null){
            registrar();
        }else{

            const buscarAlumnoNotas = obtenerDatosNotas1.find((elemento,indice,array)=>{
                return elemento.dni == dni.value && elemento.asignatura == selectAsignaturas[selectAsignaturas.selectedIndex].innerText;
    
            });
    
            if(buscarAlumnoNotas == undefined){
                return true; 
            }else{ 
                return false;
            }
        }       
      
    }


    
    
        


        


   
