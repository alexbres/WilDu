define(['routes', 'model/workItem', 'model/history'], function (routes, workItem, history) {
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
    initServiceWorker();
    initWorksetEdit();
  })

  $$('#workItemsList').on('click', function () {
    app.router.navigate('/worksetEdit/');
});

  function initWorksetEdit() {
    workItem.load();
    history.load();

    //TODO: move to a separate module
    //TODO: test, https://ru.vuejs.org/v2/guide/unit-testing.html
    var addWorkItem = new Vue({
      el: '#vAddWorkItem',
      data: {
        name: '',
        id: null
      },
      methods: {
        add: function () {
          if (this.id) {
            workItem.update({ id: this.id, name: this.name });
            this.id = null;
          } else {
            workItem.add({ name: this.name });
            history.add(this.name);
          }
          this.name = '';
        },
        clear: function () {
          if (!this.id) {
            this.name = '';
          }
        }
      }
    });

    var histories = history.items;
    var autocompleteDropdownSimple = app.autocomplete.create({
      inputEl: '#itemName',
      openIn: 'dropdown',
      source: function (query, render) {
        var results = [];
        if (query.length === 0) {
          render(results);
          return;
        }
        // Find matched items
        for (var i = 0; i < histories.length; i++) {
          if (histories[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(histories[i].name);
        }
        // Render items by passing array with result items
        render(results);
      }
    });

    //TODO: move to a separate module
    var workItemList = new Vue({
      el: '#workItemList',
      data: {
        items: workItem.items
      },
      methods: {
        remove: function(item) {
          workItem.remove(item);
        },
        edit: function(item) {
          addWorkItem.id = item.id;
          addWorkItem.name = item.name;
        },
      }
    });
  }

  

  function initServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./service-worker.js')
        .then(function () { console.log('[APP] Service Worker Registered'); });
    }
  }
});