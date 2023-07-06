/* eslint-disable no-var */
var lang = 'en'
var timeout = 500
var shouldAutoClick = true
var fetchQuestions = async () => {
  try {
    const data = await fetch(`https://raw.githubusercontent.com/mhughdo/viblo-fe-cource-script/master/ruby-${lang}.json`, {
      headers: {
        accept: 'application/json, text/plain, */*',
      },
      method: 'GET',
    })
    return data.json()
  } catch (err) {
    console.log(err.message)
  }
}

async function run() {
  const allQuestions = []
  const fetchRes = await fetchQuestions()
  allQuestions.push(...Object.values(fetchRes))

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

  var wait = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, timeout)
    })
  }

  for (const questionNumber of questionNumberList) {
    questionNumber.querySelector('a').click()

    const question = fromComponentQuestions[Number(questionNumber.innerText) - 1]
    const questionID = question.id
    const ans = allQuestions.find((q) => String(q.id) === String(questionID))
    if (!ans || ans.foundCorrectAnswer === false) {
      console.log(`There's no answer for question ${questionNumber.innerText}, question id: ${questionID}`)
    } else {
      console.log(ans)
      const correctAnswers = ans.correctAnswer
      const questionType = ans.type
      const providedAnswers = questionType === 'single_choice' ? document.querySelector('div.question-answers div.ant-radio-group-outline').children : document.querySelector('div.question-answers div.ant-checkbox-group').children
      let ans_order
      if (questionType === 'single_choice') {
        ans_order = question.choices.findIndex((item) => item.id === correctAnswers)
        console.log(`Answer for question ${questionNumber.innerText}: ${ans_order}`)
      } else {
        ans_order = correctAnswers.map((item) => question.choices.findIndex((c) => c.id === item))
        console.log(`Answer for question ${questionNumber.innerText}: ${ans_order.join(', ')}`)
      }
      if (Array.isArray(ans_order)) {
        for (const ord of ans_order) {
          if (shouldAutoClick) {
            providedAnswers[ord].querySelector('input').click()
          }
        }

        if (timeout) {
          await wait()
        }
      } else {
        if (timeout) {
          await wait()
        }
        if (shouldAutoClick) {
          providedAnswers[ans_order].querySelector('input').click()
        }
      }
    }

    // await wait(1000)
  }

  if (!shouldAutoClick) {
    for (const questionNumber of questionNumberList) {
      questionNumber.querySelector('a div.question-item').classList.remove('not-answer-bg')
    }
  }
}

run()
