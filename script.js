window.onload = function() {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '?';

    let places = staticLoadPlaces();
    renderPlaces(places, button);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Pokemon',
            location: {
                //lat: 53.37006026446223,
                //lng: -6.504681893471186,
                lat: 43.3120383,
                lng: -1.9962011,
            }
        },
    ];
}

var models = [
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        rotation: '0 180 0',
        //position: '0 -2 -10',
        info: 'Magnemite, Lv. 5, HP 10/10',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        //position: '0 -10 -20',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        //position: '5 15 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },

];

var modelIndex = 0;
var setModel = function(model, entity){
    if(model.scale){
        entity.setAttribute('scale', model.scale);
    }

    if(model.rotaion){
        entity.setAttribute('rotation', model.rotation);
    }

    if(model.position){
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    //div.innerText = model.info;
    div.textContent = model.info;
};

function renderPlaces(places, btn) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place',`latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('position', '0 0 -50');

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        //document.querySelector('button[data-action="change"]').addEventListener('click', function(){
        btn.addEventListener('click', function(){
           var entity = document.querySelector('[gps-entity-place]');
           modelIndex++;
           var newIndex = modelIndex % models.length;
           setModel(models[newIndex], entity); 
        });

        scene.appendChild(model);
    });
}
