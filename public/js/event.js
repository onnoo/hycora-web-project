window.onload = function() {
  updateTime();
}

function updateTime() {
  var now = moment();
  var end = moment('2020-12-09 23:59:59');
  var diff = end.subtract(now);
  document.getElementById('time').innerText = diff.format('DD일 HH:mm:ss');
}

setInterval(updateTime, 1000);
