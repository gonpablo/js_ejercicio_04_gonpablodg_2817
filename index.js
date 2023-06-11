// Capturando Elementos
const inputPokemon = document.getElementById("input-pokemon");
const formPokemon = document.getElementById("form-pokemon");
const formResult = document.getElementById("form-result");


// Llamada a la API
const requestPokemon = async (input) => {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
		return await response.json();

    } catch (error) {
      console.log("Error", error);
    }
};


// Funciones auxiliares
const IsEmptyInput = (input) => {
  return input === "";
}

const dividerPokemon = (text) => {
  return text / 10;
}


// Funciones principales
const showAlert = (message) => {
  return formResult.innerHTML = `
  <div class="alert alert-danger" style="margin-top: 40px;">${message}</div>`;
}



const renderTypesPokemon = (types) => {
  return types.map(i => {
      return `${i.type.name}`
  }).join(", ");
}


const showTemplateCard = (pokemon) => {
    const { id, name, sprites, height, weight, types } = pokemon;
    return `
    <div class="card">
      <img src="${sprites.other.home.front_default}" class="card-img-top">
      <div class="card-body">
          <h4 class="card-title">${id}. ${name}</h4>
          <h6>Tipo: ${renderTypesPokemon(types)}</h6>
          <hr>
          <p class="card-text"><strong>Altura:</strong> ${dividerPokemon(height)} mts.</p>
          <p class="card-text"><strong>Peso:</strong> ${dividerPokemon(weight)} kg.</p>
      </div>
    </div>`;
}

const renderTemplateCard = (pokemon) => {
  formResult.innerHTML = showTemplateCard(pokemon);
};


//  Validacion
const checkInput = async (input) => {
    //  Validacion no se ingreso numero
    if (IsEmptyInput(input)) {
      showAlert("Ingrese un numero");
      return;
    }

    try {
      const reqPokemon = await requestPokemon(input);
      renderTemplateCard(reqPokemon);
    } catch (error) {
      console.log("Error", error);
      showAlert("Ingrese un numero de Pokemon valido");
    }

    formPokemon.reset(); 
    return;
};


// Funcion principal
const showPokemon = (e) => {
  e.preventDefault();  
  checkInput(inputPokemon.value.trim());
}


// Inicializacion de eventos
const init = () => {
  formPokemon.addEventListener("submit", showPokemon);
}

init();