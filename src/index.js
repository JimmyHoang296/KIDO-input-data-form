// SET UP CONST
const URL =
  "https://script.google.com/macros/s/AKfycbzrLxgmAFRPOGXHwEkhLtYhBcz7a4vEjStU4kVMZwNeKzJugVUCt-2HsMvzaWOvWXns1w/exec";
var ITEM_LIST = [];
var DR_LIST = [];
var OS_LIST = [];

const submitBtn = document.getElementById("submit");
const revenueElement = document.getElementById("totalRevenue");
const modalElement = document.querySelector(".modal");

function showModal(modal) {
  modalElement.classList.remove("hidden");
}
function hiddenModal(modal) {
  modalElement.classList.add("hidden");
}

var SHIFT = "";
// submit chon ngay
const searchBtn = document.getElementById("searchBtn");
const workDayInput = document.getElementById("workDay");
const shiftInput = document.getElementById("shift");

const getToday = () => {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  var dateString =
    year +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    (day < 10 ? "0" : "") +
    day;
  return dateString;
};

workDayInput.value = getToday();
SHIFT = getTextDate(workDayInput.value) + shiftInput.value;

workDayInput.addEventListener("change", () => {
  SHIFT = getTextDate(workDayInput.value) + shiftInput.value;
});

function getTextDate(date) {
  var year = date.slice(2, 4);
  var month = date.slice(5, 7);
  var day = date.slice(8, 10);
  return `${day}${month}${year}`;
}

searchBtn.addEventListener("click", () => {
  var submitData = {
    type: "search",
    id: SHIFT,
  };
  showModal(modalElement);
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(submitData), // body data type must match "Content-Type" header
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      handleResponse(data);
      document.getElementById(
        "shiftDay"
      ).innerHTML = `Dữ liệu ngày ${workDayInput.value} ca ${shiftInput.value} `;
      if (workDayInput.value !== getToday()) {
        submitBtn.classList.add("hidden");
      } else {
        submitBtn.classList.remove("hidden");
      }

      hiddenModal(modalElement);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Cập nhật không thành công, hãy thử lại");
      hiddenModal(modalElement);
    });
});

// khi enter trong input sẽ chuyển sang input tiếp theo
const inputs = document.querySelectorAll("input");

inputs.forEach((input, index) => {
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const nextIndex = (index + 1) % inputs.length;
      inputs[nextIndex].focus();
      inputs[nextIndex].select();
    }
  });
});
// bắt buộc nhập số với các input number

const validNumber = (node) => {
  var numberInputs = node.querySelectorAll(".number");
  numberInputs = [...numberInputs];
  numberInputs.forEach((input) => {
    input.addEventListener("input", () => {
      let inputValue = input.value.replace(/[^0-9]/g, "");
      input.value = inputValue;
    });
  });
};
validNumber(document);

