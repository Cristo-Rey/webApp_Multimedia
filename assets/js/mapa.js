async function fer_mapa() {

    let map = L.map('map').setView([39.6136200, 3.0200400], 9)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var singleMarker = L.marker([39.6136200, 3.0200400]);
    singleMarker.addTo(map);


    try {
        const response = await fetch('/assets/js/supermercat.json');
        const json = await response.json();
        const itemList = json.itemListElement;
        const container = document.querySelector('.supermercats-container');
        for (let i = 0; i < itemList.length; i++) {
            const item = itemList[i];
            var singleMarker = L.marker([item.geo.latitude, item.geo.longitude]);
            singleMarker.addTo(map);
        }
    }
    catch (error) {
        console.error('Hubo un error al cargar el archivo JSON', error);
    }
}

fer_mapa()