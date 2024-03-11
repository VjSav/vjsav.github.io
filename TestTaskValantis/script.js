// 
const url = "http://api.valantis.store:40000/"
console.log(url);

let curPage = 1;
let maxPage = 5;
let jsonQueryFiltr = null;
showPage(0);

function clickFiltr(btn) {
    const filtr = document.getElementById("filtr");
    const inputs = filtr.getElementsByTagName("input");
    for (const input of inputs) {
        if (input.value.length != 0)
            setJsonQueryFiltr(input);
    }
    showPage(0);

    function setJsonQueryFiltr(input) {
        let params = new Object();
        let id = input.id;
        if (id == 'price')
            params.price = parseInt(input.value);
        else
            params[id] = input.value;

        let objQuery = new Object();
        objQuery.action = "filter";
        objQuery.params = params;
        jsonQueryFiltr = JSON.stringify(objQuery);
    }
    
}

function clickFiltrOff(btn) {
    const filtr = document.getElementById("filtr");
    const inputs = filtr.getElementsByTagName("input");
    for (const input of inputs) {
        if (input.value.length != 0)
            input.value = "";
    }
    jsonQueryFiltr = null;
    showPage(0);
}


function clickArrow(arrow) {
    if (arrow.id == 'prev')
        if (curPage != 1)
            showPage(-1)
    if (arrow.id == 'next')
        if (curPage != maxPage)
            showPage(+1)
}

function jsonQueryNoFiltr() {
    let params = new Object();
    params.offset = (curPage - 1) * 50;
    params.limit = 50;

    let objQuery = new Object();
    objQuery.action = "get_ids";
    objQuery.params = params;
    let jsonQuery = JSON.stringify(objQuery);
    return jsonQuery;
}

function showPage(vector) {
    curPage += vector;
    iniArrow();

    if (jsonQueryFiltr != null)
        query(jsonQueryFiltr);
    else
        query(jsonQueryNoFiltr());

    function iniArrow() {
        document.getElementById('prev').style.opacity = 1;
        document.getElementById('next').style.opacity = 1;
        if (curPage == 1)
            document.getElementById('prev').style.opacity = 0.3;
        if (curPage == maxPage)
            document.getElementById('next').style.opacity = 0.3;
    }
}

function query(jsonQuery) {
    const options = queryOptions(jsonQuery);
    fetch(url, options)
        .then(response =>
            response.json()
        )
        .then((data) => {
            handler(data, jsonQuery);
        })
        .catch(err =>
            console.log(err)
        );

    function queryOptions(jsonQuery) {
        const pass = 'Valantis';
        const time = new Date().toISOString().slice(0, 10).split('-').join('');
        const pass_time = pass + '_' + time;
        const auth = CryptoJS.MD5(pass_time).toString();

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Auth': auth },
            body: jsonQuery,
        };
        return options;
    }
}

function handler(data, jsonQuery) {
    console.log(data);

    let obj = JSON.parse(jsonQuery);
    if (obj.action == "get_items") {
        out(data);
        return;
    }

    let items = data.result

    let params = new Object();
    params.ids = items;

    let objQuery = new Object();
    objQuery.action = "get_items";
    objQuery.params = params;
    jsonQuery = JSON.stringify(objQuery);

    query(jsonQuery);

    function out(data) {
        const table = document.getElementsByTagName("table")[0];
        table.tBodies[0].remove();
        const tBody = table.createTBody();

        for (var r of data.result) {
            var row = tBody.insertRow();
            (row.insertCell()).innerHTML = r.id;
            (row.insertCell()).innerHTML = r.product;
            (row.insertCell()).innerHTML = r.price;
            (row.insertCell()).innerHTML = r.brand;
        }

        if (data.result.length < 50)
            document.getElementById('next').style.opacity = 0.3;

    }
}
