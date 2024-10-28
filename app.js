// Function to update slider display values
function updateValue(sliderId, displayId) {
    const slider = document.getElementById(sliderId);
    const display = document.getElementById(displayId);
    display.textContent = slider.value;
}

// Function to calculate the appraisal value
function calculateAppraisal() {
    // Get values from form inputs
    let monthlyIncome = parseFloat(document.getElementById("income").value);
    let monthlyExpenses = parseFloat(document.getElementById("expenses").value);
    let capRate = parseFloat(document.getElementById("capRate").value) / 100;
    let grm = parseFloat(document.getElementById("grm").value);

    // Validate inputs
    if (isNaN(monthlyIncome) || isNaN(monthlyExpenses) || isNaN(capRate) || isNaN(grm)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Calculate values
    let annualNOI = (monthlyIncome - monthlyExpenses) * 12;
    let annualGrossIncome = monthlyIncome * 12;
    let valueByCapRate = annualNOI / capRate;
    let valueByGRM = annualGrossIncome * grm;

    // Format values as currency
    let formattedCapRateValue = valueByCapRate.toLocaleString("en-US", { style: "currency", currency: "USD" });
    let formattedGRMValue = valueByGRM.toLocaleString("en-US", { style: "currency", currency: "USD" });

    // Display results with a PDF download button
    document.getElementById("result").innerHTML = `
        <p>Appraisal Value by Cap Rate: ${formattedCapRateValue}</p>
        <p>Appraisal Value by GRM: ${formattedGRMValue}</p>
        <button onclick="downloadPDF('${formattedCapRateValue}', '${formattedGRMValue}')">Download PDF</button>
    `;
}

// Function to generate and download PDF
function downloadPDF(valueByCapRate, valueByGRM) {
    // Import jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add title and results to the PDF
    doc.setFontSize(18);
    doc.text("Real Estate Appraisal Report", 10, 20);
    doc.setFontSize(12);
    doc.text(`Appraisal Value by Cap Rate: ${valueByCapRate}`, 10, 40);
    doc.text(`Appraisal Value by GRM: ${valueByGRM}`, 10, 50);

    // Save the PDF
    doc.save("Real_Estate_Appraisal_Report.pdf");
}
function downloadPDF(valueByCapRate, valueByGRM) {
    // Import jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set up styles for title and results
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(33, 37, 41); // Dark gray

    // Add title
    doc.text("Real Estate Appraisal Report", 20, 20);

    // Add a line below the title for separation
    doc.setDrawColor(200, 200, 200); // Light gray
    doc.line(20, 25, 190, 25); // Draw line from (x1, y1) to (x2, y2)

    // Set up styles for results section
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(45, 45, 45);

    // Add formatted appraisal results
    doc.text("Appraisal Value by Cap Rate:", 20, 40);
    doc.setFont("helvetica", "bold"); // Bold for the value
    doc.text(valueByCapRate, 140, 40, { align: "right" });

    doc.setFont("helvetica", "normal"); // Reset to normal for next label
    doc.text("Appraisal Value by GRM:", 20, 50);
    doc.setFont("helvetica", "bold");
    doc.text(valueByGRM, 140, 50, { align: "right" });

    // Save the PDF
    doc.save("Real_Estate_Appraisal_Report.pdf");
}

