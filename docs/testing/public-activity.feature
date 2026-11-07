Feature: Actividad pública diaria en GitHub Pages
  Scenario: Datos reales del repositorio
    Given que la API de GitHub devuelve eventos válidos con ID y fecha
    When el visitante abre el gráfico
    Then se muestran los conteos por día UTC sin duplicados
    And no se muestran los textos "Bar Chart" ni "Demo"

  Scenario: API de eventos no disponible
    Given que la API responde con 403 o 429
    When el visitante abre el gráfico
    Then se muestra un error y la opción de reintentar
    And no se muestran valores inventados

  Scenario: Datos de búsquedas web ausentes
    Given que no existe una API pública de métricas agregadas configurada
    When se presenta el gráfico de GitHub
    Then no se muestran cantidades de búsquedas web ficticias

  Scenario: Clave privada protegida
    Given que el backend dispone de una clave de proveedor
    When se compila el sitio estático
    Then la clave no aparece en el JavaScript del navegador
