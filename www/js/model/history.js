//TODO: test
define(['database'], (database) => {
  var _items = [];

  var add = function (name) {
    var item = findByName(name);
    if (item) {
      return;
    }
    item = {name};
    database.addHistory(item, (id) => {
      item.id = id;
      _items.push(item);
    });
  };

  function findByName(name){
    for(var i = 0; i < _items.length; i++) {
      if (_items[i].name == name) {
        return _items[i];
      }
    }
    return null;
  }

  var update = function (item) {
    var existedItem = findByName(item.name);
    existedItem.name = item.name;
    database.updateHistory(existedItem);
  };

  var remove = function(item) {
    _items.splice(_items.indexOf(item),1);
    database.removeHistory(item.id);
  }

  var load = function() {
    database.getHistories(function(items) {
      _items.splice(0, _items.length);
      items.forEach(i => {
        _items.push(i);
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