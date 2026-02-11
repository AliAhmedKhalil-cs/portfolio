
const STORAGE_KEY = "fatora_business_manager_v2";
const LEGACY_SUPPLIERS_KEY = "fatora_supplier_accounts_v1";

const LEDGER_CONFIG = {
  suppliers: {
    panelTitle: "حسابات الموردين",
    panelSub: "أنشئ حسابًا لكل مورد وتابع حالة السداد.",
    accountNameLabel: "اسم المورد الجديد",
    accountPlaceholder: "مثال: محمد عبدالله",
    addButton: "إضافة حساب مورد",
    addRowLabel: "إضافة حركة شراء",
    activePrefix: "حساب المورد",
    emptyState: "هذا المورد لا يحتوي على حركات شراء بعد. اضغط \"إضافة حركة شراء\" للبدء.",
    hint: "لإضافة دفعة جديدة لنفس الصنف: أضف سطرًا بتاريخ جديد واكتب نفس الصنف وقيمة المدفوع فقط.",
    headingTotal: "إجمالي الشراء",
    headingQtyType: "نوع الكمية",
    headingPaid: "مدفوع",
    headingAdvance: "عربون عميل",
    headingRemain: "باقي الصنف",
    summaryMainLabel: "إجمالي المشتريات",
    summaryPaidLabel: "إجمالي المدفوع",
    summaryAdvanceLabel: "إجمالي عربون العملاء",
    summaryRemainLabel: "إجمالي المتبقي علينا",
    dueLabel: "متبقي علينا",
    creditLabel: "رصيد دائن لنا",
    paymentDoneLabel: "✔ دفعة سداد",
    paymentPartialLabel: "✖ سداد جزئي",
    advanceDoneLabel: "✔ عربون",
    advancePartialLabel: "✖ عربون جزئي",
    settlementLabel: "تسوية مع حساب العميل",
    qtyTypeEditable: true,
    advanceEditable: false,
  },
  customers: {
    panelTitle: "حسابات العملاء",
    panelSub: "أنشئ حسابًا لكل عميل وتابع المبيعات والتحصيل.",
    accountNameLabel: "اسم العميل الجديد",
    accountPlaceholder: "مثال: محمد عباس",
    addButton: "إضافة حساب عميل",
    addRowLabel: "إضافة حركة بيع",
    activePrefix: "حساب العميل",
    emptyState: "هذا العميل لا يحتوي على حركات بيع بعد. اضغط \"إضافة حركة بيع\" للبدء.",
    hint: "يمكنك تسجيل تحصيل أو عربون عميل في يوم جديد لنفس الصنف بسطر جديد.",
    headingTotal: "إجمالي البيع",
    headingQtyType: "الكمية (عدد ثابت)",
    headingPaid: "محصل",
    headingAdvance: "عربون عميل",
    headingRemain: "باقي الصنف",
    summaryMainLabel: "إجمالي المبيعات",
    summaryPaidLabel: "إجمالي المحصل",
    summaryAdvanceLabel: "عربون متاح للبيعة القادمة",
    summaryRemainLabel: "إجمالي المستحق لنا",
    dueLabel: "مستحق لنا",
    creditLabel: "رصيد دائن للعميل",
    paymentDoneLabel: "✔ تحصيل دفعة",
    paymentPartialLabel: "✖ تحصيل جزئي",
    advanceDoneLabel: "✔ عربون عميل",
    advancePartialLabel: "✖ عربون جزئي",
    settlementLabel: "تسوية مع حساب المورد",
    qtyTypeEditable: false,
    advanceEditable: true,
  },
};

const INVENTORY_CATALOG = [
  { key: "wire_filter", name: "سلك فلتر", image: "سلك-فلتر.webp", aliases: ["سلك", "سلكفلتر", "wirefilter"] },
  { key: "sheet_filter", name: "صاج فلتر", image: "صاج-فلتر.jpg", aliases: ["صاج", "صاجفلتر", "sheetfilter"] },
  { key: "glue_filter", name: "غراء ابيض فلتر", image: "غراء-ابيض-فلتر.jpg", aliases: ["غراء", "غراءابيض", "غراءابيضفلتر", "gluefilter"] },
  { key: "rubber_filter", name: "كاوتش فلتر", image: "كاوتش-فلتر.jpg", aliases: ["كاوتش", "كاوتشفلتر", "rubberfilter"] },
  { key: "paper_filter", name: "ورق ترشيح فلتر", image: "ورق-ترشيح-فلتر.avif", aliases: ["ورق", "ورقترشيح", "ورقترشيحفلتر", "paperfilter"] },
];

const tabButtons = Array.from(document.querySelectorAll(".top-tab"));
const ledgerWorkspace = document.getElementById("ledgerWorkspace");
const inventoryWorkspace = document.getElementById("inventoryWorkspace");
const todayDate = document.getElementById("todayDate");

const accountsPanelTitle = document.getElementById("accountsPanelTitle");
const accountsPanelSub = document.getElementById("accountsPanelSub");
const accountForm = document.getElementById("accountForm");
const accountNameLabel = document.getElementById("accountNameLabel");
const accountNameInput = document.getElementById("accountNameInput");
const addAccountBtn = document.getElementById("addAccountBtn");
const accountsList = document.getElementById("accountsList");

const activeAccountTitle = document.getElementById("activeAccountTitle");
const activeAccountSub = document.getElementById("activeAccountSub");
const ledgerHint = document.getElementById("ledgerHint");
const addRowBtn = document.getElementById("addRow");
const printLedgerBtn = document.getElementById("printLedger");

