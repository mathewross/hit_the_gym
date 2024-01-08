const generate_button = document.getElementById('home-btn');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const workout = urlParams.get('workout');
create_list(workout);

generate_button.addEventListener('click', e => {
    e.preventDefault();
    window.location = '/hit_the_gym/index.html';
})

function create_list(exercises) {
    let count = 0;
    JSON.parse(exercises).forEach(exercise => {
        let exercise_list = count < 8 ? document.getElementById("round-1-list") : document.getElementById("round-2-list");
        var li = document.createElement('li');
        li.innerText = capitalizeFirstLetter(exercise);
        li.class = "exercise"
        exercise_list.appendChild(li);
        count++;
    })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}