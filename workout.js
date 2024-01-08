const generate_button = document.getElementById('home-btn');
const workout_container = document.getElementById('workout-container');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const workout = urlParams.get('workout');

create_list(workout);

generate_button.addEventListener('click', e => {
    e.preventDefault();
    window.location = '/hit_the_gym/index.html';
})

function create_list(rounds) {
    let round_counter = 1;
    let exercise_counter = 1;
    JSON.parse(rounds).forEach(round => {
        var section = document.createElement('section');
        var section_title = document.createElement('h1');
        section_title.innerText = "Round " + String(round_counter);
        section_title.className = 'section-title';
        var inner_div = document.createElement('div');
        inner_div.className = 'rounds-container';
        section.appendChild(section_title);
        section.appendChild(inner_div);

        var ul = document.createElement('ul');
        inner_div.appendChild(ul);

        round.forEach(exercise => {
            var li = document.createElement('li');
            li.innerText = capitalizeFirstLetter(exercise);
            li.className = "exercise"
            ul.appendChild(li);

            exercise_counter++;
        })

        workout_container.appendChild(section);
        round_counter++;
    })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}