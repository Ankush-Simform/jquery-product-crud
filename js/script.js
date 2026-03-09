// let idCounter = localStorage.getItem("idCounter")
//   ? parseInt(localStorage.getItem("idCounter"))
//   : 1;
// // document.addEventListener('DOMContentLoaded', sortProduct);
// // function getDB() {
// //   return JSON.parse(localStorage.getItem("products")) || [];
// // }

// // function saveDB(data) {
// //   localStorage.setItem("products", JSON.stringify(data));
// // }

// document.addEventListener("DOMContentLoaded", () => {
//   displayProducts();
//   const searchInput = document.getElementById("searchInput");
//   if (searchInput) {     
//     searchInput.addEventListener("keyup", handleSearch);
//   }
// });

// function debounce(func, delay) {
//   let timeOut;
//   return (...args) => {
//     clearTimeout(timeOut);
//     timeOut = setTimeout(() => {
//       func.apply(this, args);
//     }, delay);
//   };
// }
// const handleSearch = debounce(() => {
//   displayProducts();
// }, 300);

// function toggleForm() {
//   const form = document.getElementById("formContainer");
//   const btn = document.getElementById("openFormBtn");
//   if (form.style.display === "none" || form.style.display === "") {     
//     form.style.display = "block";
//     btn.style.display = "none";
//   } else {
//     form.style.display = "none";
//     btn.style.display = "block";
//   }
// }

// // function saveProduct() {
// //   const name = document.getElementById("prodName").value;
// //   const price = document.getElementById("prodPrice").value;
// //   const desc = document.getElementById("prodDesc").value;
// //   const imageFile = document.getElementById("prodImage").files[0];

// //   if (!name || !price || !imageFile) {
// //     alert("All fields are compulsory!");
// //     return;
// //   }

// //   const reader = new FileReader();
// //   reader.onload = function (e) {
// //     let products = getDB();
// //     const newProduct = {
// //       id: idCounter,
// //       name: name,
// //       price: price,
// //       desc: desc,
// //       image: e.target.result,
// //     };

// //     products.push(newProduct);
// //     saveDB(products);
// //     idCounter++;
// //     localStorage.setItem("idCounter", idCounter);
// //     displayProducts();
// //   };

// //   reader.readAsDataURL(imageFile);
// //   //  console.log(reader);
// // }

// // function displayProducts(products = null) {
// //   if (products === null) products = getDB();

// //   let tableBody = document.getElementById("tableBody");
// //   let searchValue = document.getElementById("searchInput").value.toLowerCase();

// //   let filtered = products.filter(
// //     (p) =>
// //       p.id.toString().toLowerCase().includes(searchValue)||
    
// //       p.name.toLowerCase().includes(searchValue) ||
// //       p.desc.toLowerCase().includes(searchValue),
// //   );

// //   tableBody.innerHTML = "";
// //   if (filtered.length === 0) {
// //     tableBody.innerHTML =
// //       '<tr><td colspan="7" class="text-center">No data available.</td></tr>';
// //     return;
// //   }

// //   filtered.forEach((product) => {
// //     tableBody.innerHTML += `  
// //       <tr>
// //         <td>${product.id}</td>
// //         <td>${product.name}</td>
// //         <td><img src="${product.image}" class="product-img" style="height:150px; width:200px; object-fit:cover;" /></td>
// //         <td>$${product.price}</td>  
// //         <td>${product.desc}</td>
// //         <td class="text-center"><button class="btn btn-sm btn-info" onclick="editProduct(${product.id})">Edit</button></td>
// //         <td class="text-center"><button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">Delete</button></td>
// //       </tr>`;
// //     //  toggleForm();
// //   });
// // }

// // const deleteProduct = (id) => {
// //   let products = getDB();
// //   products = products.filter((product) => product.id !== id);
// //   localStorage.setItem("products", JSON.stringify(products));
// //   displayProducts();
// // };

// // const clearAll = (id) => {
// //   let products = getDB();
// //   localStorage.clear();
// //   idCounter = 1;
// //   displayProducts();
// // };

// function editProduct(id) {
//   let products = getDB();
//   let productToEdit = products.find((p) => p.id === id);
//   if (productToEdit) {
//     document.getElementById("prodName").value = productToEdit.name;
//     document.getElementById("prodPrice").value = productToEdit.price;

//     document.getElementById("prodDesc").value = productToEdit.desc;
//     toggleForm(idCounter);
//     const saveBtn = document.getElementById("saveBtn");
//     saveBtn.onclick = function () {
//       updateProduct(id);
//     };
//   }

//   // displayProducts();
// }

// function updateProduct(id) {
//   let editId;
//   let products = getDB();
//   let index = products.findIndex((p) => p.id === id);

//   // console.log(products);

//   products[index].name = document.getElementById("prodName").value;
//   products[index].price = document.getElementById("prodPrice").value;
//   products[index].desc = document.getElementById("prodDesc").value;
//   products;
//   const imageFile = document.getElementById("prodImage").files[0];
//   if (imageFile) {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       products[index].image = e.target.result;
//       saveDB(products);
//       displayProducts();
//       toggleForm();
//     };
//     reader.readAsDataURL(imageFile);
//   } else {
//     saveDB(products);
//   }

//   saveDB(products);
//   toggleForm();
//   displayProducts();

//   displayProducts();
// }


// //Sort Product By Id,Name,Price,Desc

// function sortProduct(e) {
//   let products = getDB();

//   let key = e.target.value;
//   let s = e.target.options[e.target.selectedIndex].dataset.s;
//   console.log(e, e.target.options)

//   // console.log(e.target, s);

//   products.sort((a, b) => {
//     let aVal = a[key];
//     let bVal = b[key];
//     if (typeof aVal === "string") {
//       aVal = aVal.localeCompare(bVal);
//       bVal = 0;
//     } else if (typeof aVal === "number") {
//       aVal = aVal - bVal;
//       bVal = 0;
//     }

//     return s === "asc" ? aVal - bVal : bVal - aVal;
//   });

//   displayProducts(products);
// }

// document.getElementById("filterSelect").addEventListener("change", sortProduct);
