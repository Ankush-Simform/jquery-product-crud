import {
  getDB,
  saveDB,
  idCounter,
  updateIdCounter,
  resetIdCounter,
} from "./db.js";

import { debounce, toggleForm } from "./helpers.js";

$(document).ready(function () {
  displayProducts();

  $("#openFormBtn, #cancelBtn").click(function () {
    toggleForm(1);
  });
  $("#searchInput").on(
    "keyup",
    debounce(function () {
      displayProducts();
    }, 300)
  );
  $("#filterSelect").on("change", function (e) {
    sortProduct(e);
  });
});

function saveProduct() {
  const name = $("#prodName").val().trim();
  const price = $("#prodPrice").val().trim();
  const desc = $("#prodDesc").val().trim();
  const imageFile = $("#prodImage")[0].files[0];

  if (!name || !price || !imageFile) {
    alert("All fields are compulsory!");
    return;
  }

  processImage(imageFile, function (imageData) {
    let products = getDB();

    const newProduct = {
      id: idCounter,
      name,
      price,
      desc,
      image: imageData,
    };

    products.push(newProduct);

    saveDB(products);
    updateIdCounter();
    displayProducts();
  });

  clearForm();
  toggleForm();
}

function displayProducts(products = null) {
  if (products === null) {
    products = getDB();
  }

  let searchValue = $("#searchInput").val().toLowerCase();

  let filtered = products.filter(
    (p) =>
      p.id.toString().includes(searchValue) ||
      p.name.toLowerCase().includes(searchValue) ||
      p.desc.toLowerCase().includes(searchValue)
  );
  let tableBody = $("#tableBody");

  tableBody.html("");

  if (filtered.length === 0) {
    tableBody.html(
      `<tr><td colspan="7" class="text-center">No data available</td></tr>`
    );
    return;
  }

  $.each(filtered, function (index, product) {
    tableBody.append(`
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>
          <img src="${product.image}" 
          style="height:150px;width:200px;object-fit:cover;">
        </td>
        <td>$${product.price}</td>
        <td>${product.desc}</td>

        <td class="text-center">
          <button class="btn btn-info editBtn" data-id="${product.id}">
          Edit
          </button>
        </td>

        <td class="text-center">
          <button class="btn btn-danger deleteBtn" data-id="${product.id}">
          Delete
          </button>
        </td>

      </tr>
    `);
  });
}

$(document).on("click", ".deleteBtn", function () {
  const id = Number($(this).data("id"));

  let products = getDB();

  products = products.filter((p) => p.id !== id);

  saveDB(products);

  displayProducts();
});

function sortProduct(e) {
  let products = getDB();

  let key = $(e.target).val();
  let s = $(e.target).find(":selected").data("s");

  products.sort((a, b) => {
    let aVal = a[key];
    let bVal = b[key];

    if (typeof aVal === "string") {
      let res = aVal.localeCompare(bVal);
      return s === "asc" ? res : -res;
    } else {
      return s === "asc" ? aVal - bVal : bVal - aVal;
    }
  });

  displayProducts(products);
}

$(document).on("click", ".editBtn", function () {
  let id = Number($(this).data("id"));

  editProduct(id);
});

function editProduct(id) {
  let products = getDB();

  let product = products.find((p) => p.id === id);

  if (!product) return;

  $("#prodName").val(product.name);
  $("#prodPrice").val(product.price);
  $("#prodDesc").val(product.desc);

  toggleForm();

  $("#saveBtn")
    .text("Update Product")
    .off("click")
    .on("click", function () {
      updateProduct(id);
    });
}

function updateProduct(id) {
  let products = getDB();

  let index = products.findIndex((p) => p.id === id);

  products[index].name = $("#prodName").val();
  products[index].price = $("#prodPrice").val();
  products[index].desc = $("#prodDesc").val();

  const imageFile = $("#prodImage")[0].files[0];

  if (imageFile) {
    processImage(imageFile, function (imageData) {
      products[index].image = imageData;

      saveDB(products);
      displayProducts();
    });
  } else {
    saveDB(products);
    displayProducts();
  }

  clearForm();

  toggleForm();

  $("#saveBtn").text("Add Product").off("click").on("click", saveProduct);
}

function clearForm() {
  $("#prodName").val("");
  $("#prodPrice").val("");
  $("#prodDesc").val("");
  $("#prodImage").val("");
}

function clearAll() {
  localStorage.clear();
  resetIdCounter();
  displayProducts();
}

function processImage(file, callback) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    callback(e.target.result);
  };

  reader.readAsDataURL(file);
}

globalThis.saveProduct = saveProduct;
globalThis.clearAll = clearAll;
