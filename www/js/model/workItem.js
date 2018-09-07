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
  }

  //TODO: test it
  return {
    items: _items,
    add: add,
    remove: remove
  }
});