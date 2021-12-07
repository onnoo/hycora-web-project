window.onload = function() {
  updateTime();
}

function updateTime() {
  var now = moment();
  var end = moment('2021-12-08 23:59:59');
  var diff = end.diff(now);
  
  if (diff < 0) {
    document.getElementById('time').innerText = '';
    document.getElementById('play').style.display = "none";
    clearInterval(interval);
  } else {
    var diffTime = {
      day: moment.duration(end.diff(now)).days(),
      hour: moment.duration(end.diff(now)).hours(),
      minute: moment.duration(end.diff(now)).minutes(),
      second: moment.duration(end.diff(now)).seconds(),
    }
    var formed = diffTime.day + '일 ' + diffTime.hour + '시간 ' + diffTime.minute + '분 ' + diffTime.second + '초';
    document.getElementById('time').innerText = '남은시간 : ' + formed;
  }
}

interval = setInterval(updateTime, 1000);
