let cuadricula = document.querySelector(".cuadricula");

let casillas = [];

let inicio = {
    fila: 0,
    columna: 0
};

let metas = [];

metas[0] = {
    fila: 19,
    columna: 19
};

let costesMetas = [];

costesMetas[0] = 1;

let obstaculos = [];
let pesos = [];

let herramienta = "obstaculo";

let ejecutando = false;
let pausado = false;

let ordenExploracion = [];
let rutaFinal = [];

let posicionExploracion = 0;
let posicionRuta = 0;

let tiempoInicio = 0;

let mostrarExploracion = true;

let algoritmoActual = "";

function actualizarCriterio(nombre) {

    let titulo =
        document.querySelector("#tituloCriterio");

    let texto =
        document.querySelector("#textoCriterio");


    if (nombre.includes("BFS")) {

        titulo.innerHTML =
            "BFS · Búsqueda en anchura";

        texto.innerHTML =
            "Explora por niveles y busca una ruta con el menor número de pasos.";
    }


    if (nombre.includes("DFS")) {

        titulo.innerHTML =
            "DFS · Búsqueda en profundidad";

        texto.innerHTML =
            "Explora una rama hasta el fondo antes de probar otras. No garantiza el menor número de pasos.";
    }


    if (nombre.includes("Coste")) {

        titulo.innerHTML =
            "Coste uniforme · UCS";

        texto.innerHTML =
            "Selecciona la casilla con menor coste acumulado y tiene en cuenta los pesos y el coste de la meta.";
    }


    if (nombre.includes("A*")) {

        titulo.innerHTML =
            "A* · A estrella";

        texto.innerHTML =
            "Combina el coste acumulado con una estimación de lo que falta mediante una heurística.";
    }
}
// =========================
// CREAR CUADRÍCULA
// =========================

let html = "";

for (let i = 0; i < 400; i++) {

    html += '<div class="casilla"></div>';

    pesos[i] = 1;
}

cuadricula.innerHTML = html;

casillas = document.querySelectorAll(".casilla");

actualizarCuadricula();


// =========================
// HERRAMIENTAS
// =========================

let herramientas =
    document.querySelectorAll(".herramienta");

for (let i = 0; i < herramientas.length; i++) {

    herramientas[i].addEventListener("click", function () {

        if (i == 0) {
            herramienta = "obstaculo";
        }

        if (i == 1) {
            herramienta = "borrar";
        }

        if (i == 2) {
            herramienta = "inicio";
        }

        if (i == 3) {
            herramienta = "meta";
        }

        if (i == 4) {
            herramienta = "peso";
        }

        marcarHerramienta();

        cambiarEstado(
            "Herramienta: " + herramienta
        );
    });
}

marcarHerramienta();


// =========================
// EXPLORACIÓN
// =========================

let checkExploracion =
    document.querySelector(
        ".exploracion input"
    );

checkExploracion.addEventListener(
    "change",
    function () {

        mostrarExploracion =
            checkExploracion.checked;

        if (!mostrarExploracion) {

            for (let i = 0; i < casillas.length; i++) {

                if (!obstaculos[i] &&
                    pesos[i] == 1) {

                    casillas[i].style.backgroundColor =
                        "#ffffff";
                }
            }

            actualizarColoresEspeciales();
        }
    }
);


// =========================
// CLICK Y ARRASTRE
// =========================

for (let i = 0; i < casillas.length; i++) {

    casillas[i].addEventListener(
        "click",
        function () {

            pintarCasilla(i);
        }
    );


    casillas[i].addEventListener(
        "mouseenter",
        function (evento) {

            if (evento.buttons == 1 &&
                herramienta != "meta" &&
                herramienta != "inicio") {

                pintarCasilla(i);
            }
        }
    );
}


// =========================
// PINTAR CASILLA
// =========================

