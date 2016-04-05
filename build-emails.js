'use strict'

let Promise = require('bluebird')
Promise.promisifyAll(require('fs'))
let path = require('path')
let glob = require('glob')
let globAsync = Promise.promisify(glob)
let fs = require('fs')
let _map = require('lodash/map')
let _merge = require('lodash/merge')
let _template = require('lodash/template')
let _defaults = require('lodash/defaults')
let juice = require('juice')
let juiceResourcesAsync = Promise.promisify(juice.juiceResources)

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

  return Promise
    .join(
      fs.readFileAsync('./emails/templates/layout.html', 'utf8'),
      fs.readFileAsync('./emails/templates/layout.txt', 'utf8'),
      globAsync(path.join(__dirname, '/emails/*.json'))
    )
    .spread((htmlLayout, textLayout, emails) => {
      return Promise.map(emails, (email) => {
        let identifier = path.basename(email, '.json')
        return Promise.join(
          fs.readFileAsync('./emails/templates/' + identifier + '.html', 'utf8'),
          fs.readFileAsync('./emails/templates/' + identifier + '.txt', 'utf8')
          )
          .spread((htmlTemplate, textTemplate) => {
            let e = require(email)
            return {
              identifier: identifier,
              subject: e.subject,
              defaults: _defaults({}, e.defaults),
              html: htmlLayout.replace('{{content}}', htmlTemplate),
              text: textLayout.replace('{{content}}', textTemplate)
            }
          })
      })
    })
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
