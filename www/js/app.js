define(['routes', 'model/workItem'], function (routes, workItem) {
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

  //TODO: dont use it
  var workItems = workItem.items;

  function initWorksetEdit() {
    workItem.load();

    var addWorkItem = new Vue({
      el: '#vAddWorkItem',
      data: {
        name: ''
      },
      methods: {
        add: function () {
          workItem.add({ name: this.name });
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
        remove: function(item) {
          workItem.remove(item);
        },
      }
    });
  }
});