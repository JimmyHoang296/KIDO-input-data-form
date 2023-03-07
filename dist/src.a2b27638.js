// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/index.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// SET UP CONST
var URL = "https://script.google.com/macros/s/AKfycbwReGkZ6KcMKLQItRbCUTUT-MbVjk__IJeaueXcxoDT4n9PaTbsTN6GQuFpIC6VBZitow/exec";
var ITEM_LIST = [];
var DR_LIST = [];
var OS_LIST = [];

// ///////////////////////////////////////////dummy value

var submitBtn = document.getElementById("submit");
var revenueElement = document.getElementById("totalRevenue");
var modalElement = document.querySelector(".modal");
function showModal(modal) {
  modalElement.classList.remove("hidden");
}
function hiddenModal(modal) {
  modalElement.classList.add("hidden");
}
var SHIFT = "";
// submit chon ngay
var searchBtn = document.getElementById("searchBtn");
var workDayInput = document.getElementById("workDay");
var shiftInput = document.getElementById("shift");
var getToday = function getToday() {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  var dateString = year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day;
  return dateString;
};
workDayInput.value = getToday();
SHIFT = getTextDate(workDayInput.value) + shiftInput.value;
workDayInput.addEventListener("change", function () {
  SHIFT = getTextDate(workDayInput.value) + shiftInput.value;
});
function getTextDate(date) {
  var year = date.slice(2, 4);
  var month = date.slice(5, 7);
  var day = date.slice(8, 10);
  return "".concat(day).concat(month).concat(year);
}
searchBtn.addEventListener("click", function () {
  var submitData = {
    type: "search",
    id: SHIFT
  };
  showModal(modalElement);
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(submitData) // body data type must match "Content-Type" header
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    handleResponse(data);
    document.getElementById("shiftDay").innerHTML = "D\u1EEF li\u1EC7u ng\xE0y ".concat(workDayInput.value, " ca ").concat(shiftInput.value, " ");
    if (workDayInput.value !== getToday()) {
      submitBtn.classList.add("hidden");
    } else {
      submitBtn.classList.remove("hidden");
    }
    hiddenModal(modalElement);
  }).catch(function (error) {
    console.error("Error:", error);
    alert("Cập nhật không thành công, hãy thử lại");
    hiddenModal(modalElement);
  });
});

// khi enter trong input sẽ chuyển sang input tiếp theo
var inputs = document.querySelectorAll("input");
inputs.forEach(function (input, index) {
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      var nextIndex = (index + 1) % inputs.length;
      inputs[nextIndex].focus();
      inputs[nextIndex].select();
    }
  });
});
// bắt buộc nhập số với các input number

var validNumber = function validNumber(node) {
  var numberInputs = node.querySelectorAll(".number");
  numberInputs = _toConsumableArray(numberInputs);
  numberInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      var inputValue = input.value.replace(/[^0-9]/g, "");
      input.value = inputValue;
    });
  });
};
validNumber(document);

// submit data
submitBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the form from submitting
  // Get all form data as an object
  var submitData = {
    type: "update",
    id: SHIFT,
    sale: getSaleList(),
    dr: getDrList(),
    os: getOsList(),
    cash: getCashFlow()
  };
  console.log(submitData);
  showModal(modalElement);
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(submitData) // body data type must match "Content-Type" header
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    handleResponse(data);
    document.getElementById("shiftDay").innerHTML = "D\u1EEF li\u1EC7u ng\xE0y ".concat(workDayInput.value, " ca ").concat(shiftInput.value, " ");
    if (workDayInput.value !== getToday()) {
      submitBtn.classList.add("hidden");
    } else {
      submitBtn.classList.remove("hidden");
    }
    alert("Đã cập nhật thành công");
    hiddenModal(modalElement);
  }).catch(function (error) {
    console.error("Error:", error);
    alert("Cập nhật không thành công, hãy thử lại");
    hiddenModal(modalElement);
  });
  // Convert the form data to JSON
  // const json = JSON.stringify(Object.fromEntries(formData.entries()));
  // console.log({ formsubmit: json }); // Output the form data as JSON
});

//////////////////////////////////////////////////Tính doanh thu các sản phẩm bán trong ca
// tính tổng doanh thu
var getRevenue = function getRevenue() {
  var saleField = document.getElementById("saleList");
  var itemTotals = saleField.querySelectorAll(".item-total");
  itemTotals = _toConsumableArray(itemTotals);
  var total = itemTotals.reduce(function (prev, item) {
    return prev * 1 + item.value * 1;
  }, 0);
  return total;
};

