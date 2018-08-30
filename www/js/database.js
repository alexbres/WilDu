define(()=>{

  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  if (!window.indexedDB) {
    window.alert('Your browser don\'t support a stable version of IndexedDB.');
  }

  const dbName = "Task";

  var request = indexedDB.open(dbName);
  var db;

  request.onerror = function(event) {
    alert("Why didn't you allou to use IndexedDB?");
  };

  request.onsuccess = function(event) {
    db = event.target.result;
  };

  request.onupgradeneeded = function(event) {
    var db = event.target.result;
  
    var objectStore = db.createObjectStore("task", { keyPath: "id", autoIncrement:true });
  
    objectStore.createIndex("name", "name", { unique: false });
    };

  function addTask(task, cb) {
    var transaction = db.transaction(["task"], "readwrite");

    transaction.oncomplete = function (event) {
      console.log("transaction done!");
    };
  
    transaction.onerror = function (event) {
      console.log('transaction error');
    };
  
    var objectStore = transaction.objectStore("task");
    var request = objectStore.add(task);
    request.onsuccess = function (event) {
      console.log('data was added: ' + event.target.result);
      if (cb) {
        cb(event.target.result);
      }
    }
  }

  function getTasks(cb){
    var tasks = new Array();
    var objectStore = db.transaction("task").objectStore("task");

    objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        tasks.push(cursor.value);
        console.log("Name for id " + cursor.key + " is " + cursor.value.name);
        cursor.continue();
      }
      else {
        cb(tasks);
        console.log("No more entries!");
      }
    };
  }

  function removeTask(id){
    var request = db.transaction(["task"], "readwrite")
      .objectStore("task")
      .delete(id);
    request.onsuccess = function (event) {
      console.log('deleted: ' + id);
    };
  }

  return {
    addTask: addTask,
    getTasks: getTasks,
    removeTask: removeTask,
  }
});