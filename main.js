const formBookmark = document.querySelector(".form-bookmark");
const deleteAll = document.querySelector(".delete-All");
const addBtn=document.querySelector(".btn-submit");;
const searchInput = document.querySelector(".search-input");
const nameError = document.getElementById("name-error");
const urlError = document.getElementById("url-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

let sites = JSON.parse(localStorage.getItem("sites")) || [];
displaySites();
const validSitesName = () => {

const regex = /^[A-Z][a-zA-Z]{2,29}$/;
  const input = document.querySelector('input[name="website_Name"]');
  if (!regex.test(input.value)) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    nameError.textContent="Invalid Site Name: Must start with an uppercase letter and be 3-30 letters long. ";
    return false;
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
   nameError.textContent="";
    return true;
  }
};

const validURL = () => {
  const regex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/;
  const input = document.querySelector('input[name="website_URL"]');
  if (!regex.test(input.value)) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    urlError.textContent="Invalid URL: Please enter a valid URL.";
    return false;
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  urlError.textContent="";
    return true;
  }
};
const validEmail = () => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const input = document.querySelector('input[name="email"]');
  if (!regex.test(input.value)) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
   emailError.textContent="Invalid Email: Please enter a valid email address.";
    return false;
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    emailError.textContent="";
    return true;
  }
};
const validPassword = () => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
  const input = document.querySelector('input[name="password"]');
  if (!regex.test(input.value)) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    passwordError.textContent="Invalid Password: 8-20 characters, at least one uppercase letter, one lowercase letter, one number, and one special character.";
    return false;
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    passwordError.textContent="";
    return true;
  }
};

formBookmark.addEventListener("submit", (e) => {
  e.preventDefault();
    const isNameValid = validSitesName();
  const isURLValid = validURL();
  const isEmailValid = validEmail();
  const isPasswordValid = validPassword();

  const isValid = isNameValid && isURLValid && isEmailValid && isPasswordValid;

  if (!isValid) {
   return;}
  const site = {
    website_Name: document
      .querySelector('input[name="website_Name"]')
      .value.trim(),
    website_URL: document
      .querySelector('input[name="website_URL"]')
      .value.trim(),
    email: document.querySelector('input[name="email"]').value.trim(),
    password: document.querySelector('input[name="password"]').value.trim(),
  };
  const editIndex = formBookmark.getAttribute("edit-index");
  if(editIndex !==null){
    sites[editIndex] = site;
    formBookmark.removeAttribute("edit-index");

  }
  else 
  {
      sites.push(site);
  }

  localStorage.setItem("sites", JSON.stringify(sites));
  formBookmark.reset();
  displaySites();
});

function displaySites(sitesArray = sites) {
  const tableBody = document.querySelector(".bookmarks-tbody");
  const validSites = sitesArray.filter(
    (site) =>
      site &&
      site.website_Name &&
      site.website_URL &&
      site.email &&
      site.password
  );

  if (!validSites.length) {
    tableBody.innerHTML = `<tr class="no-data">
          <td colspan="5" >
            لا توجد بيانات لعرضها
          </td>
        </tr>`;
    return;
  }

  tableBody.innerHTML = validSites
    .map((site, index) => {
      return `<tr>
            <td>${site.website_Name}</td>
            <td><a href="${site.website_URL}" target="_blank">${site.website_URL}</a></td>
            <td>${site.email}</td>
            <td>${site.password}</td>
            <td><button onclick="deleteItem(${index})">Delete</button></td>
            <td><button onclick="UpdateItem(${index})">Update</button></td>
          </tr>`;
    })
    .join("");
}

function deleteItem(index) {
  sites.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(sites));
  displaySites();
}
function UpdateItem(index) {
  const site = sites[index];
  
  document.querySelector('input[name="website_Name"]').value =
    site.website_Name;
  document.querySelector('input[name="website_URL"]').value = site.website_URL;
  document.querySelector('input[name="email"]').value = site.email;
  document.querySelector('input[name="password"]').value = site.password;
   document.querySelector(".form-bookmark").setAttribute("edit-index", index);
addBtn.textContent="Update";
}
deleteAll.onclick = function () {
  if (confirm("Are you sure you want to delete all bookmarks?")) {
    localStorage.removeItem("sites");
    sites = [];
    displaySites();
  }
};
searchInput.addEventListener("input", () => {
  const filterSearch = searchInput.value.toLowerCase();
  const filteredSites = sites.filter((site) => {
    return site.website_Name.toLowerCase().includes(filterSearch);
  });
  displaySites(filteredSites);
  
}); 