// tính doanh thu cho từng sản phẩm
var items = document.querySelectorAll(".item");
var addTotal = function addTotal(item) {
  var price = item.querySelector(".item-price");
  var sale = item.querySelector(".item-sale");
  var total = item.querySelector(".item-total");
  sale.addEventListener("change", function () {
    total.value = price.value * sale.value;
    revenueElement.innerHTML = getRevenue();
  });
};
items.forEach(function (item) {
  return addTotal(item);
});

// lên list sale
var getSaleList = function getSaleList() {
  var saleField = document.getElementById("saleList");
  var sale = [];
  var items = saleField.querySelectorAll(".item");
  items.forEach(function (item) {
    var itemId = item.id;
    var itemName = item.querySelector(".item-name").innerHTML;
    var itemUnit = item.querySelector(".item-unit").value;
    var itemPrice = item.querySelector(".item-price").value;
    var itemQty = item.querySelector(".item-sale").value;
    var itemTotal = item.querySelector(".item-total").value;
    sale.push({
      id: itemId,
      name: itemName,
      unit: itemUnit,
      price: itemPrice,
      qty: itemQty,
      total: itemTotal
    });
  });
  return sale;
};

//////////////////////////////////////////////////Tính chi trong ca
// thêm chi phí
var drListEle = document.getElementById("drList");
var addDrBtn = document.getElementById("addDr");
var addDr = function addDr() {
  var drs = drListEle.querySelectorAll(".dr");
  if (DR_LIST.length === 0) {
    return;
  }
  if (drs.length !== 0 && (drs[drs.length - 1].querySelector(".total").value === "0" || drs[drs.length - 1].querySelector(".name").value === "")) {
    return;
  }
  var newId = drs.length + 1 < 10 ? "0" + (drs.length + 1) : drs.length + 1;
  var newDr = document.createElement("div");
  newDr.classList.add("dr");
  newDr.id = SHIFT + "e" + newId;
  newDr.innerHTML = "\n    <select class=\"name\">\n      <option value=\"\" selected disabled hidden>Chi ph\xED</option>\n      ".concat(renderDrSelect(), "\n    </select>\n\n    <input type=\"text\" class=\"unit\" disabled>\n    <input type=\"text\" class=\"price number\" placeholder=\"\u0110\u01A1n gi\xE1\">\n    <input type=\"text\" class=\"qty number\" placeholder=\"S\u1ED1 l\u01B0\u1EE3ng\">\n    <input type=\"text\" class=\"total\" disabled/>\n\n    <select class=\"source\">\n      <option value=\"cash\">ti\u1EC1n m\u1EB7t</option>\n      <option value=\"bank\">chuy\u1EC3n kho\u1EA3n</option>\n    </select>\n\n    <input type=\"text\" class=\"note\" placeholder=\"Ghi ch\xFA\" />\n  ");
  drListEle.appendChild(newDr);
  addDrInputEvent(newDr);
  mapDrUnit(newDr);
  validNumber(newDr);
};
addDrBtn.addEventListener("click", addDr);

// tinh tong chi phi truc tiep
var getDrTotal = function getDrTotal() {
  var totalDr = {
    sum: 0,
    cash: 0,
    bank: 0
  };
  var drs = drListEle.querySelectorAll(".dr");
  drs = _toConsumableArray(drs);
  drs.forEach(function (ex) {
    var type = ex.querySelector(".source").value;
    var total = ex.querySelector(".total");
    var qty = ex.querySelector(".qty");
    var price = ex.querySelector(".price");
    total.value = qty.value * price.value;
    totalDr.sum += total.value * 1;
    if (type === "cash") {
      totalDr.cash += total.value * 1;
    } else {
      totalDr.bank += total.value * 1;
    }
  });
  var totalDrElement = document.getElementById("totalDrExp");
  totalDrElement.innerHTML = totalDr.sum;
  return totalDr;
};

// eventlistener cho cac input
var addDrInputEvent = function addDrInputEvent(item) {
  var drInputs = item.getElementsByTagName("input");
  drInputs = _toConsumableArray(drInputs);
  drInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      getDrTotal();
    });
  });
};
addDrInputEvent(drListEle);

