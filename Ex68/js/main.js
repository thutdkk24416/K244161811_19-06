function loadCDCatalog(data_path, cdTableBody) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", data_path, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var xmlDoc = xhr.responseXML;
            if (xmlDoc && xmlDoc.documentElement) {
                hienThiDuLieu(xmlDoc, cdTableBody);
            } else {
                statusMsg.textContent = "Lỗi: Không đọc được dữ liệu XML.";
            }
        } 
    };

    xhr.send();
}

function hienThiDuLieu(xmlDoc, cdTableBody) {
    var bang = document.getElementById("cdTable");
    var danhSachCD = xmlDoc.documentElement.getElementsByTagName("CD");
    cdTableBody.innerHTML = "";

    for (var i = 0; i < danhSachCD.length; i++) {
        var cd = danhSachCD[i];
        var hangMoi = document.createElement("tr");

        var tdArtist = document.createElement("td");
        var tdTitle = document.createElement("td");
        var tdCountry = document.createElement("td");
        var tdCompany = document.createElement("td");
        var tdPrice = document.createElement("td");
        var tdYear = document.createElement("td");

        tdArtist.textContent = layGiaTri(cd, "ARTIST");
        tdTitle.textContent = layGiaTri(cd, "TITLE");
        tdCountry.textContent = layGiaTri(cd, "COUNTRY");
        tdCompany.textContent = layGiaTri(cd, "COMPANY");
        tdPrice.textContent = "$" + layGiaTri(cd, "PRICE");
        tdYear.textContent = layGiaTri(cd, "YEAR");

        hangMoi.appendChild(tdArtist);
        hangMoi.appendChild(tdTitle);
        hangMoi.appendChild(tdCountry);
        hangMoi.appendChild(tdCompany);
        hangMoi.appendChild(tdPrice);
        hangMoi.appendChild(tdYear);

        cdTableBody.appendChild(hangMoi);
    }

    bang.style.display = "table";
}

function layGiaTri(phanTu, tenThe) {
    var danhSach = phanTu.getElementsByTagName(tenThe);

    if (danhSach.length > 0 && danhSach[0].textContent !== null) {
        return danhSach[0].textContent;
    }

    return "";
}
