let contentData

$(document).ready(function() {
  $.getJSON("../assets/data/infrastructure-text.json", function (data) {
    contentData = data;
    setupPage();
  });

  $(".back").click(() => {
    if (currentStage > 0) {
      currentStage--;
      setText(contentData.stages[currentStage]);
      setDiagramOpacities(currentStage, highestStage);
    }
  });

  $(".forward").click(() => {
    if (currentStage < contentData.stages.length-1) {
      currentStage++;
      if (currentStage > highestStage) highestStage = currentStage;
      setText(contentData.stages[currentStage]);
      setDiagramOpacities(currentStage, highestStage);
    }
  });
});

function setupPage() {
  //
}

//////////////////////      p5 code      //////////////////////

let currentStage = 0;
let highestStage = 0;
let labelFont;

function preload() {
  loadImageAssets();

  labelFont = loadFont("../assets/fonts/RobotoMono-Regular.ttf");
}

function setup() {
  let canv = createCanvas(innerWidth, innerHeight);
  canv.parent("sketch-container");

  setText(contentData.stages[currentStage]);

  diagramWidth = wholeDiagram.width*diagramZoom;
  diagramHeight = wholeDiagram.height*diagramZoom;

  calculateDragMinMax();
  getDiagramPos();
  setDiagramOpacities(currentStage, highestStage);

  tDiagramX = width*0.333 - diagramData.diagramSections[currentStage].x*diagramZoom;
  tDiagramY = height/2 - diagramData.diagramSections[currentStage].y*diagramZoom;
  cDiagramX = tDiagramX;
  cDiagramY = tDiagramY;

  imageMode(CENTER);

  textFont(labelFont);
}

function draw() {
  clear();

  drawDiagram();
  drawStageMarkers();
}

function mousePressed() {
  stageSelect();
  diagramSectionSelect();
}
