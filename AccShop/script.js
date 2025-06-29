// Accessory Shop Script

const data = [
  {
    quantity: 1.5,
    description: "Stock Item Example 0001",
    unitPrice: 1000.0,
    amount: 1500.0,
  },
  {
    quantity: 1,
    description: "Stock Item Example 0002",
    unitPrice: 2000.0,
    amount: 2000.0,
  },
  {
    quantity: 1,
    description: "Service Charge Invoicing Item 001",
    unitPrice: 100.0,
    amount: 200.0,
  },
  {
    quantity: 1,
    description:
      "Service Charge Invoicing Item 002, Additional line 1 for this item, Additional line 2 for this item",
    unitPrice: 200.0,
    amount: 600.0,
  },
];

let productList = data.map((item) => ({
  description: item.description,
  unitPrice: item.unitPrice,
}));

let cart = [];

function updateTable() {
  const tbody = document.querySelector("#productTable tbody");
  tbody.innerHTML = "";
  let gross = 0;
  cart.forEach((item, idx) => {
    gross += item.amount;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="cen">${item.quantity}</td>
      <td>${item.description}</td>
      <td class="r">${item.unitPrice.toFixed(2)}</td>
      <td class="r">${item.amount.toFixed(2)}</td>
      <td class="cen"><button class="deleteBtn" data-idx="${idx}">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
  // Update totals
  document.getElementById("grossPrice").textContent = gross.toFixed(2);
  const vat = gross * 0.07;
  document.getElementById("vat").textContent = vat.toFixed(2);
  document.getElementById("totalPrice").textContent = (gross + vat).toFixed(2);

  // Attach delete event
  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(e.target.getAttribute("data-idx"));
      cart.splice(idx, 1);
      updateTable();
    });
  });
}

function populateProductSelect() {
  const select = document.getElementById("productSelect");
  select.innerHTML = "";
  productList.forEach((prod, idx) => {
    const option = document.createElement("option");
    option.value = idx;
    option.textContent = `${prod.description} (฿${prod.unitPrice.toFixed(2)})`;
    select.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Modal logic
  const modal = $("#productModal");
  const openBtn = document.getElementById("addProductBtn");
  const form = document.getElementById("productForm");

  openBtn.onclick = () => {
    populateProductSelect();
    modal.modal("show");
  };
  $("#productModal .close, #productModal .btn-secondary").on("click", function() {
    modal.modal("hide");
    form.reset();
  });
  $(window).on("click", function(event) {
    if ($(event.target).is("#productModal")) {
      modal.modal("hide");
      form.reset();
    }
  });

  form.onsubmit = (e) => {
    e.preventDefault();
    const prodIdx = parseInt(document.getElementById("productSelect").value);
    const quantity = parseFloat(document.getElementById("quantityInput").value);
    const prod = productList[prodIdx];
    const amount = prod.unitPrice * quantity;
    cart.push({
      description: prod.description,
      quantity,
      unitPrice: prod.unitPrice,
      amount,
    });
    updateTable();
    modal.modal("hide");
    form.reset();
  };

  // Initial table update
  updateTable();
}); 