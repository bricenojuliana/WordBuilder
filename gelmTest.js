const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-backend-webgl'); // Para mejor rendimiento
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

async function evaluateModel(modelUrl, datasetPath) {
    console.log("Cargando el modelo...");
    const model = await tf.loadLayersModel(`${modelUrl}/model.json`);
    console.log("Modelo cargado exitosamente.");

    console.log("Cargando el dataset...");
    const dataset = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
    console.log(`Dataset cargado: ${dataset.length} imágenes.`);

    let correct = 0;
    let total = dataset.length;
    const confusionMatrix = {};

    for (let i = 0; i < dataset.length; i++) {
        const { image, label } = dataset[i];

        try {
            const img = await loadImage(image);
            const canvas = createCanvas(224, 224);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 224, 224);

            const inputTensor = tf.browser.fromPixels(canvas).expandDims(0).toFloat().div(255.0);

            const prediction = model.predict(inputTensor);
            const predictedIndex = prediction.argMax(1).dataSync()[0];

            const labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            const predictedLabel = labels[predictedIndex];

            if (!confusionMatrix[label]) confusionMatrix[label] = {};
            if (!confusionMatrix[label][predictedLabel]) confusionMatrix[label][predictedLabel] = 0;
            confusionMatrix[label][predictedLabel]++;

            if (predictedLabel === label) correct++;

            inputTensor.dispose();
        } catch (error) {
            console.error(`Error al procesar la imagen ${image}:`, error);
        }
    }

    const accuracy = correct / total;
    console.log("Evaluación completa.");
    console.log(`Precisión: ${(accuracy * 100).toFixed(2)}%`);
    console.log("Matriz de confusión:", confusionMatrix);

    generateLocalChart(confusionMatrix);

    return { accuracy, confusionMatrix };
}

function generateLocalChart(confusionMatrix) {
    const labels = Object.keys(confusionMatrix);
    const accuracies = labels.map(label => {
        const total = Object.values(confusionMatrix[label]).reduce((a, b) => a + b, 0);
        const correct = confusionMatrix[label][label] || 0;
        return (correct / total) * 100;
    });

    const width = 800;
    const height = 400;
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

    const configuration = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Precisión por Letra',
                data: accuracies,
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Precisión (%)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Precisión del Modelo por Letra'
                }
            }
        }
    };

    const buffer = chartJSNodeCanvas.renderToBufferSync(configuration);
    fs.writeFileSync('model_accuracy.png', buffer);
    console.log('Gráfica guardada como model_accuracy.png');
}


evaluateModel(
    'https://teachablemachine.withgoogle.com/models/l2i_74Upq', 
    'asl_dataset.json' // Ruta al archivo JSON del dataset
).then((metrics) => console.log(metrics));
