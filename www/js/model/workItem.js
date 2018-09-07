define(['database'], (database) => {
  var _items = [];

  var add = function (item) {
    database.addTask(item, (id) => {
      item.id = id;
      _items.push(item);
    });
  }

  return {
    items: _items,
    add: add
  }
});