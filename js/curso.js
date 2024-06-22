(async function () {
    const userInSession = getUserInSession();
    if (userInSession) {
        if (userInSession[0]['is_admin']) {
            window.location.href = 'cursosAdmin.html';
            return;
        } else {
            setHeaderUser(userInSession);
        }
    }else{
        setHeaderVisitante();
    }

    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    await cargarCurso(id);
    document.body.style.display = 'block';
})();

async function cargarCurso(id) {
    const curso = await getCursoById(id);
    const cursosContainer = document.querySelector('.course-header');
    const img = cursosContainer.querySelector('img');
    const titulo = cursosContainer.querySelector('.course-title');
    const descripcion = cursosContainer.querySelector('.course-description');
    const autor = cursosContainer.querySelector('.course-author');
    titulo.innerHTML = curso[0].titulo;
    descripcion.innerHTML = curso[0].descripcion;
    autor.innerHTML = `Autor: ${curso[0].autor}`;
    img.src = curso[0].imagen_path;
}