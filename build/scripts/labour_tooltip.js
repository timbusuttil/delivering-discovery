class Tooltip {
  constructor() {
    this.tt = select('.tooltip-div');
    this.digiID = select('.digitalID');
    this.title = select('.title');
    this.author = select('.author');
    this.info = select('.info');

    this.xpos = 0;
    this.ypos = 0;
    this.infoContent = ''
  }

  setData(id, x, y) {
    this.xpos = x+20;
    this.ypos = y-20;

    if (currentStage == 0) {
      this.infoContent = "";
    } else if (currentStage == 1) {
      if (nonPosData.books[id].captureDateString == "") {
        this.infoContent = 'No digitisation date data'
      } else {
        this.infoContent = 'Digitised on ' + nonPosData.books[id].captureDateString;
      }
    } else if (currentStage == 2) {
      let tfc = nonPosData.books[id].totalFileCount;
      this.infoContent = String(tfc) + ' pages; ' + digitisationTime(tfc);
    } else if (currentStage == 3) {
      if (nonPosData.books[id].contractorNote == "") {
        this.infoContent = "No contractor note"
      } else {
        this.infoContent = nonPosData.books[id].contractorNote;
      }
    }

    this.tt.position(this.xpos, this.ypos);
    // this.digiID.html(nonPosData.books[id].digitalID);
    this.title.html(nonPosData.books[id].title.split('/').shift());
    this.author.html(nonPosData.books[id].author);
    if (currentStage == 0) {
      // this.info.style("display: none;");
    } else {
      // this.info.style("display: contents;");
      this.info.html(this.infoContent);
    }
  }

  // methods
  run() {
    if (displayTooltip) {
      this.tt.style('opacity', '1');
    } else {
      this.tt.style('opacity', '0');
      // this.tt.position(0, 0);
    }
    displayTooltip = false;
  }
}

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

function digitisationTime(tfc) {
  let totalMinutes = tfc * 0.175;
  let hours = (totalMinutes - totalMinutes%60)/60;
  let minutes = totalMinutes%60
  let timeString = '';
  if (hours == 0 && minutes == 0) {
    timeString += 'no time data'
  } else {
    timeString += 'approx '
  }
  if (hours != 0) {
    if (hours != 1) {
      timeString += String(hours) + ' hours';
    } else {
      timeString += String(hours) + ' hour';
    }
    if (minutes != 0) {
      timeString += ', ';
    }
  }
  if (minutes != 0) {
    if (minutes != 1) {
      timeString += String(precisionRound(minutes, 0)) + ' minutes';
    } else {
      timeString += String(precisionRound(minutes, 0)) + ' minute';
    }
  }
  return timeString;
}
