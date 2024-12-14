import os
import json

def create_json_dataset(dataset_path, output_file):
    """
    Genera un archivo JSON a partir de un dataset organizado en carpetas por etiquetas.

    Args:
        dataset_path (str): Ruta al dataset (carpetas con imágenes organizadas por etiqueta).
        output_file (str): Nombre del archivo JSON de salida.

    Estructura del dataset:
    dataset_path/
        A/
            image1.jpg
            image2.jpg
        B/
            image1.jpg
            image2.jpg
    """
    # Lista ppara almacenar las entradas del dataset
    data = []

    # Recorre las carpetas del dataset
    for label in os.listdir(dataset_path):
        label_path = os.path.join(dataset_path, label)
        if os.path.isdir(label_path):  # Asegúrate de que sea una carpeta
            for img_file in os.listdir(label_path):
                # Obtén la ruta completa de la imagen
                img_path = os.path.join(label_path, img_file)
                # Agrega un registro al dataset
                data.append({"image": img_path, "label": label})

    # Guarda los datos en formato JSON
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=4)

    print(f"Archivo JSON creado: {output_file}")

# Llama a la función con la ruta al dataset y el archivo de salida
create_json_dataset('dataset', 'asl_dataset.json')