const headingTotal = document.getElementById("headingTotal");
const headingQtyType = document.getElementById("headingQtyType");
const headingPaid = document.getElementById("headingPaid");
const headingAdvance = document.getElementById("headingAdvance");
const headingRemain = document.getElementById("headingRemain");

const rowsBody = document.getElementById("rowsBody");
const summaryMainLabel = document.getElementById("summaryMainLabel");
const summaryPaidLabel = document.getElementById("summaryPaidLabel");
const summaryAdvanceLabel = document.getElementById("summaryAdvanceLabel");
const summaryAdvanceRow = document.getElementById("summaryAdvanceRow");
const summaryRemainLabel = document.getElementById("summaryRemainLabel");
const summaryMain = document.getElementById("summaryMain");
const summaryPaid = document.getElementById("summaryPaid");
const summaryAdvance = document.getElementById("summaryAdvance");
const summaryRemain = document.getElementById("summaryRemain");
const summaryStatus = document.getElementById("summaryStatus");
const mobileSummaryCard = document.getElementById("mobileSummaryCard");
const mobileSummaryMainLabel = document.getElementById("mobileSummaryMainLabel");
const mobileSummaryPaidLabel = document.getElementById("mobileSummaryPaidLabel");
const mobileSummaryAdvanceLabel = document.getElementById("mobileSummaryAdvanceLabel");
const mobileSummaryAdvanceRow = document.getElementById("mobileSummaryAdvanceRow");
const mobileSummaryRemainLabel = document.getElementById("mobileSummaryRemainLabel");
const mobileSummaryMain = document.getElementById("mobileSummaryMain");
const mobileSummaryPaid = document.getElementById("mobileSummaryPaid");
const mobileSummaryAdvance = document.getElementById("mobileSummaryAdvance");
const mobileSummaryRemain = document.getElementById("mobileSummaryRemain");
const mobileSummaryStatus = document.getElementById("mobileSummaryStatus");
const emptyState = document.getElementById("emptyState");

const inventoryGrid = document.getElementById("inventoryGrid");
const inventoryImage = document.getElementById("inventoryImage");
const inventoryTitle = document.getElementById("inventoryTitle");
const inventorySub = document.getElementById("inventorySub");
const inventoryCurrentCount = document.getElementById("inventoryCurrentCount");
const inventoryCurrentWeight = document.getElementById("inventoryCurrentWeight");
const saveInventoryQty = document.getElementById("saveInventoryQty");
const inventorySaveMsg = document.getElementById("inventorySaveMsg");

const LOW_STOCK_COUNT_THRESHOLD = 10;
const LOW_STOCK_WEIGHT_THRESHOLD = 10;

