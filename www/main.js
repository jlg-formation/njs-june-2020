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

  // decide if we need to display update button
  const updateButton = document.querySelector("a.button-update");
  console.log('updateButton: ', updateButton);
  if (selectedRowCounter !== 1) {
    updateButton.classList.add("jlg-hidden");
  } else {
    updateButton.classList.remove("jlg-hidden");
  }
}

async function remove() {
  console.log("remove");
  const rows = document.querySelectorAll("tr.selected");
  console.log("rows: ", rows);
  const ids = [];
  rows.forEach((row) => {
    row.classList.remove("selected");
    const id = row.classList.value;
    console.log("id: ", id);
    ids.push(id);
  });
  console.log("ids: ", ids);

  const options = {
    method: "DELETE",
    body: JSON.stringify(ids),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };

  try {
    const response = await fetch("/webservices/bulk/articles", options);
    console.log("response: ", response);
    location.reload();
  } catch (err) {
    console.log("error: ", error);
  }
}
