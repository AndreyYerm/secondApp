/* eslint-disable */
// @ts-nocheck

/* eslint linebreak-style: ["error", "windows"] */

import { invoke, requestJira } from '@forge/bridge'


export const getAllProjects = async () => {
  const jiraUser = await requestJira(`/rest/api/3/project`)
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => error)
  return await jiraUser
}


export const getProjectIssues = async (key: string) => {
  const jiraProject = await requestJira(`/rest/api/3/search?jql=project+%3D+${key}+order+by+created+DESC`)
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => error)
  return await jiraProject
}

export const createIssue = async (summary: string, type: string, projId: string) => {
  const bodyReq = `{
    "update": {},
    "fields": {
      "summary": "${summary}",
      "issuetype": { 
        "id": "${type}"
      },
      "description": {
          "version": 1,
          "type": "doc",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "Title of description",
                  "marks": [
                    {
                      "type": "strong"
                    }
                  ]
                }
              ]
            },
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "Some text to check description"
                }
              ]
            },
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "Read more",
                  "marks": [
                    {
                      "type": "link",
                      "attrs": {
                        "href": "no link"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        
      },
      "project": {
        "id": "${projId}"
      },
      "assignee": {
        "id": "63ac46bfd3aeefa405424d2d"
      }
    }
  }`;
  const issueInfo = await requestJira(`/rest/api/3/issue`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyReq
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => error)
  return await issueInfo
}