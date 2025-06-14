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
    }
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    const petList = document.getElementById('pet-list');
    console.log('Pet List Element:', petList);
    
    if (petList) {
        console.log('Number of pets to display:', pets.length);
        pets.forEach((pet, index) => {
            console.log(`Creating pet ${index + 1}:`, pet.name);
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
            console.log(`Added ${pet.name} to the page`);
        });
    } else {
        console.error('Could not find pet-list element');
    }
});