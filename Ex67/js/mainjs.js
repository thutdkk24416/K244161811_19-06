function load_students_from_xml(dataset, student_infor)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", dataset, true);
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
            render_xml2html(xmlDoc, student_infor);
        }
    };
    xhr.send();
}

function render_xml2html(xmlDoc, student_infor)
{
    var student_tags = xmlDoc.getElementsByTagName("student");
    for (var i = 0; i < student_tags.length; i++)
    {
        var student_tag = student_tags[i];
        var id_tag = student_tag.getElementsByTagName("id")[0];
        var name_tag = student_tag.getElementsByTagName("name")[0];
        var bday_tag = student_tag.getElementsByTagName("birthday")[0];
        var gender_tag = student_tag.getElementsByTagName("gender")[0];

        var student_id = id_tag.textContent.trim();
        var student_name = name_tag.textContent.trim();
        var student_birthday = bday_tag.textContent.trim();
        var student_gender = gender_tag.textContent.trim();

        var tr = document.createElement("tr");
        var td_id = document.createElement("td");
        var td_name = document.createElement("td");
        var td_birthday = document.createElement("td");
        var td_gender = document.createElement("td");

        td_id.innerHTML = student_id;
        td_name.innerHTML = student_name;
        td_birthday.innerHTML = student_birthday;
        td_gender.innerHTML = student_gender;

        tr.appendChild(td_id);
        tr.appendChild(td_name);
        tr.appendChild(td_birthday);
        tr.appendChild(td_gender);
        student_infor.appendChild(tr);
    }
}

