let axios = require('axios')
const fs = require('fs')

const cookies = '_csrf=0Ra9aD9fn4myJPiSfGTW38Nl; socket_broadcaster=pusher; socket_key=1H53KZ2VE6NNUK2K4K4M; auth_endpoint=undefined; socket_host=pusha.viblo.asia; wsPort=; wssPort=; _ga=GA1.1.1171728779.1691588760; connect.sid=s%3AS8D2HewPmYCZ6Z9-o78oaNZofPHiTI31.HCn2blb8q9es5QJsWTWK%2Fwj9FgEkT2va8VCqnY2ezLk; viblo_session_nonce=47be20b697e85963c5d8c4239aa00b57d06bb5b2d2469bfea1754f536080b15d; viblo_learning_auth=eyJpdiI6ImQyRWw2dU9FbEQwMDEwcTRhanNJaFE9PSIsInZhbHVlIjoiT1YwdUJiM2VsZXF1YUprT0ZQbVZnWDdHZTZBVk03SmFrV0FIU1ZoRkZoRnVvWkswalZ4QVVVT2wrZVBrVWp5OExtSmVISDkxQXIyV1JvYk1UR3JFQXJ1REN6M2pcL2NYQ3VFbXpWeFhrNWthVHNaWW16U2R5RmFENjZ0TDdwTHp2alBjMEpLQ2phdGVzWnVDOW1QenlQUT09IiwibWFjIjoiNTNmNGMwYTE3ZTJmOTE1ZjkwMzliNzljNzllNjE2YmI3YTM2YmUyZjMxZDBkYzEzNTRhODA2MWUzZTljY2IxZCJ9; _ga_LCJPWMSS52=GS1.1.1691598016.2.1.1691598018.58.0.0; XSRF-TOKEN=Bpv12bFa-XZWENIGP2cXOmWf3ynzXii7FcEA'

const lang = 'en'
const examID = 76

const fileName = `ruby-${lang}`
let questionBank = importQuestionBank(fileName)

const getObjectives = () => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'get',
      url: `https://learn.viblo.asia/api/exams/${examID}/objectives`,
      headers: {
        authority: 'learn.viblo.asia',
        pragma: 'no-cache',
        'cache-control': 'no-cache',
        accept: 'application/json, text/plain, */*',
        'x-xsrf-token': 'MRd1XgJn-Ms9MyGgD3ueW9PRkbvn7-IZ2Kdw',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json;charset=UTF-8',
        origin: 'https://learn.viblo.asia',
        cookie: cookies,
      },
    }

    axios(config)
      .then(function(response) {
        resolve(response.data)
      })
      .catch(function(error) {
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
      url: `https://learn.viblo.asia/api/exams/${examID}/objectives/practice?objective_ids[]=${objective_ids}`,
      headers: {
        authority: 'learn.viblo.asia',
        pragma: 'no-cache',
        'cache-control': 'no-cache',
        accept: 'application/json, text/plain, */*',
        'content-type': 'application/json;charset=UTF-8',
        'x-xsrf-token': 'MRd1XgJn-Ms9MyGgD3ueW9PRkbvn7-IZ2Kdw',
        'accept-language': 'en-US,en;q=0.9',
        'sec-ch-ua-platform': '"macOS"',
        origin: 'https://learn.viblo.asia',
        cookie: cookies,
      },
      data: bodyData,
    }

    const { data } = await axios(config)
    return data
  } catch (error) {
    console.log("getQuestionList", error?.response?.data?.message)
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

const submit = async (answers, hashId) => {
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
        'x-xsrf-token': 'MRd1XgJn-Ms9MyGgD3ueW9PRkbvn7-IZ2Kdw',
        'accept-language': 'en-US,en;q=0.9',
        'sec-ch-ua-mobile': '?0',
        'content-type': 'application/json;charset=UTF-8',
        origin: 'https://learn.viblo.asia',
        cookie: cookies,
      },
      data: `{"answers":${JSON.stringify(answers)},"status":"submitted"}`,
    }

    axios(config)
      .then(function(response) {
        resolve(response.data)
      })
      .catch(function(error) {
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
      .then(function(response) {
        resolve(response.data)
      })
      .catch(function(error) {
        console.log('getResult', error.message)
        reject(error)
      })
  })
}

const writeToFile = (fileName, data) => {
  fs.writeFileSync(`./${fileName}.json`, JSON.stringify(data))
  console.log(`Write ${fileName} to file successfully!`)
}

