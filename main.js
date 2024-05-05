let searchTerm = ""; // Stores the current search term

function toggleFilterDropdown(filterType) {
  const container = document.getElementById('filter-dropdown-container');
  if (container.style.display === 'block' && container.dataset.activeFilter === filterType) {
    // Toggle dropdown visibility if the same button is clicked again
    container.style.display = 'none';
  } else {
    container.dataset.activeFilter = filterType;
    container.style.display = 'block'; // Show the dropdown
    container.innerHTML = generateFilterContent(filterType); // Populate content
  }
}

function generateFilterContent(filterType) {
  let content = `<strong>${filterType.toUpperCase()}</strong><br/>`; // Title for the dropdown
  if (filterType === 'class') {
    content += `<label><input type="checkbox" onchange="filterCars('SUV')"> SUV</label><br/>
                <label><input type="checkbox" onchange="filterCars('Sedan')"> Sedan</label><br/>
                <label><input type="checkbox" onchange="filterCars('Convertible')"> Convertible</label><br/>
                <label><input type="checkbox" onchange="filterCars('Sports')"> Sports</label><br/>
                <label><input type="checkbox" onchange="filterCars('Truck')"> Truck</label><br/>
                <label><input type="checkbox" onchange="filterCars('luxury')"> Luxury</label><br/>`;
  } else if (filterType === 'price') {
    content += `<label><input type="checkbox" onchange="filterCars('0-20000')"> $0 - $20,000</label><br/>
                <label><input type="checkbox" onchange="filterCars('10000-20000')"> $10,000 - $20,000</label><br/>
                <label><input type="checkbox" onchange="filterCars('20001-40000')"> $20,001 - $40,000</label><br/>
                <label><input type="checkbox" onchange="filterCars('40001-60000')"> $40,000 - $60,000</label><br/>
                <label><input type="checkbox" onchange="filterCars('60000+')"> $60,000+ </label>`;


  } else if (filterType === 'mileage') {
    content += `<label><input type="checkbox" onchange="filterCars('15+')">  15 mpg or more</label><br/>
        <label><input type="checkbox" onchange="filterCars('20+')"> 20 mpg or more </label><br/>
        <label><input type="checkbox" onchange="filterCars('30+')"> 30 mpg or more </label><br/>
        <label><input type="checkbox" onchange="filterCars('40+')"> 40 mpg or more </label><br/>`;
  } else if (filterType === 'year') {
    content += `
    <label>Min Year: <input type="range" name="minYear" id="minYear" min="2010" max="2024" value="1990" oninput="updateYearValues()"></label>
    <span id="minYearValue"></span>
    <br>
    <label>Max Year: <input type="range" name="maxYear" id="maxYear" min="1990" max="2024" value="2024" oninput="updateYearValues()"></label>
    <span id="maxYearValue">2024</span>
    <br>
    <button onclick="applyYearFilter()">Apply Filter</button>
  `
  } else if (filterType === 'make') {
    content += `<label><input type="checkbox" onchange="filterCars('honda')">Honda</label><br/>
        <label><input type="checkbox" onchange="filterCars('Toyota')"> Toyota </label><br/>
        <label><input type="checkbox" onchange="filterCars('Nissan')"> Nissan </label><br/>
        <label><input type="checkbox" onchange="filterCars('Dodge')"> Dodge</label><br/>
        <label><input type="checkbox" onchange="filterCars('Chevrolet')"> Chevrolet</label><br/>
        <label><input type="checkbox" onchange="filterCars('Subaru')"> Subaru</label><br/>`;
  }

  return content;
}