// map chi phí và đơn vị tính
var mapDrUnit = function mapDrUnit(item) {
  var drNames = item.querySelectorAll(".name");
  drNames = _toConsumableArray(drNames);
  drNames.forEach(function (name) {
    name.addEventListener("change", function () {
      var unit = name.parentNode.querySelector(".unit");
      unit.value = DR_LIST.find(function (dr) {
        return dr.name === name.value;
      }).unit;
    });
  });
};
mapDrUnit(drListEle);
// len danh sach cac chi phi trong ca

var getDrList = function getDrList() {
  var drs = drListEle.querySelectorAll(".dr");
  drs = _toConsumableArray(drs);
  var drList = [];
  drs.forEach(function (dr) {
    var drId = dr.id;
    var drName = dr.querySelector(".name").value;
    var drUnit = dr.querySelector(".unit").value;
    var drPrice = dr.querySelector(".price").value;
    var drQty = dr.querySelector(".qty").value;
    var drTotal = dr.querySelector(".total").value;
    var drSource = dr.querySelector(".source").value;
    var drNote = dr.querySelector(".note").value;
    if (drName !== "") {
      drList.push({
        id: drId,
        name: drName,
        unit: drUnit,
        price: drPrice,
        qty: drQty,
        total: drTotal,
        source: drSource,
        note: drNote
      });
    }
  });
  return drList;
};

//////////////////////////////////////////////////Tính chi phí ngoài ca
// thêm chi phí
var osListEle = document.getElementById("osList");
var addOsBtn = document.getElementById("addOs");
var addOs = function addOs() {
  var oss = osListEle.querySelectorAll(".os");
  if (OS_LIST.length === 0) {
    return;
  }
  if (oss.length !== 0 && (oss[oss.length - 1].querySelector(".total").value === "0" || oss[oss.length - 1].querySelector(".name").value === "")) {
    return;
  }
  var newId = oss.length + 1 < 10 ? "0" + (oss.length + 1) : oss.length + 1;
  var newOs = document.createElement("div");
  newOs.classList.add("os");
  newOs.id = SHIFT + "o" + newId;
  newOs.innerHTML = "\n    <select class=\"name\">\n      <option value=\"\" selected disabled hidden>Chi ph\xED</option>\n      ".concat(renderOsSelect(), "\n    </select>\n\n    <input type=\"text\" class=\"unit\" disabled>\n    <input type=\"text\" class=\"price number\" placeholder=\"\u0110\u01A1n gi\xE1\">\n    <input type=\"text\" class=\"qty number\" placeholder=\"S\u1ED1 l\u01B0\u1EE3ng\">\n    <input type=\"text\" class=\"total\" disabled/>\n\n    <select class=\"source\">\n    <option value=\"bank\">chuy\u1EC3n kho\u1EA3n</option>\n      <option value=\"cash\">ti\u1EC1n m\u1EB7t</option>\n    </select>\n\n    <input type=\"text\" class=\"note\" placeholder=\"Ghi ch\xFA\" />\n  ");
  osListEle.appendChild(newOs);
  addOsInputEvent(newOs);
  mapOsUnit(newOs);
  validNumber(newOs);
};
addOsBtn.addEventListener("click", addOs);

// tinh tong chi phi gián tiếp
var getOsTotal = function getOsTotal() {
  var totalOs = {
    sum: 0,
    cash: 0,
    bank: 0
  };
  var oss = osListEle.querySelectorAll(".os");
  oss = _toConsumableArray(oss);
  oss.forEach(function (ex) {
    var type = ex.querySelector(".source").value;
    var total = ex.querySelector(".total");
    var qty = ex.querySelector(".qty");
    var price = ex.querySelector(".price");
    total.value = qty.value * price.value;
    totalOs.sum += total.value * 1;
    if (type === "cash") {
      totalOs.cash += total.value * 1;
    } else {
      totalOs.bank += total.value * 1;
    }
  });
  var totalOsElement = document.getElementById("totalOsExp");
  totalOsElement.innerHTML = totalOs.sum;
  return totalOs;
};

// eventlistener cho cac input
var addOsInputEvent = function addOsInputEvent(item) {
  var osInputs = item.getElementsByTagName("input");
  osInputs = _toConsumableArray(osInputs);
  osInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      getOsTotal();
    });
  });
};
addOsInputEvent(osListEle);

