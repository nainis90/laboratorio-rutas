# Laboratorio de rutas y algoritmos de búsqueda

## 1. Objetivo del proyecto

El objetivo de este proyecto es crear una página web para probar y comparar diferentes algoritmos de búsqueda de rutas y ver graficamente como funcionan.

La aplicación usa una cuadrícula de **20 x 20 casillas**, donde se puede poner un punto de inicio, una o varias metas, obstáculos y casillas con diferentes costes.

Los algoritmos que se pueden probar son:

* BFS
* DFS
* Búsqueda de Coste Uniforme (UCS)
* A*

La página muestra cómo explora cada algoritmo la cuadrícula y la ruta que encuentra. También ayuda a comparar los cuatro algoritmos usando el mismo mapa.

---

## 2. Tecnologías utilizadas

Para hacer el proyecto se han utilizado:

* **HTML**
* **CSS**
* **JavaScript**

---

## 3. Estructura del proyecto

El proyecto está organizado dentro de la carpeta `juego`:


juego/ : index.html, style.css, algoritmos.js, app.js

* index.html: contiene la estructura, controles, botones, cuadrícula y resultados.
* style.css: contiene los estilos, tamaños, colores, botones y estados de las casillas.
* algoritmos.js: contiene BFS, DFS, UCS, A* y las funciones necesarias para realizar las búsquedas.
* app.js: controla la cuadrícula, las interacciones, la ejecución, las animaciones, los escenarios y la comparación.

---

# 4. Cómo se construyó el proyecto

## Paso 1. Pensar la estructura de la página

Antes de empezar con el código se hizo una idea de cómo quería que fuera la página.

Para explicarle mejor la idea a la IA hice un pequeño dibujo en **Paint**, donde le mostré cómo quería organizar masomenos la página.

La idea principal era tener un encabezado, los controles y debajo la cuadrícula de 20 x 20.

![estructura en paint](/img/imagen1.png)

---

## Paso 2. Crear el HTML y el CSS

Primero empecé haciendo el **HTML junto con el CSS**.

No hice toda la página de golpe, sino que fui haciéndola poco a poco.

Primero trabajé en el **header**, colocando el título, el texto y la estructura que quería.

Después pasé al **body**, donde empecé a poner la parte de la cuadrícula y los diferentes controles.

Para que la página quedara exactamente como yo queria, fui explicándole a la IA cómo quería cada parte y utilizando el dibujo de Paint como una referencia(no es un dibujo perfecto).

Después trabajé en la cuadrícula de **20 x 20** y se le pidio a la IA que me genere una cuadricula 20 x 20, que este bien proporcinado respecto a los demas cuadrados y que se vea limpio.

También se fueron ajustando los tamaños y espacios de diferentes partes de la página.


---

## Paso 3. JavaScript

Después se empezó con **JavaScript**.

Primero le pedi a la IA que la cuadrícula pudiera interactuar con el usuario y que añada estas opciones:

* inicio
* metas
* obstáculos
* pesos
* borrar casillas

Después se añadió la posibilidad de tener varias metas.

---

## Paso 4. Algoritmos

Después se añadieron: 

* BFS
* DFS
* UCS
* A*.

---

## Paso 5. Costes y resultados

Después se añadió el sistema de pesos.

Una casilla normal tiene un coste de `1`, pero si ponemos mas numeros de peso, la casilla tendra ese peso en donde lo seleccionamos.

Añadí un coste para las metas y esto permite hacer que una meta está más cerca pero tiene un coste mayor y así se pueden comparar los algoritmos por el coste total y no solo por los pasos.

---

## Paso 6. Correcciones

Una de las partes que tuve que ir corrigiendo fue que se pueda visualizar la búsqueda osea que al ejecutar un algoritmo quería que se vieran las casillas que iba explorando de un color azul suave, pero al principio no aparecían como yo queria.

Se fueron haciendo correcciones hasta conseguir que las casillas exploradas se vean mientras se ejecuta.


![busqueda](/img/busqueda.png)


Una de las partes que más fui ajustando fue el tamaño y algunas proporciones de la página, para que la cuadrícula y los controles esten bien colocados.

También se hicieron cambios para que la aplicación pudiera trabajar con varias metas y con diferentes costes.

---

## Paso 7. Escenarios y pruebas

Se hizo cuatro escenarios para poder comprobar las diferencias entre los algoritmos, escenarios como: Menos pasos, Pesos, Metas con coste, Sin solucion.

---

# 5. Arquitectura y funcionamiento

El funcionamiento básico es:

Usuario
 ↓
 Modifica la cuadrícula
 ↓
Pone inicio, metas, obstáculos y pesos
 ↓
Selecciona un algoritmo
 ↓
Pulsa "Ejecutar"
 ↓
JavaScript ejecuta el algoritmo
 ↓
