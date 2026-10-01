function dentro(fila, columna) {
    return fila >= 0 && fila < 20 && columna >= 0 && columna < 20;
}


function esUnaMeta(posicion, metas) {

    for (let i = 0; i < metas.length; i++) {

        if (posicion.fila == metas[i].fila &&
            posicion.columna == metas[i].columna) {

            return true;
        }
    }

    return false;
}


function costeDeMeta(posicion, metas, costesMetas) {

    for (let i = 0; i < metas.length; i++) {

        if (posicion.fila == metas[i].fila &&
            posicion.columna == metas[i].columna) {

            return costesMetas[i];
        }
    }

    return 0;
}


function vecinos(posicion, obstaculos) {

    let fila = posicion.fila;
    let columna = posicion.columna;

    let posibles = [
        { fila: fila - 1, columna: columna },
        { fila: fila + 1, columna: columna },
        { fila: fila, columna: columna - 1 },
        { fila: fila, columna: columna + 1 }
    ];

    let resultado = [];

    for (let i = 0; i < posibles.length; i++) {

        let vecino = posibles[i];

        if (dentro(vecino.fila, vecino.columna)) {

            let numero =
                vecino.fila * 20 + vecino.columna;

            if (!obstaculos[numero]) {

                resultado[resultado.length] = vecino;
            }
        }
    }

    return resultado;
}


// =========================
// BFS
// =========================

function bfs(inicio, metas, obstaculos) {

    let cola = [];
    let visitados = [];
    let padre = [];
    let orden = [];

    if (!inicio || metas.length == 0) {

        return {
            orden: orden,
            ruta: []
        };
    }

    let inicioNumero =
        inicio.fila * 20 + inicio.columna;

    cola[0] = inicio;
    visitados[inicioNumero] = true;
    padre[inicioNumero] = -1;

    let metaEncontrada = null;

    while (cola.length > 0) {

        let actual = cola.shift();

        orden[orden.length] = actual;

        if (esUnaMeta(actual, metas)) {

            metaEncontrada = actual;
            break;
        }

        let listaVecinos =
            vecinos(actual, obstaculos);

        for (let i = 0; i < listaVecinos.length; i++) {

            let vecino = listaVecinos[i];

            let numeroVecino =
                vecino.fila * 20 + vecino.columna;

            if (!visitados[numeroVecino]) {

                visitados[numeroVecino] = true;

                padre[numeroVecino] =
                    actual.fila * 20 + actual.columna;

                cola[cola.length] = vecino;
            }
        }
    }

    let ruta =
        crearRuta(
            padre,
            inicio,
            metaEncontrada
        );

    return {
        orden: orden,
        ruta: ruta,
        meta: metaEncontrada
    };
}


// =========================
// DFS
// =========================

function dfs(inicio, metas, obstaculos) {

    let pila = [];
    let visitados = [];
    let padre = [];
    let orden = [];

    if (!inicio || metas.length == 0) {

        return {
            orden: orden,
            ruta: []
        };
    }

    let inicioNumero =
        inicio.fila * 20 + inicio.columna;

    pila[0] = inicio;
    visitados[inicioNumero] = true;
    padre[inicioNumero] = -1;

    let metaEncontrada = null;

    while (pila.length > 0) {

        let actual = pila.pop();

        orden[orden.length] = actual;

        if (esUnaMeta(actual, metas)) {

            metaEncontrada = actual;
            break;
        }

        let listaVecinos =
            vecinos(actual, obstaculos);

        for (let i = listaVecinos.length - 1; i >= 0; i--) {

            let vecino = listaVecinos[i];

            let numeroVecino =
                vecino.fila * 20 + vecino.columna;

            if (!visitados[numeroVecino]) {

                visitados[numeroVecino] = true;

                padre[numeroVecino] =
                    actual.fila * 20 + actual.columna;

                pila[pila.length] = vecino;
            }
        }
    }

    let ruta =
        crearRuta(
            padre,
            inicio,
            metaEncontrada
        );

    return {
        orden: orden,
        ruta: ruta,
        meta: metaEncontrada
    };
}


// =========================
// COSTE UNIFORME
// =========================

