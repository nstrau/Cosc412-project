let search = document.querySelector('.search-box');
document.querySelector('#search-icon').onclick= ()=>{
    search.classList.toggle('active')
}
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
                    
                    
    }else if(filterType=== 'mileage'){
        content+=`<label><input type="checkbox" onchange="filterCars('15+')">  15 mpg or more</label><br/>
        <label><input type="checkbox" onchange="filterCars('20+')"> 20 mpg or more </label><br/>
        <label><input type="checkbox" onchange="filterCars('30+')"> 30 mpg or more </label><br/>
        <label><input type="checkbox" onchange="filterCars('40+')"> 40 mpg or more </label><br/>`;
    }
    else if(filterType=== 'year'){
        content+=`<div>
        <label for="yearRange">Select year range:</label>
        <div id="yearValues" style="margin-bottom: 10px;">
          <span id="startYear">2010</span> - <span id="endYear">2024</span>
        </div>
        <input type="range" id="yearRange" class="slider" min="2010" max="2024" value="2010" step="1" oninput="updateYearValues()">
        <input type="range" id="yearRange2" class="slider" min="2010" max="2024" value="2024" step="1" oninput="updateYearValues()">
      </div>`;
    }else if(filterType=== 'make'){
        content+=`<label><input type="checkbox" onchange="filterCars('honda')">Honda</label><br/>
        <label><input type="checkbox" onchange="filterCars('Toyota')"> Toyota </label><br/>
        <label><input type="checkbox" onchange="filterCars('Nissan')"> Nissan </label><br/>
        <label><input type="checkbox" onchange="filterCars('Dodge')"> Dodge</label><br/>
        <label><input type="checkbox" onchange="filterCars('Chevrolet')"> Chevrolet</label><br/>
        <label><input type="checkbox" onchange="filterCars('Subaru')"> Subaru</label><br/>`;
    }

    return content;
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
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  mileage: Number,
  MPG: Number,
  Price:Number,
  Seats:Number,
  Engine:String,
  PreviousOwners:Number

  
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;

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

