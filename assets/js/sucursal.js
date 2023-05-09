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
                // Generamos la parte del titulo
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

                // Salir del bucle cuando se encuentra el elemento buscado
                break;
            }
        }
    }
    catch (error) {
        console.error('Hubo un error.', error);
    }
}