function uid() {
  return `id-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function parseNumber(value) {
  const normalized = String(value ?? "").trim().replace(",", ".");
  const num = parseFloat(normalized);
  return Number.isFinite(num) ? num : 0;
}

function formatMoney(value) {
  return Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function escapeAttr(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function normalizeItemKey(item) {
  const key = String(item || "").trim().toLowerCase();
  return key || "__general__";
}

function normalizeLoose(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s\-_/]+/g, "");
}

function normalizeAccountName(value) {
  return normalizeLoose(value);
}

function normalizeQtyType(value) {
  return value === "weight" ? "weight" : "count";
}

function qtyTypeLabel(value) {
  return normalizeQtyType(value) === "weight" ? "وزن" : "عدد";
}

function isLowStock(record) {
  const count = Math.max(0, parseNumber(record.currentCount));
  const weight = Math.max(0, parseNumber(record.currentWeight));

  if (count <= 0 && weight <= 0) {
    return true;
  }

  const countLow = count > 0 && count <= LOW_STOCK_COUNT_THRESHOLD;
  const weightLow = weight > 0 && weight <= LOW_STOCK_WEIGHT_THRESHOLD;
  return countLow || weightLow;
}

function getOppositeTab(tab) {
  return tab === "suppliers" ? "customers" : "suppliers";
}

function createRow(init = {}) {
  return {
    id: String(init.id || uid()),
    date: typeof init.date === "string" && init.date ? init.date : todayISO(),
    item: String(init.item || ""),
    qty: String(init.qty || ""),
    qtyType: normalizeQtyType(init.qtyType),
    price: String(init.price || ""),
    paid: String(init.paid || ""),
    advance: String(init.advance || ""),
  };
}

function createAccount(name, rows) {
  return {
    id: uid(),
    name: name.trim(),
    rows: Array.isArray(rows) && rows.length ? rows.map((row) => createRow(row)) : [createRow()],
  };
}

function createDefaultInventory() {
  const inventory = {};
  INVENTORY_CATALOG.forEach((item) => {
    inventory[item.key] = {
      currentCount: 0,
      currentWeight: 0,
      updatedAt: "",
    };
  });
  return inventory;
}

function defaultState() {
  const suppliers = [createAccount("محمد عبدالله"), createAccount("أحمد طاهر")];
  const customers = [
    createAccount("محمد عباس", [
      createRow({ date: todayISO(), item: "فلتر", qty: "1000", price: "10", paid: "0" }),
    ]),
  ];

  return {
    activeTab: "suppliers",
    suppliers,
    customers,
    activeSupplierId: suppliers[0].id,
    activeCustomerId: customers[0].id,
    activeInventoryKey: INVENTORY_CATALOG[0].key,
    inventory: createDefaultInventory(),
  };
}

function normalizeRow(raw) {
  if (!raw || typeof raw !== "object") return null;
  return createRow(raw);
}

function normalizeAccount(raw) {
  if (!raw || typeof raw !== "object") return null;
  const name = String(raw.name || "").trim();
  if (!name) return null;

  const rows = Array.isArray(raw.rows) ? raw.rows.map(normalizeRow).filter(Boolean) : [createRow()];

  return {
    id: String(raw.id || uid()),
    name,
    rows: rows.length ? rows : [createRow()],
  };
}

function normalizeAccounts(list, fallback) {
  const accounts = Array.isArray(list) ? list.map(normalizeAccount).filter(Boolean) : [];
  return accounts.length ? accounts : fallback;
}

function normalizeInventory(rawInventory) {
  const normalized = createDefaultInventory();

  if (rawInventory && typeof rawInventory === "object") {
    INVENTORY_CATALOG.forEach((item) => {
      const raw = rawInventory[item.key];
      if (raw && typeof raw === "object") {
        const legacyQty = parseNumber(raw.currentQty);
        normalized[item.key] = {
          currentCount: Math.max(0, parseNumber(raw.currentCount || legacyQty)),
          currentWeight: Math.max(0, parseNumber(raw.currentWeight)),
          updatedAt: String(raw.updatedAt || ""),
        };
      }
    });
  }

  return normalized;
}

function loadLegacySuppliers() {
  try {
    const legacyRaw = localStorage.getItem(LEGACY_SUPPLIERS_KEY);
    if (!legacyRaw) return null;

    const parsed = JSON.parse(legacyRaw);
    const suppliers = Array.isArray(parsed.suppliers) ? parsed.suppliers.map(normalizeAccount).filter(Boolean) : [];

    if (!suppliers.length) return null;

    let activeSupplierId = String(parsed.activeSupplierId || "");
    if (!suppliers.some((account) => account.id === activeSupplierId)) {
      activeSupplierId = suppliers[0].id;
    }

    return { suppliers, activeSupplierId };
  } catch {
    return null;
  }
}

function loadState() {
  const defaults = defaultState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      const legacy = loadLegacySuppliers();
      if (legacy) {
        return {
          ...defaults,
          suppliers: legacy.suppliers,
          activeSupplierId: legacy.activeSupplierId,
        };
      }
      return defaults;
    }

    const parsed = JSON.parse(raw);

    const suppliers = normalizeAccounts(parsed.suppliers, defaults.suppliers);
    const customers = normalizeAccounts(parsed.customers, defaults.customers);

    let activeSupplierId = String(parsed.activeSupplierId || "");
    if (!suppliers.some((account) => account.id === activeSupplierId)) {
      activeSupplierId = suppliers[0].id;
    }

    let activeCustomerId = String(parsed.activeCustomerId || "");
    if (!customers.some((account) => account.id === activeCustomerId)) {
      activeCustomerId = customers[0].id;
    }

    let activeTab = String(parsed.activeTab || "suppliers");
    if (!Object.hasOwn(LEDGER_CONFIG, activeTab) && activeTab !== "inventory") {
      activeTab = "suppliers";
    }

    let activeInventoryKey = String(parsed.activeInventoryKey || INVENTORY_CATALOG[0].key);
    if (!INVENTORY_CATALOG.some((item) => item.key === activeInventoryKey)) {
      activeInventoryKey = INVENTORY_CATALOG[0].key;
    }

    return {
      activeTab,
      suppliers,
      customers,
      activeSupplierId,
      activeCustomerId,
      activeInventoryKey,
      inventory: normalizeInventory(parsed.inventory),
    };
  } catch {
    return defaults;
  }
}

let state = loadState();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getCurrentLedgerTab() {
  return state.activeTab === "customers" ? "customers" : "suppliers";
}

function getAccountsByTab(tab) {
  return tab === "customers" ? state.customers : state.suppliers;
}

function setAccountsByTab(tab, accounts) {
  if (tab === "customers") {
    state.customers = accounts;
  } else {
    state.suppliers = accounts;
  }
}

function getActiveIdByTab(tab) {
  return tab === "customers" ? state.activeCustomerId : state.activeSupplierId;
}

function setActiveIdByTab(tab, id) {
  if (tab === "customers") {
    state.activeCustomerId = id;
  } else {
    state.activeSupplierId = id;
  }
}

function getActiveAccount(tab = getCurrentLedgerTab()) {
  const accounts = getAccountsByTab(tab);
  const activeId = getActiveIdByTab(tab);
  return accounts.find((account) => account.id === activeId) || null;
}

function createStatusPill(type, text) {
  const pill = document.createElement("span");
  pill.className = `status-pill ${type}`;
  pill.textContent = text;
  return pill;
}

function createMiniStatus(type, text) {
  const pill = document.createElement("span");
  pill.className = `mini-status ${type}`;
  pill.textContent = text;
  return pill;
}

function buildComputedRows(rows, tab) {
  if (tab === "customers") {
    let runningBalance = 0;
    let pendingAdvance = 0;

    return rows.map((row) => {
      const qty = parseNumber(row.qty);
      const price = parseNumber(row.price);
      const paid = parseNumber(row.paid);
      const advance = parseNumber(row.advance);
      const total = qty * price;
      const meaningful = Boolean((row.item || "").trim()) || qty > 0 || price > 0 || paid > 0 || advance > 0;

      let appliedAdvance = 0;
      let isAdvanceOnly = false;
      let delta = 0;

      if (total <= 0.0001 && paid <= 0.0001 && advance > 0) {
        isAdvanceOnly = true;
        pendingAdvance += advance;
      } else if (total > 0.0001) {
        appliedAdvance = advance + pendingAdvance;
        pendingAdvance = 0;
        delta = total - paid - appliedAdvance;
      } else {
        appliedAdvance = advance;
        delta = total - paid - appliedAdvance;
      }

      runningBalance += delta;

      const remain = runningBalance > 0 ? runningBalance : 0;
      const isPaymentOnly = total <= 0.0001 && (paid > 0 || advance > 0);
      const settled = meaningful && remain <= 0.0001 && (total > 0 || paid > 0 || advance > 0);

      return {
        qty,
        total,
        paid,
        advance,
        appliedAdvance,
        isAdvanceOnly,
        remain,
        meaningful,
        isPaymentOnly,
        settled,
      };
    });
  }

  const balancesByItem = new Map();

  return rows.map((row) => {
    const qty = parseNumber(row.qty);
    const price = parseNumber(row.price);
    const paid = parseNumber(row.paid);
    const advance = 0;
    const total = qty * price;

    const itemKey = normalizeItemKey(row.item);
    const previousBalance = balancesByItem.get(itemKey) || 0;
    const nextBalance = previousBalance + total - paid - advance;
    balancesByItem.set(itemKey, nextBalance);

    const remain = nextBalance > 0 ? nextBalance : 0;
    const meaningful = Boolean((row.item || "").trim()) || qty > 0 || price > 0 || paid > 0 || advance > 0;
    const isPaymentOnly = total <= 0.0001 && (paid > 0 || advance > 0);
    const settled = meaningful && remain <= 0.0001 && (total > 0 || paid > 0 || advance > 0);

    return {
      qty,
      total,
      paid,
      advance,
      appliedAdvance: advance,
      isAdvanceOnly: false,
      remain,
      meaningful,
      isPaymentOnly,
      settled,
    };
  });
}

function calculateSummary(rows, tab, computedRows = buildComputedRows(rows, tab)) {
  const mainTotal = computedRows.reduce((sum, row) => sum + row.total, 0);
  const paidTotal = computedRows.reduce((sum, row) => sum + row.paid, 0);
  const advanceTotal = computedRows.reduce((sum, row) => sum + row.advance, 0);
  const appliedAdvanceTotal = computedRows.reduce((sum, row) => sum + (row.appliedAdvance || 0), 0);
  const pendingAdvanceTotal = Math.max(advanceTotal - appliedAdvanceTotal, 0);
  const rawBalance = mainTotal - paidTotal - appliedAdvanceTotal;
  const remainTotal = rawBalance > 0 ? rawBalance : 0;
  const creditFromBalance = rawBalance < 0 ? Math.abs(rawBalance) : 0;
  const creditTotal = tab === "customers" ? creditFromBalance + pendingAdvanceTotal : creditFromBalance;
  const meaningfulRows = computedRows.filter((row) => row.meaningful).length;

  let status = "pending";
  if (meaningfulRows > 0) {
    status = remainTotal <= 0.0001 ? "settled" : "due";
  }

  return {
    mainTotal,
    paidTotal,
    advanceTotal,
    appliedAdvanceTotal,
    pendingAdvanceTotal,
    remainTotal,
    creditTotal,
    status,
  };
}

function getLinkedAccountByName(tab, accountName) {
  const oppositeTab = getOppositeTab(tab);
  const oppositeAccounts = getAccountsByTab(oppositeTab);
  const normalizedName = normalizeAccountName(accountName);

  if (!normalizedName) return null;

  return oppositeAccounts.find((account) => normalizeAccountName(account.name) === normalizedName) || null;
}

function applyCrossSettlement(account, tab, rawSummary) {
  const linkedAccount = getLinkedAccountByName(tab, account.name);
  if (!linkedAccount) {
    return {
      ...rawSummary,
      settlementAmount: 0,
      displayRemainTotal: rawSummary.remainTotal,
      linkedAccountName: "",
    };
  }

  const oppositeTab = getOppositeTab(tab);
  const linkedComputedRows = buildComputedRows(linkedAccount.rows, oppositeTab);
  const linkedSummary = calculateSummary(linkedAccount.rows, oppositeTab, linkedComputedRows);

  const settlementAmount = Math.min(rawSummary.remainTotal, linkedSummary.remainTotal);
  const displayRemainTotal = rawSummary.remainTotal - settlementAmount;

  let status = rawSummary.status;
  if (status === "due" && displayRemainTotal <= 0.0001) {
    status = "settled";
  }

  return {
    ...rawSummary,
    status,
    settlementAmount,
    displayRemainTotal,
    linkedAccountName: linkedAccount.name,
  };
}

function getSummaryStatusPill(summary) {
  if (summary.status === "settled") {
    if (summary.creditTotal > 0) {
      return createStatusPill("settled", `✔ الحساب خالص (رصيد زائد ${formatMoney(summary.creditTotal)})`);
    }
    return createStatusPill("settled", "✔ الحساب خالص");
  }

  if (summary.status === "due") {
    return createStatusPill("due", "✖ الحساب غير خالص");
  }

  return createStatusPill("pending", "غير مكتمل");
}

function getRowStatusPill(calc, tab) {
  const config = LEDGER_CONFIG[tab];

  if (!calc.meaningful) {
    return createStatusPill("pending", "- - -");
  }

  if (calc.isAdvanceOnly) {
    return createStatusPill("settled", config.advanceDoneLabel);
  }

  if (calc.isPaymentOnly) {
    const hasAdvanceOnly = calc.advance > 0 && calc.paid <= 0.0001;
    if (hasAdvanceOnly) {
      if (calc.remain <= 0.0001) {
        return createStatusPill("settled", config.advanceDoneLabel);
      }
      return createStatusPill("due", config.advancePartialLabel);
    }

    if (calc.remain <= 0.0001) {
      return createStatusPill("settled", config.paymentDoneLabel);
    }
    return createStatusPill("due", config.paymentPartialLabel);
  }

  if (calc.settled) {
    return createStatusPill("settled", "✔ خالص");
  }

  return createStatusPill("due", "✖ غير خالص");
}

function getMiniStatus(summary) {
  if (summary.status === "settled") {
    return createMiniStatus("settled", "خالص");
  }
  if (summary.status === "due") {
    return createMiniStatus("due", "غير خالص");
  }
  return createMiniStatus("pending", "بدون حركة");
}

function syncMobileSummary() {
  if (!mobileSummaryCard) return;

  mobileSummaryMainLabel.textContent = summaryMainLabel.textContent;
  mobileSummaryPaidLabel.textContent = summaryPaidLabel.textContent;
  mobileSummaryAdvanceLabel.textContent = summaryAdvanceLabel.textContent;
  mobileSummaryRemainLabel.textContent = summaryRemainLabel.textContent;

  mobileSummaryMain.textContent = summaryMain.textContent;
  mobileSummaryPaid.textContent = summaryPaid.textContent;
  mobileSummaryAdvance.textContent = summaryAdvance.textContent;
  mobileSummaryRemain.textContent = summaryRemain.textContent;

  mobileSummaryAdvanceRow.classList.toggle("is-hidden", summaryAdvanceRow.classList.contains("is-hidden"));

  mobileSummaryStatus.innerHTML = "";
  const statusNode = summaryStatus.firstElementChild;
  if (statusNode) {
    mobileSummaryStatus.appendChild(statusNode.cloneNode(true));
  } else {
    mobileSummaryStatus.appendChild(createStatusPill("pending", "غير مكتمل"));
  }
}

function resetSummary(tab) {
  const config = LEDGER_CONFIG[tab];
  summaryMain.textContent = formatMoney(0);
  summaryPaid.textContent = formatMoney(0);
  summaryAdvance.textContent = formatMoney(0);
  summaryRemain.textContent = formatMoney(0);

  summaryMainLabel.textContent = config.summaryMainLabel;
  summaryPaidLabel.textContent = config.summaryPaidLabel;
  summaryAdvanceLabel.textContent = config.summaryAdvanceLabel;
  summaryRemainLabel.textContent = config.summaryRemainLabel;

  summaryStatus.innerHTML = "";
  summaryStatus.appendChild(createStatusPill("pending", "غير مكتمل"));
  syncMobileSummary();
}

function setAdvanceVisibility(tab) {
  const showAdvance = LEDGER_CONFIG[tab].advanceEditable;

  headingAdvance.classList.toggle("is-hidden", !showAdvance);
  summaryAdvanceRow.classList.toggle("is-hidden", !showAdvance);
  mobileSummaryAdvanceRow.classList.toggle("is-hidden", !showAdvance);

  rowsBody.querySelectorAll(".advance-col").forEach((cell) => {
    cell.classList.toggle("is-hidden", !showAdvance);
  });
}

function formatBalanceText(summary, config) {
  const parts = [];

  if (summary.displayRemainTotal > 0.0001) {
    parts.push(`${config.dueLabel}: ${formatMoney(summary.displayRemainTotal)}`);
  }

  if (summary.creditTotal > 0.0001) {
    parts.push(`${config.creditLabel}: ${formatMoney(summary.creditTotal)}`);
  }

  if (!parts.length) {
    parts.push(`${config.dueLabel}: ${formatMoney(0)}`);
  }

  return parts.join(" | ");
}

function updateLedgerLabels(tab) {
  const config = LEDGER_CONFIG[tab];

  accountsPanelTitle.textContent = config.panelTitle;
  accountsPanelSub.textContent = config.panelSub;
  accountNameLabel.textContent = config.accountNameLabel;
  accountNameInput.placeholder = config.accountPlaceholder;
  addAccountBtn.textContent = config.addButton;

  ledgerHint.textContent = config.hint;
  addRowBtn.textContent = config.addRowLabel;

  headingTotal.textContent = config.headingTotal;
  headingQtyType.textContent = config.headingQtyType;
  headingPaid.textContent = config.headingPaid;
  headingAdvance.textContent = config.headingAdvance;
  headingRemain.textContent = config.headingRemain;

  summaryMainLabel.textContent = config.summaryMainLabel;
  summaryPaidLabel.textContent = config.summaryPaidLabel;
  summaryAdvanceLabel.textContent = config.summaryAdvanceLabel;
  summaryRemainLabel.textContent = config.summaryRemainLabel;

  setAdvanceVisibility(tab);
  syncMobileSummary();
}

function renderAccountsList(tab) {
  const config = LEDGER_CONFIG[tab];
  const accounts = getAccountsByTab(tab);
  const activeId = getActiveIdByTab(tab);

  accountsList.innerHTML = "";

  if (!accounts.length) {
    const empty = document.createElement("li");
    empty.className = "no-accounts";
    empty.textContent = "لا توجد حسابات بعد.";
    accountsList.appendChild(empty);
    return;
  }

  accounts.forEach((account) => {
    const computedRows = buildComputedRows(account.rows, tab);
    const rawSummary = calculateSummary(account.rows, tab, computedRows);
    const summary = applyCrossSettlement(account, tab, rawSummary);

    const card = document.createElement("li");
    card.className = "account-card";
    if (account.id === activeId) {
      card.classList.add("active");
    }

    const switchBtn = document.createElement("button");
    switchBtn.type = "button";
    switchBtn.className = "account-switch";
    switchBtn.dataset.id = account.id;

    const nameEl = document.createElement("span");
    nameEl.className = "account-name";
    nameEl.textContent = account.name;

    const metaEl = document.createElement("span");
    metaEl.className = "account-meta";
    const balanceText = formatBalanceText(summary, config);

    const settlementText = summary.settlementAmount > 0
      ? ` | ${config.settlementLabel}: ${formatMoney(summary.settlementAmount)}`
      : "";

    metaEl.textContent = `${balanceText}${settlementText} | حركات: ${account.rows.length}`;

    const miniStatus = tab === "customers" && summary.creditTotal > 0 && summary.displayRemainTotal <= 0.0001
      ? createMiniStatus("due", "دين علينا")
      : getMiniStatus(summary);

    switchBtn.appendChild(nameEl);
    switchBtn.appendChild(metaEl);
    switchBtn.appendChild(miniStatus);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "account-delete no-print";
    deleteBtn.dataset.id = account.id;
    deleteBtn.textContent = "حذف";

    card.appendChild(switchBtn);
    card.appendChild(deleteBtn);
    accountsList.appendChild(card);
  });
}

function renderSummary(account, tab, computedRows = buildComputedRows(account.rows, tab)) {
  const config = LEDGER_CONFIG[tab];
  const rawSummary = calculateSummary(account.rows, tab, computedRows);
  const summary = applyCrossSettlement(account, tab, rawSummary);

  summaryMain.textContent = formatMoney(summary.mainTotal);
  summaryPaid.textContent = formatMoney(summary.paidTotal);
  summaryAdvance.textContent = formatMoney(tab === "customers" ? summary.pendingAdvanceTotal : summary.advanceTotal);
  summaryRemain.textContent = formatMoney(summary.displayRemainTotal);

  summaryStatus.innerHTML = "";
  if (tab === "customers" && summary.creditTotal > 0 && summary.displayRemainTotal <= 0.0001) {
    summaryStatus.appendChild(createStatusPill("due", `✖ دين علينا: ${formatMoney(summary.creditTotal)}`));
  } else {
    summaryStatus.appendChild(getSummaryStatusPill(summary));
  }
  syncMobileSummary();

  const balanceText = formatBalanceText(summary, config);

  const settlementText = summary.settlementAmount > 0
    ? ` | ${config.settlementLabel} (${summary.linkedAccountName}): ${formatMoney(summary.settlementAmount)}`
    : "";

  activeAccountSub.textContent = `عدد الحركات: ${account.rows.length} | ${balanceText}${settlementText}`;
}

function refreshRowComputed(rowEl, calc, tab) {
  const totalCell = rowEl.querySelector('[data-role="total"]');
  const remainCell = rowEl.querySelector('[data-role="remain"]');
  const statusCell = rowEl.querySelector('[data-role="status"]');

  if (totalCell) totalCell.textContent = formatMoney(calc.total);
  if (remainCell) remainCell.textContent = formatMoney(calc.remain);

  if (statusCell) {
    statusCell.innerHTML = "";
    statusCell.appendChild(getRowStatusPill(calc, tab));
  }
}

function refreshVisibleRows(account, tab) {
  const computedRows = buildComputedRows(account.rows, tab);
  const rowElements = Array.from(rowsBody.querySelectorAll("tr"));

  rowElements.forEach((rowEl, index) => {
    const calc = computedRows[index];
    if (!calc) return;
    refreshRowComputed(rowEl, calc, tab);
  });

  renderSummary(account, tab, computedRows);
}

function buildRow(row, index, calc, tab) {
  const tr = document.createElement("tr");
  tr.dataset.rowId = row.id;
  const config = LEDGER_CONFIG[tab];

  const qtyTypeCell = config.qtyTypeEditable
    ? `
      <select class="row-input" data-field="qtyType">
        <option value="count" ${normalizeQtyType(row.qtyType) === "count" ? "selected" : ""}>عدد</option>
        <option value="weight" ${normalizeQtyType(row.qtyType) === "weight" ? "selected" : ""}>وزن</option>
      </select>
    `
    : `<span class="fixed-cell">عدد</span>`;

  const advanceCell = config.advanceEditable
    ? `<input class="row-input" type="number" data-field="advance" min="0" step="0.01" value="${escapeAttr(row.advance)}" />`
    : `<span class="fixed-cell">-</span>`;

  tr.innerHTML = `
    <td data-label="م">${index + 1}</td>
    <td data-label="التاريخ"><input class="row-input" type="date" data-field="date" value="${escapeAttr(row.date)}" /></td>
    <td data-label="الصنف"><input class="row-input" type="text" data-field="item" value="${escapeAttr(row.item)}" placeholder="مثال: كاوتش فلتر" /></td>
    <td data-label="كمية"><input class="row-input" type="number" data-field="qty" min="0" step="0.01" value="${escapeAttr(row.qty)}" /></td>
    <td data-label="${escapeAttr(config.headingQtyType)}">${qtyTypeCell}</td>
    <td data-label="سعر الوحدة"><input class="row-input" type="number" data-field="price" min="0" step="0.01" value="${escapeAttr(row.price)}" /></td>
    <td class="cell-money" data-label="${escapeAttr(config.headingTotal)}" data-role="total">0.00</td>
    <td data-label="${escapeAttr(config.headingPaid)}"><input class="row-input" type="number" data-field="paid" min="0" step="0.01" value="${escapeAttr(row.paid)}" /></td>
    <td class="advance-col" data-label="${escapeAttr(config.headingAdvance)}">${advanceCell}</td>
    <td class="cell-money" data-label="${escapeAttr(config.headingRemain)}" data-role="remain">0.00</td>
    <td data-label="حالة السداد" data-role="status"></td>
    <td class="no-print" data-label="حذف"><button type="button" class="remove-row" data-row-id="${escapeAttr(row.id)}">حذف</button></td>
  `;

  refreshRowComputed(tr, calc, tab);
  return tr;
}

function renderLedger() {
  const tab = getCurrentLedgerTab();
  const config = LEDGER_CONFIG[tab];

  updateLedgerLabels(tab);
  renderAccountsList(tab);

  const account = getActiveAccount(tab);
  rowsBody.innerHTML = "";

  if (!account) {
    addRowBtn.disabled = true;
    printLedgerBtn.disabled = true;
    activeAccountTitle.textContent = "لا يوجد حساب محدد";
    activeAccountSub.textContent = "أضف حسابًا جديدًا من القائمة الجانبية للبدء.";
    emptyState.classList.remove("visible");
    emptyState.textContent = config.emptyState;
    resetSummary(tab);
    return;
  }

  addRowBtn.disabled = false;
  printLedgerBtn.disabled = false;
  activeAccountTitle.textContent = `${config.activePrefix}: ${account.name}`;

  const computedRows = buildComputedRows(account.rows, tab);
  account.rows.forEach((row, index) => {
    rowsBody.appendChild(buildRow(row, index, computedRows[index], tab));
  });

  setAdvanceVisibility(tab);
  renderSummary(account, tab, computedRows);
  emptyState.textContent = config.emptyState;
  emptyState.classList.toggle("visible", account.rows.length === 0);
}

function getInventoryRecord(itemKey) {
  if (!state.inventory[itemKey]) {
    state.inventory[itemKey] = { currentCount: 0, currentWeight: 0, updatedAt: "" };
  }
  return state.inventory[itemKey];
}

function renderInventoryGrid() {
  inventoryGrid.innerHTML = "";

  INVENTORY_CATALOG.forEach((item) => {
    const record = getInventoryRecord(item.key);
    const lowStock = isLowStock(record);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "inventory-card";
    button.dataset.key = item.key;

    if (item.key === state.activeInventoryKey) {
      button.classList.add("active");
    }
    if (lowStock) {
      button.classList.add("low-stock");
    }

    const alertBadge = lowStock
      ? `<span class="stock-alert">تنبيه: مخزون منخفض</span>`
      : `<span class="stock-ok">المخزون جيد</span>`;

    button.innerHTML = `
      <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.name)}" loading="lazy" />
      <strong>${item.name}</strong>
      <span>عدد متاح: ${formatMoney(record.currentCount)}</span>
      <span>وزن متاح: ${formatMoney(record.currentWeight)} كجم</span>
      ${alertBadge}
    `;

    inventoryGrid.appendChild(button);
  });
}

function renderInventoryDetail() {
  const item = INVENTORY_CATALOG.find((entry) => entry.key === state.activeInventoryKey);

  if (!item) {
    inventoryTitle.textContent = "اختر صنفًا من الأيقونات";
    inventorySub.textContent = "تابع الكمية المتاحة يدويًا مع تنبيه للمخزون القليل.";
    inventoryImage.removeAttribute("src");
    inventoryImage.alt = "";
    inventoryCurrentCount.value = "";
    inventoryCurrentWeight.value = "";
    inventoryCurrentCount.disabled = true;
    inventoryCurrentWeight.disabled = true;
    saveInventoryQty.disabled = true;
    inventorySaveMsg.textContent = "";
    return;
  }

  const record = getInventoryRecord(item.key);

  inventoryTitle.textContent = `مخزون ${item.name}`;
  if (isLowStock(record)) {
    inventorySub.textContent = "تنبيه: المخزون منخفض لهذا الصنف. يُفضّل رفع الكمية المتاحة.";
  } else {
    inventorySub.textContent = "المخزون ضمن الحدود الآمنة.";
  }
  inventoryImage.src = item.image;
  inventoryImage.alt = item.name;

  inventoryCurrentCount.value = record.currentCount;
  inventoryCurrentWeight.value = record.currentWeight;
  inventoryCurrentCount.disabled = false;
  inventoryCurrentWeight.disabled = false;
  saveInventoryQty.disabled = false;
}

function renderInventory() {
  renderInventoryGrid();
  renderInventoryDetail();
}

function renderWorkspaces() {
  const isInventory = state.activeTab === "inventory";

  ledgerWorkspace.classList.toggle("is-hidden", isInventory);
  inventoryWorkspace.classList.toggle("is-hidden", !isInventory);

  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === state.activeTab);
  });

  if (isInventory) {
    renderInventory();
  } else {
    renderLedger();
  }
}

function renderAll() {
  renderWorkspaces();
}

function addAccount(name) {
  const tab = getCurrentLedgerTab();
  const newName = name.trim();
  if (!newName) return;

  const accounts = getAccountsByTab(tab);
  const account = createAccount(newName);

  accounts.push(account);
  setActiveIdByTab(tab, account.id);

  saveState();
  renderAll();
}

function deleteAccount(accountId) {
  const tab = getCurrentLedgerTab();
  const accounts = getAccountsByTab(tab);
  const account = accounts.find((entry) => entry.id === accountId);
  if (!account) return;

  const confirmed = window.confirm(`هل تريد حذف حساب \"${account.name}\"؟ سيتم حذف كل بياناته.`);
  if (!confirmed) return;

  const filtered = accounts.filter((entry) => entry.id !== accountId);
  setAccountsByTab(tab, filtered);

  const nextActive = filtered[0]?.id || "";
  setActiveIdByTab(tab, nextActive);

  saveState();
  renderAll();
}

