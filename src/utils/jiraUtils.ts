import fetch from 'node-fetch';

export const getJiraInfoFromAPI =  (issueIdOrKey?: String): any => {

    return fetch(`https://jira.canadadrives.ca/rest/api/2/issue/${issueIdOrKey}`, {
    method: 'GET',
    headers: {
        'Authorization': `Basic ${Buffer.from(
            `${process.env.JIRAACCOUNTNAME}:${process.env.JIRAPASSWORD}`
        ).toString('base64')}`,
        'Accept': 'application/json'
    }
    })
    .then(response => {
        console.log(
        `Response: ${response.status} ${response.statusText}`
        );
        return response.json();
    })
    .then(response => {

        const { fixVersions } = response.fields;
        // it is an array, we can add multiple version tag on a ticket. However, we seems only use one version tag/ticket.
        const {
            name: requiredVersion
          } = fixVersions[0];

        return requiredVersion
    })
    .catch(err => {

        console.error(err)
        return ''
    });
}