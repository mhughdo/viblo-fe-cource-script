let axios = require('axios')
const fs = require('fs')

const cookies =
  '_ga=GA1.2.1526413519.1604511538; _csrf=kwUcPKEfJihk6r6i5hTmSdPZ; __cfduid=d0b25fb7d0753ee5027665ae9f0e3366e1614394714; _gid=GA1.2.1496287338.1616313390; __cf_bm=45150145661d9cd20adfe766afdc79e19fdf0ba7-1616313389-1800-AZ3rRH3rcjEGW0ndiozA2Ehz42ySRogFG0pk43UwSMWRndq+eWdFPiTmiGUYNScTo4EssbaqBBxP1zzofzTLvfw4jqYixB/hentNGhAeRb/tDC7LRGhfuj7mft1K/GxlWw==; viblo_session_nonce=291fd7ac2122bf81b7daecd135afdaeead7c83d31699e25da552ecfb65a77a06; viblo_learning_auth=eyJpdiI6IlBpendTS2dscUd1VW1HUWoxdUttU1E9PSIsInZhbHVlIjoiWmZlMU92V2ZFMHlxa2JuXC9cL0NJNlwvMHVPdkFzeVRWSGlXUHVDcnpHMG5Pa2Q2YjN5ZWtNQ0FoenM1dFRNSXNtd0ljMUFxelFWMmYyY1JMYlNiYjdVXC9wRGYyZkxwb2x4MHpRbDBhRldxaDVlN3hHV1Q1UTlZZVVhbnloamRvV1poaWU1RTBBMjg1TjdmbGVXKzlFSjdhdz09IiwibWFjIjoiMmQ4MTA2MDUwNTJlN2IwYmVlN2IyY2RhN2MxYWZmMzE3ZjJjOTkyMTMyZGFlOGE1OTlhYzMzNDUxOWFjOTU3NCJ9; connect.sid=s%3A7L19HAs9-LX9AGyVxRuMinR9RlIGBkbf.3Nzk73eBW9LGgbZ%2BRv%2FfV%2Fu7jlxGpC3xMLTjmZ9Kdn4; io=ZirPAULqC9WPxpBwAEDe; _gat=1; XSRF-TOKEN=atKyMx7J-QM11tZA0a3cLFSygX-NQ6afB5vg'

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
        console.log(error)
        reject(error)
      })
  })
}

const getQuestionList = async (objective_ids, total_question = 100) => {
  try {
    let bodyData = `{"total_question":${total_question},"time":1200,"lang":"en"}`

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
    console.log(error)
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
        console.log(error)
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
        console.log(error)
        reject(error)
      })
  })
}

const writeToFile = (fileName, data) => {
  fs.writeFileSync(`./${fileName}.json`, JSON.stringify(data))
  console.log(`Write ${fileName} to file successfully!`)
}

async function run() {
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

    console.log(`Getting questions for ${objective_id}, total questions: ${maxQues}`)

    const questions = []

    let lastTotalQuestions = 0
    let fetchCount = 0
    while (questions.length < maxQues) {
      const {data: questionListData} = await getQuestionList(
        objective_id,
        Math.floor(maxQues / 3) > 100 ? 100 : Math.floor(maxQues / 3)
      )
      const {hashId} = questionListData
      console.log(`Test hashId: ${hashId}`)
      await submit(hashId)
      const {data: resultData} = await getResult(hashId)
      const {questions: returnedQuestions} = resultData
      returnedQuestions.forEach((ques) => {
        const {id, question, type, choices} = ques
        const ans = choices.find((c) => c.rightAnswer === true)
        if (!ans) {
          console.log(`Question ${id} has no answers`)
          return
        }
        const shouldQuestionExist = questions.findIndex((q) => q.id === id)
        if (shouldQuestionExist < 0) {
          console.log(`Pushing question:  ${id}`)
          questions.push({id, question, type, answer_label: ans.label, answer_id: ans.id})
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
    writeToFile(value.slug, questions)
  }

  writeToFile('fe-questions', allQuestions)
}

run()
