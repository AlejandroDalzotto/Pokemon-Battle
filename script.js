const result = document.getElementById('result');
const select_attacker = document.getElementById('select-attacker');
const select_defender = document.getElementById('select-defender');

let selectedOption_1 = select_attacker.options[select_attacker.selectedIndex].text;
let selectedOption_2 = select_defender.options[select_defender.selectedIndex].text;

select_attacker.addEventListener('change', function () {
    selectedOption_1 = this.options[select_attacker.selectedIndex].text;
    battle(selectedOption_1, selectedOption_2, 50, 35);
});

select_defender.addEventListener('change', function () {
    selectedOption_2 = this.options[select_defender.selectedIndex].text;
    battle(selectedOption_1, selectedOption_2, 50, 35);
});

/**
 * 'si' = Super efectivo: efectividad al 2.0 (200%)
 * 'no' = No es muy efectivo: efectividad al 0.5 (50%)
 * 'nulo' Es neutro: efectividad al 1.0 (100%)
 */

const typeChart = {
    'normal': {
        'normal': 'nulo',
        'fire': 'nulo',
        'water': 'nulo',
        'electric': 'nulo',
        'grass': 'nulo',
        'ice': 'nulo',
        'fighting': 'nulo',
        'poison': 'nulo',
    },
    'fire': {
        'normal': 'nulo',
        'grass': 'si',
        'water': 'no',
        'fire': 'no',
        'electric': 'no',
        'ice': 'si',
        'fighting': 'nulo',
        'poison': 'nulo',
    },
    'water': {
        'normal': 'nulo',
        'fire': 'si',
        'grass': 'no',
        'water': 'no',
        'electric': 'nulo',
        'ice': 'nulo',
        'fighting': 'nulo',
        'poison': 'nulo',
    },
    'grass': {
        'normal': 'nulo',
        'water': 'si',
        'fire': 'no',
        'grass': 'no',
        'poison': 'no',
        'electric': 'nulo',
        'ice': 'nulo',
        'fighting': 'nulo',
    },
    'electric': {
        'normal': 'nulo',
        'fire': 'nulo',
        'water': 'si',
        'grass': 'no',
        'electric': 'no',
        'ice': 'nulo',
        'fighting': 'nulo',
        'poison': 'nulo',
    },
    'ice': {
        'normal': 'nulo',
        'fire': 'no',
        'water': 'no',
        'electric': 'nulo',
        'grass': 'si',
        'ice': 'no',
        'fighting': 'nulo',
        'poison': 'nulo',
    },
    'fighting': {
        'normal': 'si',
        'fire': 'nulo',
        'water': 'nulo',
        'electric': 'nulo',
        'grass': 'nulo',
        'ice': 'si',
        'poison': 'no',
        'fighting': 'nulo',
    },
    'poison': {
        'normal': 'nulo',
        'fire': 'nulo',
        'water': 'nulo',
        'electric': 'nulo',
        'grass': 'si',
        'ice': 'nulo',
        'fighting': 'nulo',
        'poison': 'no',
    },
};

const typeId = {
    'electric': 25,
    'grass': 1,
    'fire': 6,
    'water': 8,
    'normal': 16,
    'poison': 24,
    'fighting': 67,
    'ice': 471,
};

function battle(attacker, defender, attack, defense) {

    let efectividad = 1.0;
    let url_attacker = `https://pokeapi.co/api/v2/pokemon/${typeId[attacker]}`;
    let url_defender = `https://pokeapi.co/api/v2/pokemon/${typeId[defender]}`;

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

    if (typeChart[attacker][defender] === 'si') {
        efectividad = 2.0;
        document.getElementById('msg').innerHTML = '¡Es súper efectivo!';
    }
    else if (typeChart[attacker][defender] === 'nulo') {
        efectividad = 1.0;
        document.getElementById('msg').innerHTML = '¡Es neutro!';
    } else if (typeChart[attacker][defender] === 'no') {
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