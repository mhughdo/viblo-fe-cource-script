/* eslint-disable no-var */
var fetchQuestions = async () => {
  try {
    const data = await fetch('https://learn.viblo.asia/api/my-questions?orderBy=created_at&order=desc&status=draft', {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
      referrer: 'https://learn.viblo.asia/contribute-question',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
    })
    return data.json()
  } catch (err) {
    console.log(err.message)
  }
}

async function run() {
  const allQuestions = []
  const fetchRes = await fetchQuestions()
  const {content} = fetchRes.data[0]
  allQuestions.push(...JSON.parse(content))

  const questionNumberList = document.querySelector('div.question-list').children

  var fromComponentQuestions = []
  var xTag = document.querySelector('div.flex.test-view.w-full')
  var reactInternalInstanceKey = Object.keys(xTag).find((key) => key.startsWith('__reactInternalInstance$'))
  xTag[reactInternalInstanceKey].return.memoizedProps.questions.forEach((ques) => {
    const obj = Object.fromEntries(Array.from(ques))
    const choices = []
    obj.choices.forEach((c) => choices.push(Object.fromEntries(Array.from(c))))
    obj.choices = choices

    fromComponentQuestions.push(obj)
  })

  if (questionNumberList.length !== fromComponentQuestions.length) {
    console.log(
      "Questions don't match: ",
      'provided: ',
      questionNumberList.length,
      ', ',
      'fetched: ',
      fromComponentQuestions.length
    )

    return
  }

  var wait = (timeout = 1000) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, timeout)
    })
  }

  for (const questionNumber of questionNumberList) {
    questionNumber.querySelector('a').click()

    const providedAnswers = document.querySelector('div.question-answers div.ant-radio-group-outline').children

    const question = fromComponentQuestions[Number(questionNumber.innerText) - 1]
    const questionID = question.id
    const ans = allQuestions.find((q) => String(q.id) === String(questionID))
    if (!ans) {
      console.log(`There's no answer for question ${questionNumber.innerText}`)
    } else {
      const ans_order = question.choices.findIndex((item) => item.id === ans.answer_id)
      console.log(`Answer for question ${questionNumber.innerText}: ${ans_order}`)
      await wait()
      providedAnswers[ans_order].querySelector('input').click()
    }

    // await wait(1000)
  }
}

run()
