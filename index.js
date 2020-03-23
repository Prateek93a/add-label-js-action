const core = require('@actions/core');
const github = require('@actions/github');
const token = process.env.Github;
if(!token){
  console.log("no token")
  process.exit(1);
}
try {
  const octokit = new github.GitHub(token);
  const pr = github.context.payload['pull_request'];
  const owner = 'Prateek93a';
  const repo = 'hello-world-javascript-action';
  if(!pr) process.exit(1);
  octokit.pulls.get({
    owner:'Prateek93a',repo:'hello-world-javascript-action',pull_number: pr.number
  }).then(p=>{
    console.info(p.data.title)
    if(p.data.title){
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
        const message = 'Hi there! Your Title does not match the accepted format'
      octokit.issues.createComment({owner:'Prateek93a',repo:'hello-world-javascript-action',issue_number: pr.number,body:message}).then(()=>{
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
