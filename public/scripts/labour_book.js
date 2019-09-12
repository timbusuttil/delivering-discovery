// Book class data
class Book {
  constructor(bookID, posArray) {
    this.id = bookID;
    this.positions = [];
    for (let i = 0; i < posArray.length; i++) {
      if (i == 0) {
        this.cv = createVector(p0Data.books[this.id].p0[0], p0Data.books[this.id].p0[1]);
      } else if (i == 1) {
        this.cv = createVector(p1Data.books[this.id].p1[0], p1Data.books[this.id].p1[1]);
      } else if (i == 2) {
        this.cv = createVector(p3Data.books[this.id].p3[0], p3Data.books[this.id].p3[1]);
      } else if (i == 3) {
        this.cv = createVector(p5Data.books[this.id].p5[0], p5Data.books[this.id].p5[1]);
      } else {
        // this.cv = createVector(posArray[i][0], posArray[i][1]);
        // this.cv = createVector(p0Data.books[this.id].p0[0], p0Data.books[this.id].p0[1]);
      }
      this.positions.push(this.cv);
    }
    // position
    this.cpos = this.positions[0].copy();
    this.tpos = this.cpos.copy();
    this.lerpSpd = random(0.02, 0.07);
    this.hoverMod = createVector(0, 0);
    this.tposHov = this.cpos.copy();
    // size
    this.initSize = 4;
    this.scaledSize = p3Data.books[this.id].size;
    this.size = 0;
    this.tsize = 0;
    this.sizeHoverMod = 0;
    this.width = 0;
    this.height = 0;
    // colour
    if (this.scaledSize <= 0) {
      this.tfcCol = color(255, 0, 0);
    } else {
      this.tfcCol = color(255);
    }

    // let hue = int(random(40, 50));
    // let sat = int(random(5, 30));
    // let bri = int(random(85, 100));
    // this.normalCol = color('hsb(' + hue + ', ' + sat + '%, ' + bri + '%)');

    this.normalCol = color(255);
    this.hoverCol = color(255, 217, 56);
    this.currentCol = this.normalCol;

    // clusters
    this.tempCluster = int(random(5));
    // this.clusters = [0, nonPosData.books[this.id].captureMonth, p3Data.books[this.id].operatorID, nonPosData.books[this.id].noteCategoryNum.split(',').shift()];
    this.clusters = [0, nonPosData.books[this.id].captureMonth, p3Data.books[this.id].operatorID, nonPosData.books[this.id].noteCategoryNum];
  }

  run() {
    this.position();
    if (windowHasFocus) {
      if (currentStage != 2 && currentStage != 3) {
        this.displayHover();
      } else if (selectedCluster != -1) {
        this.displayHover();
      }
    }
    this.display();
  }

  updateTargets() {
    // position
    if (currentStage <= this.positions.length) {
      this.tpos = this.positions[currentStage];
    }
  }

  position() {
    // position
    if (hoveredCluster == this.clusters[currentStage]) {
      this.hoverMod.set(0, -20);
      this.sizeHoverMod = smallestDim*0.004*cScale;
    } else {
      this.hoverMod.set(0, 0);
      this.sizeHoverMod = 0;
    }
    this.tposHov = p5.Vector.add(this.tpos, this.hoverMod);

    if (nf(this.cpos.y, 0, 1) != nf(this.tposHov.y, 0, 2) &&
        nf(this.cpos.x, 0, 1) != nf(this.tposHov.x, 0, 2)) {
      this.cpos.lerp(this.tposHov, this.lerpSpd);
    }

    // size
    if (selectedCluster == -1 || selectedCluster == this.clusters[currentStage]) {
      if (this.scaledSize <= 0) {
        this.tsize = this.initSize*canvasScale*cScale;
      } else {
        this.tsize = this.scaledSize*canvasScale*cScale;
      }
    } else {
      this.tsize = 2*canvasScale;
    }

    // size
    this.size = lazyLerp(this.size, this.tsize+this.sizeHoverMod, this.lerpSpd, 1);
    this.width = this.size * 0.8;
    this.height = this.size * 1;

    // colour
    if ((currentStage == 1 || currentStage == 2 || currentStage == 3) && this.scaledSize <= 0) {
      stroke(this.tfcCol);
      this.currentCol = color(0, 0, 0, 0);
    } else {
      noStroke();
      this.currentCol = this.normalCol;
    }
  }

  display() {
    fill(this.currentCol);
    strokeWeight(1);
    rect(map(this.cpos.x, -1000, 1000, -smallestDim*cScale, smallestDim*cScale), map(this.cpos.y, -1000, 1000, -smallestDim*cScale, smallestDim*cScale), this.width, this.height);
  }

  hoverCheck() {
    if (mouseX > zstc(this.cpos.x, 'x') - this.width/2 &&
        mouseX < zstc(this.cpos.x, 'x') + this.width/2 &&
        mouseY > zstc(this.cpos.y, 'y') - this.height/2 &&
        mouseY < zstc(this.cpos.y, 'y') + this.height/2
       ) {
      return true;
    } else {
      return false;
    }
  }

  displayHover() {
    if ((selectedCluster == -1 && currentStage == 0) || selectedCluster == this.clusters[currentStage]) {
      if (this.hoverCheck()) {
        tooltip.setData(this.id, zstc(this.cpos.x, 'x'), zstc(this.cpos.y, 'y'));
        this.currentCol = this.hoverCol;
        displayTooltip = true;
      }
    }
  }
}
