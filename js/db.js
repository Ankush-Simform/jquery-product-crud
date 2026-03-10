export let idCounter = localStorage.getItem("idCounter")
  ? parseInt(localStorage.getItem("idCounter"))
  : 1;

export function getDB() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

export function saveDB(data) {
  localStorage.setItem("products", JSON.stringify(data));
}

export function updateIdCounter() {
  idCounter++;
  localStorage.setItem("idCounter", idCounter);
}

export function resetIdCounter() {
  idCounter = 1;
  localStorage.setItem("idCounter", idCounter);
}
 