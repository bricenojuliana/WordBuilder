const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-backend-webgl'); // Para mejor rendimiento
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function evaluateModel(modelUrl, datasetPath) {
    // 1. Cargar el modelo entrenado de Teachable Machine
    console.log("Cargando el modelo...");
    const model = await tf.loadLayersModel(`${modelUrl}/model.json`);
    console.log("Modelo cargado exitosamente.");

    // 2. Cargar el dataset desde el archivo JSON
    console.log("Cargando el dataset...");
    const dataset = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
    console.log(`Dataset cargado: ${dataset.length} imágenes.`);

    // 3. Variables para métricas
    let correct = 0;
    let total = dataset.length;
    const confusionMatrix = {};

    // 4. Evaluar cada imagen en el dataset
    for (let i = 0; i < dataset.length; i++) {
        const { image, label } = dataset[i];

        try {
            // Cargar la imagen
            const img = await loadImage(image);
            const canvas = createCanvas(224, 224); // Tamaño esperado por Teachable Machine
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 224, 224);

            // Convertir la imagen a un tensor
            const inputTensor = tf.browser.fromPixels(canvas).expandDims(0).toFloat().div(255.0);

            // Hacer la predicción
            const prediction = model.predict(inputTensor);
            const predictedIndex = prediction.argMax(1).dataSync()[0];

            // Obtener la etiqueta predicha
            const labels = ["A", "B", "C", /* Añade todas las etiquetas de tu modelo */];
            const predictedLabel = labels[predictedIndex];

            // Actualizar métricas
            if (!confusionMatrix[label]) confusionMatrix[label] = {};
            if (!confusionMatrix[label][predictedLabel]) confusionMatrix[label][predictedLabel] = 0;
            confusionMatrix[label][predictedLabel]++;

            if (predictedLabel === label) correct++;

            inputTensor.dispose();
        } catch (error) {
            console.error(`Error al procesar la imagen ${image}:`, error);
        }
    }

    // 5. Calcular métricas
    const accuracy = correct / total;
    console.log("Evaluación completa.");
    console.log(`Precisión: ${(accuracy * 100).toFixed(2)}%`);
    console.log("Matriz de confusión:", confusionMatrix);

    return { accuracy, confusionMatrix };
}

// Llama a la función
evaluateModel(
    'https://teachablemachine.withgoogle.com/models/l2i_74Upq', // URL del modelo
    'asl_dataset.json' // Ruta al archivo JSON del dataset
).then((metrics) => console.log(metrics));
