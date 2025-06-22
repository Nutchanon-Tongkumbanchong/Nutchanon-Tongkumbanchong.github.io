const pets = [
    {
        "name": "Buddy",
        "type": "Dog",
        "age": 3,
        "img": "img/dogs/dog01.jpg"
    },
    {
        "name": "Charlie",
        "type": "Dog",
        "age": 2,
        "img": "img/dogs/dog02.jpg"
    },
    {
        "name": "Max",
        "type": "Dog",
        "age": 4,
        "img": "img/dogs/dog03.jpg"
    },
    { 
        "name": "Whiskers", 
        "type": "Cat", 
        "age": 2, 
        "img": "img/cats/cat01.jpg" 
    },
    { 
        "name": "Mittens", 
        "type": "Cat", 
        "age": 1, 
        "img": "img/cats/cat02.jpg" 
    },
    { 
        "name": "Luna", 
        "type": "Cat", 
        "age": 3, 
        "img": "img/cats/cat03.jpg" 
    },

    {
        "name": "Sunny",
        "type": "Bird",
        "age": 2,
        "img": "img/birds/bird01.jpg"
    },
    {
        "name": "Sky",
        "type": "Bird",
        "age": 1,
        "img": "img/birds/bird02.jpg"
    },
    {
        "name": "Cappy",
        "type": "Capybara",
        "age": 3,
        "img": "img/capybaras/capybara01.jpg"
    },
    {
        "name": "Barry",
        "type": "Capybara",
        "age": 2,
        "img": "img/capybaras/capybara02.jpg"
    }
];

function renderPets() {
    const petList = document.getElementById('pet-list');
    if (!petList) return;
    petList.innerHTML = '';
    // Get all checked types
    const checkedTypes = Array.from(document.querySelectorAll('input[name="pet-type"]:checked')).map(cb => cb.value);
    // Filter pets by checked types
    const filtered = pets.filter(pet => checkedTypes.includes(pet.type));
    // Render filtered pets
    filtered.forEach(pet => {
        const petDiv = document.createElement('div');
        petDiv.className = 'pet';
        petDiv.innerHTML = `
            <img src="${pet.img}" alt="${pet.name}">
            <h3>${pet.name}</h3>
            <p>Type: ${pet.type}</p>
            <p>Age: ${pet.age} years</p>
            <button onclick="adoptPet()">Adopt Now</button>
        `;
        petList.appendChild(petDiv);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to all checkboxes
    document.querySelectorAll('input[name="pet-type"]').forEach(cb => {
        cb.addEventListener('change', renderPets);
    });
    renderPets();
});