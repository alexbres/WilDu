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

function initWorksetEdit() {
  var addWorkItem = new Vue({
    el: '#addWorkItem',
    data: {
      name: '123'
    },
    methods: {
      add: function () {
        console.log(this.name);
      }
    }
  });
}