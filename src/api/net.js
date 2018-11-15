
import Vue from 'vue'

export function upload (params, formDataConfig) {
  console.log('==============发出网络请求==============')
  console.log(params)
  let callBack = params.callBack
  let formData = new FormData()
  formDataConfig(formData)
  Vue.http.post(params.url, formData, {
    method: 'POST',
    params: params.data,
    emulateJSON: true
  }).then(function (res) {
    console.log('===============返回网络请求==============')
    console.log(res)
    if (res.body) {
      let data = res.body
      if (!data.code || (data.code !== '200' && !data.message)) {
        callBack(formatError())
      } else if (data.code !== '200') {
        callBack({
          error: {
            code: data.code,
            message: data.message
          },
          data: data,
          inData: data.data
        })
      } else {
        callBack({
          error: null,
          data: {},
          inData: data.data || {}
        })
      }
    } else {
      callBack(formatError())
    }
  }, function (error) {
    console.log('===============返回网络请求==============')
    console.log(error)
    callBack(netError())
  })
}

export function crequest (params) {
  console.log('==============发出网络请求==============')
  console.log(params)
  let callBack = params.callBack
  Vue.http.get(params.url, {
    method: 'GET',
    params: params.data,
    emulateJSON: true
  }).then(function (res) {
    console.log('===============返回网络请求==============')
    console.log(res)
    if (res.body) {
      let data = res.body
      if (!data.code || (data.code !== '200' && !data.message)) {
        callBack(formatError())
      } else if (data.code !== '200') {
        callBack({
          error: {
            code: data.code,
            message: data.message
          },
          data: data,
          inData: data.data
        })
      } else {
        callBack({
          error: null,
          data: {},
          inData: data.data || {}
        })
      }
    } else {
      callBack(formatError())
    }
  }, function (error) {
    console.log('===============返回网络请求==============')
    console.log(error)
    callBack(netError())
  })
}

function formatError () {
  return {
    error: {
      error: '500',
      message: '服务器数据格式错误'
    },
    data: null,
    inData: {}
  }
}

function netError (res) {
  return {
    error: {
      code: '100',
      message: '网络错误'
    },
    data: null,
    inData: {}
  }
}
