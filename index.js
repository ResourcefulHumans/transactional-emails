'use strict'

let Promise = require('bluebird')
Promise.promisifyAll(require('fs'))
let path = require('path')
let glob = require('glob')
let globAsync = Promise.promisify(glob)
let fs = require('fs')
let _defaults = require('lodash/defaults')
let juice = require('juice')
let juiceResourcesAsync = Promise.promisify(juice.juiceResources)

module.exports = {
  /**
   * @returns {Promise}
   */
  load: () => {
    return Promise
      .join(
        fs.readFileAsync(path.join(__dirname, '/emails/templates/layout.html'), 'utf8'),
        fs.readFileAsync(path.join(__dirname, '/emails/templates/layout.txt'), 'utf8'),
        globAsync(path.join(__dirname, '/emails/*.json'))
      )
      .spread((htmlLayout, textLayout, emails) => {
        return Promise.map(emails, (email) => {
          let identifier = path.basename(email, '.json')
          let emailConfig = require(email)
          let template = emailConfig.template ? emailConfig.template : identifier
          let product = emailConfig.product ? emailConfig.product : 'netwoRHk'
          return Promise
            .join(
              fs.readFileAsync(path.join(__dirname, '/emails/templates/' + template + '.html'), 'utf8')
                .then((htmlTemplate) => {
                  return juiceResourcesAsync(
                    htmlLayout
                      .replace('{{content}}', htmlTemplate)
                      .replace('{{product}}', product), {
                      webResources: {
                        images: true,
                        relativeTo: path.join(__dirname, '/emails/')
                      }
                    })
                }),
              fs.readFileAsync(path.join(__dirname, '/emails/templates/' + template + '.txt'), 'utf8')
            )
            .spread((htmlTemplate, textTemplate) => {
              let e = require(email)
              return {
                identifier,
                subject: e.subject,
                defaults: _defaults({}, e.defaults),
                html: htmlTemplate,
                text: textLayout
                  .replace('{{content}}', textTemplate)
                  .replace('{{product}}', product)
              }
            })
        })
      })
  }
}
