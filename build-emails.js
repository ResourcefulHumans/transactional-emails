'use strict'

let Promise = require('bluebird')
Promise.promisifyAll(require('fs'))
let path = require('path')
let fs = require('fs')
let _map = require('lodash/map')
let _merge = require('lodash/merge')
let _template = require('lodash/template')
let _forEach = require('lodash/forEach')
let juice = require('juice')
let juiceResourcesAsync = Promise.promisify(juice.juiceResources)
let showdown = require('showdown')
let converter = new showdown.Converter()
let transactionTemplates = require('./')

function run () {
  let templatedata = {
    httpHost: process.env.HTTP_HOST || 'http://example.com/'
  }

  console.log()
  console.log('Building emails files …')
  console.log(' data:')
  _map(templatedata, function (value, key) {
    console.log('  ' + key + ': ' + value)
  })

  return transactionTemplates.load()
    .map((email) => {
      return juiceResourcesAsync(
        email.html, {
          webResources: {
            images: true,
            relativeTo: path.join(__dirname, '/emails/')
          }
        })
        .then((html) => {
          // Write to disk for preview
          let target = path.join(__dirname, '/build/' + email.identifier)
          console.log('Writing ' + email.identifier, '->', target)
          let data = {}
          _merge(data, templatedata)
          _merge(data, email.defaults)
          data.subject = _template(email.subject)(data)
          let formatContent = (data) => {
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
          return Promise.join(
            fs.writeFileAsync(target + '.html', _template(html)(data)),
            fs.writeFileAsync(target + '.txt', _template(email.text)(data))
          )
        })
    })
}

run().then(function () {
  process.exit(0)
}).catch(function (err) {
  console.error(err)
  process.exit(1)
})
