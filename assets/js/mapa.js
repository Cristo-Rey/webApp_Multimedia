async function fer_mapa() {

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
    catch (error) {
        console.error('Hubo un error al cargar el archivo JSON', error);
    }
}

fer_mapa();