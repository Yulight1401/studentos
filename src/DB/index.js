import store from '../store'
import cookie from 'js-cookie'
class MyDB {
  constructor() {
    this.name = 'studentOS'
    this.db = null
    this.open()
    let isInit = cookie.get('isInit') || '0'
    if (isInit === '0') {
      console.log('现在，数据库还未进行初始化设置,即将开始初始化')
      setTimeout(() => {
        this.init()
        store.dispatch('Init')
      }, 1000)
    }
  }
  open() {
    let request
    request = window.indexedDB.open(this.name)
    request.onerror = ev => {
      console.log('数据库打开失败 ' + ev.currentTarget.error.message)
    }
    request.onsuccess = ev => {
      console.log('数据库打开成功')
      this.db = ev.target.result
    }
    request.onupgradeneeded = ev => {
      let db = ev.target.result
      if (!db.objectStoreNames.contains('user')) {
        let store = db.createObjectStore('user', {
          keyPath: 'id'
        })
        store.createIndex('name', 'name', {
          unique: false
        })
        store.createIndex('account', 'account.username', {
          uniquee: true
        })
      }
      if (!db.objectStoreNames.contains('admin')) {
        let store = db.createObjectStore('admin', {
          autoIncrement: true
        })
        store.createIndex('account', 'account.username', {
          unique: true
        })
      }
    }
  }
  close() {
    this.db.close()
  }
  deleteDB() {
    indexedDB.deleteDatabase(this.name)
  }
  init() {
    let user = {
      name: '小明',
      id: 201621092026,
      account: {
        username: 'user',
        password: '123456789'
      }
    }
    let admin = {
      name: '管理员',
      account: {
        username: 'admin',
        password: '987654321'
      }
    }
    this.add('user', user)
    this.add('admin', admin)
  }
  add(storeName, data) {
    let transaction = this.db.transaction(storeName, 'readwrite')
    let Store = transaction.objectStore(storeName)
    Store.add(data)
  }
  getByIndex(storeName, value, index) {
    // TODO: 解决indexedDB异步操作， 尝试使用promise和async来解决这个问题
    // let transaction = this.db.transaction(storeName, 'readwrite')
    // let store = transaction.objectStore(storeName)
    // let MyIndex = store.index(index)
    // let result = MyIndex.get(value)
    // return result
    return new Promise((resovle, reject) => {
      let transaction = this.db.transaction(storeName, 'readwrite')
      let store = transaction.objectStore(storeName)
      let MyIndex = store.index(index)
      let result = MyIndex.get(value)

      result.onsuccess = ev => {
        if (ev.target.result) {
          resovle(ev.target.result)
        } else {
          reject(new Error('用户名错误，请重新输入！！！'))
        }
      }
    })
  }
  get(storeName, value) {
    return new Promise((resovle, reject) => {
      let transaction = this.db.transaction(storeName, 'readwrite')
      let store = transaction.objectStore(storeName)
      let myValue = Number.parseInt(value)
      let request = store.get(myValue)
      request.onsuccess = ev => {
        // 如果索引是唯一的，那么会返回正确的结果，但是如果索引不是唯一，则会返回第一个匹配的结果
        // 这时候想要返回正确的结果，就需要用到游标
        if (ev.target.result) {
          resovle(ev.target.result)
        } else {
          reject(new Error('学号错误，请重新输入！！！'))
        }
      }
    })
  }

  updata(storeName, value, newValue = {}) {
    let transaction = this.db.transaction(storeName, 'readwrite')
    let store = transaction.objectStore(storeName)
    store.get(value).onsuccess = ev => {
      let result = ev.target.result
      Object.assign(result, newValue)
      store.put(result)
    }
  }
  delete(storeName, value) {
    let transaction = this.db.transaction(storeName, 'readwrite')
    let store = transaction.objectStore(storeName)
    store.delete(value)
  }
  clear(storeName) {
    let transaction = this.db.transaction(storeName, 'readwrite')
    let store = transaction.objectStore(storeName)
    store.clear()
  }
}

const DB = new MyDB()
export default DB
