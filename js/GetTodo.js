function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function addPhoto(url) {

    $("#todo-generated-table").append(`<img src="${url}" alt="${url}">`);

    /*
    $("#todo-generated-table").append(`<img src="${url}" alt="${url}">`);
     */

}

function displayErrorMessage() {
    $("#loading-gif").addClass("none_display");
    $("#error-message").removeClass("none_display");
}

function displayLoading() {
    $("#loading-gif").removeClass("none_display");
    $("#error-message").addClass("none_display");
}

function successfulLoading() {
    $("#loading-gif").addClass("none_display");
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

$('#button-generate').on('click', onLoadMore);