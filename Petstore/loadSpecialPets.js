const specialPets = [
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

document.addEventListener('DOMContentLoaded', function() {
    const specialPetList = document.getElementById('special-pet-list');
    if (specialPetList) {
        specialPets.forEach(pet => {
            const petDiv = document.createElement('div');
            petDiv.className = 'pet';
            petDiv.innerHTML = `
                <img src="${pet.img}" alt="${pet.name}">
                <h3>${pet.name}</h3>
                <p>Type: ${pet.type}</p>
                <p>Age: ${pet.age} years</p>
                <button onclick="adoptPet()">Adopt Now</button>
            `;
            specialPetList.appendChild(petDiv);
        });
    }
}); 