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
let handlebars = require('handlebars')

const loadIncludes = () => globAsync(path.join(__dirname, '/emails/includes/*.{txt,html}'))
  .then((includes) => {
    const includeData = {
      txt: [],
      html: []
    }
    return Promise
      .map(includes, (include) => {
        return fs.readFileAsync(include, 'utf8')
          .then((data) => {
            const id = include.replace(path.join(__dirname, '/emails/includes/'), '').replace(/\.[^.]+$/, '')
            if ((/\.txt$/.test(include))) {
              includeData.txt.push({id, data})
            } else {
              includeData.html.push({id, data})
            }
          })
      })
      .then(() => includeData)
  })

module.exports = {
  /**
   * @returns {Promise}
   */
  load: () => {
    return Promise
      .join(
        fs.readFileAsync(path.join(__dirname, '/emails/templates/layout.html'), 'utf8'),
        fs.readFileAsync(path.join(__dirname, '/emails/templates/layout.txt'), 'utf8'),
        globAsync(path.join(__dirname, '/emails/*.json')),
        loadIncludes()
      )
      .spread((htmlLayout, textLayout, emails, includes) => {
        return Promise.map(emails, (email) => {
          let identifier = path.basename(email, '.json')
          let emailConfig = require(email)
          let template = emailConfig.template ? emailConfig.template : identifier
          let product = emailConfig.product ? emailConfig.product : 'netwoRHk'
          return Promise
            .join(
              fs.readFileAsync(path.join(__dirname, '/emails/templates/' + template + '.html'), 'utf8')
                .then((htmlTemplate) => {
                  return Promise
                    .map(includes.html, (include) => {
                      htmlTemplate = htmlTemplate.replace('{{includes.' + include.id + '}}', include.data)
                    })
                    .then(() => juiceResourcesAsync(
                      handlebars.compile(htmlLayout)({
                        content: htmlTemplate,
                        product,
                        title: emailConfig.title,
                        type_error: emailConfig.type_error
                      }),
                      {
                        webResources: {
                          relativeTo: path.join(__dirname, '/emails/')
                        }
                      })
                    )
                }),
              fs.readFileAsync(path.join(__dirname, '/emails/templates/' + template + '.txt'), 'utf8')
            )
            .spread((htmlTemplate, textTemplate) => {
              return Promise
                .map(includes.txt, (include) => {
                  textTemplate = textTemplate.replace('{{includes.' + include.id + '}}', include.data)
                })
                .then(() => {
                  return {
                    identifier,
                    subject: emailConfig.subject,
                    defaults: _defaults({}, emailConfig.defaults),
                    html: htmlTemplate,
                    text: handlebars.compile(textLayout)({
                      content: textTemplate,
                      product,
                      title: emailConfig.title,
                      type_error: emailConfig.type_error
                    })
                  }
                })
            })
        })
      })
  }
}
