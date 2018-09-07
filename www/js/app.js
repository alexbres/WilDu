define(['routes', 'database', 'model/workItem'], function (routes, database, workItem) {
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
    database.getTasks(function(tasks) {
      workItems.splice(0, workItems.length);
      tasks.forEach(t => {
        workItems.push(t);
      });
    });

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
          console.log('delete: ' + item.name);
          console.log(this.items.indexOf(item));
          //TODO: splice frm workItems in store
          this.items.splice(this.items.indexOf(item),1);
          //TODO: move calling database to the store
          database.removeTask(item.id);
        },
      }
    });
  }
});