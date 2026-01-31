const itemsBody = document.getElementById("itemsBody");
const addRowBtn = document.getElementById("addRow");
const printBtn = document.getElementById("printInvoice");
const grandTotalEl = document.getElementById("grandTotal");
const printPages = document.getElementById("printPages");
const invoiceNumber = document.getElementById("invoiceNumber");
const invoiceDate = document.getElementById("invoiceDate");

const ROWS_PER_PAGE = 12;

function parseNumber(value) {
  const num = parseFloat(value);
  return Number.isFinite(num) ? num : 0;
}

function updateIndices() {
  const rows = itemsBody.querySelectorAll("tr");
  rows.forEach((row, index) => {
    const idxCell = row.querySelector(".cell-idx");
    if (idxCell) idxCell.textContent = index + 1;
  });
}

function updateTotals() {
  let total = 0;
  const rows = itemsBody.querySelectorAll("tr");
  rows.forEach((row) => {
    const qty = parseNumber(row.querySelector(".qty")?.value);
    const price = parseNumber(row.querySelector(".price")?.value);
    const rowTotal = qty * price;
    const totalCell = row.querySelector(".cell-total");
    if (totalCell) totalCell.textContent = rowTotal.toFixed(2);
    total += rowTotal;
  });
  grandTotalEl.textContent = total.toFixed(2);
}

function createRow() {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td class="cell-idx"></td>
    <td><input type="text" class="item" placeholder="" /></td>
    <td><input type="number" class="qty" min="0" step="1" /></td>
    <td><input type="number" class="price" min="0" step="0.01" /></td>
    <td class="cell-total">0.00</td>
    <td class="no-print"><button type="button" class="remove-row">حذف</button></td>
  `;
  return row;
}

function addRow() {
  itemsBody.appendChild(createRow());
  updateIndices();
}

function removeRow(row) {
  row.remove();
  if (itemsBody.children.length === 0) {
    itemsBody.appendChild(createRow());
  }
  updateIndices();
  updateTotals();
}

function getRowData() {
  const rows = itemsBody.querySelectorAll("tr");
  return Array.from(rows).map((row) => {
    return {
      item: row.querySelector(".item")?.value || "",
      qty: row.querySelector(".qty")?.value || "",
      price: row.querySelector(".price")?.value || "",
      total: row.querySelector(".cell-total")?.textContent || "0.00",
    };
  });
}

function buildPrintPage(rows, isLast) {
  const page = document.createElement("section");
  page.className = "invoice";
  page.innerHTML = `
    <header class="invoice-header">
      <div class="brand-lines">
        <div class="brand-line">السلام للادوات الكهربائيه W:M</div>
        <div class="brand-line">وحWAHEEDيد</div>
        <div class="brand-line">العنوان: السلام شارع الضغط العالي اول شارع الايمن</div>
        <div class="brand-line">هاتف01080479466:</div>
      </div>
      <div class="header-divider"></div>
    </header>
    <h1 class="title">فاتورة</h1>
    <div class="meta">
      <div class="meta-field">
        <label>فاتورة رقم:</label>
        <span class="fixed-text">${invoiceNumber.value || ""}</span>
      </div>
      <div class="meta-field">
        <label>تاريخ الفاتورة:</label>
        <span class="fixed-text">${invoiceDate.value || ""}</span>
      </div>
    </div>
    <div class="supplier">
      <label>اسم التاجر/المورد:</label>
      <span class="fixed-text">نادي الكهربائي</span>
    </div>
    <div class="table-wrap">
      <table class="invoice-table">
        <thead>
          <tr>
            <th class="col-idx">م</th>
            <th class="col-item">الصنف</th>
            <th class="col-qty">الكمية</th>
            <th class="col-price">السعر</th>
            <th class="col-total">الإجمالي</th>
          </tr>
        </thead>
        <tbody></tbody>
        ${isLast ? `
        <tfoot>
          <tr class="total-row">
            <td class="total-label" colspan="4">الإجمالي</td>
            <td class="total-value">${grandTotalEl.textContent}</td>
          </tr>
        </tfoot>
        ` : ""}
      </table>
    </div>
    <footer class="invoice-footer">
      <div class="footer-line">السلام للادوات الكهربائيه W:M</div>
      <div class="footer-line">وحWAHEEDيد</div>
      <div class="footer-line">العنوان: السلام شارع الضغط العالي اول شارع الايمن</div>
      <div class="footer-line">هاتف01080479466:</div>
    </footer>
  `;

  const tbody = page.querySelector("tbody");
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="cell-idx">${row.index}</td>
      <td>${row.item}</td>
      <td>${row.qty}</td>
      <td>${row.price}</td>
      <td>${row.total}</td>
    `;
    tbody.appendChild(tr);
  });

  return page;
}

function buildPrintPages() {
  printPages.innerHTML = "";
  const data = getRowData();
  const totalPages = Math.max(1, Math.ceil(data.length / ROWS_PER_PAGE));

  for (let i = 0; i < totalPages; i += 1) {
    const start = i * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;
    const pageRows = data.slice(start, end).map((row, idx) => ({
      ...row,
      index: start + idx + 1,
    }));
    const page = buildPrintPage(pageRows, i === totalPages - 1);
    if (i < totalPages - 1) {
      page.classList.add("page-break");
    }
    printPages.appendChild(page);
  }
}

addRowBtn.addEventListener("click", () => {
  addRow();
  updateTotals();
});

itemsBody.addEventListener("input", (event) => {
  if (event.target.matches(".qty") || event.target.matches(".price")) {
    updateTotals();
  }
});

itemsBody.addEventListener("click", (event) => {
  const btn = event.target.closest(".remove-row");
  if (!btn) return;
  const row = btn.closest("tr");
  if (!row) return;
  removeRow(row);
});

printBtn.addEventListener("click", () => {
  buildPrintPages();
  window.print();
});

window.addEventListener("beforeprint", () => {
  buildPrintPages();
});

window.addEventListener("afterprint", () => {
  printPages.innerHTML = "";
});

updateIndices();
updateTotals();
