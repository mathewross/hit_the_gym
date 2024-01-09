const home_button = document.getElementById('home-btn');
const copy_button = document.getElementById('copy-btn');
const workout_container = document.getElementById('workout-container');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const workout = urlParams.get('workout');
let workout_string = '';

create_list(workout);

home_button.addEventListener('click', e => {
    e.preventDefault();
    window.location = '/hit_the_gym/index.html';
})

copy_button.addEventListener('click', e => {
    e.preventDefault();
    navigator.clipboard.writeText(workout_string);

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Workout copied!";
})


function create_list(rounds) {
    let round_counter = 1;
    let exercise_counter = 1;

    JSON.parse(rounds).forEach(round => {
        workout_string += 'Round ' + String(round_counter) + '\n';
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
            workout_string += capitalizeFirstLetter(exercise) + '\n';
            var li = document.createElement('li');
            li.innerText = capitalizeFirstLetter(exercise);
            li.className = "exercise"
            ul.appendChild(li);

            exercise_counter++;
        })

        workout_string += '\n';
        workout_container.appendChild(section);
        round_counter++;
    })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
  }