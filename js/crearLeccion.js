(async function(){
    const userInSession = getUserInSession();
    if (userInSession) {
        if (userInSession[0]['is_admin']) {
            console.log(userInSession);
            setHeaderAdmin(userInSession);
            console.log('admin');
        } else {
            window.location.href = 'index.html';
            return;
        }
    } else {
        window.location.href = 'index.html';
        return;
    }
    
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    if(!id){
        return;
    }

    setEditarFormCrear();
   /*  getCursoById(id).then((curso) => {
        setCursoDatos(curso);
    }); */

})();

async function setEditarFormCrear(){
    button = document.getElementById('btn-crear') ;
    
    button.addEventListener('click', async () => {
        crearLeccion();
    });
}

async function crearLeccion(){
    console.log('crearLeccion');
}