function pintarCasilla(numero) {

    if (ejecutando) {
        return;
    }

    let fila =
        Math.floor(numero / 20);

    let columna =
        numero % 20;

    let numeroInicio = -1;

    if (inicio) {

        numeroInicio =
            inicio.fila * 20 +
            inicio.columna;
    }


    // =========================
    // OBSTÁCULO
    // =========================

    if (herramienta == "obstaculo") {

        if (numero != numeroInicio &&
            !esMetaNumero(numero)) {

            obstaculos[numero] = true;

            pesos[numero] = 1;
        }
    }


    // =========================
    // BORRAR
    // =========================

    if (herramienta == "borrar") {

        if (numero == numeroInicio) {

            inicio = null;

        } else if (esMetaNumero(numero)) {

            borrarMeta(numero);

        } else {

            obstaculos[numero] = false;

            pesos[numero] = 1;
        }
    }


    // =========================
    // INICIO
    // =========================

    if (herramienta == "inicio") {

        if (!obstaculos[numero] &&
            !esMetaNumero(numero)) {

            inicio = {
                fila: fila,
                columna: columna
            };
        }
    }


    // =========================
    // META
    // =========================

    if (herramienta == "meta") {

        if (!obstaculos[numero] &&
            numero != numeroInicio &&
            !esMetaNumero(numero)) {

            let inputs =
                document.querySelectorAll(
                    ".opcion input"
                );

            let coste =
                parseInt(inputs[1].value);

            if (coste < 0) {
                coste = 0;
            }

            metas[metas.length] = {
                fila: fila,
                columna: columna
            };

            costesMetas[costesMetas.length] =
                coste;
        }
    }


    // =========================
    // PESO
    // =========================

    if (herramienta == "peso") {

        if (!obstaculos[numero] &&
            numero != numeroInicio &&
            !esMetaNumero(numero)) {

            let inputPeso =
                document.querySelectorAll(
                    ".opcion input"
                )[0];

            let pesoElegido =
                parseInt(inputPeso.value);

            if (pesoElegido < 1) {
                pesoElegido = 1;
            }

            pesos[numero] =
                pesoElegido;
        }
    }


    actualizarCuadricula();
}


// =========================
// BORRAR META
// =========================

function borrarMeta(numero) {

    for (let i = 0; i < metas.length; i++) {

        let numeroMeta =
            metas[i].fila * 20 +
            metas[i].columna;

        if (numeroMeta == numero) {

            metas.splice(i, 1);
            costesMetas.splice(i, 1);

            break;
        }
    }
}


// =========================
// SABER SI ES META
// =========================

function esMetaNumero(numero) {

    for (let i = 0; i < metas.length; i++) {

        let numeroMeta =
            metas[i].fila * 20 +
            metas[i].columna;

        if (numeroMeta == numero) {

            return true;
        }
    }

    return false;
}


// =========================
// ACTUALIZAR CUADRÍCULA
// =========================

function actualizarCuadricula() {

    for (let i = 0; i < casillas.length; i++) {

        casillas[i].style.backgroundColor =
            "#ffffff";

        casillas[i].innerHTML = "";


        if (obstaculos[i]) {

            casillas[i].style.backgroundColor =
                "#111111";
        }


        if (pesos[i] > 1 &&
            !obstaculos[i]) {

            casillas[i].style.backgroundColor =
                "#cdb8e8";

            casillas[i].innerHTML =
                "+" + pesos[i];
        }
    }


    actualizarColoresEspeciales();
}


// =========================
// COLORES INICIO Y METAS
// =========================

function actualizarColoresEspeciales() {

    if (inicio) {

        let numeroInicio =
            inicio.fila * 20 +
            inicio.columna;

        casillas[numeroInicio].style.backgroundColor =
            "#35a267";

        casillas[numeroInicio].innerHTML =
            "S";
    }


    for (let i = 0; i < metas.length; i++) {

        let numeroMeta =
            metas[i].fila * 20 +
            metas[i].columna;

        casillas[numeroMeta].style.backgroundColor =
            "#f2994a";

        casillas[numeroMeta].innerHTML =
            "M";
    }
}


// =========================
// HERRAMIENTA SELECCIONADA
// =========================

function marcarHerramienta() {

    for (let i = 0; i < herramientas.length; i++) {

        herramientas[i].style.backgroundColor =
            "#ffffff";

        herramientas[i].style.borderColor =
            "#d9dde2";
    }


    if (herramienta == "obstaculo") {

        herramientas[0].style.backgroundColor =
            "#eef3f9";

        herramientas[0].style.borderColor =
            "#123d75";
    }


    if (herramienta == "borrar") {

        herramientas[1].style.backgroundColor =
            "#eef3f9";

        herramientas[1].style.borderColor =
            "#123d75";
    }


    if (herramienta == "inicio") {

        herramientas[2].style.backgroundColor =
            "#eef3f9";

        herramientas[2].style.borderColor =
            "#123d75";
    }


    if (herramienta == "meta") {

        herramientas[3].style.backgroundColor =
            "#eef3f9";

        herramientas[3].style.borderColor =
            "#123d75";
    }


    if (herramienta == "peso") {

        herramientas[4].style.backgroundColor =
            "#eef3f9";

        herramientas[4].style.borderColor =
            "#123d75";
    }
}


