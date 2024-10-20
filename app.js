// Function to calculate the appraisal value
function calculateAppraisal() {
    // Get monthly values from form inputs
    let monthlyIncome = parseFloat(document.getElementById("income").value); // Gross Monthly Income
    let monthlyExpenses = parseFloat(document.getElementById("expenses").value); // Monthly Expenses
    let capRate = parseFloat(document.getElementById("capRate").value) / 100;  // Cap rate as a percentage (annual)
    let grm = parseFloat(document.getElementById("grm").value);  // GRM is annual

    // Validate inputs
    if (isNaN(monthlyIncome) || isNaN(monthlyExpenses) || isNaN(capRate) || isNaN(grm)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Calculate Annual Net Operating Income (NOI)
    let annualNOI = (monthlyIncome - monthlyExpenses) * 12;

    // Calculate Annual Gross Income
    let annualGrossIncome = monthlyIncome * 12;

    // Calculate appraised value using Cap Rate method (Cap Rate is annual)
    let valueByCapRate = annualNOI / capRate;

    // Calculate appraised value using GRM method (based on annual income)
    let valueByGRM = annualGrossIncome * grm;

    // Display the results
    document.getElementById("result").innerHTML = `
        <p>Appraisal Value by Cap Rate: $${valueByCapRate.toFixed(2)}</p>
        <p>Appraisal Value by GRM: $${valueByGRM.toFixed(2)}</p>
    `;
}

