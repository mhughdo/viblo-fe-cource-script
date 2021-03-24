const fs = require('fs')

async function run() {
  const data = fs.readFileSync('./fe-questions.json', {encoding: 'utf8'})

  const newData = JSON.parse(data).map((item) => {
    delete item.question
    delete item.answer_label
    delete item.type
    return item
  })

  fs.writeFileSync('./fe-questions.txt', JSON.stringify([...newData]))
}

run()
