/**
 * Periodic script to make sure points are up to date.
 * Need more ideas to make Trello better for Agile dev.
 */

;(function AgileTrello(window, document, undefined) {

  // Sum and display the total number of complexity points on the list.
  function sumPoints (lists) {

    // The last "list" is just "Add a List..." shadow
    for (var j = 0; j < lists.length-1; j++) {
      var list = lists[j];  // Cache the list

      // Get the list header title and all the cards and their titles
      var list_title = list.querySelector(".list-header-name");
      var cards = list.querySelectorAll(".list-card-title");
      var sum = undefined; // Just in case there are no cards

      // Iterate through all the cards and look for [x] in front of their titles
      // Add up all the points for a list
      for (var i = 0; i < cards.length; i++) {
        var card = cards[i];

        var found = card.textContent.match(/^#[0-9]+ \[([0-9]+\.?[0-9]*)\]/);
        if (found) {
          if (sum === undefined)
            sum = 0;
          sum += parseFloat(found[1]);
        }
      }

      // Get the list header so we can insert stuff like point sums
      var display = getAgileSumDOM(list);
      var header = list.querySelector(".list-header");
      header.insertBefore(display, list_title);

      // If there are no sums, remember to remove the crap.
      if (sum !== undefined) {
        display.textContent = "[" + sum + "]";
      } else {
        display.textContent = "";
      }
    }
  }

  // Acquire or conjure up a DOM element to display the sum
  function getAgileSumDOM (parent) {
    var display = parent.querySelector(".agile-sum");
    if (display === null) {
      display = document.createElement("span");
      display.className = "agile-sum";
    }
    return display;
  }

  // Refresh every .5 seconds.
  window.setInterval(function() {
    sumPoints(document.querySelectorAll(".list"));
  }, 500);

}(window, document));
