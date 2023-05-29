function loadJSON_LD(info) {
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');

    let s = {
        "@context": "https://schema.org",
        "@type": "GroceryStore",
        "name": info.name,
        "telephone": info.telephone,
        "image": info.image,
        "address": info.address,
        "geo": info.geo,
        "brand": info.brand,
        "oppeningHours": info.oppeningHours
    };
    script.textContent = JSON.stringify(s);
    document.head.appendChild(script);
}

async function llista_franquicies() {
    try {
        const responseFrnaquicies = await fetch('/assets/js/franquicies.json');
        const jsonFranquicies = await responseFrnaquicies.json();
        const itemList = jsonFranquicies.itemListElement;
        const llista_franquicies = document.getElementById('llista_franquicies');
        const div_franquicies = document.getElementById('div_franquicies');

        for (let i = 0; i < itemList.length; i++) {
            const item = itemList[i];
            loadJSON_LD(item);
            const liElement = document.createElement('li');
            liElement.classList.add('nav-item');
            const aElement = document.createElement('a');
            aElement.classList.add('nav-link');
            if (i == 0) {
                aElement.classList.add('active', 'show');
            }
            aElement.setAttribute('data-bs-toggle', 'tab');
            aElement.setAttribute('href', '#tab-' + i);
            aElement.textContent = item.name;
            liElement.appendChild(aElement);
            llista_franquicies.appendChild(liElement);

            const franquicia = document.createElement('div');
            franquicia.classList.add("tab-pane");
            if (i == 0) {
                franquicia.classList.add('active', 'show');
            }
            franquicia.setAttribute('id', "tab-" + i);
            const row = document.createElement('div');
            row.classList.add('row');

            const info = document.createElement('div');
            info.classList.add('col-lg-8', 'details', 'order-2', 'order-lg-1');
            const nom = document.createElement('h3');
            nom.textContent = itemList[i].name;
            // Creamos una etiqueta <a> para poder hacer click en el nombre de la franquicia
            const nomA = document.createElement('a');
            nomA.appendChild(nom);
            nomA.setAttribute('href', 'franquicia.html');
            nomA.setAttribute('onclick', `enviarFranquicia('${item.name}')`)
            const desc = document.createElement('p');
            desc.classList.add('fsc-italic');
            desc.textContent = itemList[i].description;

            const imgdiv = document.createElement('div');
            imgdiv.classList.add('col-lg-4', 'text-center', 'order-1', 'order-lg-2');
            const img = document.createElement('img');
            img.src = itemList[i].logo;
            img.alt = '';
            img.classList.add('img-fluid');
            img.loading = "lazy";

            info.appendChild(nomA);
            info.appendChild(desc);
            row.appendChild(info);

            imgdiv.appendChild(img);
            franquicia.appendChild(row);
            row.appendChild(imgdiv);
            div_franquicies.appendChild(franquicia);

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

// Funcio per el formulari de contacte
async function enviarFormulari(event) {
    event.preventDefault(); // Evitam el redireccionament del formulari

    var form = document.getElementById('formulari');
    var formData = new FormData(form);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://formspree.io/f/mknaayek');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // El formulario se envió exitosamente
                form.reset();
                alert('Gràcies pel teu missatge! Responderem el més aviat possible.');
            } else {
                // Error al enviar el formulario
                console.log(xhr.status);
                alert('Hi ha hagut un error al enviar el missatge. Si us plau, torna a intentar-ho.');
            }
        }
    };
    xhr.send(formData);
}