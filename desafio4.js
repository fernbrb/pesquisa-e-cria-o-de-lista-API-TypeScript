var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var apiKey = '';
var requestToken;
var username = '';
var password = '';
var sessionId;
var listId = '';
var listName;
var description;
var filmeId;
var loginButton = document.getElementById('login-button');
var searchButton = document.getElementById('search-button');
var searchContainer = document.getElementById('search-container');
var listCreator = document.getElementById('criar-lista');
var listCatcher = document.getElementById('pegar-lista');
var listIdConf = document.getElementById('id-lista');
var listNameConf = document.getElementById('nome-lista');
var descriptionConf = document.getElementById('descricao-lista');
var addMovieButton = document.getElementById('adicionar-filme-lista');
var filmeNovo = document.getElementById('filme-novo');
var managerContainer = document.getElementById('manager');
var listaAtual = document.getElementById('lista-atual');
var newListContainer = document.getElementById('new-list-container');
loginButton === null || loginButton === void 0 ? void 0 : loginButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                eraseNewList();
                return [4 /*yield*/, criarRequestToken()];
            case 1:
                _a.sent();
                return [4 /*yield*/, logar()];
            case 2:
                _a.sent();
                return [4 /*yield*/, criarSessao()];
            case 3:
                _a.sent();
                return [4 /*yield*/, validateIdInput()];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
    var lista, search, query, listaDeFilmes, ul, _loop_1, _i, _a, item;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                eraseNewList();
                lista = document.getElementById("pesquisa");
                if (lista) {
                    lista.outerHTML = "";
                }
                search = document.getElementById('search');
                query = search.value;
                return [4 /*yield*/, procurarFilme(query)];
            case 1:
                listaDeFilmes = _b.sent();
                ul = document.createElement('ul');
                ul.id = "pesquisa";
                ul.className = 'blue';
                _loop_1 = function (item) {
                    var li = document.createElement('li');
                    li.className = 'blue';
                    li.appendChild(document.createTextNode(item.original_title));
                    ul.appendChild(li);
                    //Tudo abaixo daqui é experimental, NÃO MEXE EM CIMA PRA NÃO QUEBRAR NADA
                    li.addEventListener('mouseover', function () {
                        li.className = '';
                        li.style.background = 'white';
                        validateMovieButton();
                    });
                    li.addEventListener('mouseout', function () {
                        li.className = 'blue';
                        li.style.background = '';
                        validateMovieButton();
                    });
                    li.addEventListener('click', function () {
                        if (window.confirm('Deseja adicionar o filme à àrea de transferência?')) {
                            if (listId && sessionId) {
                                filmeId = item.id;
                                validateMovieButton();
                                if (filmeNovo) {
                                    filmeNovo.innerHTML = '';
                                }
                                filmeNovo.innerHTML = "Filme que ser\u00E1 adicionado: ".concat(item.original_title);
                                filmeNovo.style.color = 'red';
                                filmeNovo.style.marginBottom = '5px';
                                return filmeId;
                            }
                            else {
                                window.alert('Não há lista selecionada. Escolha sua lista ou crie uma nova antes de adicionar itens à ela');
                            }
                        }
                    });
                    console.log(listaDeFilmes);
                    searchContainer.appendChild(ul);
                };
                for (_i = 0, _a = listaDeFilmes.results; _i < _a.length; _i++) {
                    item = _a[_i];
                    _loop_1(item);
                }
                return [2 /*return*/];
        }
    });
}); });
function preencherSenha() {
    var passwordConf = document.getElementById('senha');
    password = passwordConf.value;
    validateLoginButton();
}
function preencherLogin() {
    var usernameConf = document.getElementById('login');
    username = usernameConf.value;
    validateLoginButton();
}
function preencherApi() {
    var apiKeyConf = document.getElementById('api-key');
    apiKey = apiKeyConf.value;
    validateLoginButton();
}
function validateLoginButton() {
    if (password && username && apiKey) {
        loginButton.disabled = false;
    }
    else {
        loginButton.disabled = true;
    }
}
listCreator === null || listCreator === void 0 ? void 0 : listCreator.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
    var lista, div;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                eraseNewList();
                return [4 /*yield*/, criarLista(listName, description)];
            case 1:
                _a.sent();
                lista = document.getElementById('lista-nova');
                if (lista) {
                    lista.outerHTML = "";
                }
                div = document.createElement('div');
                div.id = 'lista-nova';
                div.className = 'blue-new-list';
                newListContainer.appendChild(div);
                div.innerHTML = "Lista nova criada: ".concat(listName, " <br> Descri\u00E7\u00E3o: ").concat(description, " <br> ID da lista: ").concat(listId);
                return [2 /*return*/];
        }
    });
}); });
function eraseNewList() {
    newListContainer.innerHTML = '';
}
function validateListButton() {
    if (listName && description && sessionId) {
        listCreator.disabled = false;
    }
    else {
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
function getList() {
    return __awaiter(this, void 0, void 0, function () {
        var mostrarLista, thisListName, thisListDescription, thisListId, ul, _i, _a, item, li;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    eraseNewList();
                    return [4 /*yield*/, pegarLista(listId)];
                case 1:
                    mostrarLista = _b.sent();
                    thisListName = mostrarLista.name;
                    thisListDescription = mostrarLista.description;
                    thisListId = mostrarLista.id;
                    if (listaAtual) {
                        listaAtual.innerHTML = "";
                    }
                    listaAtual.innerHTML = "Lista: ".concat(thisListName, " <br> Descri\u00E7\u00E3o: ").concat(thisListDescription, " <br> ID da lista: ").concat(thisListId, " <br> Filmes:");
                    ul = document.createElement('ul');
                    ul.id = 'filmes-lista-atual';
                    ul.className = 'blue';
                    listaAtual.appendChild(ul);
                    for (_i = 0, _a = mostrarLista.items; _i < _a.length; _i++) {
                        item = _a[_i];
                        li = document.createElement('li');
                        li.className = 'blue';
                        li.appendChild(document.createTextNode(item.original_title));
                        ul.appendChild(li);
                    }
                    console.log(mostrarLista);
                    return [2 /*return*/];
            }
        });
    });
}
function validateIdInput() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (sessionId) {
                listIdConf.disabled = false;
                listNameConf.disabled = false;
                descriptionConf.disabled = false;
            }
            else {
                listIdConf.disabled = true;
                listNameConf.disabled = false;
                descriptionConf.disabled = false;
            }
            return [2 /*return*/];
        });
    });
}
function preencherId() {
    listId = listIdConf.value;
    validateListGetButton();
}
function validateListGetButton() {
    if (listId && sessionId) {
        listCatcher.disabled = false;
    }
    else {
        listCatcher.disabled = true;
    }
}
function passarFilmeLista() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!filmeId) return [3 /*break*/, 3];
                    return [4 /*yield*/, adicionarFilmeNaLista(filmeId, listId)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getList()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
addMovieButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                eraseNewList();
                if (!filmeId) return [3 /*break*/, 4];
                if (!window.confirm('Deseja adicionar o filme à lista?')) return [3 /*break*/, 3];
                return [4 /*yield*/, adicionarFilmeNaLista(filmeId, listId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, getList()];
            case 2:
                _a.sent();
                filmeNovo.innerHTML = '';
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                window.alert('Não há filme selecionado. Selecione um filme antes de adicioná-lo a uma lista.');
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
function validateMovieButton() {
    if (filmeId) {
        addMovieButton.disabled = false;
    }
    else {
        addMovieButton.disabled = true;
    }
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.get = function (_a) {
        var url = _a.url, method = _a.method, _b = _a.body, body = _b === void 0 ? null : _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var request = new XMLHttpRequest();
                        request.open(method, url, true);
                        request.onload = function () {
                            if (request.status >= 200 && request.status < 300) {
                                resolve(JSON.parse(request.responseText));
                            }
                            else {
                                reject({
                                    status: request.status,
                                    statusText: request.statusText
                                });
                            }
                        };
                        request.onerror = function () {
                            reject({
                                status: request.status,
                                statusText: request.statusText
                            });
                        };
                        if (body) {
                            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                            body = JSON.stringify(body);
                        }
                        request.send(body);
                    })];
            });
        });
    };
    return HttpClient;
}());
function procurarFilme(query) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = encodeURI(query);
                    console.log(query);
                    return [4 /*yield*/, HttpClient.get({
                            url: "https://api.themoviedb.org/3/search/movie?api_key=".concat(apiKey, "&query=").concat(query),
                            method: "GET"
                        })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function adicionarFilme(filmeId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/movie/".concat(filmeId, "?api_key=").concat(apiKey, "&language=en-US"),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
function criarRequestToken() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/authentication/token/new?api_key=".concat(apiKey),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    requestToken = result.request_token;
                    return [2 /*return*/];
            }
        });
    });
}
function logar() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=".concat(apiKey),
                        method: "POST",
                        body: {
                            username: "".concat(username),
                            password: "".concat(password),
                            request_token: "".concat(requestToken)
                        }
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function criarSessao() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/authentication/session/new?api_key=".concat(apiKey, "&request_token=").concat(requestToken),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    sessionId = result.session_id;
                    return [2 /*return*/];
            }
        });
    });
}
function criarLista(nomeDaLista, descricao) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/list?api_key=".concat(apiKey, "&session_id=").concat(sessionId),
                        method: "POST",
                        body: {
                            name: nomeDaLista,
                            description: descricao,
                            language: "pt-br"
                        }
                    })];
                case 1:
                    result = _a.sent();
                    listId = result.list_id;
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
function adicionarFilmeNaLista(filmeId, listaId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/list/".concat(listaId, "/add_item?api_key=").concat(apiKey, "&session_id=").concat(sessionId),
                        method: "POST",
                        body: {
                            media_id: filmeId
                        }
                    })];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
function pegarLista(listId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/list/".concat(listId, "?api_key=").concat(apiKey),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/, result];
            }
        });
    });
}
