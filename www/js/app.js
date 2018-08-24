define(['routes', 'database'], function (routes, database) {
  var $$ = Dom7;
  var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'WilDu',
    // App id
    id: 'com.wildu.app',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    routes: routes,
    // ... other parameters
  });

  var mainView = app.views.create('.view-main');

  $$(document).on('page:init', '.page[data-name="worksetEdit"]', function (e) {
    console.log('worksetEdit init');
    initWorksetEdit();
  })

  var workItems = [];

  function initWorksetEdit() {
    var addWorkItem = new Vue({
      el: '#vAddWorkItem',
      data: {
        name: ''
      },
      methods: {
        add: function () {
          console.log(this.name);
          workItems.push(this.name);
          workItems.forEach(function (w) {
            console.log(w);
          });
          database.addTask({ name: this.name });
        },
        clear: function () {
          this.name = '';
        }
      }
    });

    var workItemList = new Vue({
      el: '#workItemList',
      data: {
        items: workItems
      },
      methods: {
      }
    });
  }
});