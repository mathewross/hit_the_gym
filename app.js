const api_key = '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';
const form = document.querySelector('.form');
const generate_button = document.getElementById('generate-workout-btn');
let all_exercises = [];

fetch('exercises.json')
    .then((response) => response.json())
    .then((json) => read_json(json));

generate_button.addEventListener('click', e => {
    e.preventDefault();

    let exercises_per_round = form.exercises_per_round.value;
    let rounds = form.number_of_rounds.value;
    let workout = [];
    var remaining_exercises = all_exercises.slice();

    for(let i = 0; i < rounds; i++) {
        round_workout = [];

        for(let e = 0; e < exercises_per_round; e++) {
            if (remaining_exercises.length == 0) { 
                remaining_exercises = all_exercises.slice();
            }
    
            let index = getRndInteger(0, remaining_exercises.length - 1);
            round_workout.push(remaining_exercises[index]);
            remaining_exercises.splice(index, 1);
        }

        workout.push(round_workout);
    }

    window.location = '/hit_the_gym/workout.html?workout=' + JSON.stringify(workout);
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
        li.className = "exercise"
        exercise_list.appendChild(li);
    })
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateList() {
    fetch('github.com/repos/mathewross/hit_the_gym/contents/exercises.json', {
        owner: 'mathewross',
        repo: 'hit_the_gym',
        path: 'exercises.json',
        message: 'update exercises',
        committer: {
          name: 'Mathew Ros',
          email: 'matross92@gmail.com'
        },
        content: JSON.stringify(all_exercises),
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
}