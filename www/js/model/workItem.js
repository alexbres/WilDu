define(['database'], (database) => {
  var _items = [];

  var add = function (item) {
    database.addTask(item, (id) => {
      item.id = id;
      _items.push(item);
    });
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
    remove: remove,
    load: load
  }
});