// =========================
// EJECUTAR
// =========================

document.querySelector(".ejecutar")
    .addEventListener(
        "click",
        function () {

            if (ejecutando) {
                return;
            }

            ejecutarAlgoritmo();
        }
    );


function ejecutarAlgoritmo() {

    if (!inicio) {

        document.querySelector("#estadoTexto").innerHTML =
            "Falta el inicio";

        document.querySelector(".estado-mapa").innerHTML =
            '<span class="punto-verde"></span> Falta el inicio';

        return;
    }


    if (metas.length == 0) {

        document.querySelector("#estadoTexto").innerHTML =
            "Falta la meta";

        document.querySelector(".estado-mapa").innerHTML =
            '<span class="punto-verde"></span> Falta la meta';

        return;
    }


    limpiarColores();

    let selector =
        document.querySelector(".selector");

    let nombre =
        selector.value;

    algoritmoActual = nombre;
    actualizarCriterio(nombre);

    let resultado;


    if (nombre.includes("BFS")) {

        resultado =
            bfs(
                inicio,
                metas,
                obstaculos
            );
    }


    if (nombre.includes("DFS")) {

        resultado =
            dfs(
                inicio,
                metas,
                obstaculos
            );
    }


    if (nombre.includes("Coste")) {

        resultado =
            costeUniforme(
                inicio,
                metas,
                obstaculos,
                pesos,
                costesMetas
            );
    }


    if (nombre.includes("A*")) {

        resultado =
            aEstrella(
                inicio,
                metas,
                obstaculos,
                pesos,
                costesMetas
            );
    }


    ordenExploracion =
        resultado.orden;

    rutaFinal =
        resultado.ruta;

    posicionExploracion = 0;
    posicionRuta = 0;

    ejecutando = true;
    pausado = false;

    tiempoInicio = Date.now();


    document.querySelector("#estadoTexto").innerHTML =
        "Explorando con " + nombre;


    document.querySelector(".estado-mapa").innerHTML =
        '<span class="punto-verde"></span> Explorando con ' +
        nombre;


    animarExploracion();
}


// =========================
// ANIMAR EXPLORACIÓN
// =========================

function animarExploracion() {

    if (!ejecutando) {
        return;
    }

    if (pausado) {
        return;
    }


    if (posicionExploracion >=
        ordenExploracion.length) {

        terminarExploracion();

        return;
    }


    let posicion =
        ordenExploracion[
            posicionExploracion
        ];

    let numero =
        posicion.fila * 20 +
        posicion.columna;


    let numeroInicio = -1;

    if (inicio) {

        numeroInicio =
            inicio.fila * 20 +
            inicio.columna;
    }


    if (mostrarExploracion &&
        numero != numeroInicio &&
        !esMetaNumero(numero)) {

        casillas[numero].style.backgroundColor =
            "#9bd7ec";
    }


    posicionExploracion++;

    actualizarExploradas();


    let velocidad =
        document.querySelector(
            ".animacion input"
        ).value;

    let tiempo =
        101 - velocidad;


    setTimeout(
        animarExploracion,
        tiempo
    );
}


// =========================
// TERMINAR EXPLORACIÓN
// =========================

function terminarExploracion() {

    if (rutaFinal.length == 0) {

        document.querySelector("#estadoTexto").innerHTML =
            "Sin solución";


        document.querySelector("#pasos").innerHTML =
            "--";

        document.querySelector("#costeRuta").innerHTML =
            "--";

        document.querySelector("#costeMeta").innerHTML =
            "--";

        document.querySelector("#costeTotal").innerHTML =
            "--";


        document.querySelector(".estado-mapa").innerHTML =
            '<span class="punto-verde"></span> Sin solución';


        document.querySelector(".estado").innerHTML =
            '<span class="punto"></span> Sin solución';


        ejecutando = false;

        return;
    }


    document.querySelector("#estadoTexto").innerHTML =
        "Ruta encontrada";


    animarRuta();
}


