var DATA = {
  Барнаул: [
    {
      address: "Аметистовая ул, 95А",
      orgname:
        "Алтайская региональная общественная организация по предотвращению насилия «Право на счастье»",
      phone: "8(923)0006778",
    },
    {
      address: "улица Смирнова, 79",
      orgname: 'КГБУСО "Краевой Кризисный Центр для Женщин"',
      phone: "8(923)0006778",
    },
    {
      address: "улица Георгия Исакова, 113-Е",
      orgname: "Алтайский краевой кризисный центр для мужчин",
      phone: "8(923)0006778",
    },
  ],
  Тула: [
    {
      address: "ул. Демонстрации, 11",
      orgname: "ГУСОН Тульской области «Кризисный центр помощи женщинам»",
      phone: "8(4872)564636",
    },
  ],
};

var SELECTED_CITY = undefined;
var SELECTED_ITEM = undefined;

var cities = [
  { name: "Барнаул", value: "Барнаул" },
  { name: "Тула", value: "Тула" },
];

function redrawSelectedCenter(selected) {
  if (DATA[SELECTED_CITY] == undefined) {
    console.error("no", SELECTED_CITY, "in centers list");
    return;
  }

  var centers = DATA[SELECTED_CITY];

  if (selected === undefined) {
    SELECTED_ITEM = Math.floor(Math.random() * centers.length);
  } else {
    SELECTED_ITEM = selected;
  }
  console.log(`${SELECTED_CITY}_${SELECTED_ITEM}`);

  var x = "";
  centers.forEach((element, i) => {
    if (i == SELECTED_ITEM) {
      x += `<div class="link item active"><i class="check icon"></i><b>${element.orgname}</b></div>`;
    } else {
      x += `<div class="link item" onclick="redrawSelectedCenter(${i})">${element.orgname}</div>`;
    }
  });

  $("#centers_list").html(x);

  $("#download_button").attr("href", `./${SELECTED_CITY}_${SELECTED_ITEM}.pdf`);
  $("#download_button").removeClass("disabled");
  $("#centers_list_parent").removeClass("m_hidden");
}

function buildCityList() {
  console.log(`${SELECTED_CITY}_${SELECTED_ITEM}`);

  $("#city_dropdown").dropdown({
    placeholder: "Город",
    values: cities,
    onChange: function (text, value, element) {
      if (value === undefined || value === SELECTED_CITY) return;
      SELECTED_CITY = value;
      console.log(`${SELECTED_CITY}_${SELECTED_ITEM}`);
      redrawSelectedCenter(undefined);
    },
  });
}

function showModalBySelector(selector) {
  $(selector).modal({ inverted: true }).modal("show");
}

function closeModals() {
  $(".ui.modal").modal("hide");
}

function setDownloadsCounter(cnt) {
  var cnt = Math.floor(Math.random() * 2000) + 1;
  var cnt_description = "объявлений";

  if (cnt % 100 >= 10 && cnt % 100 < 20) {
    //
  } else if (cnt % 10 == 1) {
    cnt_description = "объявление";
  } else if (cnt % 10 == 2 || cnt % 10 == 3 || cnt % 10 == 4) {
    cnt_description = "объявления";
  }

  document.getElementById("download_counter_number").innerText = cnt;
  document.getElementById(
    "download_counter_descriptor"
  ).innerText = cnt_description;

}

$(document).ready(function () {
  fetch("http://localhost:8080/cnt").then((res,) => setDownloadsCounter(res.json().cnt));

  buildCityList();
});
