const fs = require('fs')

// const lang = 'vi'
const lang = 'en'

async function run() {
  const data = fs.readFileSync(`./fe-questions-full-${lang}.json`, {encoding: 'utf8'})

  const newData = JSON.parse(data).map((item) => {
    delete item.question
    delete item.answer_label
    delete item.type
    return item
  })

  fs.writeFileSync(`./fe-questions-${lang}.json`, JSON.stringify([...newData]))
}

run()
