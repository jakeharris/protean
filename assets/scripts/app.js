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

var waitingContent = "Awaiting types...";

// set up header state after loading
(function () {
  var randomType = function () {
    return types[Math.floor(Math.random() * (18))]
  }
  
  var header = document.getElementsByTagName('header')[0]
  header.classList.add(randomType())
  
  var input = document.getElementsByTagName('input')[0]
  input.value = ''
  
  var selectedTypes = document.getElementById('selected-types'),
      waitingDiv = document.createElement('div')
  waitingDiv.innerHTML = waitingContent
  waitingDiv.className = 'waiting'
  selectedTypes.appendChild(waitingDiv)
})();

// respond to input
(function () {
  var isColor = function (text) {
    return (types.indexOf(text) != -1)
  }  
  var createTypeButton = function (c) {
    // TODO
  }
  var updateTypeChartData = function (c) {
    // TODO
  }
  var consumeInput = function (e) {
    if(isColor(e.value)) {
      var c = e.value
      createTypeButton(c)
      updateTypeChartData(c)
      e.value = ''
    }
  }
  var setHeaderColor = function (e) {
    if(isColor(e.value))
      header.className = e.value
  }
  var keyupWrapper = function () {
    setHeaderColor(this)
    consumeInput(this)
  }
  var header = document.getElementsByTagName('header')[0]
  var input = document.getElementsByTagName('input')[0]
  input.onkeyup = keyupWrapper
})();
