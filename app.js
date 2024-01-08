const form = document.querySelector('.form');
const generate_button = document.getElementById('generate-workout-btn');
let all_exercises = [];

fetch('exercises.json')
    .then((response) => response.json())
    .then((json) => read_json(json));

generate_button.addEventListener('click', e => {
    e.preventDefault();
    let workout = [];
    let remaining_exercises = all_exercises;
    for(let i = 0; i < 16; i++) {
        if (remaining_exercises.length == 0) { 
            remaining_exercises = all_exercises;
        }

        let index = getRndInteger(0, remaining_exercises.length - 1);
        workout.push(remaining_exercises[index]);
        remaining_exercises.splice(index, 1);
    }

    window.location = '/workout.html?workout=' + JSON.stringify(workout);
})

function read_json(exercises) {
    all_exercises = exercises;
    create_list(exercises);
}

function create_list(exercises) {
    document.querySelectorAll('.exercise').forEach(e => e.remove());
    let exercise_list = document.getElementById("exercise-list");
    exercises.forEach(exercise => {
        var li = document.createElement('li');
        li.innerText = capitalizeFirstLetter(exercise);
        li.class = "exercise"
        exercise_list.appendChild(li);
    })
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}