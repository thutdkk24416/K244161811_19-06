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

    // Lấy danh sách các phần tử <CD> từ XML DOM
    var danhSachCD = xmlDoc.documentElement.getElementsByTagName("CD");

    // Xóa dữ liệu cũ
    cdTableBody.innerHTML = "";

    // Duyệt từng CD và tạo hàng bằng DOM
    for (var i = 0; i < danhSachCD.length; i++) {
        var cd = danhSachCD[i];
        var hangMoi = document.createElement("tr");

        var fields = [
            "ARTIST",
            "TITLE",
            "COUNTRY",
            "COMPANY",
            "PRICE",
            "YEAR"
        ];

        for (var j = 0; j < fields.length; j++) {
            var td = document.createElement("td");
            td.textContent = layGiaTri(cd, fields[j]);

            if (fields[j] === "PRICE") {
                td.textContent = "$" + td.textContent;
            }

            hangMoi.appendChild(td);
        }

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