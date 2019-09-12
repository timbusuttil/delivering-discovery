function windowResized() {
  resizeCanvas(innerWidth, innerHeight);

  calculateDragMinMax();
  getDiagramPos();

  // setCanvasScale();
}

function setCanvasScale() {
  if (innerWidth*0.666 > innerHeight*0.9) {
    smallestDim = innerHeight*0.9;
  } else {
    smallestDim = innerWidth*0.666;
  }
  canvasScale = smallestDim/1000;
}

function setText(stage) {
  $(".body-copy").html(stage.content);
  $(".header").text(stage.header);
  // tScale = stage.zoom;
  tDiagramX = width*0.333 - (diagramData.diagramSections[currentStage].x + diagramData.diagramSections[currentStage].xOffset) * diagramZoom;
  tDiagramY = height/2 - (diagramData.diagramSections[currentStage].y + diagramData.diagramSections[currentStage].yOffset) * diagramZoom;
}

function drawStageMarkers() {
  for (var i = 0; i < contentData.stages.length; i++) {
    let size = 5;
    if (i == currentStage) {
      size = 10;
      fill(255, 217, 56);
    } else {
      fill(255);
    }

    ellipse(map(i, 0, contentData.stages.length-1, width*0.2, width*0.8), height-65, size, size);

    textAlign(CENTER, CENTER);
    textSize(12);
    fill(150);
    text(contentData.stages[i].subtitle, map(i, 0, contentData.stages.length-1, width*0.2, width*0.8)-40, height-55, 90, 50);
  }
}

function stageSelect() {
  for (var i = 0; i < contentData.stages.length; i++) {
    if (dist(map(i, 0, contentData.stages.length-1, width*0.2, width*0.8), height-40, mouseX, mouseY) < 30) {
      currentStage = i;
      setText(contentData.stages[currentStage]);
      if (currentStage > highestStage) highestStage = currentStage;
      setDiagramOpacities(currentStage, highestStage);
    }
  }
}

function diagramSectionSelect() {
  for (var i = 0; i <= highestStage; i++) {
    if (mouseX > cDiagramX + (diagramData.diagramSections[i].click.x - diagramData.diagramSections[i].click.w / 2) * diagramZoom &&
        mouseX < cDiagramX + (diagramData.diagramSections[i].click.x + diagramData.diagramSections[i].click.w / 2) * diagramZoom &&
        mouseY > cDiagramY + (diagramData.diagramSections[i].click.y - diagramData.diagramSections[i].click.h / 2) * diagramZoom &&
        mouseY < cDiagramY + (diagramData.diagramSections[i].click.y + diagramData.diagramSections[i].click.h / 2) * diagramZoom &&
        mouseY < height - 100) {
      currentStage = i;
      setText(contentData.stages[currentStage]);
      setDiagramOpacities(currentStage, highestStage);
    }
  }
}

function lazyLerp(current, target, speed, precision) {
  if (nf(current, 0, precision) != nf(target, 0, precision)) {
    return lerp(current, target, speed);
  } else {
    return current;
  }
}
