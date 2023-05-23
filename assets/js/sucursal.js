let map;
let supermarket;


async function audioTheme(brand, paragraf) {
    try {
        const response = await fetch('/assets/js/franquicies.json');
        const json = await response.json();
        const itemList = json.itemListElement;
        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].name == brand) {
                paragraf.textContent = itemList[i].description;
            }
        }
    }
    catch (error) {
        console.error('Hubo un error.', error);
    }
}
function distance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180; // difference in latitude in radians
    const dLon = (lon2 - lon1) * Math.PI / 180; // difference in longitude in radians
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // distance in kilometers
    return distance;
}


async function cercaJSONExterns() {
    netejaMarcadors();
    var checkbox1 = document.getElementById("checkbox1");
    var checkbox2 = document.getElementById("checkbox2");
    var checkbox3 = document.getElementById("checkbox3");

    // Monuments case
    if (checkbox1.checked) {
        const response = await fetch('/assets/js/JSONs_Externs/Monumentos.json');
        const json = await response.json();
        const itemList = json.itemListElement;
        var xinxeta = L.icon({
            iconUrl: 'assets/img/mapa/marker-icon-2x-violet.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        for (let i = 0; i < itemList.length; i++) {
            const item = itemList[i];
            if (distance(supermarket.geo.latitude, supermarket.geo.longitude, item.geo.latitude, item.geo.longitude) < 15) {
                var singleMarker = L.marker([item.geo.latitude, item.geo.longitude], { icon: xinxeta });
                singleMarker.addTo(map);
                const popupContent = `
                <div>
                    <h2 style="font-size: 20px;">${item.name}</h2>
                    <img src="${item.image[0].url}" style="height: 100px; width:100%">
                </div>
            `;
                singleMarker.bindPopup(popupContent);
            }
        }
    }
    // Hotels case
    if (checkbox2.checked) {
        const response = await fetch('/assets/js/JSONs_Externs/hotel.json');
        const json = await response.json();
        const itemList = json.itemListElement;
        var xinxeta = L.icon({
            iconUrl: 'assets/img/mapa/marker-icon-2x-gold.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        for (let i = 0; i < itemList.length; i++) {
            const item = itemList[i];
            if (distance(supermarket.geo.latitude, supermarket.geo.longitude, item.geo.latitude, item.geo.longitude) < 15) {
                var singleMarker = L.marker([item.geo.latitude, item.geo.longitude], { icon: xinxeta });
                singleMarker.addTo(map);
                const popupContent = `
                <div>
                    <h2 style="font-size: 20px;">${item.name}</h2>
                    <img src="${item.photo[0].contentUrl}" style="height: 100px; width:100%">
                </div>
            `;
                singleMarker.bindPopup(popupContent);
            }
        }
    }

    // Muntanyes case
    if (checkbox3.checked) {
        const response = await fetch('/assets/js/JSONs_Externs/mountains.json');
        const json = await response.json();
        const itemList = json.itemListElement;
        var xinxeta = L.icon({
            iconUrl: 'assets/img/mapa/marker-icon-2x-grey.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        for (let i = 0; i < itemList.length; i++) {
            const item = itemList[i];
            if (distance(supermarket.geo.latitude, supermarket.geo.longitude, item.containsPlace.geo.latitude, item.containsPlace.geo.longitude) < 15) {
                var singleMarker = L.marker([item.geo.latitude, item.geo.longitude], { icon: xinxeta });
                singleMarker.addTo(map);
                const popupContent = `
                <div>
                    <h2 style="font-size: 20px;">${item.name}</h2>
                    <img src="${item.image[0].url}" style="height: 100px; width:100%">
                </div>
            `;
                singleMarker.bindPopup(popupContent);
            }
        }
    }
}

// Neteja tots els marcadors del mapa excepte el del propi supermercat
function netejaMarcadors() {
    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    var xinxeta = L.icon({
        iconUrl: 'assets/img/mapa/marker-icon-2x-green.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    switch (supermarket.brand.name) {
        case "Eroski":
            xinxeta.iconUrl = 'assets/img/mapa/marker-icon-2x-red.png';
            break;
        case "Mercadona":
            xinxeta.iconUrl = 'assets/img/mapa/marker-icon-2x-orange.png';
            break;
        case "Carrefour":
            xinxeta.iconUrl = 'assets/img/mapa/marker-icon-2x-blue.png';
            break;
        case "Lidl":
            xinxeta.iconUrl = 'assets/img/mapa/marker-icon-2x-yellow.png';
            break;
        case "BipBip":
            xinxeta.iconUrl = 'assets/img/mapa/marker-icon-2x-green.png';
            break;
        case "Aprop":
            xinxeta.iconUrl = 'assets/img/mapa/marker-icon-2x-black.png';
            break;
        default:
            xinxeta.iconUrl = 'assets/img/mapa/marker-icon-2x-violet.png';
            break;
    }
    var singleMarker = L.marker([supermarket.geo.latitude, supermarket.geo.longitude], { icon: xinxeta });
    singleMarker.addTo(map);

    map.setView([supermarket.geo.latitude, supermarket.geo.longitude], 12);
}


async function loadSucursal() {
    try {
        var checkbox1 = document.getElementById("checkbox1");
        var checkbox2 = document.getElementById("checkbox2");
        var checkbox3 = document.getElementById("checkbox3");

        // Add a click event listener to each checkbox element
        checkbox1.addEventListener('click', cercaJSONExterns);
        checkbox2.addEventListener('click', cercaJSONExterns);
        checkbox3.addEventListener('click', cercaJSONExterns);


        // Obtenemos la sucursal seleccionada
        var sucursal = localStorage.getItem("sucursal");

        // Carreguem el JSON
        const response = await fetch('/assets/js/supermercat.json');
        const json = await response.json();
        const itemList = json.itemListElement;


        for (let i = 0; i < itemList.length; i++) {
            const item = itemList[i];
            // Agregar una condición para buscar el item que coincida con el nombre de la sucursal
            if (item.name === sucursal) {
                supermarket = item;
                // %%%%%%%%%%%%%%%%% TITULO %%%%%%%%%%%%%%%%%
                const container = document.querySelector('.barra-gris');

                const h2 = document.createElement('h2');
                h2.textContent = item.name;

                const ol = document.createElement('ol');

                const li1 = document.createElement('li');
                const a = document.createElement('a');
                a.href = 'index.html';
                a.textContent = 'Home';
                li1.appendChild(a);

                const li2 = document.createElement('li');
                li2.textContent = item.brand.name;

                // Agregar los elementos al DOM
                ol.appendChild(li1);
                ol.appendChild(li2);

                container.appendChild(h2);
                container.appendChild(ol);

                // %%%%%%%%%%%%%%%%% INICI %%%%%%%%%%%%%%%%%

                const container2 = document.querySelector('.inici-sucursal');

                const div1 = document.createElement('div');
                div1.classList.add('col-lg-4', 'text-center', 'order-1', 'order-lg-1');
                const img = document.createElement('img');

                img.src = item.image;
                img.alt = 'Imatge del local';
                img.classList.add('img-fluid');
                div1.appendChild(img);

                const div2 = document.createElement('div');
                div2.classList.add('col-lg', 'details', 'order-2', 'order-lg-2');
                div2.style.display = 'flex';
                div2.style.textAlign = 'center';
                div2.style.justifyContent = 'center';
                div2.style.flexDirection = 'column';

                const div3 = document.createElement('div');
                div3.classList.add('section-title');
                const h2s = document.createElement('h2');
                h2s.innerHTML = `<span>${item.brand.name}</span> - ${item.address.streetAddress}`;
                div3.appendChild(h2s);

                const p1 = document.createElement('p');
                p1.classList.add('fst-italic');
                p1.textContent = `${item.address.postalCode} - ${item.address.addressLocality}`;

                const p2 = document.createElement('p');
                p2.textContent = item.openingHours.join(' - ');

                // Agregar los elementos a los divs
                div2.appendChild(div3);
                div2.appendChild(p1);
                div2.appendChild(p2);

                // Agregar los elementos al container
                container2.appendChild(div1);
                container2.appendChild(div2);

                // %%%%%%%%%%%%%%%%% MAPA %%%%%%%%%%%%%%%%%

                map = L.map('map').setView([item.geo.latitude, item.geo.longitude], 12);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);


                var xinxeta = L.icon({
                    iconUrl: 'assets/img/mapa/marker-icon-2x-green.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                });

                switch (item.brand.name) {
                    case "Eroski":
                        xinxeta.iconUrl = 'assets/img/mapa/marker-icon-2x-red.png';
                        break;
                    case "Mercadona":
                        xinxeta.iconUrl = 'assets/img/mapa/marker-icon-2x-orange.png';
                        break;
                    case "Carrefour":
                        xinxeta.iconUrl = 'assets/img/mapa/marker-icon-2x-blue.png';
                        break;
                    case "Lidl":
                        xinxeta.iconUrl = 'assets/img/mapa/marker-icon-2x-yellow.png';
                        break;
                    case "BipBip":
                        xinxeta.iconUrl = 'assets/img/mapa/marker-icon-2x-green.png';
                        break;
                    case "Aprop":
                        xinxeta.iconUrl = 'assets/img/mapa/marker-icon-2x-black.png';
                        break;
                    default:
                        xinxeta.iconUrl = 'assets/img/mapa/marker-icon-2x-violet.png';
                        break;
                }
                var singleMarker = L.marker([item.geo.latitude, item.geo.longitude], { icon: xinxeta });
                singleMarker.addTo(map);

                // %%%%%%%%%%%%%%%%% AUDIO %%%%%%%%%%%%%%%%%
                const container4 = document.querySelector('.audioTheme');

                const h3 = document.createElement('h3');
                const strong = document.createElement('strong');
                strong.textContent = item.brand.name;
                h3.appendChild(strong);
                h3.appendChild(document.createTextNode(' - Theme Song'));

                const p10 = document.createElement('p');
                p10.classList.add('fst-italic');
                audioTheme(item.brand.name, p10);
                //p10.textContent = 'Tumba la casa mami';



                container4.appendChild(h3);
                container4.appendChild(p10);


                // Posam l'audio de la franquicia
                const audio = document.getElementById('franquiciaAudio');
                const source = document.createElement('source');
                source.setAttribute('src', item.subjectOf.audio[0].contentUrl);
                source.setAttribute('type', 'audio/mp3');
                audio.appendChild(source);
                audio.setAttribute('controls', '');

                // Salir del bucle cuando se encuentra el elemento buscado
                break;
            }

        }
    }
    catch (error) {
        console.error('Hubo un error.', error);
    }
}