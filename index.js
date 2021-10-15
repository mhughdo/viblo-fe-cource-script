let axios = require('axios')
const fs = require('fs')

const cookies =
  '_ga=GA1.2.2035527274.1629777985; viblo_session_nonce=9d55600a51aba4790c87e9b7f23e5f250cb588085927de7a8850480437dcf7f5; _csrf=1efDhBjYYH3xN__BYifKXGbB; viblo_learning_auth=eyJpdiI6ImtkRExXZHI5NkRFbmJiQ0h6RytJaHc9PSIsInZhbHVlIjoiUWp2eDhhUVEyN2lRT0dya3FYTVJmdHdudHNTa3hiKzY3c1ArQnV6YXlqR1czZXdYTW9LZmxabXJuQVlvRUo1elVMTGpnTU5ZRkpPOSt3V00rVkNRK2pibVdhNzFRVm9wRVA5XC9FaCtnR09FSFNwZDdDbkQxMHJNM3FoS1c4cUx4QWhcL1NlUnJsekFSU2ordUkrcnF0WWc9PSIsIm1hYyI6IjJhNTU2NzQyYzk0NDJiZGM0ZTA2NmU3NzQ2ZTE0NWI3OTRhYWQwY2IwOWEzOTQ0MzJkZGFkYTE4YmQyOTE0ZjcifQ%3D%3D; connect.sid=s%3ANXiJiwsq5cYZV-tTxyh3KKBwqijphK3l.cvYkZLp2Kt%2FEQlEryloVnoEYn6PWiJ6a%2B1Lt5fWmBxo; _gid=GA1.2.230031400.1634307894; __cf_bm=A4wx5fJnY9SKmNMoitay1eejw3hkEHC5aKEHWC4Fytk-1634307896-0-AXxxOt7XW4eFDXl3bXu2d+BbM8qPBx+w5uCcFDKuE1+hWs1R4gn8vXWcZrufcQPEcjardcTHQARZwb2LvDtkb258HxJoso7CFFkhahMQIDSCSQ2u9OxCP2j0fTN4i4XIMA==; XSRF-TOKEN=cKUCMnHg-BIzaUFAcGZE6aTV4wkHl0DUArGA'

const lang = 'en'

const getObjectives = () => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'get',
      url: 'https://learn.viblo.asia/api/exams/15/objectives',
      headers: {
        authority: 'learn.viblo.asia',
        pragma: 'no-cache',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="94", "Microsoft Edge";v="94", ";Not A Brand";v="99"',
        accept: 'application/json, text/plain, */*',
        'x-xsrf-token': 'ab8RXbyS-WM5cwkECDO28wyQliyo6-DJzNeM',
        'sec-ch-ua-mobile': '?0',
        'content-type': 'application/json;charset=UTF-8',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31',
        'sec-ch-ua-platform': '"macOS"',
        origin: 'https://learn.viblo.asia',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        referer:
          'https://learn.viblo.asia/courses/fundamental-information-technology-engineer-examination-fe-VolejRejNm/exams/15',
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
        pragma: 'no-cache',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="94", "Microsoft Edge";v="94", ";Not A Brand";v="99"',
        accept: 'application/json, text/plain, */*',
        'x-xsrf-token': 'ab8RXbyS-WM5cwkECDO28wyQliyo6-DJzNeM',
        'sec-ch-ua-mobile': '?0',
        'content-type': 'application/json;charset=UTF-8',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31',
        'sec-ch-ua-platform': '"macOS"',
        origin: 'https://learn.viblo.asia',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        referer:
          'https://learn.viblo.asia/courses/fundamental-information-technology-engineer-examination-fe-VolejRejNm/exams/15',
        'accept-language': 'en-US,en;q=0.9',
        cookie: cookies,
      },
      data: bodyData,
    }

    const {data} = await axios(config)
    return data
  } catch (error) {
    console.log()
    if (
      error?.response?.data?.message.indexOf('You are learning too fast') > -1 ||
      error?.response?.data?.message.indexOf('Bạn đang học quá nhanh') > -1
    ) {
      console.log('Learning too fast, watiting...')
      await waiit()
      return await getQuestionList(objective_ids, total_question)
    }
    // console.log('getQuestionList', error)
  }
}

const submit = async (hashId) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      url: `https://learn.viblo.asia/api/tests/${hashId}/submissions`,
      headers: {
        authority: 'learn.viblo.asia',
        pragma: 'no-cache',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="94", "Microsoft Edge";v="94", ";Not A Brand";v="99"',
        accept: 'application/json, text/plain, */*',
        'x-xsrf-token': 'ab8RXbyS-WM5cwkECDO28wyQliyo6-DJzNeM',
        'sec-ch-ua-mobile': '?0',
        'content-type': 'application/json;charset=UTF-8',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31',
        'sec-ch-ua-platform': '"macOS"',
        origin: 'https://learn.viblo.asia',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        referer:
          'https://learn.viblo.asia/courses/fundamental-information-technology-engineer-examination-fe-VolejRejNm/exams/15',
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
        pragma: 'no-cache',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Chromium";v="94", "Microsoft Edge";v="94", ";Not A Brand";v="99"',
        accept: 'application/json, text/plain, */*',
        'x-xsrf-token': 'ab8RXbyS-WM5cwkECDO28wyQliyo6-DJzNeM',
        'sec-ch-ua-mobile': '?0',
        'content-type': 'application/json;charset=UTF-8',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31',
        'sec-ch-ua-platform': '"macOS"',
        origin: 'https://learn.viblo.asia',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        referer:
          'https://learn.viblo.asia/courses/fundamental-information-technology-engineer-examination-fe-VolejRejNm/exams/15',
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
      const {id, titleEn, slug} = obj

      const questionsCountPublic = lang === 'en' ? obj.publicEnQuestionCount : obj.publicViQuestionCount

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
