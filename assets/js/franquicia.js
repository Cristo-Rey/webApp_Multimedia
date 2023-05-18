async function loadFranquicia() {
    try {
        // Obtenemos la franquicia seleccionada
        var franquicia = localStorage.getItem("franquicia");

        // Carreguem el JSON de franquicies
        const response = await fetch('/assets/js/franquicies.json');
        const json = await response.json();
        const itemList = json.itemListElement;

        // Carreguem el JSON de supermercats
        const responseSupermercat = await fetch('/assets/js/supermercat.json');
        const jsonSupermercat = await responseSupermercat.json();
        const itemListSupermercat = jsonSupermercat.itemListElement;


        for (let i = 0; i < itemList.length; i++) {
            const item = itemList[i];
            // Agregar una condición para buscar el item que coincida con el nombre de la franquicia
            if (item.name === franquicia) {
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
                li2.textContent = item.name;

                // Agregar los elementos al DOM
                ol.appendChild(li1);
                ol.appendChild(li2);

                container.appendChild(h2);
                container.appendChild(ol);

                // %%%%%%%%%%%%%%%%% INICI %%%%%%%%%%%%%%%%%

                const container2 = document.querySelector('.inici-franquicia');

                const div1 = document.createElement('div');
                div1.classList.add('col-lg-4', 'text-center', 'order-1', 'order-lg-1');
                const img = document.createElement('img');

                img.src = item.logo;
                img.alt = 'Imatge de la franquicia';
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
                h2s.innerHTML = `<span>${item.name}</span>`;
                div3.appendChild(h2s);

                const p1 = document.createElement('p');
                p1.classList.add('fst-italic');
                p1.textContent = `${item.description}}`;

                // Agregar los elementos a los divs
                div2.appendChild(div3);
                div2.appendChild(p1);

                // Agregar los elementos al container
                container2.appendChild(div1);
                container2.appendChild(div2);

                // %%%%%%%%%%%%%%%%% MAPA %%%%%%%%%%%%%%%%%

                fer_mapa(item.name);

                // %%%%%%%%%%%%%%%%% GALERIA %%%%%%%%%%%%%%%%%

                const container3 = document.querySelector('.galeria-dinamica');

                const div4 = document.createElement('div');
                div4.classList.add('section-title');
                const h2g = document.createElement('h2');
                h2g.innerHTML = `<span>Fotos</span> - ${item.name}`;
                div4.appendChild(h2g);

                const p2 = document.createElement('p');
                p2.textContent = `Fotos de les subcursals de ${item.name}`;
                div4.appendChild(p2);

                const div5 = document.createElement('div');
                div5.classList.add('row', 'g-0');

                for (let j = 0; j < itemListSupermercat.length; j++) {
                    const itemSupermercat = itemListSupermercat[j];
                    if (itemSupermercat.brand.name === item.name) {
                        const div6 = document.createElement('div');
                        div6.classList.add('col-lg-3', 'col-md-4');
                        div6.style.flexBasis = '20%';
                        const div7 = document.createElement('div');
                        div7.classList.add('gallery-item');
                        const a2 = document.createElement('a');
                        a2.href = itemSupermercat.image;
                        a2.classList.add('gallery-lightbox');
                        const img2 = document.createElement('img');
                        img2.src = itemSupermercat.image;
                        img2.alt = itemSupermercat.name;
                        img2.classList.add('img-fluid');
                        img2.style.objectFit = 'cover';
                        img2.style.aspectRatio = '1 / 1';
                        a2.appendChild(img2);
                        div7.appendChild(a2);
                        div6.appendChild(div7);
                        div5.appendChild(div6);
                    }
                }

                container3.appendChild(div4);
                container3.appendChild(div5);

                // %%%%%%%%%%%%%%%%% RESENYES %%%%%%%%%%%%%%%%%

                // Salir del bucle cuando se encuentra el elemento buscado
                break;
            }
        }
    }
    catch (error) {
        console.error('Hubo un error.', error);
    }
}

async function fer_mapa(franquicia) {

    let map = L.map('map').setView([39.6136200, 3.0200400], 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',).addTo(map);

    // Iconos personalizados

    var greenIcon = L.icon({
        iconUrl: 'assets/img/mapa/marker-icon-2x-green.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    var redIcon = L.icon({
        iconUrl: 'assets/img/mapa/marker-icon-2x-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    var blueIcon = L.icon({
        iconUrl: 'assets/img/mapa/marker-icon-2x-blue.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    var yellowIcon = L.icon({
        iconUrl: 'assets/img/mapa/marker-icon-2x-yellow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    var orangeIcon = L.icon({
        iconUrl: 'assets/img/mapa/marker-icon-2x-orange.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    var blackIcon = L.icon({
        iconUrl: 'assets/img/mapa/marker-icon-2x-black.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var violetIcon = L.icon({
        iconUrl: 'assets/img/mapa/marker-icon-2x-violet.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    try {
        const response = await fetch('/assets/js/supermercat.json');
        const json = await response.json();
        const itemList = json.itemListElement;

        for (let i = 0; i < itemList.length; i++) {

            if (itemList[i].brand.name === franquicia) {
                const item = itemList[i];

                switch (item.brand.name) {
                    case "Eroski":
                        var singleMarker = L.marker([item.geo.latitude, item.geo.longitude], { icon: redIcon });
                        break;
                    case "Mercadona":
                        var singleMarker = L.marker([item.geo.latitude, item.geo.longitude], { icon: orangeIcon });
                        break;
                    case "Carrefour":
                        var singleMarker = L.marker([item.geo.latitude, item.geo.longitude], { icon: blueIcon });
                        break;
                    case "Lidl":
                        var singleMarker = L.marker([item.geo.latitude, item.geo.longitude], { icon: yellowIcon });
                        break;
                    case "BipBip":
                        var singleMarker = L.marker([item.geo.latitude, item.geo.longitude], { icon: greenIcon });
                        break;
                    case "Aprop":
                        var singleMarker = L.marker([item.geo.latitude, item.geo.longitude], { icon: blackIcon });
                        break;
                    default:
                        console.log(item.brand.name);
                        var singleMarker = L.marker([item.geo.latitude, item.geo.longitude], { icon: violetIcon });
                        break;
                }
                singleMarker.addTo(map);

                // Crear el popup con la información del supermercado
                const popupContent = `
                <div>
                    <h2 style="font-size: 20px;">${item.name}</h2>
                    <img src="${item.image}" style="height: 100px; width:100%">
                    <p><a href='sucursal.html' target="_blank" onclick="enviarSucursal('${item.name}')">Més informació</a></p>
                </div>
            `;
                singleMarker.bindPopup(popupContent);
            }
        }
    }
    catch (error) {
        console.error('Hubo un error al cargar el archivo JSON', error);
    }
}