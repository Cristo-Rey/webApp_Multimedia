async function llista_franquicies() {
    try {
        const responseFrnaquicies = await fetch('/assets/js/franquicies.json');
        const jsonFranquicies = await responseFrnaquicies.json();
        const itemList = jsonFranquicies.itemListElement;
        const llista_franquicies = document.getElementById('llista_franquicies');
        const div_franquicies = document.getElementById('div_franquicies');

        const liElement = document.createElement('li');
        liElement.classList.add('nav-item','active','show');
        const aElement = document.createElement('a');
        aElement.classList.add('nav-link');
        aElement.setAttribute('data-bs-toggle', 'tab');
        aElement.setAttribute('href', '#tab-0');
        aElement.textContent = itemList[0].name;
        liElement.appendChild(aElement);
        llista_franquicies.appendChild(liElement);



        for (let i = 0; i < itemList.length; i++) {
            const item = itemList[i];
            const liElement = document.createElement('li');
            liElement.classList.add('nav-item');
            const aElement = document.createElement('a');
            aElement.classList.add('nav-link');
            aElement.setAttribute('data-bs-toggle', 'tab');
            aElement.setAttribute('href', '#tab-' + i);
            aElement.textContent = item.name;
            liElement.appendChild(aElement);
            llista_franquicies.appendChild(liElement);
        }
    } catch (error) {
        console.error('Hubo un error al cargar el archivo JSON', error);
    }






}

async function llistaSupermercats() {
    try {
        const responseSupermercat = await fetch('/assets/js/supermercat.json');
        const json = await responseSupermercat.json();
        const itemList = json.itemListElement;
        const container = document.querySelector('.supermercats-container');
        for (let i = 0; i < itemList.length; i++) {
            const item = itemList[i];
            const newElement = document.createElement('div');
            newElement.classList.add('col-lg-6', 'supermercats-item', `filter-${item.brand.name}`);
            const content = document.createElement('div');
            content.classList.add('supermercats-content');
            const link = document.createElement('a');
            link.href = 'sucursal.html';
            link.textContent = item.name;
            const rating = document.createElement('span');
            const randomRating = (Math.random() * 5).toFixed(1);
            rating.textContent = `${randomRating} ✯`;
            content.appendChild(link);
            content.appendChild(rating);
            newElement.appendChild(content);
            const description = document.createElement('div');
            description.classList.add('supermercats-ingredients');
            description.textContent = item.address.streetAddress;
            newElement.appendChild(description);
            newElement.setAttribute('onclick', `enviarSucursal('${item.name}')`)
            container.appendChild(newElement);
        }
    }
    catch (error) {
        console.error('Hubo un error al cargar el archivo JSON', error);
    }
}

llistaSupermercats();
llista_franquicies();