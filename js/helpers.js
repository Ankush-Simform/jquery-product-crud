export function debounce(func, delay) {
  let timeOut;
  return (...args) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function toggleForm(a = 10) {
  console.log("hiii", a);
  $("#formContainer").toggle();
  $("#openFormBtn").toggle();

  console.log(
    $("#formContainer").is(":visible")
      ? "Form is now Visible"
      : "Form is now Hidden",
  );
}
