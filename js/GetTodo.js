function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function addPhoto(url) {
    $("#holder").append(`<img src="${url}" alt="${url}">`);
}

function displayErrorMessage() {
    $("#loading_circle").addClass("none_display");
    $("#error_message").removeClass("none_display");
}

function displayLoading() {
    $("#loading_circle").removeClass("none_display");
    $("#error_message").addClass("none_display");
}

function successfulLoading() {
    $("#loading_circle").addClass("none_display");
}

function onLoadMore() {
    displayLoading();

    setTimeout(() => {
        if (getRandomInt(2) === 1) {
            console.log("Не повезло :)");
            displayErrorMessage();
            return;
        }

        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(json => json[getRandomInt(json.length)])
            .then(json_elem => {console.log(json_elem); return json_elem})
            .then(json_elem => addPhoto(json_elem['url']))
            .catch(error => {
                console.log(error);
                displayErrorMessage();
            });
        successfulLoading();
    }, 1000);
}

$('#button_load_more').on('click', onLoadMore);