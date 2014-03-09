/* JS */

function sumPoints(lists) {
  for (var j = 0; j < lists.length-1; j++) {
    var cards = lists[j].querySelectorAll(".list-card-title");
    var list_title = lists[j].querySelector(".list-header-name");

    var sum = undefined;
    for (var i = 0; i < cards.length; i++) {
      var found = cards[i].textContent.match(/^#[0-9]+ \[([0-9]+\.?5?)\]/);
      if (found) {
        if (sum === undefined)
          sum = 0;
        sum += parseFloat(found[1]);
      }
    }

    var display = lists[j].querySelector(".agile-sum");
    if (display === null) {
      display = document.createElement("span");
      display.className = "agile-sum";

      var header = lists[j].querySelector(".list-header");
      header.insertBefore(display, list_title);
    }

    if (sum !== undefined) {
      display.textContent = "[" + sum + "]";
    }
  }
}


window.setInterval(function() {
  sumPoints(document.querySelectorAll(".list"));
}, 500);
