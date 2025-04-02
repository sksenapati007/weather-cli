const chalk = require('chalk');

export const weatherIcons: { [key: string]: string } = {
   'clear sky': chalk.yellow(`
    \\   /
     .-.
  --(   )--
     '-'
    /   \\
`),
   'few clouds': chalk.gray(`
     .--.
  .-(    ).
 (___.__)__)
`),
   'scattered clouds': chalk.gray(`
     .--.     .--.
  .-(    ).-(    ).
 (___.__)___.__)__)
`),
   'broken clouds': chalk.gray(`
     .--.     .--.     .--.
  .-(    ).-(    ).-(    ).
 (___.__)___.__)___.__)__)
`),
   'shower rain': chalk.blue(`
     .--.
  .-(    ).
 (___.__)__)
    |  |  |
    '  '  '
`),
   'rain': chalk.blue(`
     .--.
  .-(    ).
 (___.__)__)
    |  |  |
    '  '  '
`),
   'thunderstorm': chalk.magenta(`
     .--.
  .-(    ).
 (___.__)__)
    /\\  /\\
   /  \\/  \\
`),
   'snow': chalk.white(`
     .--.
  .-(    ).
 (___.__)__)
    *  *  *
    *  *  *
`),
   'mist': chalk.gray(`
     .--.
  .-(    ).
 (___.__)__)
    ~~~ ~~~
    ~~~ ~~~
`),
   'default': chalk.gray(`
     .--.
  .-(    ).
 (___.__)__)
`)
}; 