Se muestran las casillas de busqueda en celeste suave
 ↓
Se encuentra una meta
 ↓
Se reconstruye la ruta
 ↓
Se muestran los pasos y costes  

La cuadrícula se representa con filas y columnas, cada casilla guarda su posición y el estado, por ejemplo inicio, meta, obstáculo, casilla normal o casilla con peso.

También existe el botón **"Comparar todos"**, para comparar los cuatro algoritmos que se usaron que ya mostraré ms adeltante.

---

# 6. Algoritmos utilizados


| Algoritmo | Estructura | Criterio de selección | Visitados | Límite |
| :--- | :--- | :--- | :---: | :--- |
| **BFS** | Cola | Menor número de pasos | Sí | No tiene en cuenta los pesos |
| **DFS** | Pila | Profundidad | Sí | No garantiza la ruta más corta |
| **UCS** | Lista ordenada por coste | Menor coste acumulado | Sí | Puede explorar muchas casillas |
| **A\*** | Lista ordenada por f | g + h | Sí | Depende de la heurística |

---

## BFS

Busca por niveles y utiliza una cola y en mapas sin pesos encuentra una ruta con el menor número de pasos.

## DFS

Utiliza una pila y avanza por profundidad. Puede encontrar una ruta pero se puede equivocar y tener que regresar todo el camnino de vuelta hasta encotnrar la meta.

## UCS

Selecciona la casilla que tiene el menor coste acumulado desde el inicio y tiene en cuenta los pesos de las casillas y busca una ruta con coste menor.

## A*

Junta el coste acumulado con una estimación del coste que nos falta:

f = g + h
g: coste acumulado.
h: estimación del coste que falta.
f: valor utilizado para elegir qué explorar.

Se utiliza la distancia Manhattan porque solo se permiten movimientos horizontales y verticales.

---

## Binary Search

La búsqueda binaria encuentra algo cortando una lista a la mitad, una y otra vez, descartando la parte donde sabe que no está.

No se usa para calcular rutas aquí porque eso necesita moverse por un mapa de cuadrículas y caminos, no por una simple lista.

---

# 7. Reconstrucción de la ruta

Mientras hace la búsqueda, se guarda información sobre la casilla anterior.

Cuando se encuentra una meta, se vuelve desde la meta hasta el inicio utilizando esa información.

Después se muestra la ruta final en la cuadrícula.

---

# 8. Los cuatro escenarios

## Escenario 1. Menos pasos

No se utilizan pesos y se ponen obstáculos para crear diferentes caminos.

Y sirve para comprobar la búsqueda con diferente número de pasos.

![Menos pasos](/img/menospasos.png)

---

## Escenario 2. Atajo caro

Hay un camino corto con casillas de coste alto y otro camino más largo con menor coste.

Sirve para comparar pasos y coste total.

![Atajo caro](/img/atajocaro.png)

---

## Escenario 3. Varias metas

Hay varias metas. Una está más cerca pero tiene un coste mayor, mientras que otra está más lejos y tiene un coste menor.

Sirve para comprobar cómo se tienen en cuenta los pasos y los costes.

![Metas coste](/img/metascoste.png)

---

## Escenario 4. Sin solución

Se coloca una barrera que impide llegar desde el inicio hasta la meta.

Los cuatro algoritmos deben indicar que no existe una ruta.

![sinsolucion](/img/sinsolucion.png)

---

# 9. Comparación de los algoritmos

La aplicación tiene un botón **"Comparar todos"**.

Este botón permite ejecutar los cuatro algoritmos sobre el mismo escenario.

Se comparan:

- pasos
- coste total
- casillas exploradas
- resultado

| Escenario | BFS | DFS | Coste uniforme | A* |
|---|---|---|---|---|
| Menos pasos | 38 pasos / 39 coste | 70 pasos / 71 coste | 38 pasos / 39 coste | 38 pasos / 39 coste |
| Atajo caro | 19 pasos / 182 coste | 193 pasos / 194 coste | 23 pasos / 24 coste | 23 pasos / 24 coste |
| Varias metas | 5 pasos / 55 coste | 190 pasos / 191 coste | 38 pasos / 39 coste | 5 pasos / 55 coste |
| Sin solución | Sin ruta | Sin ruta | Sin ruta | Sin ruta |

### Resultados

**Menos pasos:** BFS, Coste Uniforme y A* encuentran una ruta de 38 pasos, mientras que DFS encuentra una ruta más larga de 70 pasos.

**Atajo caro:** BFS encuentra el camino con menos pasos, pero tiene un coste mucho mayor. Coste Uniforme y A* encuentran un camino más largo, pero con un coste mucho menor.

**Varias metas:** BFS y A* llegan a la meta que esta cerca en 5 pasos, pero con un coste total de 55. Coste Uniforme elige la meta que esta lejos porque consigue un coste total menor, 39.

