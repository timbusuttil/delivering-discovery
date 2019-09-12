function setCanvasScale() {
  if (innerWidth > innerHeight) {
    smallestDim = innerHeight;
  } else {
    smallestDim = innerWidth;
  }
  canvasScale = smallestDim/1000;
}

function stc(coord) {
  return map(coord, 0, 1000, 0, smallestDim);
}

function zstc(coord, XorY) {
  if (XorY === 'x') {
    return map(coord, -1000, 1000, -smallestDim*cScale, smallestDim*cScale) + map(cTranslate.x, 0, 1000, smallestDim*cScale/2, -smallestDim*cScale/2) - (smallestDim/2)*(cScale-1)
  } else {
    return map(coord, -1000, 1000, -smallestDim*cScale, smallestDim*cScale) + map(cTranslate.y, 0, 1000, smallestDim*cScale/2, -smallestDim*cScale/2) - (smallestDim/2)*(cScale-1)
  }
}
