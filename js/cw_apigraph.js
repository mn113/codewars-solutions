// Include libs:
// Pull in resources:
(function() {
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/blissfuljs/1.0.2/bliss.min.js');
    document.body.appendChild(scriptTag);
}());

// Scan url for user_id:
var user_id;
var match = window.location.href.match(/codewars\.com\/users\/(\w+)\/?$/);
if (match) {
    user_id = match;
}
else {
    // wrong page => die
    throw new Error("CW_stats doesn't work on this page.");
}

var apikey;
// Check for local API key:
if (localStorage.getItem("cw_apikey")) {
    apikey = localStorage.getItem("cw_apikey");
}
else {
    // Create form to enter API key:
    (function() {
        var form = $("<form id='cw_api_form'><p>CW_stats bookmarklet needs your API key:</p>"+
                     "<input type='text' name='key'><button type='submit'>OK</button></form>");
        form.appendTo($("div#report"));
//        var button = $("#cw_api_form button");
//        value =  button.form.key.value;
//        button.onclick = function() {
//            foo(value);
//        }
        $("#cw_api_form button").one('click', function(e) {
            e.preventDefault();
            apikey = $("input[name='key']").val();
            console.log(apikey);
            // Save API key to localStorage:
            localStorage.setItem("cw_apikey", apikey);
            form.remove();
        });
    }());
}

// Fetch JSON:
var suffix = "?access_key=" + apikey;
var baseUrl = "https://www.codewars.com/api/v1/";

function getUserData(user_id) {
    var userUrl = baseUrl + "users/" + user_id + suffix;
    console.log(userUrl);
    $.getJSON(userUrl, function(data) {
        console.log(data);
        var items = [];
        $.each(data, function(key, val) {
            items.push( "<li id='" + key + "'>" + val + "</li>" );
        });

        $( "<ul/>", {
            "class": "my-new-list",
            html: items.join( "" )
        }).appendTo( "#result" );
    });
}

function getUserKatas(user_id) {
    var challengesUrl = baseUrl + "/users/" + user_id + "/code_challenges/completed" + suffix;
    console.log(challengesUrl);
    $.getJSON(challengesUrl, function(data) {
        console.log(data);
    });
}

// Create HTML to insert:
getUserData(user_id);
getUserKatas(user_id);
