define(()=>{

  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  if (!window.indexedDB) {
    window.alert('Your browser don\'t support a stable version of IndexedDB.');
  }

  const DB_NAME = 'Task';
  const DB_VERSION = 2; // Use a long long for this value (don't use a float)
  const DB_STORE_TASK = 'task';
  const DB_STORE_HISTORY = 'history';

  var db;

  var request = indexedDB.open(DB_NAME, DB_VERSION);
  var db;

  request.onerror = function(event) {
    alert("Error in IndexedDB?");
    console.log(error);
  };

  request.onsuccess = function(event) {
    db = event.target.result;
  };

  request.onupgradeneeded = function(event) {
    var db = event.target.result;
  
    //Task
    if (!db.objectStoreNames.contains(DB_STORE_TASK)) {
      var objectStoreTask = db.createObjectStore(DB_STORE_TASK, { keyPath: "id", autoIncrement:true });
      objectStoreTask.createIndex("name", "name", { unique: false });
    }

    //History
    if (!db.objectStoreNames.contains(DB_STORE_HISTORY)) {
      var objectStoreHistory = db.createObjectStore(DB_STORE_HISTORY, { keyPath: "id", autoIncrement:true });
      objectStoreHistory.createIndex("name", "name", { unique: true });
    }

  };

  //Task methods
  function addTask(task, cb) {
    var transaction = db.transaction([DB_STORE_TASK], "readwrite");

    transaction.oncomplete = function (event) {
      console.log("transaction done!");
    };
  
    transaction.onerror = function (event) {
      console.log('transaction error');
    };
  
    var objectStore = transaction.objectStore(DB_STORE_TASK);
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
    var objectStore = db.transaction(DB_STORE_TASK).objectStore(DB_STORE_TASK);

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

  function getTask(id, cb){
    db.transaction(DB_STORE_TASK).objectStore(DB_STORE_TASK).get(id).onsuccess = function(event) {
      if (cb) {
        cb(event.target.result);
      }
    };
  }

  function removeTask(id){
    var request = db.transaction([DB_STORE_TASK], "readwrite")
      .objectStore(DB_STORE_TASK)
      .delete(id);
    request.onsuccess = function (event) {
      console.log('deleted: ' + id);
    };
  }

  function updateTask(task){
    var request = db.transaction([DB_STORE_TASK], "readwrite")
      .objectStore(DB_STORE_TASK)
      .put(task);
    request.onsuccess = function (event) {
      console.log('updated: ' + task.id);
    };
  }

  //History methods
  function addHistory(item, cb) {
    var transaction = db.transaction([DB_STORE_HISTORY], "readwrite");

    transaction.oncomplete = function (event) {
      console.log("transaction done!");
    };
  
    transaction.onerror = function (event) {
      console.log('transaction error');
    };
  
    var objectStore = transaction.objectStore(DB_STORE_HISTORY);
    var request = objectStore.add(item);
    request.onsuccess = function (event) {
      console.log('data was added: ' + event.target.result);
      if (cb) {
        cb(event.target.result);
      }
    }
  }

  function getHistories(cb){
    var items = new Array();
    var objectStore = db.transaction(DB_STORE_HISTORY).objectStore(DB_STORE_HISTORY);

    objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        items.push(cursor.value);
        console.log("Name for id " + cursor.key + " is " + cursor.value.name);
        cursor.continue();
      }
      else {
        cb(items);
        console.log("No more entries!");
      }
    };
  }

  function getHistory(id, cb){
    db.transaction(DB_STORE_HISTORY).objectStore(DB_STORE_HISTORY).get(id).onsuccess = function(event) {
      if (cb) {
        cb(event.target.result);
      }
    };
  }

  function removeHistory(id){
    var request = db.transaction([DB_STORE_HISTORY], "readwrite")
      .objectStore(DB_STORE_HISTORY)
      .delete(id);
    request.onsuccess = function (event) {
      console.log('deleted: ' + id);
    };
  }

  function updateHistory(task){
    var request = db.transaction([DB_STORE_HISTORY], "readwrite")
      .objectStore(DB_STORE_HISTORY)
      .put(task);
    request.onsuccess = function (event) {
      console.log('updated: ' + task.id);
    };
  }

  return {
    addTask: addTask,
    getTasks: getTasks,
    getTask: getTask,
    removeTask: removeTask,
    updateTask: updateTask,
    addHistory: addHistory,
    getHistories: getHistories,
  }
});