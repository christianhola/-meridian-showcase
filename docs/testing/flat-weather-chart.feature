Feature: Gráfico plano con datos verificados
  Scenario: El portafolio muestra un gráfico sin tarjeta
    Given que el visitante abre la portada Meridian
    When se muestra la sección de datos reales
    Then el gráfico no tiene borde, sombra ni fondo de tarjeta
    And el iframe no introduce marcos visibles
    And los valores mostrados no se inventan

  Scenario: Detalles al pasar el cursor por las barras
    Given que hay siete días válidos en la gráfica
    When el visitante desplaza el cursor sobre una columna
    Then se muestra la fecha y el valor de ese día
    And se resalta la columna activa
    And puede obtener la misma información mediante teclado

  Scenario: Pronóstico público de Open-Meteo
    Given que Open-Meteo devuelve un pronóstico diario válido
    When el visitante selecciona "Clima"
    Then aparecen siete días con las temperaturas mínimas y máximas
    And los valores se identifican como pronóstico para Santo Domingo
    And no se utiliza ninguna clave API

  Scenario: Movimiento sin cifras falsas
    Given que el gráfico contiene eventos reales
    When pasan tres segundos sin interacción
    Then el resaltado pasa a otra columna
    And los valores numéricos siguen siendo los devueltos por las APIs

  Scenario: La API externa falla
    Given que Open-Meteo responde con un error
    When el visitante abre la pestaña "Clima"
    Then aparece una opción de volver a consultar
    And no se sustituyen sus datos por números aleatorios
