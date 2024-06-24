async function createCurso() {
    console.log('createCurso');
    //get datos del form
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const autor = document.getElementById('autor').value;
    const imagenInput = document.getElementById('imagen'); // Get the input element
    const imagen = imagenInput.files[0]; // Access the first file in the input
    
    //validamos datos
    if(validarDatos(titulo, descripcion, autor, imagen)){
        //upload image
        const path = await uploadImage(imagen);
        if(path){
            userInSession = getUserInSession();
            imagen_path = `http://localhost:4000/${path}`
            console.log(imagen_path)
            //create curso
            const curso = {
                titulo,
                descripcion,
                autor,
                imagen_path,
                admin_id: userInSession[0].id
            };
            const response = await createCursoDB(curso);
            console.log(response);
            if(response){
                window.location.href = 'index.html';
            }
        }
    
    }

}

async function createCursoDB(curso){
    try{
        const response = await fetch('http://localhost:4000/cursos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(curso)
        });

        if (response.ok) {
            const result = response;
            console.log(result);
            return result; 
        } else {
            console.error('Error creating curso:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error creating curso:', error);
        return null;
    }
}

async function uploadImage(imagen){
    const formData = new FormData();
    formData.append('image', imagen);

    try {
        const response = await fetch('http://localhost:4000/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json(); // Assuming the server responds with JSON
            console.log(result);
            return result; // Return the result if needed
        } else {
            console.error('Error uploading image:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
}


function validarDatos(titulo, descripcion, autor, imagen){
    const validationTitulo = document.querySelector('#validation-titulo');
    const validationDescripcion = document.querySelector('#validation-descripcion');
    const validationAutor = document.querySelector('#validation-autor');
    const validationImagen = document.querySelector('#validation-imagen');

    let isValid = true;

    if (titulo === '') {
        validationTitulo.innerHTML = 'El campo de titulo es requerido';
        isValid = false;
        validationTitulo.style.display = 'block';
    }else if(titulo<5){
        validationTitulo.innerHTML = 'El campo de titulo debe tener al menos 5 caracteres';
        isValid = false;
        validationTitulo.style.display = 'block';
    }else if(titulo>50){
        validationTitulo.innerHTML = 'El campo de titulo debe tener máximo 50 caracteres';
        isValid = false;
        validationTitulo.style.display = 'block';
    }  
    else {
        validationTitulo.style.display = 'none';
    }

    if (descripcion === '') {
        validationDescripcion.innerHTML = 'El campo de descripcion es requerido';
        isValid = false;
        validationDescripcion.style.display = 'block';
    } else if(descripcion<10){
        validationDescripcion.innerHTML = 'El campo de descripcion debe tener al menos 10 caracteres';
        isValid = false;
        validationDescripcion.style.display = 'block';
    }else if(descripcion>255){
        validationDescripcion.innerHTML = 'El campo de descripcion debe tener máximo 200 caracteres';
        isValid = false;
        validationDescripcion.style.display = 'block';
    }
    else {
        validationDescripcion.style.display = 'none';
    }

    if (autor === '') {
        validationAutor.innerHTML = 'El campo de autor es requerido';
        isValid = false;
        validationAutor.style.display = 'block';
    } else if(autor<5){
        validationAutor.innerHTML = 'El campo de autor debe tener al menos 5 caracteres';
        isValid = false;
        validationAutor.style.display = 'block';
    } else if(autor>50){
        validationAutor.innerHTML = 'El campo de autor debe tener máximo 50 caracteres';
        isValid = false;
        validationAutor.style.display = 'block';
    }
    else {
        validationAutor.style.display = 'none';
    }

    if (!imagen) {
        validationImagen.innerHTML = 'La imagen es requerida';
        isValid = false;
        validationImagen.style.display = 'block';
    } else {
        validationImagen.style.display = 'none';
    }

    return isValid;
}