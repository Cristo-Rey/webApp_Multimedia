function loadJSON_LD(info, tipus) {
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');

    // Cas franquicia
    if (tipus == 0) {
        let s = {
            "@context": "https://schema.org",
            "@type": "Brand",
            "name": info.name,
            "logo": info.logo,
            "description": info.description,
            "subjectOf": info.subjectOf,
        };
        script.textContent = JSON.stringify(s);
        document.head.appendChild(script);
    }
    // Cas comentari
    else if (tipus == 1) {
        let s = {
            "@context": "https://schema.org",
            "@type": "Review",
            "author": info.author,
            "reviewBody": info.reviewBody,
            "itemReviewed": info.itemReviewed,
            "reviewRating": info.reviewRating,
            "alternateName": info.alternateName
        };
        script.textContent = JSON.stringify(s);
        document.head.appendChild(script);
    }

}

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
                loadJSON_LD(item, 0);
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
                img.loading = "lazy";
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
                p1.textContent = `${item.description}`;

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
                valoracionsDestacades();
                valoracionsFranquicies();

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
                    <img src="${item.image}" style="height: 130px; width:130px; object-fit: cover; aspect-ratio: 1/1;" alt="${item.name}">
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

async function valoracionsDestacades() {
    try {
        const responseValoracion = await fetch('/assets/js/valoracions.json');
        const json = await responseValoracion.json();
        const itemList = json.itemListElement;

        const container = document.querySelector('.valoracions-destacades');
        const swiperWrapper = document.createElement('div');
        swiperWrapper.classList.add('swiper-wrapper');

        let hayReviews = false; // Variable para verificar si hay reviews

        for (let i = 0; i < itemList.length; i++) {
            const item = itemList[i];
            if (item.alternateName === localStorage.getItem("franquicia") && Math.random() < 0.5) {
                loadJSON_LD(item, 1);
                hayReviews = true;
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide');
                const row = document.createElement('div');
                row.classList.add('row', 'event-item');
                const colImg = document.createElement('div');
                colImg.classList.add('col-lg-6');
                const img = document.createElement('img');
                img.classList.add('img-fluid');
                img.setAttribute('src', await cercaImatge(item.itemReviewed.name));
                const colContent = document.createElement('div');
                colContent.classList.add('col-lg-6', 'pt-4', 'pt-lg-0', 'content');
                const a = document.createElement('a');
                a.setAttribute('href', 'sucursal.html');
                a.onclick = function () { enviarSucursal(item.itemReviewed.name) };
                const h3 = document.createElement('h3');
                h3.textContent = item.itemReviewed.name;
                const price = document.createElement('div');
                price.classList.add('price');
                const p = document.createElement('p');
                const span = document.createElement('span');
                span.textContent = item.reviewRating.ratingValue + ' ✯';
                p.appendChild(span);
                price.appendChild(p);
                const p2 = document.createElement('p');
                p2.classList.add('fst-italic');
                p2.textContent = `"${item.author}"`;
                const p3 = document.createElement('p');
                p3.textContent = item.reviewBody;
                a.appendChild(h3);
                colContent.appendChild(a);
                colContent.appendChild(price);
                colContent.appendChild(p3);
                colContent.appendChild(p2);
                colImg.appendChild(img);
                row.appendChild(colImg);
                row.appendChild(colContent);
                swiperSlide.appendChild(row);
                swiperWrapper.appendChild(swiperSlide);


            }
        }
        if (!hayReviews) { // Agrega un mensaje si no hay reviews
            const noReviewsMessage = document.createElement('h1');
            noReviewsMessage.textContent = 'No hi ha cap valoració destacada per aquesta franquicia 😢';
            noReviewsMessage.style.textAlign = 'center';
            noReviewsMessage.style.color = '#ffffff';
            container.appendChild(noReviewsMessage);
        } else {
            const swiperPagination = document.createElement('div');
            swiperPagination.classList.add('swiper-pagination');

            container.appendChild(swiperWrapper);
            container.appendChild(swiperPagination);

            // Inicializar el swiper después de agregar el contenido al DOM
            function initSwiper() {
                const swiper = new Swiper('.swiper', {
                    slidesPerView: 1,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    }
                });
            }

            initSwiper();
        }
    } catch (error) {
        console.error('Hubo un error.', error);
    }
}

