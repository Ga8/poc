var ifrm = document.createElement("iframe");
ifrm.setAttribute("src", "/adresses");
ifrm.style.width = "800px";
ifrm.style.height = "800px";
document.body.appendChild(ifrm);

ifrm.onload = function () {
    setTimeout(function () {
        var contentWindow = ifrm.contentWindow;
        alert(contentWindow.document.getElementById("addresslist").outerHTML);
    }, 6000); // Wait for 1 second before executing the code
};