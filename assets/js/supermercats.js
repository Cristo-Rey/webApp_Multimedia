async function llista_franquicies() {
    try {
        const responseFrnaquicies = await fetch('/assets/js/franquicies.json');
        const jsonFranquicies = await responseFrnaquicies.json();
        const itemList = jsonFranquicies.itemListElement;
        const llista_franquicies = document.getElementById('llista_franquicies');
        const div_franquicies = document.getElementById('div_franquicies');

        const liElement = document.createElement('li');
        liElement.classList.add('nav-item', 'active', 'show');
        const aElement = document.createElement('a');
        aElement.classList.add('nav-link');
        aElement.setAttribute('data-bs-toggle', 'tab');
        aElement.setAttribute('href', '#tab-0');
        aElement.textContent = itemList[0].name;
        liElement.appendChild(aElement);
        llista_franquicies.appendChild(liElement);

        const franquicia = document.createElement('div');
        franquicia.classList.add("tab-pane", 'active', 'show');
        franquicia.setAttribute('id',"tab-0");
        const row = document.createElement('div');
        row.classList.add('row');

        const info = document.createElement('div');
        info.classList.add('col-lg-8', 'details', 'order-2', 'order-lg-1');
        const nom = document.createElement('h3');
        nom.textContent='también hay seres buenos, los menos';
        const desc = document.createElement('p');
        desc.classList.add('fsc-italic');
        desc.textContent='Con qué derecho hablan de Diós estos demonios?';

        const imgdiv = document.createElement('div');
        imgdiv.classList.add('col-lg-4', 'text-center', 'order-1', 'order-lg-2');
        const img = document.createElement('img');
        img.src = 'assets/img/logo_franquicia/franquicia-1.jpg';
        img.alt = '';
        img.classList.add('img-fluid');

        info.appendChild(nom);
        info.appendChild(desc);
        row.appendChild(info);

        imgdiv.appendChild(img);
        franquicia.appendChild(row);
        franquicia.appendChild(imgdiv)





        /*
                                    <div class="tab-pane active show" id="tab-1"> // Franquicia
                                        <div class="row">   //row
                                            <div class="col-lg-8 details order-2 order-lg-1"> // info
                                                <h3>Architecto ut aperiam autem id</h3> // nom
                                                <p class="fst-italic">Qui laudantium consequatur laborum sit qui ad sapiente 
                                                    dila parde sonata raqer a videna mareta paulona marka</p> // desc
                                                <p>Et nobis maiores eius. Voluptatibus ut enim blanditiis atque harum sint.
                                                    Laborum eos ipsum ipsa odit magni. Incidunt hic ut molestiae aut qui. Est
                                                    repellat minima eveniet eius et quis magni nihil. Consequatur dolorem
                                                    quaerat quos qui similique accusamus nostrum rem vero</p>
                                            </div>
                                            <div class="col-lg-4 text-center order-1 order-lg-2">
                                                <img src="assets/img/logo_franquicia/franquicia-1.jpg" alt="" class="img-fluid">
                                            </div>
                                        </div>
                                    </div>
        
        */





        for (let i = 1; i < itemList.length; i++) {
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