function costeUniforme(
    inicio,
    metas,
    obstaculos,
    pesos,
    costesMetas
) {

    let abiertos = [];
    let costes = [];
    let padre = [];
    let visitados = [];
    let orden = [];

    if (!inicio || metas.length == 0) {

        return {
            orden: orden,
            ruta: []
        };
    }

    let inicioNumero =
        inicio.fila * 20 + inicio.columna;

    costes[inicioNumero] = 0;
    padre[inicioNumero] = -1;

    abiertos[0] = inicio;

    let metaEncontrada = null;

    while (abiertos.length > 0) {

        let posicionMejor = 0;

        for (let i = 1; i < abiertos.length; i++) {

            let numeroA =
                abiertos[i].fila * 20 +
                abiertos[i].columna;

            let numeroB =
                abiertos[posicionMejor].fila * 20 +
                abiertos[posicionMejor].columna;

            let valorA =
                costes[numeroA];

            let valorB =
                costes[numeroB];

            if (esUnaMeta(abiertos[i], metas)) {

                valorA =
                    valorA +
                    costeDeMeta(
                        abiertos[i],
                        metas,
                        costesMetas
                    );
            }

            if (esUnaMeta(abiertos[posicionMejor], metas)) {

                valorB =
                    valorB +
                    costeDeMeta(
                        abiertos[posicionMejor],
                        metas,
                        costesMetas
                    );
            }

            if (valorA < valorB) {

                posicionMejor = i;
            }
        }

        let actual =
            abiertos[posicionMejor];

        abiertos.splice(posicionMejor, 1);

        let numeroActual =
            actual.fila * 20 +
            actual.columna;

        if (visitados[numeroActual]) {

            continue;
        }

        visitados[numeroActual] = true;

        orden[orden.length] = actual;

        if (esUnaMeta(actual, metas)) {

            metaEncontrada = actual;
            break;
        }

        let listaVecinos =
            vecinos(actual, obstaculos);

        for (let i = 0; i < listaVecinos.length; i++) {

            let vecino =
                listaVecinos[i];

            let numeroVecino =
                vecino.fila * 20 +
                vecino.columna;

            let costeNuevo =
                costes[numeroActual] +
                pesos[numeroVecino];

            if (costes[numeroVecino] == undefined ||
                costeNuevo < costes[numeroVecino]) {

                costes[numeroVecino] = costeNuevo;

                padre[numeroVecino] =
                    numeroActual;

                abiertos[abiertos.length] =
                    vecino;
            }
        }
    }

    let ruta =
        crearRuta(
            padre,
            inicio,
            metaEncontrada
        );

    return {
        orden: orden,
        ruta: ruta,
        meta: metaEncontrada
    };
}


// =========================
// A*
// =========================

function aEstrella(
    inicio,
    metas,
    obstaculos,
    pesos,
    costesMetas
) {

    let abiertos = [];
    let costes = [];
    let padre = [];
    let visitados = [];
    let orden = [];

    if (!inicio || metas.length == 0) {

        return {
            orden: orden,
            ruta: []
        };
    }

    let inicioNumero =
        inicio.fila * 20 +
        inicio.columna;

    costes[inicioNumero] = 0;
    padre[inicioNumero] = -1;

    abiertos[0] = inicio;

    let metaEncontrada = null;

    while (abiertos.length > 0) {

        let posicionMejor = 0;

        for (let i = 1; i < abiertos.length; i++) {

            let numeroA =
                abiertos[i].fila * 20 +
                abiertos[i].columna;

            let numeroB =
                abiertos[posicionMejor].fila * 20 +
                abiertos[posicionMejor].columna;

            let valorA =
                costes[numeroA] +
                heuristica(
                    abiertos[i],
                    metas,
                    costesMetas
                );

            let valorB =
                costes[numeroB] +
                heuristica(
                    abiertos[posicionMejor],
                    metas,
                    costesMetas
                );

            if (valorA < valorB) {

                posicionMejor = i;
            }
        }

        let actual =
            abiertos[posicionMejor];

        abiertos.splice(posicionMejor, 1);

        let numeroActual =
            actual.fila * 20 +
            actual.columna;

        if (visitados[numeroActual]) {

            continue;
        }

        visitados[numeroActual] = true;

        orden[orden.length] = actual;

        if (esUnaMeta(actual, metas)) {

            metaEncontrada = actual;
            break;
        }

        let listaVecinos =
            vecinos(actual, obstaculos);

        for (let i = 0; i < listaVecinos.length; i++) {

            let vecino =
                listaVecinos[i];

            let numeroVecino =
                vecino.fila * 20 +
                vecino.columna;

            let costeNuevo =
                costes[numeroActual] +
                pesos[numeroVecino];

            if (costes[numeroVecino] == undefined ||
                costeNuevo < costes[numeroVecino]) {

                costes[numeroVecino] =
                    costeNuevo;

                padre[numeroVecino] =
                    numeroActual;

                abiertos[abiertos.length] =
                    vecino;
            }
        }
    }

    let ruta =
        crearRuta(
            padre,
            inicio,
            metaEncontrada
        );

    return {
        orden: orden,
        ruta: ruta,
        meta: metaEncontrada
    };
}


// =========================
// HEURÍSTICA DE A*
// =========================

function heuristica(posicion, metas, costesMetas) {

    let menor = 999999;

    for (let i = 0; i < metas.length; i++) {

        let distancia =
            Math.abs(
                posicion.fila -
                metas[i].fila
            ) +
            Math.abs(
                posicion.columna -
                metas[i].columna
            );

        let valor =
            distancia +
            costesMetas[i];

        if (valor < menor) {

            menor = valor;
        }
    }

    return menor;
}


// =========================
// CREAR RUTA
// =========================

function crearRuta(
    padre,
    inicio,
    meta,
) {

    let ruta = [];

    if (!meta) {

        return ruta;
    }

    let actual = meta;

    let numeroActual =
        actual.fila * 20 +
        actual.columna;

    while (numeroActual != -1) {

        ruta.unshift(actual);

        let anterior =
            padre[numeroActual];

        if (anterior == -1) {

            break;
        }

        actual = {
            fila: Math.floor(anterior / 20),
            columna: anterior % 20
        };

        numeroActual = anterior;
    }

    return ruta;
}