// =========================
// ANIMAR RUTA
// =========================

function animarRuta() {

    if (!ejecutando) {
        return;
    }

    if (pausado) {
        return;
    }


    if (posicionRuta >=
        rutaFinal.length) {

        terminarTodo();

        return;
    }


    let posicion =
        rutaFinal[posicionRuta];

    let numero =
        posicion.fila * 20 +
        posicion.columna;


    let numeroInicio = -1;

    if (inicio) {

        numeroInicio =
            inicio.fila * 20 +
            inicio.columna;
    }


    if (numero != numeroInicio &&
        !esMetaNumero(numero)) {

        casillas[numero].style.backgroundColor =
            "#f2994a";
    }


    posicionRuta++;


    let velocidad =
        document.querySelector(
            ".animacion input"
        ).value;

    let tiempo =
        101 - velocidad;


    setTimeout(
        animarRuta,
        tiempo
    );
}


// =========================
// RESULTADO FINAL
// =========================

function terminarTodo() {

    let pasos =
        rutaFinal.length - 1;


    let costeRuta = 0;


    for (let i = 1; i < rutaFinal.length; i++) {

        let numero =
            rutaFinal[i].fila * 20 +
            rutaFinal[i].columna;

        costeRuta =
            costeRuta +
            pesos[numero];
    }


    let metaFinal =
        rutaFinal[rutaFinal.length - 1];


    let costeMeta = 0;


    for (let i = 0; i < metas.length; i++) {

        if (metas[i].fila == metaFinal.fila &&
            metas[i].columna == metaFinal.columna) {

            costeMeta =
                costesMetas[i];
        }
    }


    let costeTotal =
        costeRuta + costeMeta;


    let tiempo =
        Date.now() - tiempoInicio;


    document.querySelector("#exploradas").innerHTML =
        ordenExploracion.length;


    document.querySelector("#pasos").innerHTML =
        pasos;


    document.querySelector("#costeRuta").innerHTML =
        costeRuta;


    document.querySelector("#costeMeta").innerHTML =
        costeMeta;


    document.querySelector("#costeTotal").innerHTML =
        costeTotal;


    document.querySelector("#estadoTexto").innerHTML =
        "Completado · " + tiempo + " ms";


    document.querySelector(".estado-mapa").innerHTML =
        '<span class="punto-verde"></span> Ruta encontrada';


    document.querySelector(".estado").innerHTML =
        '<span class="punto"></span> Listo';


    ejecutando = false;
}


// =========================
// PAUSAR / CONTINUAR
// =========================

document.querySelector(".pausar")
    .addEventListener(
        "click",
        function () {

            if (!ejecutando) {
                return;
            }


            if (pausado) {

                pausado = false;

                document.querySelector(".pausar").innerHTML =
                    "|| Pausar";


                if (posicionExploracion <
                    ordenExploracion.length) {

                    animarExploracion();

                } else {

                    animarRuta();
                }

            } else {

                pausado = true;

                document.querySelector(".pausar").innerHTML =
                    "▶ Continuar";
            }
        }
    );


// =========================
// LIMPIAR
// =========================

document.querySelector(".limpiar")
    .addEventListener(
        "click",
        function () {

            ejecutando = false;

            pausado = false;

            obstaculos = [];

            pesos = [];


            for (let i = 0; i < 400; i++) {

                pesos[i] = 1;
            }


            inicio = {
                fila: 0,
                columna: 0
            };


            metas = [];

            metas[0] = {
                fila: 19,
                columna: 19
            };


            costesMetas = [];

            costesMetas[0] = 1;


            document.querySelector("#estadoTexto").innerHTML =
                "--";

            document.querySelector("#exploradas").innerHTML =
                "--";

            document.querySelector("#pasos").innerHTML =
                "--";

            document.querySelector("#costeRuta").innerHTML =
                "--";

            document.querySelector("#costeMeta").innerHTML =
                "--";

            document.querySelector("#costeTotal").innerHTML =
                "--";


            document.querySelector(".pausar").innerHTML =
                "|| Pausar";


            document.querySelector(".estado-mapa").innerHTML =
                '<span class="punto-verde"></span> Escenario preparado';


            document.querySelector(".estado").innerHTML =
                '<span class="punto"></span> Listo para dibujar';


            actualizarCuadricula();
        }
    );


