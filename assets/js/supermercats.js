async function llistaSupermercats() {
    try{
        const response = await fetch('/assets/js/supermercat.json');
        const json = await response.json();
        const itemList = json.itemListElement;
        const container = document.querySelector('.supermercats-container');
        for (let i = 0; i < itemList.length; i++) {
            const item = itemList[i];
            const newElement = document.createElement('div');
            newElement.classList.add('col-lg-6', 'supermercats-item', `filter-${item.brand.name}`);
            const content = document.createElement('div');
            content.classList.add('supermercats-content');
            const link = document.createElement('a');
            link.href = '#';
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
            container.appendChild(newElement);
        }
    }
    catch(error){
        console.error('Hubo un error al cargar el archivo JSON', error);
    }
}

llistaSupermercats();