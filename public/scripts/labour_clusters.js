function clusterSelect() {
  let selectedSomething = false;
  for (i = 0; i < clusterData.stages[currentStage].length; i++) {
    if (dist(mouseX, mouseY, zstc(clusterData.stages[currentStage][i].x, 'x'), zstc(clusterData.stages[currentStage][i].y, 'y')) < clusterData.stages[currentStage][i].d*canvasScale/2*cScale) {
      selectedCluster = i;
      tTranslate.set(clusterData.stages[currentStage][selectedCluster].x, clusterData.stages[currentStage][selectedCluster].y);
      tScale = 2.5;
      selectedSomething = true;
      clusterText.style('opacity', '1');
      setClusterText(i);
    }
  }
  if (selectedSomething == false) {
    deselectClusters();
    clusterText.style('opacity', '0');
    setClusterText(-1);
  }
}

function clusterHover() {
  let hoveredSomething = false;
  for (i = 0; i < clusterData.stages[currentStage].length; i++) {
    if (dist(mouseX, mouseY, zstc(clusterData.stages[currentStage][i].x, 'x'), zstc(clusterData.stages[currentStage][i].y, 'y')) < clusterData.stages[currentStage][i].d*canvasScale/2*cScale && selectedCluster != i) {
      hoveredCluster = i;
      if (clusterOpacity < 50) clusterOpacity += 3;
      hoveredSomething = true;
      // noStroke();
      // fill(255, clusterOpacity);
      // ellipse(zstc(clusterData.stages[currentStage][i].x, 'x'), zstc(clusterData.stages[currentStage][i].y, 'y'), (clusterData.stages[currentStage][i].d+10)*canvasScale*cScale);
    }
  }
  if (!hoveredSomething) {
    hoveredCluster = -1;
    clusterOpacity = 0;
  }
}

function drawClusterDeselect() {
  if (selectedCluster == -1 && deselectOpacity > 0) {
    deselectOpacity -= 5;
  } else if (selectedCluster != -1 && deselectOpacity < 255) {
    deselectOpacity += 5;
  }

  stroke(150, deselectOpacity);
  strokeWeight(2);
  line(clusterDeselectX-8, clusterDeselectY-8, clusterDeselectX+8, clusterDeselectY+8);
  line(clusterDeselectX-8, clusterDeselectY+8, clusterDeselectX+8, clusterDeselectY-8);
}

function deselectClusters() {
  selectedCluster = -1;
  tScale = contentData.stages[currentStage].zoom;
  tTranslate.set(500, 500);
}

function setClusterText(cluster) {
  if (cluster != -1) {
    let currentLabel = contentData.stages[currentStage].labels[cluster];
    $(".cluster-header").text(currentLabel.name);
    $(".cluster-copy").html(currentLabel.content);
    if (currentStage == 1) {
      $(".cluster-details").html(nfc(currentLabel.numBooks) + ' books (' + currentLabel.percent + ')');
    } else if (currentStage == 2) {
      $(".cluster-details").html(nfc(currentLabel.numBooks) + ' books, ' + nfc(currentLabel.numFiles) + ' files (' + currentLabel.percent + ')<br>'+ digitisationTime(currentLabel.numFiles));
    } else if (currentStage == 3) {
      $(".cluster-details").html(nfc(currentLabel.numBooks) + ' books (' + currentLabel.percent + ')');
    }
  }
}

function drawLabels() {
  noStroke();
  if (currentStage == 1 || currentStage == 2 || currentStage == 3) {
    if (selectedCluster == -1) {
      if (labelOpacity < 255) labelOpacity += 2;

      fill(150, constrain(labelOpacity, 0, 255));
      fill(150, labelOpacity);
      textAlign(CENTER, CENTER);
      textSize(12);
      for (var i = 0; i < contentData.stages[currentStage].labels.length; i++) {
        let currentLabel = contentData.stages[currentStage].labels[i]
        if (currentStage == 1 && i != 0) {
          text(currentLabel.name.substring(0, 3), zstc(currentLabel.x, 'x'), zstc(currentLabel.y, 'y'));
        } else {
          text(currentLabel.name, zstc(currentLabel.x, 'x'), zstc(currentLabel.y, 'y'));
        }
        // noStroke();
        // fill(255, 100);
        // ellipse(zstc(clusterData.stages[currentStage][i].x, 'x'), zstc(clusterData.stages[currentStage][i].y, 'y'), (clusterData.stages[currentStage][i].d+10)*canvasScale*cScale);
      }
    } else {
      labelOpacity = -200;
      let currentLabel = contentData.stages[currentStage].labels[selectedCluster]
      // fill(150, deselectOpacity);
      fill(150, 100);
      textAlign(CENTER, CENTER);
      textSize(10);
      // if ([2, 3].includes(currentStage)) {
      //   text(String(currentLabel.numBooks) + ' books, ' + String(currentLabel.numFiles) + ' files (' + currentLabel.percent + ')', height/2, height*0.9);
      //   text(digitisationTime(currentLabel.numFiles), height/2, height*0.9+12);
      // } else if (currentStage == 3) {
      //   text(String(currentLabel.numBooks) + ' books (' + currentLabel.percent + ')', height/2, height*0.9);
      // }
    }
  }
}
