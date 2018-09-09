define(['database'], (database) => {
  var _items = [];

  var add = function (item) {
    database.addTask(item, (id) => {
      item.id = id;
      _items.push(item);
    });
  };

  var update = function (item) {
    for(var i = 0; i < _items.length; i++) {
      if (_items[i].id == item.id) {
        _items[i].name = item.name;
        break;
      }
    }
    database.updateTask(item);
  };

  var remove = function(item) {
    _items.splice(_items.indexOf(item),1);
    database.removeTask(item.id);
  }

  var load = function() {
    database.getTasks(function(tasks) {
      _items.splice(0, _items.length);
      tasks.forEach(t => {
        _items.push(t);
      });
    });
  }

  //TODO: test it
  return {
    items: _items,
    add: add,
    update: update,
    remove: remove,
    load: load
  }
});