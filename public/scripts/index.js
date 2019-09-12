let globalData

$(document).ready(function() {
  $.getJSON("../assets/data/anomalies-text.json", function (data) {
    globalData = data;
    setupPage();
  });
});

function setupPage() {
  // console.log(globalData.stages[0].content);
  console.log('u r home');
}

$(window).click(function() {
  console.log("click!!!!");
})