// submit data
submitBtn.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the form from submitting
  // Get all form data as an object
  const submitData = {
    type: "update",
    id: SHIFT,
    sale: getSaleList(),
    dr: getDrList(),
    os: getOsList(),
    cash: getCashFlow(),
  };
  console.log(submitData);
  showModal(modalElement);
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(submitData), // body data type must match "Content-Type" header
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      handleResponse(data);
      document.getElementById(
        "shiftDay"
      ).innerHTML = `Dữ liệu ngày ${workDayInput.value} ca ${shiftInput.value} `;
      if (workDayInput.value !== getToday()) {
        submitBtn.classList.add("hidden");
      } else {
        submitBtn.classList.remove("hidden");
      }
      console.log (data)
      alert("Đã cập nhật thành công");
      hiddenModal(modalElement);
    })
    .catch((error) => {
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
const getRevenue = () => {
  const saleField = document.getElementById("saleList");
  var itemTotals = saleField.querySelectorAll(".item-total");
  itemTotals = [...itemTotals];
  const total = itemTotals.reduce((prev, item) => prev * 1 + item.value * 1, 0);
  return total;
};

// tính doanh thu cho từng sản phẩm
const items = document.querySelectorAll(".item");

const addTotal = (item) => {
  const price = item.querySelector(".item-price");
  const sale = item.querySelector(".item-sale");
  const total = item.querySelector(".item-total");
  sale.addEventListener("change", () => {
    total.value = price.value * sale.value;
    revenueElement.innerHTML = getRevenue();
  });
};

items.forEach((item) => addTotal(item));

// lên list sale
const getSaleList = () => {
  const saleField = document.getElementById("saleList");
  const sale = [];
  const items = saleField.querySelectorAll(".item");
  items.forEach((item) => {
    const itemId = item.id;
    const itemName = item.querySelector(".item-name").innerHTML;
    const itemUnit = item.querySelector(".item-unit").value;
    const itemPrice = item.querySelector(".item-price").value;
    const itemQty = item.querySelector(".item-sale").value;
    const itemTotal = item.querySelector(".item-total").value;
    sale.push({
      id: itemId,
      name: itemName,
      unit: itemUnit,
      price: itemPrice,
      qty: itemQty,
      total: itemTotal,
    });
  });
  return sale;
};

//////////////////////////////////////////////////Tính chi trong ca
// thêm chi phí
const drListEle = document.getElementById("drList");
const addDrBtn = document.getElementById("addDr");

const addDr = () => {
  let drs = drListEle.querySelectorAll(".dr");
  if (DR_LIST.length === 0) {
    return;
  }
  if (
    drs.length !== 0 &&
    (drs[drs.length - 1].querySelector(".total").value === "0" ||
      drs[drs.length - 1].querySelector(".name").value === "")
  ) {
    return;
  }
  const newId = drs.length + 1 < 10 ? "0" + (drs.length + 1) : drs.length + 1;
  const newDr = document.createElement("div");
  newDr.classList.add("dr");
  newDr.id = SHIFT + "e" + newId;
  newDr.innerHTML = `
    <select class="name">
      <option value="" selected disabled hidden>Chi phí</option>
      ${renderDrSelect()}
    </select>

    <input type="text" class="unit" disabled>
    <input type="text" class="price number" placeholder="Đơn giá">
    <input type="text" class="qty number" placeholder="Số lượng">
    <input type="text" class="total" disabled/>

    <select class="source">
      <option value="cash">tiền mặt</option>
      <option value="bank">chuyển khoản</option>
    </select>

    <input type="text" class="note" placeholder="Ghi chú" />
  `;
  drListEle.appendChild(newDr);
  addDrInputEvent(newDr);
  mapDrUnit(newDr);
  validNumber(newDr);
};

addDrBtn.addEventListener("click", addDr);

// tinh tong chi phi truc tiep
const getDrTotal = () => {
  const totalDr = {
    sum: 0,
    cash: 0,
    bank: 0,
  };
  var drs = drListEle.querySelectorAll(".dr");
  drs = [...drs];
  drs.forEach((ex) => {
    const type = ex.querySelector(".source").value;
    const total = ex.querySelector(".total");
    const qty = ex.querySelector(".qty");
    const price = ex.querySelector(".price");
    total.value = qty.value * price.value;
    totalDr.sum += total.value * 1;
    if (type === "cash") {
      totalDr.cash += total.value * 1;
    } else {
      totalDr.bank += total.value * 1;
    }
  });
  const totalDrElement = document.getElementById("totalDrExp");
  totalDrElement.innerHTML = totalDr.sum;
  return totalDr;
};

// eventlistener cho cac input
const addDrInputEvent = (item) => {
  var drInputs = item.getElementsByTagName("input");
  drInputs = [...drInputs];
  drInputs.forEach((input) => {
    input.addEventListener("input", () => {
      getDrTotal();
    });
  });
};
addDrInputEvent(drListEle);

// map chi phí và đơn vị tính
const mapDrUnit = (item) => {
  var drNames = item.querySelectorAll(".name");
  drNames = [...drNames];
  drNames.forEach((name) => {
    name.addEventListener("change", () => {
      const unit = name.parentNode.querySelector(".unit");
      unit.value = DR_LIST.find((dr) => dr.name === name.value).unit;
    });
  });
};
mapDrUnit(drListEle);
// len danh sach cac chi phi trong ca

const getDrList = () => {
  var drs = drListEle.querySelectorAll(".dr");
  drs = [...drs];
  const drList = [];
  drs.forEach((dr) => {
    const drId = dr.id;
    const drName = dr.querySelector(".name").value;
    const drUnit = dr.querySelector(".unit").value;
    const drPrice = dr.querySelector(".price").value;
    const drQty = dr.querySelector(".qty").value;
    const drTotal = dr.querySelector(".total").value;
    const drSource = dr.querySelector(".source").value;
    const drNote = dr.querySelector(".note").value;
    if (drName !== "") {
      drList.push({
        id: drId,
        name: drName,
        unit: drUnit,
        price: drPrice,
        qty: drQty,
        total: drTotal,
        source: drSource,
        note: drNote,
      });
    }
  });
  return drList;
};

//////////////////////////////////////////////////Tính chi phí ngoài ca
// thêm chi phí
const osListEle = document.getElementById("osList");
const addOsBtn = document.getElementById("addOs");

const addOs = () => {
  let oss = osListEle.querySelectorAll(".os");

  if (OS_LIST.length === 0) {
    return;
  }
  if (
    oss.length !== 0 &&
    (oss[oss.length - 1].querySelector(".total").value === "0" ||
      oss[oss.length - 1].querySelector(".name").value === "")
  ) {
    return;
  }

  const newId = oss.length + 1 < 10 ? "0" + (oss.length + 1) : oss.length + 1;
  const newOs = document.createElement("div");
  newOs.classList.add("os");
  newOs.id = SHIFT + "o" + newId;
  newOs.innerHTML = `

    <select class="name">
      <option value="" selected disabled hidden>Chi phí</option>
      ${renderOsSelect()}
    </select>

    <input type="text" class="unit" disabled>
    <input type="text" class="price number" placeholder="Đơn giá">
    <input type="text" class="qty number" placeholder="Số lượng">
    <input type="text" class="total" disabled/>

    <select class="source">
    <option value="bank">chuyển khoản</option>
      <option value="cash">tiền mặt</option>
    </select>

    <input type="text" class="note" placeholder="Ghi chú" />
  `;
  osListEle.appendChild(newOs);
  addOsInputEvent(newOs);
  mapOsUnit(newOs);
  validNumber(newOs);
};

addOsBtn.addEventListener("click", addOs);

// tinh tong chi phi gián tiếp
const getOsTotal = () => {
  const totalOs = {
    sum: 0,
    cash: 0,
    bank: 0,
  };
  var oss = osListEle.querySelectorAll(".os");
  oss = [...oss];
  oss.forEach((ex) => {
    const type = ex.querySelector(".source").value;
    const total = ex.querySelector(".total");
    const qty = ex.querySelector(".qty");
    const price = ex.querySelector(".price");
    total.value = qty.value * price.value;
    totalOs.sum += total.value * 1;
    if (type === "cash") {
      totalOs.cash += total.value * 1;
    } else {
      totalOs.bank += total.value * 1;
    }
  });
  const totalOsElement = document.getElementById("totalOsExp");
  totalOsElement.innerHTML = totalOs.sum;
  return totalOs;
};

// eventlistener cho cac input
const addOsInputEvent = (item) => {
  var osInputs = item.getElementsByTagName("input");
  osInputs = [...osInputs];
  osInputs.forEach((input) => {
    input.addEventListener("input", () => {
      getOsTotal();
    });
  });
};
addOsInputEvent(osListEle);

// map chi phí và đơn vị tính
const mapOsUnit = (item) => {
  var osNames = item.querySelectorAll(".name");
  osNames = [...osNames];
  osNames.forEach((name) => {
    name.addEventListener("change", () => {
      const unit = name.parentNode.querySelector(".unit");
      unit.value = OS_LIST.find((os) => os.name === name.value).unit;
    });
  });
};
mapOsUnit(osListEle);
// len danh sach cac chi phi trong ca

const getOsList = () => {
  var oss = osListEle.querySelectorAll(".os");
  oss = [...oss];
  const osList = [];
  oss.forEach((os) => {
    const osId = os.id;
    const osName = os.querySelector(".name").value;
    const osUnit = os.querySelector(".unit").value;
    const osPrice = os.querySelector(".price").value;
    const osQty = os.querySelector(".qty").value;
    const osTotal = os.querySelector(".total").value;
    const osSource = os.querySelector(".source").value;
    const osNote = os.querySelector(".note").value;
    if (osName !== "") {
      osList.push({
        id: osId,
        name: osName,
        unit: osUnit,
        price: osPrice,
        qty: osQty,
        total: osTotal,
        source: osSource,
        note: osNote,
      });
    }
  });
  return osList;
};

///////////////////////////////////////////////////tổng hợp tiền
const cashListEle = document.getElementById("cashList");

const getCashFlow = () => {
  const cashStart = cashListEle.querySelector(".cashStart");
  const grab = cashListEle.querySelector(".grab");
  const shopee = cashListEle.querySelector(".shopee");
  const baemin = cashListEle.querySelector(".baemin");
  const cashBank = cashListEle.querySelector(".cashBank");
  const cashEnd = cashListEle.querySelector(".cashEnd");

  const cashFlow = {
    cashStart: cashStart.value,
    grab: grab.value,
    shopee: shopee.value,
    baemin: baemin.value,
    cashBank: cashBank.value,
    cashEnd: cashEnd.value,
  };
  return cashFlow;
};

//////////////////////////////////////////////////// Tổng hợp

const cashStartInput = cashListEle.querySelector(".cashStart");
const grabInput = cashListEle.querySelector(".grab");
const shopeeInput = cashListEle.querySelector(".shopee");
const baeminInput = cashListEle.querySelector(".baemin");
const cashBankInput = cashListEle.querySelector(".cashBank");
const cashEndInput = cashListEle.querySelector(".cashEnd");

const updateCashStart = () => {
  const cashStart = document.getElementById("cashStart");
  cashStart.innerHTML = cashStartInput.value;
};
cashStartInput.addEventListener("change", updateCashStart);

const updateCashEnd = () => {
  const cashEnd = document.getElementById("cashEnd");
  cashEnd.innerHTML = cashEndInput.value;
};
cashEndInput.addEventListener("change", updateCashEnd);

const updateCashApp = () => {
  const cashApp = document.getElementById("cashApp");
  cashApp.innerHTML =
    (grabInput.value * 1 + shopeeInput.value * 1 + baeminInput.value * 1) *
    0.75;
};
grabInput.addEventListener("change", updateCashApp);
shopeeInput.addEventListener("change", updateCashApp);
baeminInput.addEventListener("change", updateCashApp);

const updateCashBank = () => {
  const cashBank = document.getElementById("cashBank");
  cashBank.innerHTML = cashBankInput.value;
};
cashBankInput.addEventListener("change", updateCashBank);

// ///////////////////////////////////////////setup
const renderItemList = () => {
  const saleListEle = document.getElementById("saleList");
  saleListEle.innerHTML = `<legend>Hàng bán</legend>`;
  ITEM_LIST.forEach((item) => {
    const newItem = document.createElement("div");
    const newId = SHIFT + item.code;
    newItem.classList.add("item");
    newItem.id = newId;
    newItem.innerHTML = `
          <span class="item-name">${item.name}</span>
          <input type="text" class="item-unit" disabled value = ${item.unit}>
          <input type="text" class="item-price" disabled value = ${item.price}>
          <input
            class="item-sale number"
            type="text"
            placeholder="số bán"
          />
          <input type="text" class="item-total" disabled>
      `;
    addTotal(newItem);
    validNumber(newItem);
    saleListEle.appendChild(newItem);
  });
};

renderItemList();

const renderDrSelect = (selectedItem) => {
  var text = "";
  const nameList = DR_LIST.map((dr) => dr.name);
  nameList.forEach((name) => {
    text += `<option value="${name}" ${
      name === selectedItem ? "selected" : ""
    }>${name}</option>`;
  });
  return text;
};

const renderOsSelect = (selectedItem) => {
  var text = "";
  const nameList = OS_LIST.map((os) => os.name);
  nameList.forEach((name) => {
    text += `<option value="${name}"  ${
      name === selectedItem ? "selected" : ""
    }>${name}</option>`;
  });
  return text;
};

// const renderOsGroup = (selectedItem) => {
//   var text = "";
//   var groupList = OS_LIST.map((os) => os.group);
//   groupList = groupList.filter((value,index)=> groupList.indexOf(value)=== index)
//   groupList.forEach((group) => {
//     text += `<option value="${group}"  ${
//       group === selectedItem ? "selected" : ""
//     }>${group}</option>`;
//   });
//   return text;
// };

// //////////////////////////////////handle response data

const handleResponse = (data) => {
  DR_LIST = data.setUp.DR_LIST;
  ITEM_LIST = data.setUp.ITEM_LIST;
  OS_LIST = data.setUp.OS_LIST;
  renderItemList();

  if (!data.hasOwnProperty("dayData")) {
    clearData();
    return;
  }
  const daySum = data.dayData.daySum;
  const daySale = data.dayData.daySale;
  const dayDr = data.dayData.dayDr;
  const dayOs = data.dayData.dayOs;

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
const clearData = () => {
  const cashStartSum = document.getElementById("cashStart");
  const totalDrExpSum = document.getElementById("totalDrExp");
  const totalOsExpSum = document.getElementById("totalOsExp");
  const cashEndSum = document.getElementById("cashEnd");
  const cashBankSum = document.getElementById("cashBank");
  const cashAppSum = document.getElementById("cashApp");

  const cashList = document.getElementById("cashList");
  const cashStart = cashList.querySelector(".cashStart");
  const grab = cashList.querySelector(".grab");
  const shopee = cashList.querySelector(".shopee");
  const baemin = cashList.querySelector(".baemin");
  const cashBank = cashList.querySelector(".cashBank");
  const cashEnd = cashList.querySelector(".cashEnd");

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

  const drElement = document.getElementById("drList");
  const oldDrs = drElement.querySelectorAll(".dr");
  for (var i = 0; i < oldDrs.length; i++) {
    oldDrs[i].parentNode.removeChild(oldDrs[i]);
  }

  const osElement = document.getElementById("osList");
  const oldOss = osElement.querySelectorAll(".os");
  for (var i = 0; i < oldOss.length; i++) {
    oldOss[i].parentNode.removeChild(oldOss[i]);
  }
};

const renderDaySum = (data) => {
  const cashStartSum = document.getElementById("cashStart");
  const totalDrExpSum = document.getElementById("totalDrExp");
  const totalOsExpSum = document.getElementById("totalOsExp");
  const cashEndSum = document.getElementById("cashEnd");
  const cashBankSum = document.getElementById("cashBank");
  const cashAppSum = document.getElementById("cashApp");

  const cashList = document.getElementById("cashList");
  const cashStart = cashList.querySelector(".cashStart");
  const grab = cashList.querySelector(".grab");
  const shopee = cashList.querySelector(".shopee");
  const baemin = cashList.querySelector(".baemin");
  const cashBank = cashList.querySelector(".cashBank");
  const cashEnd = cashList.querySelector(".cashEnd");

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

const renderDaySale = (data) => {
  data.forEach((item) => {
    const itemElement = document.getElementById(item.id);
    if (itemElement) {
      const name = itemElement.querySelector(".item-name");
      const unit = itemElement.querySelector(".item-unit");
      const price = itemElement.querySelector(".item-price");
      const qty = itemElement.querySelector(".item-sale");
      const total = itemElement.querySelector(".item-total");

      name.innerHTML = item.name;
      unit.value = item.unit;
      price.value = item.price;
      qty.value = item.qty;
      total.value = item.total;
    }
  });
};

const renderDayDr = (data) => {
  const drElement = document.getElementById("drList");
  const oldDrs = drElement.querySelectorAll(".dr");
  for (var i = 0; i < oldDrs.length; i++) {
    oldDrs[i].parentNode.removeChild(oldDrs[i]);
  }
  data.forEach((item) => {
    const newDr = document.createElement("div");
    newDr.classList.add("dr");
    newDr.id = item.id;
    newDr.innerHTML = `
      <select class="name">
        <option selected disabled hidden>Chi phí</option>
        ${renderDrSelect(item.name)}
      </select>
  
      <input type="text" class="unit" value="${item.unit}"disabled>
      <input type="text" class="price number" value="${
        item.price
      }" placeholder="Đơn giá">
      <input type="text" class="qty number" value="${
        item.qty
      }" placeholder="Số lượng">
      <input type="text" class="total" value="${item.total}"disabled/>
  
      <select class="source"">
        <option value="cash">tiền mặt</option>
        <option value="bank" ${
          item.source === "bank" ? "selected" : ""
        }>chuyển khoản</option>
      </select>
  
      <input type="text" class="note" placeholder="Ghi chú" value="${
        item.note
      }"/>
    `;
    drElement.appendChild(newDr);
    addDrInputEvent(newDr);
    mapDrUnit(newDr);
    validNumber(newDr);
  });
};

const renderDayOs = (data) => {
  const osElement = document.getElementById("osList");
  const oldOss = osElement.querySelectorAll(".os");
  for (var i = 0; i < oldOss.length; i++) {
    oldOss[i].parentNode.removeChild(oldOss[i]);
  }
  data.forEach((item) => {
    const newOs = document.createElement("div");
    newOs.classList.add("os");
    newOs.id = item.id;
    newOs.innerHTML = `
      <select class="name">
        <option selected disabled hidden>Chi phí</option>
        ${renderOsSelect(item.name)}
      </select>
  
      <input type="text" class="unit" value="${item.unit}"disabled>
      <input type="text" class="price number" value="${
        item.price
      }" placeholder="Đơn giá">
      <input type="text" class="qty number" value="${
        item.qty
      }" placeholder="Số lượng">
      <input type="text" class="total" value="${item.total}"disabled/>
  
      <select class="source">
      <option value="bank">chuyển khoản</option>
        <option value="cash" ${
          item.source === "cash" ? "selected" : ""
        }>tiền mặt</option>
      </select>
  
      <input type="text" class="note" placeholder="Ghi chú" value="${
        item.note
      }"/>
    `;
    osElement.appendChild(newOs);
    addDrInputEvent(newOs);
    mapDrUnit(newOs);
    validNumber(newOs);
  });
};