// =========================
// ALEATORIO
// =========================

document.querySelector(".aleatorio")
    .addEventListener(
        "click",
        function () {

            if (ejecutando) {
                return;
            }


            obstaculos = [];


            for (let i = 0; i < 400; i++) {

                if (Math.random() < 0.20) {

                    obstaculos[i] = true;
                }
            }


            if (inicio) {

                let numeroInicio =
                    inicio.fila * 20 +
                    inicio.columna;

                obstaculos[numeroInicio] =
                    false;
            }


            for (let i = 0; i < metas.length; i++) {

                let numeroMeta =
                    metas[i].fila * 20 +
                    metas[i].columna;

                obstaculos[numeroMeta] =
                    false;
            }


            actualizarCuadricula();
        }
    );


// =========================
// MÉTRICAS
// =========================

function actualizarExploradas() {

    document.querySelector("#exploradas").innerHTML =
        posicionExploracion;
}


// =========================
// ESTADO
// =========================

function cambiarEstado(texto) {

    document.querySelector(".estado").innerHTML =
        '<span class="punto"></span>' +
        texto;
}


// =========================
// LIMPIAR COLORES
// =========================

function limpiarColores() {

    for (let i = 0; i < casillas.length; i++) {

        if (obstaculos[i]) {

            casillas[i].style.backgroundColor =
                "#111111";

            casillas[i].innerHTML = "";

        } else if (pesos[i] > 1) {

            casillas[i].style.backgroundColor =
                "#cdb8e8";

            casillas[i].innerHTML =
                "+" + pesos[i];

        } else {

            casillas[i].style.backgroundColor =
                "#ffffff";

            casillas[i].innerHTML = "";
        }
    }


    actualizarColoresEspeciales();
}


// =========================
// ESCENARIOS
// =========================

function prepararEscenario() {

    ejecutando = false;
    pausado = false;

    obstaculos = [];
    pesos = [];

    for (let i = 0; i < 400; i++) {

        pesos[i] = 1;
    }

    inicio = {
        fila: 0,
        columna: 0
    };

    metas = [];

    costesMetas = [];
}


function ponerObstaculo(fila, columna) {

    let numero =
        fila * 20 + columna;

    obstaculos[numero] = true;
}


function ponerPeso(fila, columna, peso) {

    let numero =
        fila * 20 + columna;

    pesos[numero] = peso;
}


function ponerMeta(fila, columna, coste) {

    metas[metas.length] = {
        fila: fila,
        columna: columna
    };

    costesMetas[costesMetas.length] =
        coste;
}


// =========================
// ESCENARIO 1
// MENOS PASOS
// =========================

document.querySelectorAll(".escenario")[0]
    .addEventListener(
        "click",
        function () {

            prepararEscenario();


            // Obstáculos que hacen que DFS
            // pueda coger un camino diferente

            for (let i = 1; i < 19; i++) {

                ponerObstaculo(5, i);
            }

            for (let i = 1; i < 19; i++) {

                ponerObstaculo(14, i);
            }


            ponerMeta(19, 19, 1);


            actualizarCuadricula();

            document.querySelector("#estadoTexto").innerHTML =
                "Escenario: Menos pasos";

            document.querySelector(".estado-mapa").innerHTML =
                '<span class="punto-verde"></span> Escenario preparado';
        }
    );


// =========================
// ESCENARIO 2
// ATAJO CARO
// =========================

document.querySelectorAll(".escenario")[1]
    .addEventListener(
        "click",
        function () {

            prepararEscenario();


            // Camino corto pero caro
            for (let i = 1; i < 19; i++) {

                ponerPeso(0, i, 10);
            }


            // Obstáculos para separar los caminos
            for (let i = 1; i < 19; i++) {

                ponerObstaculo(1, i);
            }


            ponerMeta(0, 19, 1);


            actualizarCuadricula();

            document.querySelector("#estadoTexto").innerHTML =
                "Escenario: Atajo caro";

            document.querySelector(".estado-mapa").innerHTML =
                '<span class="punto-verde"></span> Escenario preparado';
        }
    );


