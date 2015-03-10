var BASE_PATH = "https://riston.firebaseio.com";

var connectedRef = new Firebase(BASE_PATH + "/.info/connected");

// Detect the state of current session
connectedRef.on("value", function (snapshot) {

    if (snapshot.val() === true) {
        log("Online");
    } else {
        log("Offline");
    }
});

var ref = new Firebase(BASE_PATH);

ref.authAnonymously(function (error, authData) {
    if (error) {

        console.log("Failed anony login", error);
    } else {
        console.log("Success auth", authData);
    }
});

ref.set({
    title: "Hello World!",
    author: "Firebase",
    location: {
        city: "San Francisco",
        state: "California",
        zip: 94103
    },
    posts: []
});

ref.child("location/city").on("value", function (snapshot) {
    // console.log(snapshot.val());  // Alerts "San Francisco"
});

var addNew = function () {

    var postsRef = ref.child("location/posts");

    var newPostRef = postsRef.push({
        x: ~~(Math.random() * 30000),
        y: ~~(Math.random() * 30000),
    });

    log("Added post" + newPostRef.key());
};

var log = function (text) {

    var time = new Date().toJSON();
    var logEl = document.querySelector(".log");
    var divEl = document.createElement("div");
    divEl.textContent = time + " " + text;

    logEl.appendChild(divEl);
};

var addButtonEl = document.querySelector(".add");
addButtonEl.addEventListener("click", addNew);
