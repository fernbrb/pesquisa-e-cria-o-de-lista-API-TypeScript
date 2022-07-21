var apiKey: string = '';
var requestToken: string;
var username: string = ''
var password: string = ''
var sessionId: string;
var listId: string | number = '';
var listName: string;
var description: string;
var filmeId: string | number;

var loginButton = document.getElementById('login-button') as HTMLButtonElement;
var searchButton = document.getElementById('search-button') as HTMLButtonElement;
var searchContainer = document.getElementById('search-container') as HTMLDivElement;
var listCreator = document.getElementById('criar-lista') as HTMLButtonElement;
var listCatcher = document.getElementById('pegar-lista') as HTMLButtonElement;
var listIdConf = document.getElementById('id-lista') as HTMLInputElement;
var listNameConf = document.getElementById('nome-lista') as HTMLInputElement;
var descriptionConf = document.getElementById('descricao-lista') as HTMLInputElement;
var addMovieButton = document.getElementById('adicionar-filme-lista') as HTMLButtonElement;
var filmeNovo = document.getElementById('filme-novo') as HTMLParagraphElement;
var managerContainer = document.getElementById('manager') as HTMLDivElement;
var listaAtual = document.getElementById('lista-atual') as HTMLDivElement;
var newListContainer = document.getElementById('new-list-container') as HTMLDivElement;


loginButton?.addEventListener('click', async () => {
  eraseNewList();
  await criarRequestToken();
  await logar();
  await criarSessao();
  await validateIdInput();
})

searchButton?.addEventListener('click', async () => {
  eraseNewList();
  let lista = document.getElementById("pesquisa");
  if (lista) {
    lista.outerHTML = "";
  }
  let search = document.getElementById('search') as HTMLInputElement;
  let query = search.value;
  let listaDeFilmes = await procurarFilme(query);
  let ul = document.createElement('ul');
  ul.id = "pesquisa";
  ul.className = 'blue';
  for (const item of listaDeFilmes.results) {
    let li = document.createElement('li');
    li.className = 'blue';
    li.appendChild(document.createTextNode(item.original_title));
    ul.appendChild(li);
     //Tudo abaixo daqui é experimental, NÃO MEXE EM CIMA PRA NÃO QUEBRAR NADA
     li.addEventListener('mouseover', () => {
      li.className = '';
      li.style.background = 'white';
      validateMovieButton();
     })
     li.addEventListener('mouseout', () => {
      li.className = 'blue';
      li.style.background = '';
      validateMovieButton();
     })
      li.addEventListener('click', () => {
      if (window.confirm('Deseja adicionar o filme à àrea de transferência?')) {
        if(listId && sessionId) {
        filmeId = item.id;
        validateMovieButton();
        if (filmeNovo) {
          filmeNovo.innerHTML = '';
        }
        filmeNovo.innerHTML = `Filme que será adicionado: ${item.original_title}`;
        filmeNovo.style.color = 'red';
        filmeNovo.style.marginBottom = '5px';
        return filmeId;
        } else {
          window.alert('Não há lista selecionada. Escolha sua lista ou crie uma nova antes de adicionar itens à ela')
        }
        }
      })
  console.log(listaDeFilmes);
  searchContainer.appendChild(ul);
}
})

function preencherSenha() {
  let passwordConf = document.getElementById('senha') as HTMLInputElement;
  password = passwordConf.value;
  validateLoginButton();
}

function preencherLogin() {
  let usernameConf = document.getElementById('login') as HTMLInputElement;
  username = usernameConf.value;
  validateLoginButton();
}

function preencherApi() {
  let apiKeyConf = document.getElementById('api-key') as HTMLInputElement
  apiKey = apiKeyConf.value;
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

listCreator?.addEventListener('click', async () => {
  eraseNewList();
  await criarLista(listName, description)
  let lista = document.getElementById('lista-nova') as HTMLDivElement;
  if (lista) {
    lista.outerHTML = "";
  }
  let div = document.createElement('div');
  div.id = 'lista-nova';
  div.className = 'blue-new-list';
  newListContainer.appendChild(div);
  div.innerHTML = `Lista nova criada: ${listName} <br> Descrição: ${description} <br> ID da lista: ${listId}`
})

function eraseNewList() {
  newListContainer.innerHTML = '';
}

function validateListButton() {
  if (listName && description && sessionId) {
    listCreator.disabled = false;
  } else {
    listCreator.disabled = true;
  }
}
function preencherNomeLista() {
  listName = listNameConf.value;
  validateListButton();
}

function preencherDescricao() {
  description = descriptionConf.value;
  validateListButton();
}

async function getList()  {
  eraseNewList();
  let mostrarLista = await pegarLista(listId);
  let thisListName = mostrarLista.name;
  let thisListDescription = mostrarLista.description;
  let thisListId = mostrarLista.id;
  if (listaAtual) {
    listaAtual.innerHTML = "";
  }
  listaAtual.innerHTML = `Lista: ${thisListName} <br> Descrição: ${thisListDescription} <br> ID da lista: ${thisListId} <br> Filmes:`
  let ul = document.createElement('ul');
  ul.id = 'filmes-lista-atual';
  ul.className = 'blue';
  listaAtual.appendChild(ul);
  for (const item of mostrarLista.items) {
    let li = document.createElement('li');
    li.className = 'blue';
    li.appendChild(document.createTextNode(item.original_title));
    ul.appendChild(li);
  }
  console.log(mostrarLista);
  
}

async function validateIdInput() {
  if (sessionId) {
    listIdConf.disabled = false;
    listNameConf.disabled = false;
    descriptionConf.disabled = false;
  } else {
    listIdConf.disabled = true;
    listNameConf.disabled = false;
    descriptionConf.disabled = false;
  }
}

function preencherId() {
  listId = listIdConf.value;
  validateListGetButton();
}

function validateListGetButton() {
  if (listId && sessionId) {
    listCatcher.disabled = false;
  } else {
    listCatcher.disabled = true;
  }
}

async function passarFilmeLista() {
  if (filmeId) {
    await adicionarFilmeNaLista(filmeId, listId)
    await getList()
  }
}
  


addMovieButton.addEventListener('click',async () => {
  eraseNewList();
  if (filmeId) {
    if (window.confirm('Deseja adicionar o filme à lista?')) {
    await adicionarFilmeNaLista(filmeId, listId);
    await getList();
    filmeNovo.innerHTML = '';
    }} else {
      window.alert('Não há filme selecionado. Selecione um filme antes de adicioná-lo a uma lista.')
    } 
  
})

function validateMovieButton() {
  if (filmeId) {
    addMovieButton.disabled = false;
  } else {
    addMovieButton.disabled = true;
  }
}

class HttpClient {
  static async get({ url, method, body = null }) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        body = JSON.stringify(body);
      }
      request.send(body);
    })
  }
}

async function procurarFilme(query: string) {
  query = encodeURI(query)
  console.log(query)
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: "GET"
  })
  return result
}

async function adicionarFilme(filmeId: string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    method: "GET"
  })
  console.log(result);
}

async function criarRequestToken() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: "GET"
  })
  requestToken = result.request_token
}

async function logar() {
  await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    method: "POST",
    body: {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`
    }
  })
}

async function criarSessao() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: "GET"
  })
  sessionId = result.session_id;
}

async function criarLista(nomeDaLista: string, descricao: string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  })
  listId = result.list_id
  console.log(result);
}

async function adicionarFilmeNaLista(filmeId: string | number, listaId: string | number) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  })
  console.log(result);
}

async function pegarLista(listId: string | number) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    method: "GET"
  })
  console.log(result);
  return result;
}
