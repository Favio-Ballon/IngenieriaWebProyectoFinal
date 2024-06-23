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
    const buscado = url.searchParams.get("search");
    await cargarCursos(buscado);
    cargarCategorias();
    setLinkBuscador();
    setCursoListener();
    document.body.style.display = 'block';
})();

async function cargarCursos(buscado) {
    //if buscado es undefined
    console.log(buscado);
    if (!buscado) {
        window.location.href = 'index.html';
        return;
    }
    const cursos = await getCursosBuscados(buscado);
    const cursosContainer = document.querySelector('.cursos');
    const titulo = cursosContainer.querySelector('h2');
    const buscador = document.querySelector('.search-bar input');
    titulo.innerHTML = `Resultados para "${buscado}"`;
    buscador.value = buscado;
    cursos.forEach(curso => {
        const cursoBus = `
            <div class="cursos_item" data-id = ${curso.id}>
            <div>
                <img src="${curso.imagen_path}" alt="imagencurso">
            </div>
            <div>
                <h3>${curso.titulo}</h3>
                <p>${curso.descripcion}</p>
                <p>Autor: ${curso.autor}</p>
            </div>
            </div>
        `;
        cursosContainer.innerHTML += cursoBus;
    });
}

async function getCursosBuscados(buscado) {

    const buscador = {
        "titulo": buscado
    };

    try {
        const response = await fetch('http://localhost:4000/cursos/name', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(buscador)
        });
        if (!response.ok) {
            return;
        }
        const listOfCursos = await response.json();
        return listOfCursos;
    } catch (error) {
        console.error(error);
    }
}

function setCursoListener(){
    const cursos = document.querySelectorAll('.cursos_item');
    cursos.forEach(curso => {
        curso.addEventListener('click', function(e){
            e.preventDefault();
            const id = curso.dataset.id;
            window.location.href = `curso.html?id=${id}`;
        });
    });
}