function importQuestionBank(fileName) {
  const data = fs.readFileSync(`./${fileName}.json`, 'utf8')
  const questions = JSON.parse(data)
  return questions
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
    const { data: objectivesData } = await getObjectives()
    console.log('Starting')

    const objectives = objectivesData.reduce((acc, obj) => {
      const { id, titleEn, slug } = obj

      const questionsCountPublic = lang === 'en' ? obj.publicEnQuestionCount : obj.publicViQuestionCount

      let newAcc = { ...acc, [id]: { id, titleEn, slug, questionsCountPublic } }
      return newAcc
    }, {})

    for (const [key, value] of Object.entries(objectives)) {
      const objective_id = key
      const maxQues = value.questionsCountPublic || 97

      console.log(`Getting questions for ${objective_id}, total questions: ${maxQues}, lang: ${lang}`)

      while (true) {
        // const maxQuess = lang === 'en' ? (Math.floor(maxQues / 3) > 100 ? 100 : Math.floor(maxQues / 3)) : 10
        const maxQuess = maxQues
        const { data: questionListData } = await getQuestionList(objective_id, maxQuess)
        for (const question of questionListData.questions) {
          if (!(question.id in questionBank)) {
            questionBank[question.id] = {
              id: question.id,
              choices: question.choices,
              type: question.type,
              correctAnswer: question.correctAnswer,
              questionCombinations: question.type === 'single_choice' ? question.choices.map(c => ({ answers: c.id, tried: false })) : generateCombinations(question.choices.map(c => c.id)).map(c => ({ answers: c, tried: false })),
              foundCorrectAnswer: false,
              correctAnswer: null,
            }
          }
        }
        const { hashId } = questionListData
        console.log(`Test hashId: ${hashId}`)

        const submitAnswers = generateAnswers(questionListData.questions)
        await submit(submitAnswers, hashId)
        const { data: resultData } = await getResult(hashId)
        const { submissions } = resultData
        // returnedQuestions.forEach((ques) => {
        //   const { id, question, choices } = ques
        //   const ans = choices.find((c) => c.rightAnswer === true)
        //   if (!ans) {
        //     console.log(`Question ${id} has no answers`)
        //     return
        //   }
        //   const shouldQuestionExist = questions.findIndex((q) => q.id === id)
        //   if (shouldQuestionExist < 0) {
        //     console.log(`Pushing question:  ${id}`)
        //     questions.push({ id, question, answer_label: ans.label, answer_id: ans.id })
        //   }
        // })

        for (const submission of submissions) {
          const isRightAnswer = Array.isArray(submission.rightAnswer) ? submission.rightAnswer.every(a => a === true) : submission.rightAnswer
          if (isRightAnswer) {
            console.log(`Found correct answer for question ${submission.question_id}`)
            questionBank[submission.question_id].foundCorrectAnswer = true
            questionBank[submission.question_id].correctAnswer = submission.answers
          }
        }

        const shouldBreak = Object.values(questionBank).every(q => q.foundCorrectAnswer === true)
        if (shouldBreak) {
          console.log('Found all correct answers')
          break
        }
        writeToFile(fileName, questionBank)

        console.log(`Current total questions: ${Object.keys(questionBank).length}`)
        console.log(`Current total correct answers: ${Object.values(questionBank).filter(q => q.foundCorrectAnswer === true).length}`)
        await waiit(60000)
      }

    }

    process.exit(1)
  } catch (error) {
    console.log(error.message)
    return run()
  }
}

run()

function generateAnswers(questionList) {
  const res = []
  for (const question of questionList) {
    let ans
    if (questionBank[question.id].foundCorrectAnswer === false) {
      const newAns = questionBank[question.id].questionCombinations.find((c) => c.tried === false)
      newAns.tried = true
      ans = newAns.answers
    } else {
      ans = questionBank[question.id].correctAnswer
    }

    res.push({ question_id: question.id, answers: ans || [] })
  }

  return res
}

function generateCombinations(numbers) {
  // Array to store generated combinations
  const combinations = [];

  // Generate combinations for different lengths
  for (let length = 2; length <= numbers.length; length++) {
    // Generate combinations for the current length
    for (let i = 0; i <= numbers.length - length; i++) {
      // Generate combination starting at index i
      const combination = [numbers[i]];

      // Generate subsequent elements of the combination
      generateCombinationRecursive(numbers, i + 1, length - 1, combination, combinations);
    }
  }

  return combinations;
}

function generateCombinationRecursive(numbers, startIndex, length, combination, combinations) {
  // Base case: Combination has reached the desired length
  if (length === 0) {
    combinations.push(combination.slice()); // Add a copy of the combination to the combinations array
    return;
  }

  // Recursive case: Generate subsequent elements of the combination
  for (let i = startIndex; i <= numbers.length - length; i++) {
    combination.push(numbers[i]);
    generateCombinationRecursive(numbers, i + 1, length - 1, combination, combinations);
    combination.pop(); // Remove the last element for backtracking
  }
}
