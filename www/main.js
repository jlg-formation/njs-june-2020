function select(e) {
  console.log("select", e);
  if (e.classList.contains("selected")) {
    e.classList.remove("selected");
  } else {
    e.classList.add("selected");
  }
}
