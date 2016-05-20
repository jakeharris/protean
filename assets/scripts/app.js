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
  ],
    defensiveEffectivenesses = {
      weaknesses: {
        normal: ['fighting'],
        fire: ['water', 'ground', 'rock'],
        water: ['electric', 'grass'],
        grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
        electric: ['ground'],
        ground: ['water', 'grass', 'ice'],
        rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
        ice: ['fire', 'fighting', 'rock', 'steel'],
        steel: ['fire', 'fighting', 'ground'],
        fighting: ['flying', 'psychic', 'fairy'],
        psychic: ['bug', 'ghost', 'dark'],
        dark: ['fighting', 'bug', 'fairy'],
        ghost: ['ghost', 'dark'],
        fairy: ['poison', 'steel'],
        dragon: ['ice', 'dragon', 'fairy'],
        flying: ['electric', 'ice', 'rock'],
        poison: ['ground', 'psychic'],
        bug: ['fire', 'flying', 'rock']
      },
      resistances: {
        normal: [],
        fire: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'],
        water: ['fire', 'water', 'ice', 'steel'],
        grass: ['water', 'electric', 'grass', 'ground'],
        electric: ['electric', 'flying', 'steel'],
        ground: ['poison', 'rock'],
        rock: ['normal', 'fire', 'poison', 'flying'],
        ice: ['ice'],
        steel: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'],
        fighting: ['bug', 'rock', 'dark'],
        psychic: ['fighting', 'psychic'],
        dark: ['ghost', 'dark'],
        ghost: ['poison', 'bug'],
        fairy: ['fighting', 'bug', 'dark'],
        dragon: ['fire', 'water', 'electric', 'grass'],
        flying: ['grass', 'fighting', 'bug'],
        poison: ['grass', 'fighting', 'poison', 'bug', 'fairy'],
        bug: ['grass', 'fighting', 'ground']
      },
      immunities: {
        normal: ['ghost'],
        fire: [],
        water: [],
        grass: [],
        electric: [],
        ground: ['electric'],
        rock: [],
        ice: [],
        steel: ['poison'],
        fighting: [],
        psychic: [],
        dark: ['psychic'],
        ghost: ['normal', 'fighting'],
        fairy: ['dragon'],
        dragon: [],
        flying: ['ground'],
        poison: [],
        bug: []
      }
    },
    // offensive stuff may not be used...
    // technically calculable from the defensive
    // lists, but that'd take too long. the storage
    // burden is not that great here.
    offensiveEffectivenesses = {
      superEffective: {
        normal: [],
        fire: [],
        water: [],
        grass: [],
        electric: [],
        ground: [],
        rock: [],
        ice: [],
        steel: [],
        fighting: [],
        psychic: [],
        dark: [],
        ghost: [],
        fairy: [],
        dragon: [],
        flying: [],
        poison: [],
        bug: []
      },
      // better name for this and total immunity?
      notEffective: {
        normal: [],
        fire: [],
        water: [],
        grass: [],
        electric: [],
        ground: [],
        rock: [],
        ice: [],
        steel: [],
        fighting: [],
        psychic: [],
        dark: [],
        ghost: [],
        fairy: [],
        dragon: [],
        flying: [],
        poison: [],
        bug: []
      },
      ineffective: {
        normal: [],
        fire: [],
        water: [],
        grass: [],
        electric: [],
        ground: [],
        rock: [],
        ice: [],
        steel: [],
        fighting: [],
        psychic: [],
        dark: [],
        ghost: [],
        fairy: [],
        dragon: [],
        flying: [],
        poison: [],
        bug: []
      }
    },
    waitingContent = 'Type some Pokemon types!',
    waitingId = 'waiting',
    typeButtonHTML = '<div class="cancel">x</div>',
    selectedTypesArray = [];

var doubleWeak, weak, immune, doubleResistant, resistant,
    header, input, selectedTypes, typeEffectiveness;