// map chi phí và đơn vị tính
var mapOsUnit = function mapOsUnit(item) {
  var osNames = item.querySelectorAll(".name");
  osNames = _toConsumableArray(osNames);
  osNames.forEach(function (name) {
    name.addEventListener("change", function () {
      var unit = name.parentNode.querySelector(".unit");
      unit.value = OS_LIST.find(function (os) {
        return os.name === name.value;
      }).unit;
    });
  });
};
mapOsUnit(osListEle);
// len danh sach cac chi phi trong ca

var getOsList = function getOsList() {
  var oss = osListEle.querySelectorAll(".os");
  oss = _toConsumableArray(oss);
  var osList = [];
  oss.forEach(function (os) {
    var osId = os.id;
    var osName = os.querySelector(".name").value;
    var osUnit = os.querySelector(".unit").value;
    var osPrice = os.querySelector(".price").value;
    var osQty = os.querySelector(".qty").value;
    var osTotal = os.querySelector(".total").value;
    var osSource = os.querySelector(".source").value;
    var osNote = os.querySelector(".note").value;
    if (osName !== "") {
      osList.push({
        id: osId,
        name: osName,
        unit: osUnit,
        price: osPrice,
        qty: osQty,
        total: osTotal,
        source: osSource,
        note: osNote
      });
    }
  });
  return osList;
};

///////////////////////////////////////////////////tổng hợp tiền
var cashListEle = document.getElementById("cashList");
var getCashFlow = function getCashFlow() {
  var cashStart = cashListEle.querySelector(".cashStart");
  var grab = cashListEle.querySelector(".grab");
  var shopee = cashListEle.querySelector(".shopee");
  var baemin = cashListEle.querySelector(".baemin");
  var cashBank = cashListEle.querySelector(".cashBank");
  var cashEnd = cashListEle.querySelector(".cashEnd");
  var cashFlow = {
    cashStart: cashStart.value,
    grab: grab.value,
    shopee: shopee.value,
    baemin: baemin.value,
    cashBank: cashBank.value,
    cashEnd: cashEnd.value
  };
  return cashFlow;
};

//////////////////////////////////////////////////// Tổng hợp

var cashStartInput = cashListEle.querySelector(".cashStart");
var grabInput = cashListEle.querySelector(".grab");
var shopeeInput = cashListEle.querySelector(".shopee");
var baeminInput = cashListEle.querySelector(".baemin");
var cashBankInput = cashListEle.querySelector(".cashBank");
var cashEndInput = cashListEle.querySelector(".cashEnd");
var updateCashStart = function updateCashStart() {
  var cashStart = document.getElementById("cashStart");
  cashStart.innerHTML = cashStartInput.value;
};
cashStartInput.addEventListener("change", updateCashStart);
var updateCashEnd = function updateCashEnd() {
  var cashEnd = document.getElementById("cashEnd");
  cashEnd.innerHTML = cashEndInput.value;
};
cashEndInput.addEventListener("change", updateCashEnd);
var updateCashApp = function updateCashApp() {
  var cashApp = document.getElementById("cashApp");
  cashApp.innerHTML = (grabInput.value * 1 + shopeeInput.value * 1 + baeminInput.value * 1) * 0.75;
};
grabInput.addEventListener("change", updateCashApp);
shopeeInput.addEventListener("change", updateCashApp);
baeminInput.addEventListener("change", updateCashApp);
var updateCashBank = function updateCashBank() {
  var cashBank = document.getElementById("cashBank");
  cashBank.innerHTML = cashBankInput.value;
};
cashBankInput.addEventListener("change", updateCashBank);

// ///////////////////////////////////////////setup
var renderItemList = function renderItemList() {
  var saleListEle = document.getElementById("saleList");
  saleListEle.innerHTML = "<legend>H\xE0ng b\xE1n</legend>";
  ITEM_LIST.forEach(function (item) {
    var newItem = document.createElement("div");
    var newId = SHIFT + item.code;
    newItem.classList.add("item");
    newItem.id = newId;
    newItem.innerHTML = "\n          <span class=\"item-name\">".concat(item.name, "</span>\n          <input type=\"text\" class=\"item-unit\" disabled value = ").concat(item.unit, ">\n          <input type=\"text\" class=\"item-price\" disabled value = ").concat(item.price, ">\n          <input\n            class=\"item-sale number\"\n            type=\"text\"\n            placeholder=\"s\u1ED1 b\xE1n\"\n          />\n          <input type=\"text\" class=\"item-total\" disabled>\n      ");
    addTotal(newItem);
    validNumber(newItem);
    saleListEle.appendChild(newItem);
  });
};
renderItemList();
var renderDrSelect = function renderDrSelect(selectedItem) {
  var text = "";
  var nameList = DR_LIST.map(function (dr) {
    return dr.name;
  });
  nameList.forEach(function (name) {
    text += "<option value=\"".concat(name, "\" ").concat(name === selectedItem ? "selected" : "", ">").concat(name, "</option>");
  });
  return text;
};
var renderOsSelect = function renderOsSelect(selectedItem) {
  var text = "";
  var nameList = OS_LIST.map(function (os) {
    return os.name;
  });
  nameList.forEach(function (name) {
    text += "<option value=\"".concat(name, "\"  ").concat(name === selectedItem ? "selected" : "", ">").concat(name, "</option>");
  });
  return text;
};

