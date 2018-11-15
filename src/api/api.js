
import { crequest, upload } from './net.js'

export const URLDefines = {
  upload: 'upload',

  articalManagerList: 'artical/manager/list',
  articalManagerDetail: 'artical/manager/detail',
  articalDetail: 'artical/detail',
  articalAdd: 'artical/add',
  articalDelete: 'artical/delete',

  articalList: 'artical/list',

  addLevelOne: 'levelone/add',
  levelOneDetail: 'levelone/detail',
  levelOneList: 'levelone/list',

  levelTwoDetail: 'leveltwo/detail',
  addLevelTwo: 'leveltwo/add',
  levelTwoList: 'leveltwo/list',

  levelOneTwoList: 'levelonetwolist',
}

function getFullPath (path) {
  return 'https://onety.cn/blog/blog/' + path
  // return 'http://localhost:8000/blog/blog/' + path
  // return 'http://192.168.28.151:8000/blog/blog/' + path
}

export function uploadFullPath () {
  return getFullPath(URLDefines.upload)
}

function getFullParams (params) {
  return Object.assign({}, params)
}

export function request(params) {
  let p = Object.assign(params, {
    url: getFullPath(params.path),
    data: getFullParams(params.data || {})
  })
  crequest(p)
}

export function addLevelOne (params) {
  let p = Object.assign(params, {
    url: getFullPath(URLDefines.addLevelOne),
    data: getFullParams(params.data || {})
  })
  crequest(p)
}

export function levelOneDetail (params) {
  let p = Object.assign(params, {
    url: getFullPath(URLDefines.levelOneDetail),
    data: getFullParams(params.data || {})
  })
  crequest(p)
}

export function addLevelTwo (params) {
  let p = Object.assign(params, {
    url: getFullPath(URLDefines.addLevelTwo),
    data: getFullParams(params.data || {})
  })
  crequest(p)
}

export function levelTwoDetail (params) {
  let p = Object.assign(params, {
    url: getFullPath(URLDefines.levelTwoDetail),
    data: getFullParams(params.data || {})
  })
  crequest(p)
}

export function articalAdd (params, picture) {
  let p = Object.assign(params, {
    url: getFullPath(URLDefines.articalAdd),
    data: getFullParams(params.data || {})
  })
  if (picture) {
    upload(p, (formData) => {
      formData.append('file', picture)
      let keys = Object.keys(p.data)
      for (let key of keys) {
        if (p.data[key]) {
          formData.append(key, p.data[key])
        }
      }
    })
  } else {
    crequest(p)
  }
}
