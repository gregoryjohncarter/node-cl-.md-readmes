const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const fs = require('fs');

const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the name of your project',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter a project name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a description of your project',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please enter a project description!');
                return false;
            }
        }
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter a link to your deployed site or the repository if not deployed',
      validate: linkInput => {
          if (linkInput) {
              return true;
          } else {
              console.log('Please enter a GitHub link!');
              return false;
          }
      }
  },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter steps required to install (separate steps with commas)',
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log('Please enter the steps required to install your project!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Describe the usage of this project',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please enter details about your project\'s usage!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmUsage',
        message: 'Would you like to include a link for a screenshot included in your repository?',
        default: false
    },
    {
        type: 'input',
        name: 'screenshot',
        message: 'Place the screenshot in the src folder of the repo and type the relative filepath (./src/<filename>)',
        when: ({ confirmUsage }) => confirmUsage,
        validate: screenshotInput => {
          if (screenshotInput) {
            return true;
          } else {
            console.log('You must enter a valid filepath.');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'confirmContributing',
        message: 'Would you like to include details about how you would like others to contribute?',
        default: false
    },
      {
        type: 'input',
        name: 'contributing',
        message: 'Enter details about how you would like others to contribute',
        when: ({ confirmContributing }) => confirmContributing,
        validate: contributingInput => {
          if (contributingInput) {
            return true;
          } else {
            console.log('You must enter details about contributing.');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'tests',
        message: 'Enter details for any tests you may have created for your project and for how to run them, otherwise leave blank',
      },
      {
          type: 'list',
          name: 'license',
          message: 'Choose a license for your project',
          choices: ['Apache', 'MIT', 'GNU', 'ISC', 'None'],
          default: 0
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username',
        validate: gitHubInput => {
            if (gitHubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Please enter your email address!');
                return false;
            }
        }
    },
]

const promptUser = (questions) => {
  console.log(`
  =================
  Generate a readme
  =================
  `);
    return inquirer.prompt(questions); 
  }

// function writeToFile(fileName, data) {
    const writeFile = fileContent => {
        return new Promise((resolve, reject) => {
          fs.writeFile('./dist/README.md', JSON.stringify(fileContent).replace('"', '').replace(/\\n/g, ''), err => {
            // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err) {
              reject(err);
              // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
              return;
            }
            // if everything went well, resolve the Promise and send the successful data to the `.then()` method
            resolve({
              ok: true,
              message: 'File created!'
            });
          });
        });
      }
// }

// TODO: Create a function to initialize app
function init() {
  promptUser(questions)
  .then(promptData => {
    return generateMarkdown(promptData);
  })
  .then(readmeData => {
    return writeFile(readmeData);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
  })
  .catch(err => {
    console.log(err);
  });
}

// Function call to initialize app
init()
  
