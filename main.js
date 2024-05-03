const app =require('../app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

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


  } else if(filterType=== 'mileage'){
    content+=`<label><input type="checkbox" onchange="filterCars('15+')">  15 mpg or more</label><br/>
        <label><input type="checkbox" onchange="filterCars('20+')"> 20 mpg or more </label><br/>
        <label><input type="checkbox" onchange="filterCars('30+')"> 30 mpg or more </label><br/>
        <label><input type="checkbox" onchange="filterCars('40+')"> 40 mpg or more </label><br/>`;
  } else if(filterType=== 'year'){
    content+=`<input type="range" name="year" id="year" min="2011" max="2024" onchange="filterCars('year='+this.value)">`;
  } else if(filterType=== 'make'){
    content+=`<label><input type="checkbox" onchange="filterCars('honda')">Honda</label><br/>
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
      const startYearElement = document.getElementById('startYear');
      const endYearElement = document.getElementById('endYear');
      const yearRange = document.getElementById('yearRange');
      const yearRange2 = document.getElementById('yearRange2');

      let startVal = Math.min(yearRange.value, yearRange2.value);
      let endVal = Math.max(yearRange.value, yearRange2.value);

      yearRange.value = startVal;
      yearRange2.value = endVal;

      startYearElement.textContent = startVal;
      endYearElement.textContent = endVal;
  }

  // Fetch car data from the backend server
  async function fetchCars() {
      try {
          const response = await fetch('/api/cars'); // Assuming your backend server provides this endpoint
          const data = await response.json();
          renderCars(data);
      } catch (error) {
          console.error('Error fetching car data:', error);
      }
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

  function openModal(carCard) {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the element to display the car info
    var modalContent = document.getElementById('modalContent');

    // Copy the car info content into the modal
    modalContent.innerHTML = carCard.getElementsByClassName('car-info')[0].innerHTML;

    // Display the modal
    modal.style.display = "block";

    // Get the close element
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
}

  window.addEventListener('load', fetchCars);//maybe?

