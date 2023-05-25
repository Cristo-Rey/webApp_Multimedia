<?php

// RECIBIMOS LOS DATOS DEL FORMULARIO
$sucursal = $_POST['sucursal'];
$rating = $_POST['rating'];
$opinion = $_POST['opinion'];
$name = $_POST['name'];

//DEBUG PARA VER LOS DATOS RECIBIDOS
echo $sucursal;
echo $rating;
echo $opinion;
echo $name;


// CONECTAMOS CON UN JSON
$valoracions = file_get_contents('../assets/json/valoracions.json');
$valoracions = json_decode($valoracions, true);

// AÑADIMOS LOS DATOS RECIBIDOS AL JSON
$valoracions['itemListElement'][] = array(
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

// GUARDAMOS LOS DATOS EN EL JSON
$valoracions = json_encode($valoracions, JSON_PRETTY_PRINT);
file_put_contents('../assets/json/valoracions.json', $valoracions);

// VOLVEMOS A LA PAGINA PRINCIPAL
header('Location: ../index.html');

?>

