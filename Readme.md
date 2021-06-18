# Viblo FE Course Resolver

### A tool which allows you to just focus on what matters: graduation thesis and forget about the last subject: Chuẩn kỹ năng công nghệ thông tin (FE).

## Features

- Scrape the question database.
- Auto choose the right answer and move to next question until the end.

## How to use

1. Scrape the lastest questions:<br/> Replace the content of cookies variable with your own cookies and run this
   command:

   ```sh
   node index.js
   ```

   It could take hours to finish due to viblo's new policy which only allows users to practice every 4 mins.

   > Note: The default language is "en" so if you want to get the vietnamese database instead, change the lang variable
   > to "vi".

2. (Optional) Run this command to reduce file size:
   ```sh
   node shorten.js
   ```
3. Upload the database (fe-questions-full-end.json or fe-questions-en.json) somewhere.
4. In click-click.js file
   - Change the database url.
   - (Optional) Change the lang variable.
   - (Optional) Change timeout variable (by default, the script will run without any delay).
5. Open Dev tools, copy the content of click-click.js and paste it in the console tab.

## Screenshot

![image](https://user-images.githubusercontent.com/15611134/122511105-f0175280-d030-11eb-85c6-8c637c5df0d6.png)

## License

MIT