// =========================
// ESCENARIO 3
// VARIAS METAS
// =========================

document.querySelectorAll(".escenario")[2]
    .addEventListener(
        "click",
        function () {

            prepararEscenario();


            // Meta cercana pero cara

            ponerMeta(0, 5, 50);


            // Meta lejana pero barata

            ponerMeta(19, 19, 1);


            actualizarCuadricula();

            document.querySelector("#estadoTexto").innerHTML =
                "Escenario: Metas con coste";

            document.querySelector(".estado-mapa").innerHTML =
                '<span class="punto-verde"></span> Escenario preparado';
        }
    );


// =========================
// ESCENARIO 4
// SIN SOLUCIÓN
// =========================

document.querySelectorAll(".escenario")[3]
    .addEventListener(
        "click",
        function () {

            prepararEscenario();


            // Barrera completa

            for (let i = 0; i < 20; i++) {

                ponerObstaculo(10, i);
            }


            ponerMeta(19, 19, 1);


            actualizarCuadricula();

            document.querySelector("#estadoTexto").innerHTML =
                "Escenario: Sin solución";

            document.querySelector(".estado-mapa").innerHTML =
                '<span class="punto-verde"></span> Escenario preparado';
        }
    );


// =========================
// COMPARAR TODOS
// =========================

document.querySelector(".comparar")
    .addEventListener(
        "click",
        function () {

            if (ejecutando) {
                return;
            }


            if (!inicio) {

                document.querySelector("#comparacion").innerHTML =
                    "<h3>Falta el inicio</h3>";

                return;
            }


            if (metas.length == 0) {

                document.querySelector("#comparacion").innerHTML =
                    "<h3>Falta la meta</h3>";

                return;
            }


            let resultadoBFS =
                bfs(
                    inicio,
                    metas,
                    obstaculos
                );

            let resultadoDFS =
                dfs(
                    inicio,
                    metas,
                    obstaculos
                );

            let resultadoCoste =
                costeUniforme(
                    inicio,
                    metas,
                    obstaculos,
                    pesos,
                    costesMetas
                );

            let resultadoA =
                aEstrella(
                    inicio,
                    metas,
                    obstaculos,
                    pesos,
                    costesMetas
                );


            let texto = "";

            texto += "<h3>Comparación de algoritmos</h3>";


            texto += crearFilaComparacion(
                "BFS",
                resultadoBFS
            );

            texto += crearFilaComparacion(
                "DFS",
                resultadoDFS
            );

            texto += crearFilaComparacion(
                "Coste uniforme",
                resultadoCoste
            );

            texto += crearFilaComparacion(
                "A*",
                resultadoA
            );


            document.querySelector("#comparacion").innerHTML =
                texto;
        }
    );


// =========================
// FILA DE COMPARACIÓN
// =========================

function crearFilaComparacion(nombre, resultado) {

    let pasos = "--";
    let costeRuta = "--";
    let costeMeta = "--";
    let costeTotal = "--";

    if (resultado.ruta.length > 0) {

        pasos =
            resultado.ruta.length - 1;


        costeRuta = 0;

        for (let i = 1; i < resultado.ruta.length; i++) {

            let numero =
                resultado.ruta[i].fila * 20 +
                resultado.ruta[i].columna;

            costeRuta =
                costeRuta + pesos[numero];
        }


        costeMeta =
            costeDeMeta(
                resultado.meta,
                metas,
                costesMetas
            );


        costeTotal =
            costeRuta + costeMeta;
    }


    let conclusion = "";

    if (resultado.ruta.length == 0) {

        conclusion =
            "No encuentra una ruta";

    } else if (nombre == "BFS") {

        conclusion =
            "Busca por niveles y prioriza los pasos";

    } else if (nombre == "DFS") {

        conclusion =
            "Sigue una rama antes de probar otras";

    } else if (nombre == "Coste uniforme") {

        conclusion =
            "Prioriza el menor coste acumulado";

    } else {

        conclusion =
            "Usa coste + estimación para buscar";
    }


    return `
        <div class="fila-comparacion">
            <strong>${nombre}</strong>
            <span>Pasos: ${pasos}</span>
            <span>Coste: ${costeTotal}</span>
            <span>Exploradas: ${resultado.orden.length}</span>
            <span>${conclusion}</span>
        </div>
    `;
}
