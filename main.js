const formBookmark = document.querySelector(".form-bookmark");
const deleteAll = document.querySelector(".delete-All");
let sites = JSON.parse(localStorage.getItem("sites")) || [];
displaySites();

formBookmark.onsubmit = function (e) {
  e.preventDefault();
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

  sites.push(site);
  localStorage.setItem("sites", JSON.stringify(sites));
  formBookmark.reset();
  displaySites();
};

function displaySites() {
  const tableBody = document.querySelector(".bookmarks-tbody");

  const validSites = sites.filter(
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
          </tr>`;
    })
    .join("");
}

function deleteItem(index) {
  sites.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(sites));
  displaySites();
}

deleteAll.onclick = function () {
  if (confirm("Are you sure you want to delete all bookmarks?")) {
    localStorage.removeItem("sites");
    sites = [];
    displaySites();
  }
};
