(async function(){
    const url = new URL(window.location.href);
    const id = url.searchParams.get("leccion");
    if(!id){
        return;
    }

    setEditarFormUpdate();
   /*  getCursoById(id).then((curso) => {
        setCursoDatos(curso);
    }); */

})();

async function setEditarFormUpdate(){
    titulo = document.getElementById('titulo');
    button = document.getElementById('btn-crear') ;
    
    titulo.innerHTML = 'Editar Leccion';
    button.innerHTML = 'Editar';
    
    button.addEventListener('click', async () => {
        updateLeccion();
    });
}

async function updateLeccion(){
    console.log('updateLeccion');
}