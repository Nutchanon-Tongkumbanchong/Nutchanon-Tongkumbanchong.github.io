// Forward VAT Calculation
function updateForwardVAT() {
    const base = parseFloat(document.getElementById('basePrice').value) || 0;
    const rate = parseFloat(document.getElementById('vatRate1').value) || 0;
    const vat = base * rate / 100;
    const total = base + vat;
    document.getElementById('fBase').textContent = base.toFixed(2);
    document.getElementById('fVat').textContent = vat.toFixed(2);
    document.getElementById('fTotal').textContent = total.toFixed(2);
}
// Reverse VAT Calculation
function updateReverseVAT() {
    const total = parseFloat(document.getElementById('totalPrice').value) || 0;
    const rate = parseFloat(document.getElementById('vatRate2').value) || 0;
    const base = total / (1 + rate / 100);
    const vat = total - base;
    document.getElementById('rBase').textContent = base.toFixed(2);
    document.getElementById('rVat').textContent = vat.toFixed(2);
    document.getElementById('rTotal').textContent = total.toFixed(2);
}
// Event listeners
document.getElementById('basePrice').addEventListener('input', updateForwardVAT);
document.getElementById('vatRate1').addEventListener('input', updateForwardVAT);
document.getElementById('totalPrice').addEventListener('input', updateReverseVAT);
document.getElementById('vatRate2').addEventListener('input', updateReverseVAT);
// Initial calculation
updateForwardVAT();
updateReverseVAT();