// find indelible html elements so we don't have to search
// every single time
(function () {
  doubleWeak = document.getElementById('double-weak')
  weak = document.getElementById('weak')
  immune = document.getElementById('immune')
  doubleResistant = document.getElementById('double-resistant')
  resistant = document.getElementById('resistant')
  
  header = document.getElementsByTagName('header')[0]
  input = document.getElementsByTagName('input')[0]
  
  selectedTypes = document.getElementById('selected-types')
  typeEffectiveness = document.getElementById('type-effectiveness')
})();

// set up header state after loading
(function () {
  var randomType = function () {
    return types[Math.floor(Math.random() * (18))]
  }
  
  header.classList.add(randomType())
  
  input.value = ''
  
  var waitingDiv = document.createElement('div')
  waitingDiv.innerHTML = waitingContent
  waitingDiv.className = 'waiting'
  waitingDiv.id = waitingId
  selectedTypes.appendChild(waitingDiv)
})();

// respond to input
(function () {
  
  var timer = 0,
      timeLimit = 5000 //time in ms
  
  var isType = function (text) {
    return (types.indexOf(text) != -1)
  }  
  var createTypeButton = function (t) {
    // TODO
    var typeButton = document.createElement('div')
    typeButton.innerHTML = typeButtonHTML + t[0].toUpperCase() + t.slice(1)
    typeButton.className = t + ' type-button'
    
    var waitingDiv = document.getElementById(waitingId)
    if(waitingDiv !== null) waitingDiv.remove()
    
    if(selectedTypes.childElementCount > 1 || Date.now() - timer >= timeLimit) {
      var st = document.createElement('section')
      st.id = 'selected-types'
      st.className = 'selected-types'
      
      var main = document.getElementsByTagName('main')[0]
      main.removeChild(selectedTypes)
      main.insertBefore(st, typeEffectiveness)
      
      selectedTypes = st
      selectedTypesArray = []
    }
    selectedTypes.appendChild(typeButton)
    typeButton.addEventListener('click', clickWrapper)
    selectedTypesArray.push(t)
  }
  var appendTypeList = function (target, arr, title) {
    
    // clear the old stuff
    while(target.firstChild) target.removeChild(target.firstChild)
    
    if(arr.length > 0) {
      var listHeader = document.createElement('h2'),
          list = document.createElement('ul')
      
      listHeader.textContent = title
      target.appendChild(listHeader)
      target.appendChild(list)
    
      if(arr.length === 0)
        target.classList.add('hidden')
      
      for(var t in arr) {
        var typeItem = document.createElement('li')
        typeItem.textContent = arr[t][0].toUpperCase() + arr[t].slice(1)
        typeItem.className = arr[t] + ' type-card'
        list.appendChild(typeItem)
      }
    }
  }
  var updateTypeChartData = function () {
    'using strict';
    // this bit is honestly a pretty good use-case for angular...
    // but I think we can do it with less load time this way. 
    // we'll see I guess.
    var w, dw, i, r, dr
    w = []
    dw = []
    i = []
    r = []
    dr = []
    
    for(var typeIndex in selectedTypesArray) {
      var type = selectedTypesArray[typeIndex]
      
      // run through weaknesses
      for(var weaknessIndex in defensiveEffectivenesses.weaknesses[type]) {
        var weakness = defensiveEffectivenesses.weaknesses[type][weaknessIndex]
        if(w.indexOf(weakness) !== -1) {
          w.splice(w.indexOf(weakness), 1)
          dw.push(weakness)
        }
        else w.push(weakness)
      }
      // resistances
      for(var resistanceIndex in defensiveEffectivenesses.resistances[type]) {
        var resistance = defensiveEffectivenesses.resistances[type][resistanceIndex]
        if(r.indexOf(resistance) !== -1) {
          r.splice(w.indexOf(resistance), 1)
          dr.push(resistance)
        }
        else r.push(resistance)
      }
      // and immunities
      for(var immunityIndex in defensiveEffectivenesses.immunities[type]) {
        var immunity = defensiveEffectivenesses.immunities[type][immunityIndex]
        i.push(immunity)
      }
    }
    
    // if we were doubly weak to anything,
    // we shouldn't display that in the singly-
    // weak list
    var intersectionDWweak = dw.filter(function (weakness) {
      return w.indexOf(weakness) !== -1
    })
    for(var wi in intersectionDWweak) {
      w.splice(w.indexOf(intersectionDWweak[wi]), 1)
    }
    // same for resistances.
    var intersectionDRresistant = dr.filter(function (resistance) {
      return r.indexOf(resistance) !== -1
    })
    for(var ri in intersectionDRresistant) {
      r.splice(r.indexOf(intersectionDRresistant[ri]), 1)
    }
    // if we're immune, it shouldn't show up
    // in any list but the immunities
    var intersectionImmunityWeakResist = i.filter(function (immunity) {
      return w.indexOf(immunity) !== -1 || r.indexOf(immunity) !== -1
    })
    for(var ii in intersectionImmunityWeakResist) {
      var imm = intersectionImmunityWeakResist[ii]
      if(w.indexOf(imm) !== -1) 
        w.splice(w.indexOf(imm), 1)
      if(r.indexOf(imm))
        r.splice(r.indexOf(imm), 1)
    }
    // if we're weak AND resistant, it shouldn't
    // show up in any list
    var intersectionWeakResist = w.filter(function (weakness) {
      return (r.indexOf(weakness) !== -1)
    })
    for(var wii in intersectionWeakResist) {
      w.splice(w.indexOf(intersectionWeakResist[wii]), 1)
      r.splice(r.indexOf(intersectionWeakResist[wii]), 1)
    }
    dw.sort()
    w.sort()
    i.sort()
    dr.sort()
    r.sort()
    appendTypeList(doubleWeak, dw, "4x")
    appendTypeList(weak, w, "2x")
    appendTypeList(immune, i, "0x")
    appendTypeList(doubleResistant, dr, "1/4x")
    appendTypeList(resistant, r, "1/2x")
  }
  var consumeInput = function (e) {
    var val = e.value.toLowerCase()
    if(isType(val)) {
      var t = val
      if(Date.now() - timer < timeLimit && selectedTypesArray.length < 2 && selectedTypesArray.indexOf(t) !== -1) {}
      else {
        createTypeButton(t)
        updateTypeChartData()
      }
      e.value = ''
      timer = Date.now()
    }
  }
  var setHeaderColor = function (e) {
    if(isType(e.value.toLowerCase()))
      header.className = e.value.toLowerCase()
  }
  var escapeUpWrapper = function (e) {
    if(e.keyCode === 27) {
      var typeToRemove = selectedTypes.lastChild
      selectedTypesArray.splice(selectedTypesArray.indexOf(typeToRemove.textContent.slice(1)), 1)
      selectedTypes.removeChild(typeToRemove)
      updateTypeChartData()
      timer = Date.now()
    }
    return false;
  }
  var keyDownWrapper = function (e) {
    if(e.keyCode === 8 && this.value === '') {
      var typeToRemove = selectedTypes.lastChild
      selectedTypesArray.splice(selectedTypesArray.indexOf(typeToRemove.textContent.slice(1)), 1)
      selectedTypes.removeChild(typeToRemove)
      updateTypeChartData()
      timer = Date.now()
    }
  }
  var keyupWrapper = function (e) {
    if((e.keyCode === 8 && this.value === '')
      || e.keyCode === 27) {
      return false
    }
    setHeaderColor(this)
    consumeInput(this)
  }
  var clickWrapper = function () {
    selectedTypesArray.splice(selectedTypesArray.indexOf(this.textContent.toString().toLowerCase().slice(1)), 1)
    selectedTypes.removeChild(this)
    updateTypeChartData()
    timer = Date.now()
  }
  document.onkeydown = function (e) {
    if(e.keyCode === 27) e.preventDefault()
    input.focus()
  }
  document.onkeyup = escapeUpWrapper
  input.onkeydown = keyDownWrapper
  input.onkeyup = keyupWrapper
})();