function filterCars(filterValue) {
  const carCards = document.querySelectorAll('.car-card');
  let filteredCards = [];

  // Loop through car cards
  for (const card of carCards) {
    const carInfo = card.querySelector('.car-info');
    const carTitle = carInfo.querySelector('h4').textContent.toLowerCase();
    let displayCard = true; // Assume card should be displayed initially

    // Apply search filter
    if (searchTerm !== "" && !carTitle.includes(searchTerm.toLowerCase())) {
      displayCard = false; // Hide card if search term doesn't match
    }

    // Apply additional filter based on filterValue
    if (filterValue !== "") {
      let filterMatch = false;
      const price = carInfo.querySelector('p:nth-child(2)').textContent.split(' ')[1]; // Extract price

      switch (filterValue) {
        case 'SUV':
        case 'Sedan':
        case 'Convertible':
        case 'Sports':
        case 'Truck':
        case 'luxury':
          // Check if car title (lowercase) contains the filter value (lowercase)
          filterMatch = carTitle.includes(filterValue.toLowerCase());
          break;
        case 'year':
          // Extract year from car title (assuming year is part of the title)
          const year = parseInt(carTitle.split(' ').find(word => /^\d+$/.test(word)));
          filterMatch = year >= parseInt(filterValue.split('=')[1]); // Check if year is greater than or equal to selected year
          break;
        case 'make':
          // Check if car title (lowercase) contains the filter value (lowercase)
          filterMatch = carTitle.includes(filterValue.toLowerCase());
          break;
        case '0-20000':
        case '10000-20000':
        case '20001-40000':
        case '40001-60000':
        case '60000+':
          const priceRange = filterValue.split('-');
          const minPrice = priceRange.length > 1 ? parseInt(priceRange[0]) : 0;
          const maxPrice = priceRange.length > 1 ? parseInt(priceRange[1]) : Infinity;
          filterMatch = parseInt(price) >= minPrice && parseInt(price) <= maxPrice; // Check if price falls within the range
          break;
        case '15+':
        case '20+':
        case '30+':
        case '40+':
          // Extract mileage from car info (assuming mileage is in the second paragraph)
          const mileage = parseInt(carInfo.querySelector('p:nth-child(3)').textContent.split(' ')[1]);
          const minMileage = parseInt(filterValue.split('+')[0]);
          filterMatch = mileage >= minMileage; // Check if mileage is greater than or equal to selected value
          break;
      }

      displayCard = displayCard && filterMatch; // Update displayCard based on filter match
    }

    if (displayCard) {
      filteredCards.push(card);
    }
  }

  // Update the displayed car listings
  document.getElementById('cars-container').innerHTML = filteredCards.join('');
}


function updateYearValues() {
  const minYearInput = document.getElementById('minYear');
  const maxYearInput = document.getElementById('maxYear');
  const minYearValue = document.getElementById('minYearValue');
  const maxYearValue = document.getElementById('maxYearValue');

  // Parse the integer values from the sliders
  let minYear = parseInt(minYearInput.value);
  let maxYear = parseInt(maxYearInput.value);

  // Ensure the maximum is not less than the minimum
  if (maxYear < minYear) {
      maxYear = minYear;
      maxYearInput.value = maxYear;
  }

  // Ensure the minimum is not more than the maximum
  if (minYear > maxYear) {
      minYear = maxYear;
      minYearInput.value = minYear;
  }

  // Update the display values
  minYearValue.textContent = minYear;
  maxYearValue.textContent = maxYear;
}

function applyYearFilter() {
  const minYear = parseInt(document.getElementById('minYear').value);
  const maxYear = parseInt(document.getElementById('maxYear').value);
  filterCars('yearRange', minYear, maxYear);
}

function filterCars(filterType, min, max) {
  const carCards = document.querySelectorAll('.car-card');
  let filteredCards = [];

  carCards.forEach(card => {
      const year = parseInt(card.querySelector('.car-info p:last-child').textContent.split(' ')[1]); // Adjust the selector as necessary
      if (year >= min && year <= max) {
          filteredCards.push(card.outerHTML);
      }
  });

  document.getElementById('cars-container').innerHTML = filteredCards.join('');
}



