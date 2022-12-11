// variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.gallery');
let searchInput;

searchBar();

function searchBar() {
    const searching = document.querySelector('.search-container');
    searching.innerHTML += `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `;
    searchInput = document.querySelector('#search-input');
}


// fetch
fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err));

function displayEmployees(employeeData) {
  employees = employeeData;
  let employeeHTML = '';
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    employeeHTML += `
    <div class="card" data-index="${index}">
     <img class="avatar" src="${picture.large}">
      <div class="text-container">
       <h2 class="name">${name.first} ${name.last}</h2>
       <p class="email">${email}</p>
       <p class="address">${city}</p>
      </div>
     </div>
    `;
  });
  gridContainer.innerHTML = employeeHTML;
}

// modal function

function displayModal(index) {
    let {name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${city}</p>
            <hr>
            <p class="modal-text">${phone}</p>
            <p class="modal-text">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p class="modal-text">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    </div>
      <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
    </div>`
    ;

    gridContainer.insertAdjacentHTML('afterend', modalHTML);

// modal close

    const overlay = document.querySelector('.modal-container');
    const modalClose = document.querySelector('.modal-close-btn');
    modalClose.addEventListener('click', () => {
        overlay.remove();
    });

// switch between cards

    let rightArrow = document.querySelector('#modal-next');
    let leftArrow = document.querySelector('#modal-prev');

    rightArrow.addEventListener('click', () => {
        if (index != 11) {
            index = Number.parseInt(index) + 1;
            overlay.remove();
            displayModal(index);
        } else {
            index = 0;
            overlay.remove();
            displayModal(index);
        }
    });
    leftArrow.addEventListener('click', () => {
        if (index != 0) {
            index = Number.parseInt(index, 10) - 1;
            overlay.remove();
            displayModal(index);
        } else {
            index = 11;
            overlay.remove();
            displayModal(index);
        }
    });
}


gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

// search input

searchInput.addEventListener('input', (e) => {
    let names = e.target.value.toLowerCase();
    let workers = document.querySelectorAll('h2.name');
    workers.forEach(worker => {
        if (worker.textContent.toLowerCase().includes(names)) {
            worker.parentNode.parentNode.style.display = 'block';
        } else {
            worker.parentNode.parentNode.style.display = 'none';
        }
    });
});
