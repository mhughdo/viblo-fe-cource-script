let axios = require('axios')
const fs = require('fs')

const cookies =
  '_ga=GA1.2.1526413519.1604511538; _csrf=kwUcPKEfJihk6r6i5hTmSdPZ; viblo_session_nonce=f40fc9cca0a492608a60497e3fc6e28509ae368e19ef93c46c4719933bebf0b0; viblo_learning_auth=eyJpdiI6IlF1OHZqYXVnSXdPQW04NkVqRlAwMnc9PSIsInZhbHVlIjoiSFdVaXNMOTh6eTZkaTA3Y0xDUFAyYk5uV2N3bEEza21NYmlQaHdnYUxcLzdISTBDMWNnSFZ0RzlYRUYwdkJLRFRlYU5ZbEhnTDg4S1BKUVhuWFN3M1JvRkVIYTdkdWJlQlZpNSt2XC9BbDZmakhFdWZFWDI1eDdzbVlUZXFjYjFFcjNvdjg1a3I3MEZYV0ZBcHRZMzlkckE9PSIsIm1hYyI6IjVlMjNhMWU2NWY5OTUyZjdmODZiOTk1OGNiY2VjNjIwYmFjMjlmMWM1ZDczNDc5NGU5NDI5MmIxY2IyMDNmNDYifQ%3D%3D; connect.sid=s%3Aq_4lCMV5-cN-5yq955_qMiOTSdcJBRdc.jq4lu04zhSO%2FlYpd0D1pBi4AQlrpvoo3%2F%2Fl7LCc2faQ; _gid=GA1.2.687518617.1622985322; __cf_bm=43e0748a7d3b4190c4afb5c2dc7c3a28ad6bed55-1622985322-1800-AXRIF/qVs4AT5Izp0mBw6TSi28vHgwPy/ENch55basbJRma9Mxkx2tDmjkj7LAWAyWLSl/FK9yc2twJnbzPuFEzar/MOheXQltYGPMQZazSZkd/s15tVMuEpgx8xiykpYw==; XSRF-TOKEN=1wwPfR40-4A-xaXYhvCiXdgvlIZvhKTTRd3g; io=PT4f_XWMtYpxMZMZABYp'

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
    let bodyData = `{"total_question":${total_question},"time":1200,"language":"${lang}", "objective_ids":["${objective_ids}"]}`

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
    if (error?.request?.data?.message.indexOf('You are learning too fast') > -1) {
      console.log('Learning too fast, watiting...')
      await waiit()
      return await getQuestionList(objective_ids, total_question)
    }
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

const waiit = (timeout = 250000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
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

        if (fetchCount === 5) {
          break
        }

        console.log(`Current total questions: ${questions.length}`)
        await waiit()
      }

      allQuestions.push(...questions)
      writeToFile(`${value.slug}-${lang}`, questions)
      await waiit()
    }

    writeToFile(
      `fe-questions-full-${lang}`,
      allQuestions.sort((a, b) => a.id - b.id)
    )

    process.exit(1)
  } catch (error) {
    console.log(error.message)
    return run()
  }
}

run()
