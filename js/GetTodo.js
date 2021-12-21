function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function addTodoElem(title) {
    $("#todo-generated-table").append(`<p class="todo-elem"> "${title}" </p>`);
}

function displayErrorMessage() {
    $("#loading-gif").addClass("none_display");
    $("#error-message").removeClass("none_display");
}

function displayLoadingGif() {
    $("#loading-gif").removeClass("none_display");
    $("#error-message").addClass("none_display");
}

function finishLoading() {
    $("#loading-gif").addClass("none_display");
}


function onLoadMore() {
    displayLoadingGif();

    setTimeout(() => {
        if (getRandomInt(2) === 1) {
            displayErrorMessage();
            return;
        }

        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => json[getRandomInt(json.length)])
            .then(json_elem => addTodoElem(json_elem['title']))
            .catch(() => {
                displayErrorMessage();
            });

        finishLoading();

    }, 1000);
}

$('#button-generate').on('click', onLoadMore);