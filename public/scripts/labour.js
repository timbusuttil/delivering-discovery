////////////////////      jquery code      ////////////////////

let contentData;
let bookData;
let nonPosData;
let numStages;

$(document).ready(() => {
  $.getJSON("../assets/data/labour-text.json", function (data) {
    contentData = data;
    numStages = data.stages.length;
    setupPage();
  });

  $(".back").click(() => {
    if (currentStage > 0) {
      if (currentStage == 1 || currentStage == 2) {
        zoomSpd = 0.035;
      } else {
        zoomSpd = 0.075;
      }
      currentStage--;
      labelOpacity = 0;
      selectedCluster = -1;
      setText(contentData.stages[currentStage]);
      updateAllTargets();
      clusterText.style('opacity', '0');
    }
  });

  $(".forward").click(() => {
    if (currentStage < contentData.stages.length-1) {
      if (currentStage == 1 || currentStage == 0) {
        zoomSpd = 0.035;
      } else {
        zoomSpd = 0.075;
      }
      currentStage++;
      labelOpacity = 0;
      selectedCluster = -1;
      setText(contentData.stages[currentStage]);
      updateAllTargets();
      clusterText.style('opacity', '0');
    }
  });
});

function setupPage() {
  // setText(contentData.stages[currentStage]);
}

//////////////////////      p5 code      //////////////////////

let currentStage = 0;
let books = [];
let tooltip;
let displayTooltip = false;
let clusterText;

let labelOpacity = -200;

let selectedCluster = -1;
let hoveredCluster = -1;
let selectedClusterX, selectedClusterY;
let cScale = 1;
let tScale = 1.5;
let cTranslate;
let tTranslate;
let zoomSpd = 0.075;

let clusterDeselectX = 800;
let clusterDeselectY = 100;
let deselectOpacity = 0;
let clusterOpacity = 0;

let canvasScale = 1;
let smallestDim = 1000;

let windowHasFocus = true;

let labelFont;

function preload() {
  bookData = loadJSON("../assets/data/dummy.json");
  nonPosData = loadJSON("../assets/data/nonPosData_jul.json");
  p0Data = loadJSON("../assets/data/p0_scaled_jul_new.json");
  p1Data = loadJSON("../assets/data/p1_scaled_jul_new.json");
  // p2Data = loadJSON("../assets/data/p2.json");
  p3Data = loadJSON("../assets/data/p3_jul_new.json");
  p5Data = loadJSON("../assets/data/p5_scaled_jul_new.json");
  clusterData = loadJSON("../assets/data/clusterCenters.json")
  labelFont = loadFont("../assets/fonts/RobotoMono-Regular.ttf");
}

function setup() {
  let canv = createCanvas(innerWidth, innerHeight);
  canv.parent("sketch-container");
  setCanvasScale();

  rectMode(CENTER);

  for (let i = 0; i < bookData.books.length; i++) {
    books.push(new Book(i, bookData.books[i].positions));
  }

  tooltip = new Tooltip();

  cTranslate = createVector(500, 500);
  tTranslate = createVector(500, 500);
  setText(contentData.stages[currentStage]);
  updateAllTargets();

  clusterText = select('.cluster-container');

  // bgCol = color(random(255), random(255), random(255));
  // bgCol = color(0, 30, 30);
  // bgCol = color(0);

  textFont(labelFont);
}

function draw() {
  // check focus
  windowHasFocus = document.hasFocus();

  // background(bgCol);
  clear();

  // page crosshairs
  // stroke(0, 255, 0);
  // strokeWeight(1);
  // line(0, height/2, width, height/2);
  // var numCols = 3;
  // for (var col = 0; col < numCols; col++) {
  //   var xpos = map(col, 0, numCols, 0, width);
  //   line(xpos, 0, xpos, height);
  // }

  // sketch crosshairs
  // stroke(255, 0, 0);
  // line(0, smallestDim/2, smallestDim, smallestDim/2);
  // line(smallestDim/2, 0, smallestDim/2, smallestDim);
  // rectMode(CORNER);
  // noFill();
  // rect(0, 0, smallestDim, smallestDim);
  // rectMode(CENTER);

  // drawBackgroundGrid();

  // zooming and pan
  cScale = lerp(cScale, tScale, zoomSpd);
  cTranslate.x = lerp(cTranslate.x, tTranslate.x, zoomSpd);
  cTranslate.y = lerp(cTranslate.y, tTranslate.y, zoomSpd);

  push();
  translate(map(cTranslate.x, 0, 1000, smallestDim*cScale/2, -smallestDim*cScale/2), map(cTranslate.y, 0, 1000, smallestDim*cScale/2, -smallestDim*cScale/2));
  translate(-(smallestDim/2)*(cScale-1), -(smallestDim/2)*(cScale-1));
  translate(width*0.333-smallestDim/2, height*0.48-smallestDim/2);
  // translate(width*0.333-smallestDim/2, height/2-smallestDim/2);

  for (let i = 0; i < books.length; i++) {
    books[i].run();
  }

  tooltip.run();
  pop();

  // clusters and labels
  drawLabels();
  drawStageMarkers();
  if (currentStage == 1 || currentStage == 2 || currentStage == 3) {
    // drawClusterDeselect();
    if (windowHasFocus) clusterHover();
  }
}

function mousePressed() {
  if ([1, 2, 3].includes(currentStage)) {
    clusterSelect();
  }
  updateAllTargets();
  stageSelect();
}
