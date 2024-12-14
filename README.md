# Word Builder: Traductor de Lenguaje de Señas en Tiempo Real

**Word Builder** es una aplicación web basada en inteligencia artificial que traduce gestos del lenguaje de señas americano (ASL) a texto y voz en tiempo real. Diseñada para ser intuitiva y accesible, esta herramienta busca derribar barreras de comunicación y fomentar la inclusión social.

---

## **Índice**
1. [Características Principales](#caracteristicas-principales)
2. [Tecnologías Utilizadas](#tecnologias-utilizadas)
3. [Requisitos del Sistema](#requisitos-del-sistema)
4. [Instalación y Configuración](#instalacion-y-configuracion)
5. [Uso de la Aplicación](#uso-de-la-aplicacion)
6. [Resultados](#resultados)
7. [Futuras Mejoras](#futuras-mejoras)
8. [Contribuciones](#contribuciones)

---

## **Características Principales**

- **Reconocimiento en Tiempo Real:** Traducción de gestos del ASL capturados por la cámara a texto y voz al instante.
- **Interfaz Intuitiva:** Diseñada para usuarios con mínimo conocimiento técnico.
- **Multimodalidad:** Salidas visuales (texto) y auditivas (voz) para mayor accesibilidad.
- **100% Basada en Navegador:** No requiere hardware especializado ni software adicional.

---

## **Tecnologías Utilizadas**

- **Teachable Machine:** Para el entrenamiento del modelo de reconocimiento de gestos.
- **TensorFlow.js:** Para ejecutar el modelo directamente en el navegador.
- **HTML, CSS y JavaScript:** Tecnologías principales para el desarrollo de la interfaz web.
- **Web Speech API:** Para la conversión de texto a voz.

---

## **Requisitos del Sistema**

- Navegador compatible con JavaScript y TensorFlow.js (por ejemplo, Chrome, Edge o Firefox).
- Cámara web funcional.
- Conexión a internet para cargar el modelo.

---

## **Instalación y Configuración**

1. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/tuusuario/word-builder.git
   cd word-builder
   ```

2. **Configurar el Entorno:**
   No es necesario instalar dependencias adicionales; la aplicación funciona directamente en el navegador.

3. **Ejecutar la Aplicación:**
   - Abre el archivo `index.html` en tu navegador.

---

## **Uso de la Aplicación**

1. **Lanzar la Cámara:** Haz clic en el botón *"Iniciar Cámara"* para comenzar a capturar video.
2. **Reconocimiento de Gestos:**
   - Realiza un gesto correspondiente al alfabeto del ASL frente a la cámara.
   - El sistema mostrará la letra reconocida en pantalla.
   - La letra también se reproducirá en voz gracias a la integración con la Web Speech API.
3. **Guardar Palabras:** Combina varias letras para formar palabras y guárdalas con un clic.
4. **Reiniciar Sesión:** Usa el botón de *"Reiniciar"* para empezar una nueva sesión.

---

## **Resultados**

- **Precisión del Modelo:** 77.02% en el reconocimiento de gestos estáticos del ASL en entornos controlados.
- **Desempeño:** Alta efectividad en la traducción de letras individuales capturadas por la cámara.
- **Limitaciones:**
  - Dificultades en entornos con variaciones extremas de iluminación o fondos complejos.
  - Reconocimiento limitado a gestos estáticos.

---

## **Futuras Mejoras**

- Implementación de reconocimiento para gestos dinámicos y palabras completas.
- Optimizar el modelo para mejorar la precisión en condiciones de baja luz y fondos complejos.
- Expansión para soportar otros lenguajes de señas, además del ASL.
- Integración con dispositivos inteligentes para control por gestos.

---

## **Contribuciones**

Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama:
   ```bash
   git checkout -b feature-nueva-funcion
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```
4. Envía un pull request detallando tus cambios.


