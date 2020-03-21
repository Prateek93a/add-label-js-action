const core = require('@actions/core');
const github = require('@actions/github');
const token = process.env.Github;
if(!token){
  console.log("no token")
  return;
}
try {
  // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput('who-to-greet');
  // console.log(`Hello ${nameToGreet}!`);
  // const time = (new Date()).toTimeString();
  // core.setOutput("time", time);
  // // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
  const octokit = new github.GitHub(token);
  const pr = github.context.payload['pull_request'];
  if(!pr) return
  if(pr.body){
   console.log(pr.body)
  }
  octokit.pulls.get({
    owner:'Prateek93a',repo:'hello-world-javascript-action',pull_number: pr.number
  }).then(p=>{
    console.info(p.data.title)
    if(p.data.title){
      octokit.issues.createComment({owner:'Prateek93a',repo:'hello-world-javascript-action',issue_number: pr.number,body:'Hi there! Your Title does not match my standards'}).then(()=>{
       // do something
      })
    }
  })
} catch (error) {
  core.setFailed(error.message);
}