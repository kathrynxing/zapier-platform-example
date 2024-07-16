const sample = require('../samples/sample_issue');
// A Create Action shows up in the Action step
const createIssue = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    // Defining the interaction with your API endpoint. The bundle
    // parameter holds data input and authentication information
    // from the Zap:
    url: `https://api.github.com/repos/${bundle.inputData.repo}/issues`,
    body: JSON.stringify({
      title: bundle.inputData.title
    })
  });
  return responsePromise
    .then(response => JSON.parse(response.content));
};

module.exports = { // export an object 
  key: 'issue',
  noun: 'Issue',

  display: {
    // What the user will see in the Zap Editor when selecting an action
    label: 'Create Issue',
    description: 'Creates an issue.'
  },

  operation: {
    inputFields: [
      {key: 'repo', label:'Repo', required: true, dynamic: 'repo.full_name.full_name'}, // Creates a dynamic drop-down that's populated by the 'repo' trigger
      {key: 'title', label:'Title', required: true},
      {key: 'body', label:'Body', required: false}
    ],
    perform: createIssue,
    sample: sample
  }
};
