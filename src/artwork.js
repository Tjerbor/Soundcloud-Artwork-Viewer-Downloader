function redirectToImage() {
    if (true) { //new tab
        window.open(artwork_url.str, '_blank').focus();
    } else { //same tab
        location.href = artwork_url.str;
    }
}

async function downloadImage() {
    imageSrc = artwork_url.str;
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = imageSrc.replace("https:\/\/i1.sndcdn.com\/", "original")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

function tx(str) {
    var button = document.createElement("button");
    button.appendChild(document.createTextNode(str));
    return button;
}

function createViewButton() {
    var button = document.createElement("button");
    button.id = "view button";
    button.className = "line";
    button.style = button_style;
    button.appendChild(document.createTextNode("Original "));

    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.setAttribute("href","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
    button.appendChild(link);
    
    let i = document.createElement("i");
    i.className = "fa fa-image";
    button.appendChild(i);

    button.addEventListener("click", function () { redirectToImage(); });
    return button;
}

function createDownloadButton() {
    var button = document.createElement("button");
    button.id = "download button";
    button.className = "line";
    button.style = button_style;
    button.appendChild(document.createTextNode("Download "));

    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.setAttribute("href","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
    button.appendChild(link);
    
    let i = document.createElement("i");
    i.className = "fa fa-download";
    button.appendChild(i);

    button.addEventListener("click", function () { downloadImage(); });
    return button;
}

function createButtons() {
    var rtwrk = document.body.getElementsByClassName("fullHero__artwork");

    if (rtwrk.length == 1) {
        let divv = document.createElement("div");
        divv.className = "artwork_buttons";
        divv.appendChild(createViewButton());
        divv.appendChild(createDownloadButton());
        rtwrk[0].appendChild(divv);
    }
}

function getArtworkUrl() {
    var rtwrk = document.body.getElementsByClassName("fullHero__artwork");

    if (rtwrk.length == 1) {
        var art_url = rtwrk[0].querySelector('span[aria-role="img"]').getAttribute("style");
        // const re = /^.*url\("(?<url>https:\/\/.*t500x500.(jpg|png))"\).*$/m;

        // var art_url = document.querySelector('meta[property="og:image"]').content;
        // rtwrk[0].appendChild(tx(art_url));

        // resl = art_url.match(re);
        // rtwrk[0].appendChild(tx("4"));
        // // art_url = result.groups.url;
        // rtwrk[0].appendChild(tx(resl));
        art_url = art_url.replace("background-image: url(\"", "");
        art_url = art_url.replace("\"); opacity: 0;", "");
        art_url = art_url.replace("\"); opacity: 1;", "");
        art_url = art_url.replace("t500x500", "original");
        return art_url;
    }
}

var artwork_url = { str: "" };
var button_style = "display: inline-block; *display: inline; width: 50%; text-align: center; border-radius: 100px; box-sizing: border-box; font: var(--typography-body-font);";

setInterval(function () {
    artwork_url.str = getArtworkUrl();
    if (!document.body.querySelector('button[id="view button"]')) {
        createButtons();
    }
}, 200);