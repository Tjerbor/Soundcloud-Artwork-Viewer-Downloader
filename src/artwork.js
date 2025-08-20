function redirectToImage(url) {
    if (true) { //new tab
        window.open(url, '_blank').focus();
    } else { //same tab
        location.href = url;
    }
}

async function downloadImage(imageSrc) {
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
    let button = document.createElement("button");
    button.appendChild(document.createTextNode(str));
    return button;
}

function createViewButton(url) {
    let button = document.createElement("button");
    button.id = "view button";
    button.appendChild(document.createTextNode("Original"));
    button.addEventListener("click", function () { redirectToImage(url); });
    return button;
}

function createDownloadButton(url) {
    let button = document.createElement("button");
    button.id = "download button";
    button.appendChild(document.createTextNode("Download"));
    button.addEventListener("click", function () { downloadImage(url); });
    return button;
}

function createButtons() {
    let rtwrk = document.body.getElementsByClassName("fullHero__artwork");

    if (rtwrk.length == 1) {
        rtwrk[0].querySelector('span[aria-role="img"]').style;
        // const re = /^.*url\("(?<url>https:\/\/.*t500x500.(jpg|png))"\).*$/m;

        artwork_url = document.querySelector('meta[property="og:image"]').content;

        // resl = artwork_url.match(re);
        // rtwrk[0].appendChild(tx("4"));
        // // artwork_url = result.groups.url;
        // rtwrk[0].appendChild(tx(resl));
        artwork_url = artwork_url.replace("background-image: url(\"", "");
        artwork_url = artwork_url.replace("\"); opacity: 1;", "");
        artwork_url = artwork_url.replace("t500x500", "original");

        rtwrk[0].appendChild(createViewButton(artwork_url));
        rtwrk[0].appendChild(createDownloadButton(artwork_url));
    }
}

createButtons();