<?php
// Obtener los datos del formulario
$sucursal = $_POST['sucursal'];
$rating = $_POST['rating'];
$opinion = $_POST['opinion'];
$name = $_POST['name'];

// Cargar el JSON existente
$json = file_get_contents('lista-valoraciones.json');
$data = json_decode($json, true);

// Crear un nuevo elemento de valoración
$newItem = array(
    "@context" => "http://schema.org",
    "@type" => "Review",
    "author" => $name,
    "reviewBody" => $opinion,
    "itemReviewed" => array(
        "@type" => "GroceryStore",
        "name" => $sucursal[0]
    ),
    "reviewRating" => array(
        "@type" => "Rating",
        "ratingValue" => $rating+1
    ),
    "alternateName" => $sucursal
);

// Agregar el nuevo elemento a la lista de valoraciones
$data['itemListElement'][] = $newItem;

// Convertir el arreglo de PHP en JSON y guardar el archivo
$newJson = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
file_put_contents('lista-valoraciones.json', $newJson);
?>