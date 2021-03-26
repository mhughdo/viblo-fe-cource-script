let axios = require('axios')
const fs = require('fs')

const cookies =
  '_ga=GA1.2.1526413519.1604511538; _csrf=kwUcPKEfJihk6r6i5hTmSdPZ; __cfduid=d0b25fb7d0753ee5027665ae9f0e3366e1614394714; connect.sid=s%3ANzjXcU2gqp0AqjC3vDST8z6yhonHX2Pd.i%2BHB%2FbBn%2B0pRL1k5TS5fNUUUvSB3v1wazSyzqYqcZWE; _gid=GA1.2.299200491.1616728346; viblo_session_nonce=d4755a94a8e4c0383e621ef006545da0bf264faedb9629d2fe95e7ee35b08b43; viblo_learning_auth=eyJpdiI6Ilh5K3J0bVdhY2lEeFVZdlVSSGRHVHc9PSIsInZhbHVlIjoibWYrUjZvQTdKVWo1MHFteG8zT0VJSlF1bHhcL2pFeGlHVzFncnlyaERKbHBDQ3hwdzNsUGlDWXFPXC92NkJySUxQYWcyelQwSHIxTlVKNzdYN1MwQXR3V1ZFM01MdHU1QnpTem9JS0J5SzRYNHlNZ0RSVWZtOUVuMjNlakhIS052YTlXZXlWY0t5YjM2YXZ4RkdpQ24rVEE9PSIsIm1hYyI6IjI2ZTQxZjMwZTY2YzhkZTk0NjBmYThmMGQzNjJiODgwZjIzOTk5ODQ2ZTYwNTgwODljYjNkYTVkZmUzMmI4ODIifQ%3D%3D; __cf_bm=1bdfb9326a1f0e68e04c995a35d588ba8e0c0c07-1616729970-1800-AUOas6OErrheU0BIKHubNv/L6m43oUlmIy1Segjei/RQKU9xPBV5H/lC1B5ixrXQWJEEBC/XR/RT08g4boVbQZToZi4yi8JW1shVBFvoCEoW6LQdj2G9oQNW4J6KapR3LQ==; io=1LCkLN8B8j1_1jV9AFpe; XSRF-TOKEN=wtLhWIgz-ikhIQj7WiE5905-PEO-Ch0GuXCs; _gat=1'

const lang = 'en'

const getObjectives = () => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'get',
      url: 'https://learn.viblo.asia/api/exams/15/objectives',
      headers: {
        authority: 'learn.viblo.asia',
        accept: 'application/json, text/plain, */*',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36 Edg/89.0.774.45',
        'x-xsrf-token': 'WbR9qDHd-Y4yGTdxekZs32PJmFKds3USir48',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'accept-language': 'en-US,en;q=0.9',
        cookie: cookies,
      },
    }

    axios(config)
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        console.log('getObjectives', error.message)
        reject(error)
      })
  })
}

const getQuestionList = async (objective_ids, total_question = 100) => {
  try {
    let bodyData = `{"total_question":${total_question},"time":1200,"lang":"${lang}"}`

    let config = {
      method: 'post',
      url: `https://learn.viblo.asia/api/exams/15/objectives/practice?objective_ids[]=${objective_ids}`,
      headers: {
        authority: 'learn.viblo.asia',
        accept: 'application/json, text/plain, */*',
        'x-xsrf-token': 'atKyMx7J-QM11tZA0a3cLFSygX-NQ6afB5vg',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36 Edg/89.0.774.45',
        'content-type': 'application/json;charset=UTF-8',
        origin: 'https://learn.viblo.asia',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'accept-language': 'en-US,en;q=0.9',
        cookie: cookies,
      },
      data: bodyData,
    }

    const {data} = await axios(config)
    return data
  } catch (error) {
    console.log('getQuestionList', error)
  }
}

const submit = async (hashId) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      url: `https://learn.viblo.asia/api/tests/${hashId}/submissions`,
      headers: {
        authority: 'learn.viblo.asia',
        accept: 'application/json, text/plain, */*',
        'x-xsrf-token': 'c8hkXKkE-Gd9HxqCErdhyLdh_cggtz7uAzdg',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36 Edg/89.0.774.45',
        'content-type': 'application/json;charset=UTF-8',
        origin: 'https://learn.viblo.asia',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'accept-language': 'en-US,en;q=0.9',
        cookie: cookies,
      },
      data: '{"answers":[],"status":"submitted"}',
    }

    axios(config)
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        console.log('submit', error.message)
        reject(error)
      })
  })
}

const getResult = (hashId) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'get',
      url: `https://learn.viblo.asia/api/tests/${hashId}/result`,
      headers: {
        authority: 'learn.viblo.asia',
        accept: 'application/json, text/plain, */*',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36 Edg/89.0.774.45',
        'x-xsrf-token': 'soNcsNC2-L5uPkocCuEECOHogd2K7-BAU8nA',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'accept-language': 'en-US,en;q=0.9',
        cookie: cookies,
      },
    }

    axios(config)
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        console.log('getResult', error.message)
        reject(error)
      })
  })
}

const writeToFile = (fileName, data) => {
  fs.writeFileSync(`./${fileName}.json`, JSON.stringify(data))
  console.log(`Write ${fileName} to file successfully!`)
}

async function run() {
  try {
    const {data: objectivesData} = await getObjectives()
    console.log('Starting')
    const allQuestions = []

    const objectives = objectivesData.reduce((acc, obj) => {
      const {id, titleEn, slug, questionsCountPublic} = obj
      let newAcc = {...acc, [id]: {id, titleEn, slug, questionsCountPublic}}
      return newAcc
    }, {})

    for (const [key, value] of Object.entries(objectives)) {
      const objective_id = key
      const maxQues = value.questionsCountPublic

      console.log(`Getting questions for ${objective_id}, total questions: ${maxQues}, lang: ${lang}`)

      const questions = []

      let lastTotalQuestions = 0
      let fetchCount = 0
      while (questions.length < maxQues) {
        const maxQuess = lang === 'en' ? (Math.floor(maxQues / 3) > 100 ? 100 : Math.floor(maxQues / 3)) : 10
        const {data: questionListData} = await getQuestionList(objective_id, maxQuess)
        const {hashId} = questionListData
        console.log(`Test hashId: ${hashId}`)
        await submit(hashId)
        const {data: resultData} = await getResult(hashId)
        const {questions: returnedQuestions} = resultData
        returnedQuestions.forEach((ques) => {
          const {id, question, choices} = ques
          const ans = choices.find((c) => c.rightAnswer === true)
          if (!ans) {
            console.log(`Question ${id} has no answers`)
            return
          }
          const shouldQuestionExist = questions.findIndex((q) => q.id === id)
          if (shouldQuestionExist < 0) {
            console.log(`Pushing question:  ${id}`)
            questions.push({id, question, answer_label: ans.label, answer_id: ans.id})
          }
        })

        if (questions.length > lastTotalQuestions) {
          lastTotalQuestions = questions.length
          fetchCount = 0
        }

        if (questions.length === lastTotalQuestions) {
          fetchCount++
        }

        if (fetchCount === 10) {
          break
        }

        console.log(`Current total questions: ${questions.length}`)
      }

      allQuestions.push(...questions)
      writeToFile(`${value.slug}-${lang}`, questions)
    }

    writeToFile(`fe-questions-full-${lang}`, allQuestions)
  } catch (error) {
    console.log(error.message)
    return run()
  }
}

run()
