const result = document.getElementById('result');
const select_attacker = document.getElementById('select-attacker');
const select_defender = document.getElementById('select-defender');

let selectedOption_1 = select_attacker.options[select_attacker.selectedIndex].text;
let selectedOption_2 = select_defender.options[select_defender.selectedIndex].text;

select_attacker.addEventListener('change', function() {
    selectedOption_1 = this.options[select_attacker.selectedIndex].text;
    battle(selectedOption_1, selectedOption_2, 50, 35);
});

select_defender.addEventListener('change', function() {
    selectedOption_2 = this.options[select_defender.selectedIndex].text; 
    battle(selectedOption_1, selectedOption_2, 50, 35);
});

const typeChart = {
    'fire': {
        'grass': true,
        'water': false,
        'fire': false,
    },
    'water': {
        'fire': true,
        'grass': false,
        'water': false,
    },
    'grass': {
        'water': true,
        'fire': false,
        'grass': false,
    },
    'electric': {
        'water': true,
        'grass': false,
        'electric': false,
    },
};

const typeId = {
    'electric': 25,
    'grass': 1,
    'fire': 6,
    'water': 8,
};

function battle(attacker, defender, attack, defense) {

    console.log('Attacker: ' + attacker + '\nDefender: ' + defender + '\nAttack: ' + attack + '\nDefense: ' + defense);

    let efectividad = 1.0;
    let url_attacker = `https://pokeapi.co/api/v2/pokemon/${typeId[attacker]}`;
    let url_defender = `https://pokeapi.co/api/v2/pokemon/${typeId[defender]}`

    fetch(url_attacker).then(response => response.json()).then(data => {
        document.getElementById('poke-name-1').innerHTML = `${data.name}`;
        document.getElementById('poke-1').src = `${data.sprites.front_default}`;
    }).catch(err => {
        console.log(this.err);
    });

    fetch(url_defender).then(response => response.json()).then(data => {
        document.getElementById('poke-name-2').innerHTML = `${data.name}`;
        document.getElementById('poke-2').src = `${data.sprites.front_default}`;
    }).catch(err => {
        console.log(this.err);
    });

    if (attack < 0 || attack > 100 || defense < 0 || defense > 100) {
        throw new Error('Valor del ataque o defensa invalidos');
    }

    if (typeChart[attacker][defender]) {
        efectividad = 2.0;
        document.getElementById('msg').innerHTML = '¡Es súper efectivo!';
    }
    else if (typeChart[attacker][defender] === undefined) {
        document.getElementById('msg').innerHTML = '¡Es neutro!';
    } else if (!typeChart[attacker][defender]) {
        efectividad = 0.5;
        document.getElementById('msg').innerHTML = '¡No es muy efectivo!';
    }

    let damage = 50 * (attack / defense) * efectividad;
    result.innerHTML = 'Damage: ' + Math.round(damage);
}

window.onload = main();

function main() {
    battle(selectedOption_1, selectedOption_2, 50, 35);
}