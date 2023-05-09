async function loadSucursal() {
    try {
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
                
                // Switch para selecionar la franquicia
                // switch (item.brand.name) {
                //     case 'Mercadona':
                //         img.src = 'assets/img/logo_franquicia/franquicia-1.jpg';
                //         break;
                //     case 'Eroski':
                //         img.src = 'assets/img/logo_franquicia/franquicia-2.jpg';
                //         break;
                //     case 'Carrefour':
                //         img.src = 'assets/img/logo_franquicia/franquicia-3.jpg';
                //         break;
                //     case 'Lidl':
                //         img.src = 'assets/img/logo_franquicia/franquicia-4.jpg';
                //         break;
                //     case 'BipBip':
                //         img.src = 'assets/img/logo_franquicia/franquicia-5.jpg';
                //         break;
                //     case 'Aprop':
                //         img.src = 'assets/img/logo_franquicia/franquicia-6.jpg';
                //         break;
                // }
                // img.alt = `Logo de ${item.brand.name}`;

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

                const container3 = document.querySelector('.mapa-sucursal');
                let map = L.map('map').setView([item.geo.latitude, item.geo.longitude], 12);
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
                        xinxeta.iconUrl='assets/img/mapa/marker-icon-2x-red.png';
                        break;
                    case "Mercadona":
                        xinxeta.iconUrl='assets/img/mapa/marker-icon-2x-orange.png';
                        break;
                    case "Carrefour":
                        xinxeta.iconUrl='assets/img/mapa/marker-icon-2x-blue.png';
                        break;
                    case "Lidl":
                        xinxeta.iconUrl='assets/img/mapa/marker-icon-2x-yellow.png';
                        break;
                    case "BipBip":
                        xinxeta.iconUrl='assets/img/mapa/marker-icon-2x-green.png';
                        break;
                    case "Aprop":
                        xinxeta.iconUrl='assets/img/mapa/marker-icon-2x-black.png';
                        break;
                    default:
                        xinxeta.iconUrl='assets/img/mapa/marker-icon-2x-violet.png';
                        break;
                }
                var singleMarker = L.marker([item.geo.latitude, item.geo.longitude], { icon: xinxeta });
                singleMarker.addTo(map);


                // Salir del bucle cuando se encuentra el elemento buscado
                break;
            }

        }
    }
    catch (error) {
        console.error('Hubo un error.', error);
    }
}