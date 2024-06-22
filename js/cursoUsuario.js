(function(){
    const UserInSession = getUserInSession();
    if(!UserInSession){
        window.location.href = 'inicio.html';
        return;
    }
})();
