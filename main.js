function getJson(url, b) {
  fetch(url)
    .then(res => res.json())
    .then(out => b(out))
    .catch(err => {
      throw err
    });
}
let a = {};
getJson('https://twofactorauth.org/data.json', b => {
  let data = b;
  for (let i in data) {
    a[i] = {};
    a['' + i]['true'] = 0;
    a['' + i]['false'] = 0;
    for (let j in data[i]) {
      let state = data[i][j]['tfa'];
      a[i][state] = a[i][state] + 1;
    }
  }
  let categories = new Array();
  let yes_data = new Array();
  let no_data = new Array();
  for (k in a) {
    categories.push(k);
    yes_data.push(a[k]['true']);
    no_data.push(a[k]['false']);
  }
  new Chart(document.getElementById("chart"), {
    "type": "bar",
    "data": {
      "labels": categories,
      "datasets": [{
        "label": "Yes",
        "data": yes_data,
        "fill": false,
        "backgroundColor": "#9ce7a1",
        "borderWidth": 1
      }, {
        "label": "No",
        "data": no_data,
        "fill": false,
        "backgroundColor": "#ff9488",
        "borderWidth": 1
      }]
    },
    "options": {
      "responsive": true,
      "scales": {
        "xAxes": [{
          "stacked": true
        }],
        "yAxes": [{
          "stacked": true,
          "ticks": {
            "beginAtZero": true
          }
        }]
      }
    }
  });
});