**Sin solución:** los cuatro algoritmos indican que no existe una ruta.

Los resultados dicen que los algoritmos no buscan lo mismo. 

Aqui una muestra de la comparacion con el escenario de Menos datos.

![comparacion](/img/comparacion.png)

---

# 10. Pruebas realizadas

| Prueba | Resultado esperado | Resultado obtenido |
|---|---|---|
| Ruta sencilla | Encontrar una ruta | Se encuentra una ruta |
| Sin inicio o meta | Mostrar un aviso | Se muestra el aviso |
| Varias metas | Trabajar con varias metas | Funciona correctamente |
| Casillas con peso | Tener en cuenta los costes | Se tienen en cuenta |
| Obstáculos | Buscar otra ruta si existe | Encuentra una ruta alternativa |
| Sin solución | Indicar que no existe ruta | Muestra que no hay solución |
| Editar después de ejecutar | Poder modificar y volver a ejecutar | Se puede volver a utilizar |
| UCS y A* | Coincidir en el coste óptimo | Se comprobó en los escenarios correspondientes |

# 10.1. Prueba de inicio

Se realizó una prueba si no hay inicio ni una meta, lo cual aparecerá un aviso diciendo que falta el inicio

![faltainicio](/img/faltainicio.png)

---

# 11. HTML, CSS y JavaScript

Cada tecnología tiene una función diferente.

| Tecnología | Función                                  |
| ---------- | ---------------------------------------- |
| HTML       | Crear la estructura de la página, los textos, botones, controles, cuadrícula y resultados.         |
| CSS        | Dar diseño, define tamaños, espacios, bordes, botones y estados de las casillas.                    |
| JavaScript | Programar las funciones, los algoritmos, controla los clics, la cuadrícula, los costes, la animación, los resultados y la comparación. |


---

# 12. Uso de inteligencia artificial

Durante el proyecto utilicé un asistente de inteligencia artificial como ayuda para entender BFS, DFS, UCS y A*, organizar partes de la página, partes del código y corregir problemas.

La pagina no se hizo todo de una vez, fui trabajando poco a poco. Lo que hcie fue explcarle a la IA cómo quería que fuera la página y use un dibujo de Paint para mostrarle más o menos lo que yo buscaba.

Después fui trabajando por partes, hace tiempo me enseñaron a organizarme en lo que es la creacion de paginas, asi que mis pasos fueron estos:

1. primero el **header**,
2. después el **body y la cuadrícula**,
3. después los estilos de CSS,
4. después JavaScript,
5. después los algoritmos,
6. y las pruebas, correcciones, etc.

Durante el proceso fui indicando cambios cuando algo no quedaba como quería, como por ejemplo cuando se ejecuta la busqueda y aparecen los cuadraditos en azul, antes no me lo mostraba pero con las correciones que tomé, al final funciono como yo queria.

Mis peticiones a la IA son más o menos siempre el mismo, le digo mi objetivo y le digo que sea super entendible, directo, y simple, asi poder entender de la mejor manera las soluciones.

![Uso de IA](/img/usoia.png)

## 12.1 Ejemplos de consultas representativas:

* "Explícame de forma sencilla cómo funcionan BFS, DFS, UCS y A*."

* "Ayúdame a crear una cuadrícula de 20 x 20 con HTML, CSS y JavaScript."

* "Las casillas exploradas no aparecen durante la búsqueda, ayúdame a corregirlo."

---

# 13. Limitaciones

El proyecto tiene algunas limitaciones:

* La cuadrícula tiene un tamaño solo de 20 x 20.
* Solo se pueden hacer movimientos horizontales y verticales.
* El proyecto no usa ninguna base de datos.

---

# 14. Posibles mejoras

Algunas mejoras que podría añadir en el futuro son:

* utilizar mapas más grandes.
* añadir movimiento en diagonal.
* guardar mapas creados por el usuario.
* añadir más tipos de terreno.
* mejorar las animaciones.
* añadir una simulación de una ciudad.
* añadir búsqueda bidireccional.

---

# 15. Conclusión

Con este proyecto se ha creado una aplicación web que nos ayuda a ver diferentes algoritmos de búsqueda.

Podemos jugar con la cuadrícula, colocar obstáculos, pesos y metas, ejecutar BFS, DFS, UCS y A*, ver cómo exploran todo el mapa y comparar sus resultados.

Con esto se puede ver que cada algoritmo utiliza una forma diferente de buscar una ruta.

---

# 16. Enlaces

### GitHub

**[AÑADIR AQUÍ EL ENLACE AL REPOSITORIO DE GITHUB]**

### Netlify

**[AÑADIR AQUÍ EL ENLACE DE LA PÁGINA PUBLICADA EN NETLIFY]**
