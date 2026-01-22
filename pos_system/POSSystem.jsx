import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Printer, BarChart3, ShoppingCart, Package, Settings, AlertCircle, LogOut, Users, Lock, Download, Upload } from 'lucide-react';

export default function POSSystem() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', password: 'admin123', role: 'Admin' },
    { id: 2, username: 'cashier1', password: 'cashier123', role: 'Cashier' }
  ]);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState('checkout');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [taxRate, setTaxRate] = useState(10);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [invoiceNum, setInvoiceNum] = useState(1001);
  const [inventoryHistory, setInventoryHistory] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);
  const [newUserForm, setNewUserForm] = useState({ username: '', password: '', role: 'Cashier' });
  const [formData, setFormData] = useState({ barcode: '', name: '', price: '', quantity: '', discount: '', reorderLevel: '' });
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);

  // Load data on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pos_data');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.users) setUsers(data.users);
        if (data.products) setProducts(data.products);
        if (data.taxRate) setTaxRate(data.taxRate);
        if (data.invoiceNum) setInvoiceNum(data.invoiceNum);
        if (data.inventoryHistory) setInventoryHistory(data.inventoryHistory);
        if (data.salesHistory) setSalesHistory(data.salesHistory);
      }
    } catch (e) {
      console.log('Load error:', e);
    }
  }, []);

  // Save data to storage
  useEffect(() => {
    const data = { users, products, taxRate, invoiceNum, inventoryHistory, salesHistory };
    localStorage.setItem('pos_data', JSON.stringify(data));
  }, [users, products, taxRate, invoiceNum, inventoryHistory, salesHistory]);

  const handleLogin = () => {
    setLoginError('');
    if (!loginForm.username || !loginForm.password) {
      setLoginError('Enter username and password');
      return;
    }
    const user = users.find(u => u.username === loginForm.username && u.password === loginForm.password);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setLoginForm({ username: '', password: '' });
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const createUser = () => {
    if (!newUserForm.username || !newUserForm.password) {
      alert('Fill username and password');
      return;
    }
    if (users.some(u => u.username === newUserForm.username)) {
      alert('Username exists');
      return;
    }
    setUsers([...users, { id: Date.now(), ...newUserForm }]);
    setNewUserForm({ username: '', password: '', role: 'Cashier' });
  };

  const deleteUser = (id) => {
    if (id === currentUser.id) {
      alert('Cannot delete yourself');
      return;
    }
    setUsers(users.filter(u => u.id !== id));
  };

  const addProduct = () => {
    if (!formData.barcode || !formData.name || !formData.price) {
      alert('Fill barcode, name, price');
      return;
    }
    if (products.some(p => p.barcode === formData.barcode)) {
      alert('Barcode exists');
      return;
    }
    const newProd = {
      id: Date.now(),
      barcode: formData.barcode,
      name: formData.name,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity) || 0,
      discount: parseFloat(formData.discount) || 0,
      reorderLevel: parseInt(formData.reorderLevel) || 10
    };
    setProducts([...products, newProd]);
    setFormData({ barcode: '', name: '', price: '', quantity: '', discount: '', reorderLevel: '' });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const adjustStock = (id, adj) => {
    setProducts(products.map(p => p.id === id ? { ...p, quantity: Math.max(0, p.quantity + adj) } : p));
  };

  const scanBarcode = (code) => {
    const prod = products.find(p => p.barcode === code);
    if (!prod) {
      alert('Product not found');
      return;
    }
    if (prod.quantity <= 0) {
      alert('Out of stock');
      return;
    }
    const existing = cart.find(item => item.id === prod.id);
    if (existing) {
      if (existing.cartQty + 1 > prod.quantity) {
        alert('Not enough stock');
        return;
      }
      setCart(cart.map(item => item.id === prod.id ? { ...item, cartQty: item.cartQty + 1 } : item));
    } else {
      setCart([...cart, { ...prod, cartQty: 1 }]);
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (tab === 'checkout' && isLoggedIn) {
        setBarcodeInput(prev => prev + e.key);
        if (e.key === 'Enter') {
          e.preventDefault();
          scanBarcode(barcodeInput);
          setBarcodeInput('');
        }
      }
    };
    window.addEventListener('keypress', handleKey);
    return () => window.removeEventListener('keypress', handleKey);
  }, [barcodeInput, tab, isLoggedIn, products]);

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
    } else {
      const prod = products.find(p => p.id === id);
      if (qty > prod.quantity) {
        alert('Not enough stock');
        return;
      }
      setCart(cart.map(item => item.id === id ? { ...item, cartQty: qty } : item));
    }
  };

  const getTotals = () => {
    let subtotal = 0;
    cart.forEach(item => {
      const total = item.price * item.cartQty;
      const disc = (total * item.discount) / 100;
      subtotal += total - disc;
    });
    const tax = (subtotal * taxRate) / 100;
    return { subtotal, tax, total: subtotal + tax };
  };

  const { subtotal, tax, total } = getTotals();

  const printInvoice = () => {
    if (cart.length === 0) return;
    
    const saleRecord = {
      id: Date.now(),
      invoiceNum: invoiceNum,
      cashier: currentUser.username,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      items: cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.cartQty,
        discount: item.discount
      })),
      subtotal: subtotal,
      tax: tax,
      total: total,
      timestamp: new Date().toISOString()
    };
    
    setSalesHistory([saleRecord, ...salesHistory]);
    setProducts(products.map(p => {
      const item = cart.find(c => c.id === p.id);
      return item ? { ...p, quantity: p.quantity - item.cartQty } : p;
    }));
    setInvoiceNum(invoiceNum + 1);
    setCart([]);
    setBarcodeInput('');
    alert('Invoice printed');
  };

  const exportData = () => {
    const data = { users, products, taxRate, invoiceNum, inventoryHistory, salesHistory };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pos_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.users) setUsers(data.users);
        if (data.products) setProducts(data.products);
        if (data.taxRate) setTaxRate(data.taxRate);
        if (data.invoiceNum) setInvoiceNum(data.invoiceNum);
        if (data.salesHistory) setSalesHistory(data.salesHistory);
        alert('Data imported');
      } catch (err) {
        alert('Import error: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const clearData = () => {
    if (window.confirm('Clear all data?')) {
      setProducts([]);
      setInventoryHistory([]);
      setSalesHistory([]);
      setTaxRate(10);
      setInvoiceNum(1001);
      localStorage.clear();
    }
  };

  const lowStock = products.filter(p => p.quantity <= p.reorderLevel && p.quantity > 0);
  const outOfStock = products.filter(p => p.quantity === 0);
  const filteredSales = salesHistory.filter(sale => sale.date === filterDate);
  const totalSalesByDate = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  const totalItemsByDate = filteredSales.reduce((sum, sale) => sum + sale.items.reduce((s, item) => s + item.quantity, 0), 0);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <div className="text-center mb-8">
              <Lock className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <h1 className="text-3xl font-bold text-gray-800">POS System</h1>
              <p className="text-gray-600 mt-2">Employee Login</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                autoFocus
              />
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {loginError && <div className="bg-red-100 text-red-700 p-3 rounded text-sm">{loginError}</div>}
              <button onClick={handleLogin} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg">
                Login
              </button>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 text-xs text-gray-600">
              <p className="mb-2">Demo Accounts:</p>
              <p>admin / admin123</p>
              <p>cashier1 / cashier123</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">POS System</h1>
              <p className="text-sm opacity-90">{currentUser.username} ({currentUser.role})</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Invoice: #{invoiceNum}</span>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto flex flex-wrap">
          <button onClick={() => setTab('checkout')} className={`flex items-center gap-2 px-6 py-4 ${tab === 'checkout' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
            <ShoppingCart className="w-5 h-5" /> Checkout
          </button>
          <button onClick={() => setTab('inventory')} className={`flex items-center gap-2 px-6 py-4 ${tab === 'inventory' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
            <Package className="w-5 h-5" /> Inventory
            {(lowStock.length > 0 || outOfStock.length > 0) && <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{lowStock.length + outOfStock.length}</span>}
          </button>
          <button onClick={() => setTab('sales')} className={`flex items-center gap-2 px-6 py-4 ${tab === 'sales' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
            <BarChart3 className="w-5 h-5" /> Sales
          </button>
          <button onClick={() => setTab('history')} className={`flex items-center gap-2 px-6 py-4 ${tab === 'history' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
            <BarChart3 className="w-5 h-5" /> History
          </button>
          {currentUser.role === 'Admin' && (
            <button onClick={() => setTab('users')} className={`flex items-center gap-2 px-6 py-4 ${tab === 'users' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
              <Users className="w-5 h-5" /> Users
            </button>
          )}
          <button onClick={() => setTab('settings')} className={`flex items-center gap-2 px-6 py-4 ${tab === 'settings' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>
            <Settings className="w-5 h-5" /> Settings
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {tab === 'checkout' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Scanner</h2>
                <input type="text" value={barcodeInput} onChange={(e) => setBarcodeInput(e.target.value)} placeholder="Scan barcode..." className="w-full px-4 py-3 border-2 border-indigo-300 rounded-lg bg-blue-50" autoFocus />
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Cart</h2>
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Empty</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {cart.map(item => {
                      const total = item.price * item.cartQty;
                      const final = total - (total * item.discount / 100);
                      return (
                        <div key={item.id} className="border-b pb-3">
                          <p className="font-bold">{item.name}</p>
                          <p className="text-sm text-gray-600">${item.price} × {item.cartQty} = ${final.toFixed(2)}</p>
                          <div className="flex gap-2 mt-2">
                            <input type="number" min="1" value={item.cartQty} onChange={(e) => updateQty(item.id, parseInt(e.target.value))} className="w-12 px-2 py-1 border rounded" />
                            <button onClick={() => removeFromCart(item.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Remove</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="bg-indigo-50 rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-6">Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between"><span>Items:</span><span className="font-bold">{cart.length}</span></div>
                <div className="flex justify-between"><span>Subtotal:</span><span className="font-bold">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tax:</span><span className="font-bold">${tax.toFixed(2)}</span></div>
                <div className="border-t pt-4 flex justify-between"><span className="text-xl font-bold">Total:</span><span className="text-3xl font-bold text-indigo-600">${total.toFixed(2)}</span></div>
              </div>
              <button onClick={printInvoice} disabled={cart.length === 0} className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg">Print Invoice</button>
              <button onClick={() => setCart([])} disabled={cart.length === 0} className="w-full mt-3 bg-gray-300 text-gray-800 font-bold py-2 rounded-lg">Clear</button>
            </div>
          </div>
        )}

        {tab === 'inventory' && (
          <div className="space-y-6">
            {outOfStock.length > 0 && <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded"><h3 className="font-bold text-red-800">Out of Stock: {outOfStock.map(p => p.name).join(', ')}</h3></div>}
            {lowStock.length > 0 && <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded"><h3 className="font-bold text-yellow-800">Low Stock</h3>{lowStock.map(p => <p key={p.id} className="text-sm">{p.name}: {p.quantity} units</p>)}</div>}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Add Product</h2>
                <div className="space-y-4">
                  <input type="text" placeholder="Barcode" value={formData.barcode} onChange={(e) => setFormData({ ...formData, barcode: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="number" placeholder="Qty" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="number" placeholder="Reorder Level" value={formData.reorderLevel} onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <input type="number" placeholder="Discount %" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  <button onClick={addProduct} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg">Add</button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Products ({products.length})</h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {products.map(p => (
                    <div key={p.id} className="border rounded-lg p-3 bg-gray-50">
                      <p className="font-bold">{p.name}</p>
                      <p className="text-sm text-gray-600">Stock: {p.quantity} | ${p.price}</p>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => adjustStock(p.id, 1)} className="px-2 py-1 bg-green-500 text-white text-xs rounded">+</button>
                        <button onClick={() => adjustStock(p.id, -1)} className="px-2 py-1 bg-orange-500 text-white text-xs rounded">-</button>
                        <button onClick={() => deleteProduct(p.id)} className="px-2 py-1 bg-red-500 text-white text-xs rounded">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'sales' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Sales Report</h2>
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Filter by Date:</label>
                <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="px-4 py-2 border rounded-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <p className="text-gray-600 text-sm">Total Sales</p>
                  <p className="text-3xl font-bold text-blue-600">${totalSalesByDate.toFixed(2)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                  <p className="text-gray-600 text-sm">Total Items</p>
                  <p className="text-3xl font-bold text-green-600">{totalItemsByDate}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                  <p className="text-gray-600 text-sm">Transactions</p>
                  <p className="text-3xl font-bold text-purple-600">{filteredSales.length}</p>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-3">Transactions for {filterDate}</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredSales.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No sales on this date</p>
                ) : (
                  filteredSales.map(sale => (
                    <div key={sale.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between mb-2">
                        <div>
                          <p className="font-bold">Invoice #{sale.invoiceNum}</p>
                          <p className="text-sm text-gray-600">Cashier: {sale.cashier}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-indigo-600">${sale.total.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">{sale.time}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-300">
                        <p className="text-sm font-semibold mb-2">Items:</p>
                        <div className="ml-2 space-y-1">
                          {sale.items.map((item, idx) => (
                            <p key={idx} className="text-sm text-gray-700">
                              {item.name} × {item.quantity} @ ${item.price.toFixed(2)}
                              {item.discount > 0 && <span className="text-red-600"> (-{item.discount}%)</span>}
                            </p>
                          ))}
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-sm">Tax: ${sale.tax.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Overall Statistics</h2>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span>Total Transactions (All Time):</span>
                  <span className="font-bold">{salesHistory.length}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Total Revenue (All Time):</span>
                  <span className="font-bold text-indigo-600">${salesHistory.reduce((sum, s) => sum + s.total, 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Items Sold (All Time):</span>
                  <span className="font-bold">{salesHistory.reduce((sum, s) => sum + s.items.reduce((st, i) => st + i.quantity, 0), 0)}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Average Transaction:</span>
                  <span className="font-bold">${(salesHistory.length > 0 ? salesHistory.reduce((sum, s) => sum + s.total, 0) / salesHistory.length : 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'history' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Inventory Activity</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {inventoryHistory.length === 0 ? <p className="text-gray-500">No activity</p> : inventoryHistory.map(h => (
                  <div key={h.id} className="border-l-4 border-indigo-600 p-3 bg-gray-50 rounded text-sm">
                    <p className="font-bold">{h.action}</p>
                    <p className="text-xs text-gray-500">{h.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">System Info</h2>
              <div className="space-y-2">
                <div><span className="font-bold">Total Products:</span> {products.length}</div>
                <div><span className="font-bold">Total Users:</span> {users.length}</div>
                <div><span className="font-bold">Total Sales:</span> {salesHistory.length}</div>
                <div><span className="font-bold">Current Invoice:</span> #{invoiceNum}</div>
              </div>
            </div>
          </div>
        )}

        {tab === 'users' && currentUser.role === 'Admin' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Create User</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Username" value={newUserForm.username} onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                <input type="password" placeholder="Password" value={newUserForm.password} onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                <select value={newUserForm.role} onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                  <option>Cashier</option>
                  <option>Admin</option>
                </select>
                <button onClick={createUser} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg">Create</button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Users</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {users.map(u => (
                  <div key={u.id} className={`border rounded-lg p-3 ${u.id === currentUser.id ? 'bg-indigo-50' : 'bg-gray-50'}`}>
                    <p className="font-bold">{u.username}</p>
                    <p className="text-sm text-gray-600">{u.role} {u.id === currentUser.id && '(You)'}</p>
                    <button onClick={() => deleteUser(u.id)} disabled={u.id === currentUser.id} className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded disabled:bg-gray-400">Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Tax Rate (%)</label>
                <input type="number" value={taxRate} onChange={(e) => setTaxRate(parseFloat(e.target.value))} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-4">Backup & Restore</h3>
                <div className="space-y-3">
                  <button onClick={exportData} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" /> Export
                  </button>
                  <label className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer">
                    <Upload className="w-5 h-5" /> Import
                    <input type="file" accept=".json" onChange={importData} className="hidden" />
                  </label>
                  <button onClick={clearData} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg">Clear All</button>
                </div>
              </div>
              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2">Data Persistence:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Auto-save to browser</li>
                  <li>✓ Survives page refresh</li>
                  <li>✓ Export as JSON</li>
                  <li>✓ Import from JSON</li>
                  <li>✓ Sales history tracking</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}