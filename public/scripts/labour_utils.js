function setCanvasScale() {
  if (innerWidth*0.666 > innerHeight*0.9) {
    smallestDim = innerHeight*0.9;
  } else {
    smallestDim = innerWidth*0.666;
  }
  canvasScale = smallestDim/1000;
}

function stc(coord) {
  return map(coord, 0, 1000, 0, smallestDim);
}

function zstc(coord, XorY) {
  if (XorY === 'x') {
    return map(coord, -1000, 1000, -smallestDim*cScale, smallestDim*cScale) + map(cTranslate.x, 0, 1000, smallestDim*cScale/2, -smallestDim*cScale/2) - (smallestDim/2)*(cScale-1) + width*0.333-smallestDim/2
  } else {
    return map(coord, -1000, 1000, -smallestDim*cScale, smallestDim*cScale) + map(cTranslate.y, 0, 1000, smallestDim*cScale/2, -smallestDim*cScale/2) - (smallestDim/2)*(cScale-1) + height*0.48-smallestDim/2
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  setCanvasScale();
}

function setText(stage) {
  $(".body-copy").html(stage.content);
  $(".header").text(stage.header);
  tScale = stage.zoom;
  labelOpacity = -200;
  tTranslate.x = 500;
  tTranslate.y = 500;
  selectedCluster = -1;
}

function updateAllTargets() {
  for (let i = 0; i < books.length; i++) {
    books[i].updateTargets();
  }
}

function lazyLerp(current, target, speed, precision) {
  if (nf(current, 0, precision) != nf(target, 0, precision)) {
    return lerp(current, target, speed);
  } else {
    return current;
  }
}

function drawStageMarkers() {
  for (var i = 0; i < numStages; i++) {
    let size = 5;
    if (i == currentStage) {
      size = 10;
      fill(255, 217, 56);
    } else {
      fill(255);
    }
    ellipse(map(i, 0, numStages-1, width*0.3, width*0.7), height-50, size, size);

    textAlign(CENTER, CENTER);
    textSize(12);
    fill(150);
    text(contentData.stages[i].subtitle, map(i, 0, contentData.stages.length-1, width*0.3, width*0.7), height-30);
  }
}

function stageSelect() {
  for (var i = 0; i < numStages; i++) {
    if (dist(map(i, 0, numStages-1, width*0.3, width*0.7), height-40, mouseX, mouseY) < 30) {
      if (i == 1) {
        zoomSpd = 0.035;
      } else {
        zoomSpd = 0.075;
      }
      currentStage = i;
      labelOpacity = 0;
      selectedCluster = -1;
      setText(contentData.stages[currentStage]);
      updateAllTargets();
      clusterText.style('opacity', '0');
    }
  }
}

function drawBackgroundGrid() {
  stroke(255, 30);
  strokeWeight(1);
  noFill();
  var numLinesX = 110;
  for (var x = 0; x < numLinesX; x++) {
    let xpos = zstc(map(x, 0, numLinesX, -3000, 10000), 'x');
    line(xpos, 0, xpos, height);
  }
  var numLinesY = 48;
  for (var y = 0; y < numLinesY; y++) {
    let ypos = zstc(map(y, 0, numLinesY, -2200, 3500), 'y');
    line(0, ypos, width, ypos);
  }
}
