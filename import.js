
function extract() {
    const urlParams = new URLSearchParams(window.location.search);
    let pathClick = urlParams.get("pathExtract")?? '/addresses';
    let extract = urlParams.get("extract") ?? "addresslist";

    var ifrmExtract = document.createElement("iframe");
    ifrmExtract.setAttribute("src", pathClick);
    ifrmExtract.style.width = "800px";
    ifrmExtract.style.height = "800px";
    ifrmExtract.id="extractFrame";
    document.body.appendChild(ifrmExtract);

    ifrmExtract.onload = function () {
        setTimeout(function () {
            var contentWindow = ifrmExtract.contentWindow;
            alert(contentWindow.document.getElementById(extract).outerHTML);
        }, 2000);
    };
}

function click() {

    const urlParams = new URLSearchParams(window.location.search);
    let pathClick = urlParams.get("pathClick")?? '/my-account';
    let clickOnName = urlParams.get("clickon") ?? "contactphone";

    var ifrmCLick = document.createElement("iframe");
    ifrmCLick.setAttribute("src", pathClick);
    ifrmCLick.style.width = "800px";
    ifrmCLick.style.height = "800px";
    ifrmCLick.id="clickFrame";
    document.body.appendChild(ifrmCLick);
    console.log(1)
    ifrmCLick.onload = function () {
        setTimeout(function () {
            var contentWindow = ifrmCLick.contentWindow;
            console.log(2)
            contentWindow.document.getElementsByName(clickOnName)[0]?.click()

            console.log(contentWindow.document?.getElementsByName(clickOnName)[0].outerHTML + 'clicked' )
        }, 1000);
    };
}
click();
extract();