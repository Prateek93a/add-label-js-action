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
  const owner = 'Prateek93a';
  const repo = 'hello-world-javascript-action';
  if(!pr) return
  if(pr.body){
   console.log(pr.body)
  }
  octokit.pulls.get({
    owner:'Prateek93a',repo:'hello-world-javascript-action',pull_number: pr.number
  }).then(p=>{
    console.info(p.data.title)
    if(p.data.title){
      console.log(p.data.body);
      if(p.data.title.toLowerCase().includes('feature')){
        octokit.issues.addLabels({
          owner,
          repo,
          issue_number: p.data.number,
          labels:['feature']
        });

      }else if(p.data.title.toLowerCase().includes('improvement')){
        octokit.issues.addLabels({
          owner,
          repo,
          issue_number: p.data.number,
          labels:['improvement']
        });

      }else if(p.data.title.toLowerCase().includes('fix')){
        octokit.issues.addLabels({
          owner,
          repo,
          issue_number: p.data.number,
          labels:['fix']
        });

      }else if(p.data.title.toLowerCase().includes('chore')){
        octokit.issues.addLabels({
          owner,
          repo,
          issue_number: p.data.number,
          labels:['chore']
        });
      }else{
      octokit.issues.createComment({owner:'Prateek93a',repo:'hello-world-javascript-action',issue_number: pr.number,body:'Hi there! Your Title does not match my standards'}).then(()=>{
        octokit.pulls.update({
          owner,
          repo,
          pull_number: p.data.number,
          state:'closed'
        });
      })
      }
    }
  })
} catch (error) {
  core.setFailed(error.message);
}