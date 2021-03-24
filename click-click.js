/* eslint-disable no-var */
var cookies = [
  'viblo_learning_auth=eyJpdiI6IjJzcmFNbjJkejhpWkpqMnhlUEFiZnc9PSIsInZhbHVlIjoiekJ5c3pVcVBkTklWZkJWMHpvb1krdkdMQjc5MHlQOUdPZm03bUdZQ3F5anU4N0ozYVVyNEwwcUdYRkRQVzJWYU1HcUNUbGErOVZoNmtUSDE3VHZjRFlhN0ZVbWtJWGtadHZyTjNQK1k5RVdKMmNlNWo2Z05FUm1qVWVySElSSHJQTlV3N2FLRzVmUW5ndWVYMWV2Qzd3PT0iLCJtYWMiOiJmYWZjNGIyYTFkYTZmMTgxOGQ3NjY0ZDk4ZTM4ZDI5NDZhMDc2OWZiY2NjMjM0YjAxNTBiZjJhYmY2YTc2NTI5In0%3D; XSRF-TOKEN=EuzoYIbp-QaekLbFJVot5U6tZPv9M4N2rXSQ;',
  'viblo_learning_auth=eyJpdiI6IlNsRDNpN2RNTWdqMG5EWElpXC9YVHRnPT0iLCJ2YWx1ZSI6IndtM2wwanMrRXFSNjdIV2creHhJa050WUZpNlpVakRIbVI3aG51YXJMbkZRajFZRklYY0JFU3UwcVluUTQ2SkJWQk9yRlRQQ3cra0JacVJDZFpQOTQ4MDRvcDlEclYzQmd6c3lsVytRdytpMHBRK3Jtdkt0d3hMYVRwdHJYdVFnb3oweUR0a3hXeDhDaTRvcFpaRWtJUT09IiwibWFjIjoiMTZkYWYxZDEwYzg0OTI1MzcwMTYzNmQ1NzE4MDdhNzhkYjUzYjRmNDQ2MWFkOWIzODQ0MjdhOWZlNTAwNDM0MCJ9; XSRF-TOKEN=aMgXJbHX-Bb6thdUNXVCWgGtYWCM_BET1knM;',
]

var fetchQuestions = async (cookie) => {
  try {
    const data = await fetch('https://learn.viblo.asia/api/my-questions?orderBy=created_at&order=desc&status=draft', {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        cookie,
      },
      referrer: 'https://learn.viblo.asia/contribute-question',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })
    return data.json()
  } catch (err) {
    console.log(err.message)
  }
}

var wait = (timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

async function run() {
  const allQuestions = []
  for (const cookie of cookies) {
    const fetchRes = await fetchQuestions(cookie)
    const content = fetchRes.data.map((item) => JSON.parse(item.content))
    for (const c of content) {
      allQuestions.push(...c)
    }
  }

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

  for (const questionNumber of questionNumberList) {
    questionNumber.querySelector('a').click()
    const providedAnswers = document.querySelector('div.question-answers div.ant-radio-group-outline').children

    const questionID = fromComponentQuestions[Number(questionNumber.innerText) - 1].id
    const ans = allQuestions.find((q) => q.id === questionID)

    if (!ans) {
      console.log(`There's no answer for question ${questionNumber.innerText}`)
    } else {
      for (const providedAnswer of providedAnswers) {
        if (providedAnswer.innerText === ans.answer_label) {
          providedAnswer.querySelector('input').click()
        }
      }
    }

    // await wait(1000)
  }
}

run()