async function valoracionsFranquicies() {
    try {
        const responseValoracion = await fetch('/assets/js/valoracions.json');
        const json = await responseValoracion.json();
        const itemList = json.itemListElement;

        const container = document.querySelector('.valoracions-sucursal');
        const testimonialsSlider = document.createElement('div');
        testimonialsSlider.classList.add('testimonials-slider', 'swiper');
        testimonialsSlider.setAttribute('data-aos', 'fade-up');
        testimonialsSlider.setAttribute('data-aos-delay', '100');

        const swiperWrapper = document.createElement('div');
        swiperWrapper.classList.add('swiper-wrapper');

        let hayReviews = false; // Variable para verificar si hay reviews

        for (let i = 0; i < itemList.length; i++) {
            const item = itemList[i];

            if (item.alternateName === localStorage.getItem("franquicia")) {
                loadJSON_LD(item, 1);
                hayReviews = true; // Se cambia a true si hay reviews                
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide');

                const testimonialItem = document.createElement('div');
                testimonialItem.classList.add('testimonial-item');

                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("width", "100");
                svg.setAttribute("height", "100");

                const testimonialImg = document.createElementNS("http://www.w3.org/2000/svg", "image");
                testimonialImg.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "assets/img/user.svg");
                testimonialImg.setAttribute("width", "100%");
                testimonialImg.setAttribute("height", "100%");
                svg.appendChild(testimonialImg);

                const testimonialName = document.createElement('h3');
                testimonialName.textContent = item.author;

                const stars = document.createElement('div');
                stars.classList.add('stars');

                for (let j = 0; j < item.reviewRating.ratingValue; j++) {
                    const star = document.createElement('i');
                    star.classList.add('bi', 'bi-star-fill');
                    stars.appendChild(star);
                }

                const testimonialText = document.createElement('p');
                testimonialText.innerHTML = `<i class="bx bxs-quote-alt-left quote-icon-left"></i>${item.reviewBody}<i class="bx bxs-quote-alt-right quote-icon-right"></i>`;

                testimonialItem.appendChild(svg);
                testimonialItem.appendChild(testimonialName);
                testimonialItem.appendChild(stars);
                testimonialItem.appendChild(testimonialText);

                swiperSlide.appendChild(testimonialItem);
                swiperWrapper.appendChild(swiperSlide);
            }
        }

        if (!hayReviews) { // Agrega un mensaje si no hay reviews
            const noReviewsMessage = document.createElement('h1');
            noReviewsMessage.textContent = 'No hi ha cap valoració per aquesta franquicia 😢';
            noReviewsMessage.style.textAlign = 'center';
            noReviewsMessage.style.color = '#ffffff';
            container.appendChild(noReviewsMessage);
        } else {
            const swiperPagination = document.createElement('div');
            swiperPagination.classList.add('swiper-pagination');

            testimonialsSlider.appendChild(swiperWrapper);
            testimonialsSlider.appendChild(swiperPagination);

            container.appendChild(testimonialsSlider);
        }
    }
    catch (error) {
        console.error('Hubo un error.', error);
    }
}

async function cercaImatge(nom) {
    //Buscamos el path de la imatge de la sucursal
    try {
        const response = await fetch('/assets/js/supermercat.json');
        const json = await response.json();
        const itemList = json.itemListElement;
        for (let i = 0; i < itemList.length; i++) {
            const item = itemList[i];
            if (item.name === nom) {
                return item.image;
            }
        }
    }
    catch (error) {
        console.error('Hubo un error.', error);
    }
}

async function buscarVideo() {
    var query = localStorage.getItem("franquicia");
    var apiKey = '${{ secrets.apiYoutube }}';
    var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + query + '&key=' + apiKey;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var videoId = data.items[0].id.videoId;
            var playerDiv = document.getElementById('player');
            playerDiv.innerHTML = '<iframe width="60%" height="630" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="margin-left: 20%;"></iframe>';
            
        })
}