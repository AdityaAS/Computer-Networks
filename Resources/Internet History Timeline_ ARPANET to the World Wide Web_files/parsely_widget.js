var Parsely = Parsely || {};

Parsely.loadJSONP = function(url, apikey, secret, callback) {
    url += "&apikey=" + apikey +
           "&secret=" + secret +
           "&callback=" + callback;

    var script = document.createElement("script");
    script.setAttribute("src", url)
    document.body.appendChild(script);
}

Parsely.humanNumber = function(nStr) {
    // http://stackoverflow.com/questions/2646385/add-a-thousands-separator-to-a-total-with-javascript-or-jquery/2646441#2646441
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    res = x1 + x2;

    if (nStr.substring(nStr.length - 1, 1) == "%")
        res += "%";

    return res;
}

Parsely.onPostData = function(data) {
    var container = document.getElementById(this.postContainerID);
    var posts = data['data'];

    for (var i=0; i< posts.length; i++) {
        var divContainer = document.createElement("div");
        divContainer.setAttribute('class', 'parsely-conts');
        var link = document.createElement("a");
        var image_div = document.createElement('div');
        image_div.setAttribute('class', 'parsely-image');
        if (posts[i].thumb_url_medium) {
            var image = document.createElement("img");
            image.setAttribute("src", posts[i].thumb_url_medium)
        } else {
            var image = document.createElement("div");
            image.setAttribute("class", "default-image");
        }
        //<meta name='parsely-metadata' content='{"type": "feature", "image_url": "http://10.207.58.195:6004/images/i/000/056/970/i01/IMG_3563e.JPG?1379451123"}'>

        if (posts[i].metadata) {
            metadata = jQuery.parseJSON(posts[i].metadata);
            image = document.createElement('img');
            image.setAttribute('src', metadata.image_url);
        }
        image_div.appendChild(image);
        link.appendChild(image_div)
        var title_div = document.createElement('div');
        title_div.setAttribute('class', 'parsely-title');
        var title = document.createElement("span")
        var mod_title = posts[i].title;
        mod_title = mod_title.replace(/u0027/g, "'");
        mod_title = mod_title.replace(" | LiveScience", "");
        title.innerHTML = mod_title;
        title_div.appendChild(title);
        link.appendChild(title_div)
        link.setAttribute("href", posts[i].url);
        divContainer.appendChild(link)
        container.appendChild(divContainer);
    }
}

Parsely.loadPosts = function(article_url, apikey, secret, containerID, limit, type) {
    this.postContainerID = containerID;
    limit = limit || 5,
    type = type || "popular";
    var url = document.location.protocol + "//api.parsely.com/v2";

    if (type == "popular") {
        //url = url + "/analytics/posts?limit=" + limit;
        url = url + "/related?apikey="+apikey+"&url="+article_url+"&days=3&limit="+limit;
    } else {
        url = url + "/shares/posts?limit=" + limit;
    }

    Parsely.loadJSONP(url, apikey, secret, 'Parsely.onPostData');
}

Parsely.onAuthorData = function(data) {
    var container = document.getElementById(this.authorContainerID);
    var authors = data['data'];

    for (var i=0; i< authors.length; i++) {
        var link = document.createElement("a");

        var title = document.createElement("p")
        title.innerHTML = authors[i].author;
        link.appendChild(title)

        var views = document.createElement("span");
        views.setAttribute("class", "views");
        views.innerHTML = typeof authors[i]._hits !== "undefined" ? Parsely.humanNumber(authors[i]._hits) : Parsely.humanNumber(authors[i]._shares);
        link.appendChild(views)

        container.appendChild(link);
    }
}
Parsely.loadAuthors = function(apikey, secret, containerID, limit, type) {
    this.authorContainerID = containerID;
    limit = limit || 5,
    type = type || "popular";
    var url = document.location.protocol + "//api.parsely.com/v2";

    if (type == "popular") {
        url = url + "/analytics/authors?limit=" + limit;
    } else {
        url = url + "/shares/authors?limit=" + limit;
    }

    Parsely.loadJSONP(url, apikey, secret, "Parsely.onAuthorData");
}