// Render fetched car data to the HTML page
function renderCars(cars) {
  const carsContainer = document.getElementById('cars-container');
  carsContainer.innerHTML = ''; // Clear existing content

  cars.forEach(car => {
    const carCard = document.createElement('div');
    carCard.classList.add('car-card');

    const carImage = document.createElement('img');
    carImage.src = car.imageURL; // Assuming you have an imageURL property in your car data
    carImage.alt = 'Car Image';

    const carInfo = document.createElement('div');
    carInfo.classList.add('car-info');

    const carTitle = document.createElement('h4');
    carTitle.textContent = `${car.make} ${car.model}`;

    const carPrice = document.createElement('p');
    carPrice.textContent = `Price: $${car.price}`;

    const carMileage = document.createElement('p');
    carMileage.textContent = `Mileage: ${car.mileage} miles`;

    carInfo.appendChild(carTitle);
    carInfo.appendChild(carPrice);
    carInfo.appendChild(carMileage);

    carCard.appendChild(carImage);
    carCard.appendChild(carInfo);

    carsContainer.appendChild(carCard);
  });
}

// Filter cars based on selected options
function filterCars(filterType) {
  // Implement filtering logic here
  console.log('Filtering cars by:', filterType);
}

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  mileage: Number,
  MPG: Number,
  Price: Number,
  Seats: Number,
  Engine: String,
  PreviousOwners: Number,
  Image: String
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;

function openModal(carCard) {
  var modal = document.getElementById('myModal');
  var modalContent = document.getElementById('modalContent');

  // Clear previous content
  modalContent.innerHTML = '';

  // Clone the car information to the modal
  var carInfo = carCard.getElementsByClassName('car-info')[0].cloneNode(true);
  modalContent.appendChild(carInfo);
  

  var seatsInfo = document.createElement('p');
    seatsInfo.textContent = 'Seats: 5'; // Placeholder for seats
    var engineInfo = document.createElement('p');
    engineInfo.textContent = 'Engine: 2.5L 4-cylinder'; // Placeholder for engine
    var ownersInfo = document.createElement('p');
    ownersInfo.textContent = 'Previous Owners: 2'; // Placeholder for previous owners

    // Append additional info to modal content
    modalContent.appendChild(seatsInfo);
    modalContent.appendChild(engineInfo);
    modalContent.appendChild(ownersInfo);

  // Create and append the 'Schedule a Test Drive' button
  var testDriveButton = document.createElement('button');
  testDriveButton.textContent = 'Schedule a Test Drive';
  modalContent.appendChild(testDriveButton);

  // Add click event listener to the test drive button
  testDriveButton.addEventListener('click', function() {
      scheduleTestDrive(modalContent);
  });
  var estimateButton = document.createElement('button');
    estimateButton.textContent = 'Get an Estimate';
    estimateButton.style.marginLeft = '10px'; // Space between buttons
    estimateButton.style.backgroundColor='#007BAA'
    modalContent.appendChild(estimateButton);

    // Set up the link for the 'Get an Estimate' button
    estimateButton.addEventListener('click', function() {
        window.location.href = 'estimate.html'; // Change 'estimate.html' to your estimate page URL
    });
  // Display the modal
  modal.style.display = "block";

  // Close button functionality
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
      modal.style.display = "none";
  }

  // Function to handle the scheduling within the modal
  function scheduleTestDrive(modalContent) {
      // Create and show the date input within the modal
      const dateInput = document.createElement('input');
      dateInput.type = 'date';
      dateInput.id = 'testDriveDate';
      dateInput.style.margin = '10px';
      modalContent.appendChild(dateInput);
      const timeIntput= document.createElement('input');
      timeIntput.type='time';
      timeIntput.style.margin= '10px';
      modalContent.appendChild(timeIntput);

      // Create a confirm button for the date
      const confirmButton = document.createElement('button');
      confirmButton.textContent = 'Confirm Date';
      confirmButton.style.margin = '10px';
      confirmButton.onclick = function() {
          if (dateInput.value) {
              alert('Test drive scheduled for ' + dateInput.value + ' at '+ timeIntput.value);
              dateInput.remove(); // Optionally remove the date input after confirmation
              confirmButton.remove(); // Remove the confirm button as well
          } else {
              alert('Please select a date.');
          }
      };
      modalContent.appendChild(confirmButton);
  }
}