function addRowToActiveAccount() {
  const tab = getCurrentLedgerTab();
  const account = getActiveAccount(tab);
  if (!account) return;

  account.rows.push(createRow());
  saveState();
  renderLedger();

  const itemInput = rowsBody.querySelector("tr:last-child input[data-field='item']");
  if (itemInput) {
    itemInput.focus();
  }
}

function removeRowFromActiveAccount(rowId) {
  const tab = getCurrentLedgerTab();
  const account = getActiveAccount(tab);
  if (!account) return;

  account.rows = account.rows.filter((row) => row.id !== rowId);
  if (!account.rows.length) {
    account.rows.push(createRow());
  }

  saveState();
  renderAll();
}

function updateRowField(rowId, field, value) {
  const tab = getCurrentLedgerTab();
  const account = getActiveAccount(tab);
  if (!account) return;

  const row = account.rows.find((entry) => entry.id === rowId);
  if (!row) return;

  if (field === "qtyType") {
    row[field] = tab === "suppliers" ? normalizeQtyType(value) : "count";
  } else if (field === "advance") {
    row[field] = tab === "customers" ? value : "0";
  } else {
    row[field] = value;
  }
  refreshVisibleRows(account, tab);
  renderAccountsList(tab);
  saveState();
}

function saveCurrentInventoryQty() {
  const key = state.activeInventoryKey;
  const record = getInventoryRecord(key);
  const countQty = Math.max(0, parseNumber(inventoryCurrentCount.value));
  const weightQty = Math.max(0, parseNumber(inventoryCurrentWeight.value));

  record.currentCount = countQty;
  record.currentWeight = weightQty;
  record.updatedAt = new Date().toISOString();

  saveState();
  if (isLowStock(record)) {
    inventorySaveMsg.textContent = "تم الحفظ. تنبيه: المخزون منخفض لهذا الصنف.";
    inventorySaveMsg.style.color = "#c0392b";
  } else {
    inventorySaveMsg.textContent = "تم حفظ المخزون الحالي بنجاح.";
    inventorySaveMsg.style.color = "#1f8f55";
  }
  renderInventory();
}

