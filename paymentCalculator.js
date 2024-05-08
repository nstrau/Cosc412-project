function calc() {
    var downpayment = parseFloat(document.getElementById('down-payment').value);
    var price = parseInt(document.getElementById('vehiclePrice').textContent.replace(/[^\d]/g, ''));
    var months = parseInt(document.getElementById('months').value);
    var credit = document.getElementById('credit').value;
  
    var interestRate;
    if (credit === 'bad') {
      interestRate = 0.12;
    } else if (credit === 'fair') {
      interestRate = 0.09;
    } else {
      interestRate = 0.075;
    }
  
    var loanAmount = price - downpayment;
    var totalPayback = loanAmount * (1 + interestRate);
    var monthlyPayment = totalPayback / months;
  
    document.getElementById('payment').textContent = `$${monthlyPayment.toFixed(2)}`;
  };
  
  const test = document.createElement('p');
  test.textContent = 'it works';
  document.body.appendChild(test);
  
  const applyBtn = document.querySelector("#calculatePayment");
  if (applyBtn) {
    applyBtn.addEventListener("click", calc);
  }