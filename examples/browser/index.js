var CHOICE_MADE = 'choice_made';

var Menu = {
   sandwitch: { price: 8, printerName: 'SANDWITCH' },
   panini: { price: 7.5, printerName: 'PANINI' },
   coffee: { price: 2, printerName: 'COFFEE' },
   juice: { price: 3, printerName: 'JUICE' }
};

var MealPicker = {
   selection: {},
   cacheDOM: function () {
      this.container = document.getElementById('meal-picker');
      this.submit = this.container.getElementsByTagName('button')[0];
   },
   bindUI: function () {
      var self = this;
      this.submit.addEventListener('click', function (ev) {
         ev.preventDefault();
         self.selection = [
            document.getElementsByName('food')[0].value,
            document.getElementsByName('drink')[0].value,
         ];
         
         Coordinator.broadcast(CHOICE_MADE, self.selection);
      });
   },
   init: function () {
      this.cacheDOM();
      this.bindUI();
   }
};

var Calculator = {
   cacheDOM: function () {
      this.container = document.getElementById('calculator');
      this.elTotal = this.container.querySelector('[data-total]');
   },
   computeTotal: function (order) {
      var total = 0;
      for ( var i = 0; i < order.length; i++ ) {
         total += Menu[order[i]]['price'];
      }
      return total;
   },
   printTotal: function (order) {
      this.elTotal.innerHTML = this.computeTotal(order);
   },
   init: function () {
      this.cacheDOM();
   }
};

var Printer = {
   cacheDOM: function () {
      this.container = document.getElementById('summary');
      this.elSummary = this.container.querySelector('[data-summary]');
   },
   init: function () {
      this.cacheDOM();
   },
   generateSummary: function (order) {
      var html = '=====<br />';
      for ( var i = 0; i < order.length; i++ ) {
         html += '<li>' + Menu[order[i]]['printerName'] + ' $' + Menu[order[i]]['price'];
      }
      html += '<br />=====';
      return html;
   },
   printSummary: function (order) {
      this.elSummary.innerHTML = this.generateSummary(order);
   }
};

MealPicker.init();
Calculator.init();
Printer.init();

Coordinator.subscribe(CHOICE_MADE, Calculator.printTotal, Calculator);
Coordinator.subscribe(CHOICE_MADE, Printer.printSummary, Printer);



