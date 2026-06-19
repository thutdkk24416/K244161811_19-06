function loadEmployees(data_path) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", data_path, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var xmlDoc = xhr.responseXML;

            if (xmlDoc && xmlDoc.documentElement) {
                var titleList = getUniqueTitles(xmlDoc);
                fillDropList(titleList);

                var dropdown = document.getElementById("titleSelect");
                dropdown.onchange = function () {
                    var selectedTitle = dropdown.value;
                    showFilteredEmployees(xmlDoc, selectedTitle);
                };
            }
        }
    };

    xhr.send();
}

function getUniqueTitles(xmlDoc) {
    var employees = xmlDoc.getElementsByTagName("employee");
    var titleList = [];

    for (var i = 0; i < employees.length; i++) {
        var title = employees[i].getAttribute("title");
        var alreadyExists = false;

        for (var j = 0; j < titleList.length; j++) {
            if (titleList[j] === title) {
                alreadyExists = true;
                break;
            }
        }

        if (!alreadyExists) {
            titleList.push(title);
        }
    }

    return titleList;
}

function fillDropList(titleList) {
    var dropdown = document.getElementById("titleSelect");
    dropdown.innerHTML = "";

    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "-- Select a title --";
    dropdown.appendChild(defaultOption);

    for (var i = 0; i < titleList.length; i++) {
        var option = document.createElement("option");
        option.value = titleList[i];
        option.textContent = titleList[i];
        dropdown.appendChild(option);
    }
}

function showFilteredEmployees(xmlDoc, selectedTitle) {
    var table = document.getElementById("employeeTable");
    var tbody = document.getElementById("employeeTableBody");
    var titleDisplay = document.getElementById("titleHienThi");

    tbody.innerHTML = "";

    if (selectedTitle === "") {
        table.style.display = "none";
        return;
    }

    titleDisplay.textContent = selectedTitle;

    var employees = xmlDoc.getElementsByTagName("employee");

    for (var i = 0; i < employees.length; i++) {
        var employee = employees[i];

        if (employee.getAttribute("title") === selectedTitle) {
            var row = document.createElement("tr");

            var tdId = document.createElement("td");
            var tdName = document.createElement("td");
            var tdPhone = document.createElement("td");

            tdId.textContent = employee.getAttribute("id");
            tdName.textContent = getTextValue(employee, "name");
            tdPhone.textContent = getTextValue(employee, "phone");

            row.appendChild(tdId);
            row.appendChild(tdName);
            row.appendChild(tdPhone);

            tbody.appendChild(row);
        }
    }

    table.style.display = "table";
}

function getTextValue(parentNode, tagName) {
    var elements = parentNode.getElementsByTagName(tagName);

    if (elements.length > 0 && elements[0].textContent !== null) {
        return elements[0].textContent;
    }

    return "";
}
