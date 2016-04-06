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
          return Promise
            .join(
              fs.readFileAsync(path.join(__dirname, '/emails/templates/' + identifier + '.html'), 'utf8')
                .then((htmlTemplate) => {
                  return juiceResourcesAsync(
                    htmlLayout.replace('{{content}}', htmlTemplate), {
                      webResources: {
                        images: true,
                        relativeTo: path.join(__dirname, '/emails/')
                      }
                    })
                }),
              fs.readFileAsync(path.join(__dirname, '/emails/templates/' + identifier + '.txt'), 'utf8')
            )
            .spread((htmlTemplate, textTemplate) => {
              let e = require(email)
              return {
                identifier,
                subject: e.subject,
                defaults: _defaults({}, e.defaults),
                html: htmlTemplate,
                text: textLayout.replace('{{content}}', textTemplate)
              }
            })
        })
      })
  }
}
