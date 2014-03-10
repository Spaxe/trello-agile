/**
 * Periodic script to make sure points are up to date.
 * Need more ideas to make Trello better for Agile dev.
 */

;(function AgileTrello(window, document, undefined) {


  function sumPoints (lists) {

    // The last "list" is just "Add a List..." shadow
    for (var j = 0; j < lists.length-1; j++) {
      var list = lists[j];

      var list_title = list.querySelector(".list-header-name");
      var cards = list.querySelectorAll(".list-card-title");
      var sum = undefined;

      for (var i = 0; i < cards.length; i++) {
        var card = cards[i];

        var found = card.textContent.match(/^#[0-9]+ \[([0-9]+\.?[0-9]*)\]/);
        if (found) {
          if (sum === undefined)
            sum = 0;
          sum += parseFloat(found[1]);
        }
      }

      var display = getAgileSumDOM(list);
      var header = list.querySelector(".list-header");
      header.insertBefore(display, list_title);

      if (sum !== undefined) {
        display.textContent = "[" + sum + "]";
      } else {
        display.textContent = "";
      }
    }
  }

  function getAgileSumDOM (parent) {
    var display = parent.querySelector(".agile-sum");
    if (display === null) {
      display = document.createElement("span");
      display.className = "agile-sum";
    }
    return display;
  }

  window.setInterval(function() {
    sumPoints(document.querySelectorAll(".list"));
  }, 500);


}(window, document));
