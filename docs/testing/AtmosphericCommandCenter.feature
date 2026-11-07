Feature: Centro atmosférico Meridian con telemetría verificable y mapa 3D

  Scenario: Seleccionar otra ciudad
    Given que el usuario está viendo La Romana
    When selecciona Reykjavík
    Then se cancela la consulta meteorológica anterior
    And se consulta la API con las coordenadas de Reykjavík
    And la cámara del mapa viaja a Reykjavík mediante flyTo
    And el gráfico no muestra durante la transición datos antiguos de La Romana

  Scenario: Open-Meteo responde con siete horas válidas
    Given que Open-Meteo responde con velocidades y ráfagas en km/h
    When se procesan las próximas siete horas
    Then se muestran siete columnas apiladas
    And el incremento de ráfaga nunca es negativo
    And el tooltip muestra el viento y la ráfaga originales

  Scenario: Sobrecarga experimental
    Given que el usuario ha cargado datos reales
    When activa «Tormenta eléctrica · simulación»
    Then la gráfica representa números multiplicados por un millón
    And aparece la etiqueta inequívoca «SIMULACIÓN ACTIVADA»
    And el mapa cambia de apariencia a un modo visual crítico
    And el indicador meteorológico sigue calculándose con los datos originales
    And no se generan alertas oficiales de huracán

  Scenario: Recuperación de error de API
    Given que Open-Meteo responde con un error o expira el tiempo límite
    When termina la solicitud
    Then el componente muestra el error y ofrece reintentar
    And no se muestran mediciones inventadas

  Scenario: Desmontaje seguro
    Given que el mapa WebGL ha sido inicializado
    When el componente React se desmonta
    Then se cancelan las peticiones pendientes
    And se eliminan timers y listeners
    And se llama a map.remove() para liberar recursos del mapa

  Scenario: Accesibilidad y movilidad reducida
    Given que la preferencia del sistema es reducir movimiento
    When se cambia de ciudad
    Then se mueve la cámara sin animación flyTo
    And no se reproduce el destello animado de tormenta
  Scenario: Navegador sin WebGL
    Given que MapLibre no puede iniciar el contexto WebGL
    When se abre el centro atmosférico
    Then se mantiene el gráfico meteorológico real
    And se muestra un mapa interactivo 2D de OpenStreetMap sin claves API
    And el texto explica que la visualización 3D no está disponible
    When el usuario selecciona Reykjavík
    Then el mapa alternativo muestra la ubicación de Reykjavík
