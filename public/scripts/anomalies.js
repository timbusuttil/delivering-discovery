let globalData

$(document).ready(function() {
  $.getJSON("../assets/data/anomalies-text.json", function (data) {
    globalData = data;
    setupPage();
  });
});

function setupPage() {
  console.log(globalData.stages[0].content);
}

$(window).click(function() {
  console.log("click!!!!");
})
