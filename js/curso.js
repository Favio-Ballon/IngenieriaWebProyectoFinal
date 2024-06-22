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
    document.body.style.display = 'block';
})();