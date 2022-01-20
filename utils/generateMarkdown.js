function renderLicenseBadge(data) {
  if (data.license === "Apache") {
    var liBadge = "Apache: A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code.<br>";
    return liBadge;
  } else if (data.license === "MIT") {
    var liBadge = "MIT: A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.<br>";
    return liBadge;
  } else if (data.license === "GNU") {
    var liBadge = "GNU: Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.<br>";
    return liBadge;
  } else if (data.license === "ISC") {
    var liBadge = "ISC: A permissive license lets people do anything with your code with proper attribution and without warranty. The ISC license is functionally equivalent to the BSD 2-Clause and MIT licenses, removing some language that is no longer necessary.<br>";
    return liBadge;
  } else if (data.license === "None") {
    var liBadge = "None";
    return liBadge;
  }
}

function renderLicenseLink(data) {
  if (data.license === "Apache") {
    var liLink = "[Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)<br>";
    return liLink;
  } else if (data.license === "MIT") {
    var liLink = "[MIT](https://choosealicense.com/licenses/mit/)<br>";
    return liLink;
  } else if (data.license === "GNU") {
    var liLink = "[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)<br>";
    return liLink;
  } else if (data.license === "ISC") {
    var liLink = "[ISC](https://choosealicense.com/licenses/isc/)<br>";
    return liLink;
  } else if (data.license === "None") {
    return '';
  }
}

function renderLicenseSection(data) {
  return `## License <br>
  <br>
  ${renderLicenseBadge(data)}
  <br>
  ${renderLicenseLink(data)}
  `
}

function contributingString(data) {
  if (data.confirmContributing === true) {
    return `### Contributing info: ${data.contributing} <br>
    <br>`;
  } else {
    return '';
  }
}

function testsString(data) {
  if (data.tests.length > 0) {
    return `### Tests info: ${data.tests} <br>
    <br>`; 
  } else {
    return '';
  }
}

module.exports = data => { 
  return `# ${data.name} <br>
  <br>
  ## Description <br>
  ${data.description} <br>
  <br>
  [GitHub Link](${data.link}) <br>
  <br>
  ## Table of Contents <br>
  * [Installation](#installation) <br>
  * [Usage](#usage) <br>
  * [License](#license) <br>
  * [Questions](#questions)<br>
  <br>
  ## Installation <br>
  ${data.installation.replace(/,/g, '<br>- ')}<br>
  <br>
  ## Usage <br>
  ${data.usage}<br>
  <br>
  <img src='${data.screenshot}'></img> <br>
  <br>
  ${contributingString(data)}
  ${testsString(data)}
  ${renderLicenseSection(data)}
  ## Questions <br>
  <br>
  GitHub username: ${data.github}<br>
  <br>
  Email me with any other questions: ${data.email}<br>
`;
}