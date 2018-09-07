define(() => {
  var _items = [];
  //var workItem = function(){}
  var add = function (item) {
    _items.push(item);
  }
  return {
    items: _items,
    add: add
  }
});