let redForm = document.querySelector(".register-form");
let allInput = redForm.querySelectorAll("input");
let allBtn = redForm.querySelectorAll("button");
let closeBtn = document.querySelector(".btn-close");
let DataList = document.querySelector(".Data-list");
let AddBtn = document.querySelector(".add-btn");
let searchBtn = document.querySelector(".search");
let deleteallData = document.querySelector(".delete-all-btn");

// console.log(allInput);
let allData = [];
let url = "";

if (localStorage.getItem("allData") != null) {
    allData = JSON.parse(localStorage.getItem("allData"));
}
// console.log(allData);

// Data Inserted Method
redForm.onsubmit = (e) => {
    e.preventDefault();
    let checkEmail = allData.find((data) => data.Email == allInput[2].value);
    if (checkEmail == undefined) {
        // console.log("success");
        allData.push({
            name: allInput[0].value,
            Email: allInput[1].value,
            Number: allInput[2].value,
            DOB: allInput[3].value,
            Password: allInput[4].value,
            Profile: url == "" ? "" : url
        });
        localStorage.setItem("allData", JSON.stringify(allData));
        swal("Data Inserted", "successfully !", "success");
        closeBtn.click();
        redForm.reset('');
        getList();
    }
    else {
        swal("Email alresdy exists", "failed", "warning");
    }

}

// Get List Method 
const getList = () => {
    DataList.innerHTML = "";
    allData.forEach((data, index) => {
        // console.log(data, index);
        let dataString = JSON.stringify(data);
        let strData = dataString.replace(/"/g, "'");
        DataList.innerHTML += `
        <tr>
        <td>${index + 1}</td>
        <td>
        <img src="${data.Profile}" width="33" alt="">
        </td>
        <td>${data.name}</td>
        <td>${data.Email}</td>
        <td>${data.Number}</td>
        <td>${data.DOB}</td>
        <th>
            <button data="${strData}" index="${index}" class="edit-btn btn p-1 px-2 btn-outline-primary">
                <i class="fa fa-edit"></i>
            </button>
            <button index="${index}" class="del-btn btn p-1 px-2 btn-outline-danger">
                <i class="fa fa-trash"></i>
            </button>
        </th>
    </tr>
        `;
    })
    DeleteData();
}

// Delete Data Method Or Update Data Method 
const DeleteData = () => {
    let allDelBtn = DataList.querySelectorAll(".del-btn");
    // console.log(allDelBtn)
    for (let btn of allDelBtn) {
        btn.onclick = async () => {
            let isConfirm = await confirm();
            if (isConfirm) {
                let index = btn.getAttribute("index");
                allData.splice(index, 1);
                localStorage.setItem("allData", JSON.stringify(allData));
                getList();
            }
        }
    }

    // Update Data Method 
    let allEditBtn = DataList.querySelectorAll(".edit-btn");
    for (let btn of allEditBtn) {
        btn.onclick = () => {
            let index = btn.getAttribute("index");
            let dataString = btn.getAttribute("data");
            let strData = dataString.replace(/'/g, '"');
            let data = JSON.parse(strData);
            console.log(data);
            AddBtn.click();
            allInput[0].value = data.name;
            allInput[1].value = data.Email;
            allInput[2].value = data.Number;
            allInput[3].value = data.DOB;
            allInput[4].value = data.Password;
            url = data.Profile;
            allBtn[1].disabled = false;
            allBtn[0].disabled = true;

            allBtn[1].onclick = () => {
                allData[index] = {
                    name: allInput[0].value,
                    Email: allInput[1].value,
                    Number: allInput[2].value,
                    DOB: allInput[3].value,
                    Password: allInput[4].value,
                    Profile: url == "" ? "" : url
                }
                localStorage.setItem("allData", JSON.stringify(allData));
                swal("Data Update", "successfully !", "success");
                closeBtn.click();
                redForm.reset('');
                getList();
                allBtn[0].disabled = false;
                allBtn[1].disabled = true;
            }
        }
    }
}
getList();

// Upalod Image Method
allInput[5].onchange = () => {
    let fReader = new FileReader();
    fReader.readAsDataURL(allInput[5].files[0]);
    fReader.onload = (e) => {
        url = e.target.result;
        // console.log(url);
    }
}

// All List Delete Data 
deleteallData.onclick = async () => {
    let isConfirm = await confirm();
    if (isConfirm) {
        allData = [];
        localStorage.removeItem("allData");
        getList();
    }
}

// Are you sure Delete aleat Method
const confirm = () => {
    return new Promise((resolve, reject) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    resolve(true);
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    reject(false);
                    swal("Your imaginary file is safe!");
                }
            });
    })
}

// searching all data
searchBtn.oninput = () => {
    searchData();
}
const searchData = () => {
    let value = searchBtn.value.toLowerCase();
    let tr = DataList.querySelectorAll("tr");
    // console.log(tr);
    let i;
    for (i = 0; i < tr.length; i++) {
        let allTd = tr[i].querySelectorAll("td");
        let name = allTd[2].innerHTML;
        let Email = allTd[3].innerHTML;
        let Numbar = allTd[4].innerHTML;
        if (name.toLocaleLowerCase().indexOf(value) != -1) {
            tr[i].style.display = "";
        }
        else if (Email.toLocaleLowerCase().indexOf(value) != -1) {
            tr[i].style.display = "";
        }
        else if (Numbar.toLocaleLowerCase().indexOf(value) != -1) {
            tr[i].style.display = "";
        }
        else {
            tr[i].style.display = "none";
        }
        // alert(name);
        // console.log(name);
    }
}