function setTodayHeader() {
  todayDate.textContent = new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextTab = button.dataset.tab;
    if (!nextTab) return;

    state.activeTab = nextTab;
    inventorySaveMsg.textContent = "";
    saveState();
    renderAll();
  });
});

accountForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addAccount(accountNameInput.value);
  accountNameInput.value = "";
  accountNameInput.focus();
});

accountsList.addEventListener("click", (event) => {
  const switchBtn = event.target.closest(".account-switch");
  if (switchBtn) {
    const tab = getCurrentLedgerTab();
    const targetId = switchBtn.dataset.id || "";

    setActiveIdByTab(tab, targetId);
    saveState();
    renderAll();
    return;
  }

  const deleteBtn = event.target.closest(".account-delete");
  if (deleteBtn) {
    deleteAccount(deleteBtn.dataset.id || "");
  }
});

addRowBtn.addEventListener("click", addRowToActiveAccount);

rowsBody.addEventListener("click", (event) => {
  const removeBtn = event.target.closest(".remove-row");
  if (!removeBtn) return;
  removeRowFromActiveAccount(removeBtn.dataset.rowId || "");
});

function handleRowFieldEvent(event) {
  const fieldControl = event.target.closest("[data-field]");
  if (!fieldControl) return;

  const rowElement = fieldControl.closest("tr");
  if (!rowElement) return;

  const rowId = rowElement.dataset.rowId;
  const field = fieldControl.dataset.field;
  if (!rowId || !field) return;

  updateRowField(rowId, field, fieldControl.value);
}

rowsBody.addEventListener("input", handleRowFieldEvent);
rowsBody.addEventListener("change", handleRowFieldEvent);

printLedgerBtn.addEventListener("click", () => {
  window.print();
});

inventoryGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".inventory-card");
  if (!card) return;

  const key = card.dataset.key;
  if (!key) return;

  state.activeInventoryKey = key;
  inventorySaveMsg.textContent = "";
  saveState();
  renderInventory();
});

saveInventoryQty.addEventListener("click", saveCurrentInventoryQty);

function handleInventoryEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    saveCurrentInventoryQty();
  }
}

inventoryCurrentCount.addEventListener("keydown", handleInventoryEnter);
inventoryCurrentWeight.addEventListener("keydown", handleInventoryEnter);

setTodayHeader();
renderAll();
