// Hiding Password Function
function hidePassword(pass) {
  let str = ""  
  for (let index = 0; index < pass.length; index++) {
    str += "*"
  }
  return str
}

// Copying Text Function
function copyText(txt) {
  navigator.clipboard.writeText(txt).then(
    () => {
      alert("Copied!")
    },
    () => {
      alert("Not Copied")
    },
  );
}

// Delete Password Function
const deletePasswords = (website) => {
  let data = localStorage.getItem("passwords")
  let arr = JSON.parse(data)
  arrUpdated = arr.filter((e) => {
    return e.website != website
  })
  localStorage.setItem("passwords",JSON.stringify(arrUpdated))
  alert(`Deleted Succesfully ${website}'s details!`)
  showPasswords()
}

// Show Password Function
const showPasswords = () => {
  let tb = document.querySelector("table")
  let data = localStorage.getItem("passwords")
  if (data == null || JSON.parse(data).length==0) {
    tb.innerHTML = "No Data To Show"
  }
  else {
    tb.innerHTML = `<tr>
      <th>Website</th>
      <th>Username</th>
      <th>Password</th>
      <th>Delete</th>
      </tr>`
    let arr = JSON.parse(data);
    let str = ""
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      
      str += `<tr>
        <td>${element.website} <img src="copy.svg" onclick="copyText('${element.website}')" height=15 width=15></td>
        <td>${element.username} <img src="copy.svg" onclick="copyText('${element.username}')" height=15 width=15></td>
        <td>${hidePassword(element.password)} <img src="copy.svg" onclick="copyText('${element.password}')" height=15 width=15></td>
        <td><button class= "btn-sm" onclick="deletePasswords('${element.website}')">Delete</button></td>
      </tr>`
    }
  tb.innerHTML = tb.innerHTML + str
  } 
  website.value = ""
  username.value = ""
  password.value = ""
}

// Main Logic
showPasswords()
document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault()
  let passwords = localStorage.getItem("passwords")
  console.log(passwords)
  if (passwords == null) {
    let json = []
    json.push({ website: website.value, username: username.value, password: password.value })
    localStorage.setItem("passwords", JSON.stringify(json))
  } 
  else {
    let json = JSON.parse(localStorage.getItem("passwords"))
    json.push({ website: website.value, username: username.value, password: password.value })
    localStorage.setItem("passwords", JSON.stringify(json))
  }
  alert("Saved Successfully!")
  showPasswords()
})
