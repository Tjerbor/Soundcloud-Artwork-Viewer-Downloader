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

function createViewButton(inner_text) {
    var button = document.createElement("button");
    button.id = "view button";
    button.className = "line";
    button.style = button_style;

    let text = document.createTextNode(inner_text);
    // text.style = "word-wrap: break-word;";
    button.appendChild(text);

    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
    button.appendChild(link);

    let i = document.createElement("i");
    i.className = "fa fa-image";
    button.appendChild(i);

    button.addEventListener("click", function () { redirectToImage(); });
    return button;
}

function createDownloadButton(inner_text) {
    var button = document.createElement("button");
    button.id = "download button";
    button.className = "line";
    button.style = button_style;

    let text = document.createTextNode(inner_text);
    // text.style = "word-wrap: break-word;";
    button.appendChild(text);

    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
    button.appendChild(link);

    let i = document.createElement("i");
    i.className = "fa fa-download";
    button.appendChild(i);

    button.addEventListener("click", function () { downloadImage(); });
    return button;
}

function createButtons(has_artwork) {
    let divv = document.createElement("div");
    divv.className = "artwork_buttons";
    divv.appendChild(createViewButton(has_artwork.OG_inner_text));
    divv.appendChild(createDownloadButton(has_artwork.DL_inner_text));
    has_artwork.insert(divv);
    // coverNode.appendChild(divv);
    // coverNode.insertAdjacentElement("afterend", divv);
}

function getArtworkUrl(coverNode) {
    var art_url = coverNode.querySelector('span[aria-role="img"]').getAttribute("style");
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
    art_url = art_url.replace("t200x200", "original");
    return art_url;
}

function hasCover() {
    // Normal cover display
    var rtwrk = document.body.getElementsByClassName("fullHero__artwork");
    if (rtwrk.length == 1) {
        return {
            hasCover: true,
            coverNode: rtwrk[0],
            button_style: "display: inline-block; *display: inline; width: 50%; text-align: center; border-radius: 100px; box-sizing: border-box; font: var(--typography-body-font);",
            insert: function (element) { rtwrk[0].appendChild(element); },
            OG_inner_text: "Original ",
            DL_inner_text: "Download "
        };
    }

    // Premium user display with extended width as background
    var rtwrk = document.body.querySelector('div[class^="image image__lightOutline interactive sc-artwork-15x sc-artwork sc-artwork-placeholder-"]');
    if (rtwrk !== null) {
        return {
            hasCover: true,
            coverNode: rtwrk,
            button_style: "display: inline-block; *display: inline; width: 50%; text-align: center; word-wrap: break-word; box-sizing: border-box; font: var(--typography-body-font);",
            insert: function (element) { rtwrk.insertAdjacentElement("afterend", element); },
            OG_inner_text: "OG ",
            DL_inner_text: "DL "
        };
    }

    return { hasCover: false };
}

var artwork_url = { str: "" };
var button_style = "";


setInterval(function () {
    has_artwork = hasCover();
    if (has_artwork.hasCover && !document.body.querySelector('button[id="view button"]')) {
        // document.body.querySelector('h1[class="sc-text-h1 soundTitle__title sc-font g-type-shrinkwrap-inline  theme-dark"]').appendChild(tx(has_artwork.coverNode));
        artwork_url.str = getArtworkUrl(has_artwork.coverNode);
        button_style = has_artwork.button_style;
        createButtons(has_artwork);
    }
}, 200);