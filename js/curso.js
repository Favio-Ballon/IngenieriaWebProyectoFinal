(async function () {
    const userInSession = getUserInSession();
    if (userInSession) {
        if (userInSession[0]['is_admin']) {
            window.location.href = 'cursosAdmin.html';
            return;
        } else {
            setHeaderUser(userInSession);
            setUsuario();
        }
    } else {
        setHeaderVisitante();
    }

    cargarCategorias();
    setLinkBuscador();
    
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    await cargarCurso(id);
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
    document.body.style.display = 'block';
    cargarLecciones(id);
}

async function getLecciones(id) {
    console.log(id);
    try {
        const response = await fetch(`http://localhost:4000/lecciones/curso/${id}`);
        if (!response.ok) {
            return;
        }
        const lecciones = await response.json();
        return lecciones;
    } catch (err) {
        console.error(err);
        console.log('Error al cargar lecciones')
    }
}

async function cargarLecciones(id) {
    const lecciones = await getLecciones(id);
    console.log(lecciones);
    const leccionesContainer = document.querySelector('.course-lessons');
    lecciones.forEach(leccion => {
        const leccionHtml = `
        <div class="lesson" onclick="toggleVideo('${leccion.titulo}')">
                <i class="fas fa-angle-down"></i>${leccion.titulo}
                <div id="${leccion.titulo}" class="lesson-video">
                    <iframe width="100%" height="315" src="${leccion.contenido}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        `;
        leccionesContainer.innerHTML += leccionHtml;
    });
    document.body.style.display = 'block';
}

async function setUsuario() {
    const cursoHeader = document.querySelector('#course-final');
    const htmls = `
    <button class="btn">Inscribirse</button>
    `;
    cursoHeader.innerHTML += htmls;
    document.querySelector('.btn').addEventListener('click', inscribirse);
}

async function inscribirse(e) {
    e.preventDefault();
}

function toggleVideo(id) {
    if (getUserInSession()) {
        const video = document.getElementById(id);
        if (video.style.display === 'block') {
            video.style.display = 'none';
        } else {
            video.style.display = 'block';
        }
    }
}
