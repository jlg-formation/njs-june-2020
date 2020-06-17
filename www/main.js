let selectedRowCounter = 0;

function select(e) {
  console.log("select", e);
  if (e.classList.contains("selected")) {
    e.classList.remove("selected");
    selectedRowCounter--;
  } else {
    e.classList.add("selected");
    selectedRowCounter++;
  }
  console.log("selectedRowCounter: ", selectedRowCounter);

  // decide if we need to display suppress button
  const button = document.querySelector("button.button-delete");
  console.log("button: ", button);
  if (selectedRowCounter === 0) {
    button.classList.add("jlg-hidden");
  } else {
    button.classList.remove("jlg-hidden");
  }
}
