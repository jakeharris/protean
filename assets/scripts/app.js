var types = [
    'normal',
    'fire',
    'water',
    'grass',
    'electric',
    'ground',
    'rock',
    'ice',
    'steel',
    'fighting',
    'psychic',
    'dark',
    'ghost',
    'fairy',
    'dragon',
    'flying',
    'poison',
    'bug'
  ];


(function () {
  var randomType = function () {
    return types[Math.floor(Math.random() * (18))]
  }
  
  document.getElementsByTagName('header')[0].classList.add(randomType())
})()