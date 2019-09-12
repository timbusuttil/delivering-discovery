let diagramWidth;
let diagramHeight;
let diagramStartX;
let diagramStartY;
let diagramZoom = 0.25;
let zoomMin = 0.15;
let zoomMax = 1;
let zoomSpd = 0.1;
let maxXpos;
let minXpos;
let maxYpos;
let minYpos;

let dragMargin = 500;

let cDiagramX;
let cDiagramY;
let tDiagramX;
let tDiagramY;
let diagramLS = 0.05;
let wholeDiagram;
let diagramSections;

let diagramData;

let selectedSection = 3;

let fadeSpeed = 0.025;
let lerpSpeed = 0.05;
let diagramSectionOpacitiesCurrent = [0, 0, 0, 0, 0, 0, 0];
let diagramSectionOpacitiesTarget = [1, 0, 0, 0, 0, 0, 0];

function loadImageAssets() {
  diagramData = loadJSON("../assets/data/diagram-data.json");

  wholeDiagram = loadImage("../assets/images/original.png");
  // diagramSections = [
  //   loadImage("../assets/images/cropped/document_page.png"),
  //   loadImage("../assets/images/cropped/document_page_notes.png"),
  //   loadImage("../assets/images/cropped/file_structure.png"),
  //   loadImage("../assets/images/cropped/embedded_metadata.png"),
  //   loadImage("../assets/images/cropped/checksum.png"),
  //   loadImage("../assets/images/cropped/reference_scans.png"),
  //   loadImage("../assets/images/cropped/external_metadata.png"),
  // ]
}

function drawDiagram() {
  cDiagramX = lazyLerp(cDiagramX, tDiagramX, diagramLS, 1);
  cDiagramY = lazyLerp(cDiagramY, tDiagramY, diagramLS, 1);
  diagramFadesLerp();

  // image(wholeDiagram, cDiagramX, cDiagramY, diagramWidth, diagramHeight);

  // stroke(255, 0, 0);
  // line(0, height/2, width, height/2);
  // line(width*0.333, 0, width*0.333, height);
  // noStroke();

  for (let i = 0; i < diagramData.diagramSections.length; i++) {
    // noStroke();
    // fill(255, 100);
    // ellipse(cDiagramX + (diagramData.diagramSections[i].click.x) * diagramZoom, cDiagramY + (diagramData.diagramSections[i].click.y) * diagramZoom, 20, 20);
    // rect(cDiagramX + (diagramData.diagramSections[i].click.x) * diagramZoom, cDiagramY + (diagramData.diagramSections[i].click.y) * diagramZoom, diagramData.diagramSections[i].click.w * diagramZoom, diagramData.diagramSections[i].click.h * diagramZoom);

    // image(diagramSections[i], cDiagramX + (diagramData.diagramSections[i].x * diagramZoom), cDiagramY + (diagramData.diagramSections[i].y * diagramZoom), diagramSections[i].width * diagramZoom, diagramSections[i].height * diagramZoom);
    $(`.diagramSection${i}`).css("opacity", diagramSectionOpacitiesCurrent[i]);
    $(`.diagramSection${i}`).css("left", cDiagramX + (diagramData.diagramSections[i].x - diagramData.diagramSections[i].w/2) * diagramZoom);
    $(`.diagramSection${i}`).css("top", cDiagramY + (diagramData.diagramSections[i].y - diagramData.diagramSections[i].h/2) * diagramZoom);
    $(`.diagramSection${i}`).css("width", diagramData.diagramSections[i].w * diagramZoom);
    $(`.diagramSection${i}`).css("height", diagramData.diagramSections[i].h * diagramZoom);
  }
}

function setDiagramOpacities(cs, hs) {
  for (let i = 0; i < diagramSectionOpacitiesCurrent.length; i++) {
    if (cs == contentData.stages.length-1) {
      diagramSectionOpacitiesTarget[i] = 1;
    } else {
      if (i == cs) {
        diagramSectionOpacitiesTarget[i] = 1;
      } else if (i <= hs) {
        diagramSectionOpacitiesTarget[i] = 0.3;
      }
    }
  }
}

function diagramFadesLerp() {
  for (let i = 0; i < diagramSectionOpacitiesCurrent.length; i++) {
    diagramSectionOpacitiesCurrent[i] = lazyLerp(diagramSectionOpacitiesCurrent[i], diagramSectionOpacitiesTarget[i], lerpSpeed, 1);
  }
}

function mouseDragged() {
  getDiagramPos();
  return false;
}

function mouseWheel() {
  diagramZoom =  constrain(diagramZoom * map(event.delta, -200, 200, 1+zoomSpd, 1-zoomSpd), zoomMin, zoomMax);
  diagramWidth = wholeDiagram.width * diagramZoom;
  diagramHeight = wholeDiagram.height * diagramZoom;
  calculateDragMinMax();
  getDiagramPos();
  return false;
}

function calculateDragMinMax() {
  maxXpos = dragMargin + diagramWidth/2;
  minXpos = (width - dragMargin) - diagramWidth/2;
  maxYpos = dragMargin + diagramHeight/2;
  minYpos = (height - dragMargin) - diagramHeight/2;
}

function getDiagramPos(direct) {
  // if (diagramWidth < width) {
  //   tDiagramX = width/2;
  // } else {
  //   tDiagramX = constrain(tDiagramX + mouseX - pmouseX, minXpos, maxXpos);
  // }
  // if (diagramHeight < height) {
  //   tDiagramY = height/2;
  // } else {
  //   tDiagramY = constrain(tDiagramY + mouseY - pmouseY, minYpos, maxYpos);
  // }

  tDiagramX = constrain(tDiagramX + mouseX - pmouseX, minXpos, maxXpos);
  tDiagramY = constrain(tDiagramY + mouseY - pmouseY, minYpos, maxYpos);
}
