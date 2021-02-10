'use strict'

let Promise = require('bluebird')
Promise.promisifyAll(require('fs'))
let path = require('path')
let fs = require('fs')
let _map = require('lodash/map')
let _merge = require('lodash/merge')
let _template = require('lodash/template')
let _forEach = require('lodash/forEach')
let showdown = require('showdown')
let converter = new showdown.Converter()
let transactionTemplates = require('./')

function run() {
  let templatedata = {
    webHost: process.env.WEB_HOST || 'http://example.com/'
  }

  console.log()
  console.log('Building emails files …')
  console.log(' data:')
  _map(templatedata, function(value, key) {
    console.log('  ' + key + ': ' + value)
  })

  return transactionTemplates.load().map(email => {
    // Write to disk for preview
    let target = path.join(__dirname, '/build/' + email.identifier)
    console.log('Writing ' + email.identifier, '->', target)
    let data = {}
    _merge(data, templatedata)
    _merge(data, email.defaults)
    data.subject = _template(email.subject)(data)
    data.title = _template(email.title)(data)
    data.title2 = _template(email.title2)(data)
    let formatContent = data => {
      if (!(typeof data === 'object')) {
        return data
      }
      if (data['@markdown']) {
        return {
          '@text': data['@markdown'],
          '@html': converter.makeHtml(data['@markdown'])
        }
      }
      _forEach(data, (value, key) => {
        data[key] = formatContent(value)
      })
      return data
    }
    formatContent(data)
    data._ = require('lodash')
    return Promise.join(
      fs.writeFileAsync(target + '.html', _template(email.html)(data)),
      fs.writeFileAsync(target + '.txt', _template(email.text)(data))
    )
  })
}

run()
  .then(function() {
    process.exit(0)
  })
  .catch(function(err) {
    console.error(err)
    process.exit(1)
  })