// //////////////////////////////////handle response data

var handleResponse = function handleResponse(data) {
  DR_LIST = data.setUp.DR_LIST;
  ITEM_LIST = data.setUp.ITEM_LIST;
  OS_LIST = data.setUp.OS_LIST;
  renderItemList();
  if (!data.hasOwnProperty("dayData")) {
    clearData();
    return;
  }
  var daySum = data.dayData.daySum;
  var daySale = data.dayData.daySale;
  var dayDr = data.dayData.dayDr;
  var dayOs = data.dayData.dayOs;
  if (daySum) {
    renderDaySum(daySum);
  }
  if (daySale) {
    renderDaySale(daySale);
  }
  if (dayDr) {
    renderDayDr(dayDr);
  }
  if (dayOs) {
    renderDayOs(dayOs);
  }
};
var clearData = function clearData() {
  var cashStartSum = document.getElementById("cashStart");
  var totalDrExpSum = document.getElementById("totalDrExp");
  var totalOsExpSum = document.getElementById("totalOsExp");
  var cashEndSum = document.getElementById("cashEnd");
  var cashBankSum = document.getElementById("cashBank");
  var cashAppSum = document.getElementById("cashApp");
  var cashList = document.getElementById("cashList");
  var cashStart = cashList.querySelector(".cashStart");
  var grab = cashList.querySelector(".grab");
  var shopee = cashList.querySelector(".shopee");
  var baemin = cashList.querySelector(".baemin");
  var cashBank = cashList.querySelector(".cashBank");
  var cashEnd = cashList.querySelector(".cashEnd");
  cashStartSum.innerHTML = "";
  totalDrExpSum.innerHTML = "";
  totalOsExpSum.innerHTML = "";
  cashEndSum.innerHTML = "";
  cashBankSum.innerHTML = "";
  cashAppSum.innerHTML = "";
  cashStart.value = "";
  grab.value = "";
  shopee.value = "";
  baemin.value = "";
  cashBank.value = "";
  cashEnd.value = "";
  var drElement = document.getElementById("drList");
  var oldDrs = drElement.querySelectorAll(".dr");
  for (var i = 0; i < oldDrs.length; i++) {
    oldDrs[i].parentNode.removeChild(oldDrs[i]);
  }
  var osElement = document.getElementById("osList");
  var oldOss = osElement.querySelectorAll(".os");
  for (var i = 0; i < oldOss.length; i++) {
    oldOss[i].parentNode.removeChild(oldOss[i]);
  }
};
var renderDaySum = function renderDaySum(data) {
  var cashStartSum = document.getElementById("cashStart");
  var totalDrExpSum = document.getElementById("totalDrExp");
  var totalOsExpSum = document.getElementById("totalOsExp");
  var cashEndSum = document.getElementById("cashEnd");
  var cashBankSum = document.getElementById("cashBank");
  var cashAppSum = document.getElementById("cashApp");
  var cashList = document.getElementById("cashList");
  var cashStart = cashList.querySelector(".cashStart");
  var grab = cashList.querySelector(".grab");
  var shopee = cashList.querySelector(".shopee");
  var baemin = cashList.querySelector(".baemin");
  var cashBank = cashList.querySelector(".cashBank");
  var cashEnd = cashList.querySelector(".cashEnd");
  cashStartSum.innerHTML = data.cashStart;
  totalDrExpSum.innerHTML = data.totalDrExp;
  totalOsExpSum.innerHTML = data.totalOsExp;
  cashEndSum.innerHTML = data.cashEnd;
  cashBankSum.innerHTML = data.cashBank;
  cashAppSum.innerHTML = data.cashApp;
  cashStart.value = data.cashStart;
  grab.value = data.grab;
  shopee.value = data.shopee;
  baemin.value = data.baemin;
  cashBank.value = data.cashBank;
  cashEnd.value = data.cashEnd;
};
var renderDaySale = function renderDaySale(data) {
  data.forEach(function (item) {
    var itemElement = document.getElementById(item.id);
    if (itemElement) {
      var name = itemElement.querySelector(".item-name");
      var unit = itemElement.querySelector(".item-unit");
      var price = itemElement.querySelector(".item-price");
      var qty = itemElement.querySelector(".item-sale");
      var total = itemElement.querySelector(".item-total");
      name.innerHTML = item.name;
      unit.value = item.unit;
      price.value = item.price;
      qty.value = item.qty;
      total.value = item.total;
    }
  });
};
var renderDayDr = function renderDayDr(data) {
  var drElement = document.getElementById("drList");
  var oldDrs = drElement.querySelectorAll(".dr");
  for (var i = 0; i < oldDrs.length; i++) {
    oldDrs[i].parentNode.removeChild(oldDrs[i]);
  }
  data.forEach(function (item) {
    var newDr = document.createElement("div");
    newDr.classList.add("dr");
    newDr.id = item.id;
    newDr.innerHTML = "\n      <select class=\"name\">\n        <option selected disabled hidden>Chi ph\xED</option>\n        ".concat(renderDrSelect(item.name), "\n      </select>\n  \n      <input type=\"text\" class=\"unit\" value=\"").concat(item.unit, "\"disabled>\n      <input type=\"text\" class=\"price number\" value=\"").concat(item.price, "\" placeholder=\"\u0110\u01A1n gi\xE1\">\n      <input type=\"text\" class=\"qty number\" value=\"").concat(item.qty, "\" placeholder=\"S\u1ED1 l\u01B0\u1EE3ng\">\n      <input type=\"text\" class=\"total\" value=\"").concat(item.total, "\"disabled/>\n  \n      <select class=\"source\"\">\n        <option value=\"cash\">ti\u1EC1n m\u1EB7t</option>\n        <option value=\"bank\" ").concat(item.source === "bank" ? "selected" : "", ">chuy\u1EC3n kho\u1EA3n</option>\n      </select>\n  \n      <input type=\"text\" class=\"note\" placeholder=\"Ghi ch\xFA\" value=\"").concat(item.note, "\"/>\n    ");
    drElement.appendChild(newDr);
    addDrInputEvent(newDr);
    mapDrUnit(newDr);
    validNumber(newDr);
  });
};
var renderDayOs = function renderDayOs(data) {
  var osElement = document.getElementById("osList");
  var oldOss = osElement.querySelectorAll(".os");
  for (var i = 0; i < oldOss.length; i++) {
    oldOss[i].parentNode.removeChild(oldOss[i]);
  }
  data.forEach(function (item) {
    var newOs = document.createElement("div");
    newOs.classList.add("os");
    newOs.id = item.id;
    newOs.innerHTML = "\n      <select class=\"name\">\n        <option selected disabled hidden>Chi ph\xED</option>\n        ".concat(renderOsSelect(item.name), "\n      </select>\n  \n      <input type=\"text\" class=\"unit\" value=\"").concat(item.unit, "\"disabled>\n      <input type=\"text\" class=\"price number\" value=\"").concat(item.price, "\" placeholder=\"\u0110\u01A1n gi\xE1\">\n      <input type=\"text\" class=\"qty number\" value=\"").concat(item.qty, "\" placeholder=\"S\u1ED1 l\u01B0\u1EE3ng\">\n      <input type=\"text\" class=\"total\" value=\"").concat(item.total, "\"disabled/>\n  \n      <select class=\"source\">\n      <option value=\"bank\">chuy\u1EC3n kho\u1EA3n</option>\n        <option value=\"cash\" ").concat(item.source === "cash" ? "selected" : "", ">ti\u1EC1n m\u1EB7t</option>\n      </select>\n  \n      <input type=\"text\" class=\"note\" placeholder=\"Ghi ch\xFA\" value=\"").concat(item.note, "\"/>\n    ");
    osElement.appendChild(newOs);
    addDrInputEvent(newOs);
    mapDrUnit(newOs);
    validNumber(newOs);
  });
};
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45855" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map