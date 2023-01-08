/* eslint-disable */
// @ts-nocheck

/* eslint linebreak-style: ["error", "windows"] */

import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import { createIssue, getAllProjects, getProjectIssues } from '../service/common_API';
import Button, { ButtonGroup } from '@atlaskit/button';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import Avatar from '@atlaskit/avatar';
import Select from '@atlaskit/select';
import { SpotlightCard } from '@atlaskit/onboarding';
import TextField from '@atlaskit/textfield';
import Form, { Field, FormFooter } from '@atlaskit/form';
import { InputField } from './components/InputField';
import { CurrentIssue } from '../service/models';


function mainPage() {
    const [projects, setProjects] = useState<array>([]);
    const [issues, setIssues] = useState<array>([]);
    const [currentProject, setCurrentProject] = useState<object>(undefined)
    const [currentIssue, setCurrentIssue] = useState<CurrentIssue | undefined>(undefined)
    const [button, setButton] = useState<string>('')
    const [dataStore, setDataStore] = useState<string>('Enter the key to get data')
    
    useEffect(()=>{
        (async()=>{

            if (currentProject) {
                const newIssueList = await getProjectIssues(currentProject.value)
                setIssues(newIssueList.issues)
            }
            
        })()
    },[currentProject])



    useEffect(()=>{
        (async()=>{

            const projData = await invoke('getAllProjects')  // FROM BACK-END FORGE API
            console.log('projData',projData)
            console.log('projName',projData.map(item=>item.name ))

            const data2 = await getAllProjects()
            setProjects(data2)
            console.log('data2',data2)

            const data3 = await getProjectIssues("NEW")
            console.log('data3',data3)
        })()
    },[])

    return (
        <div>
            <div style={{display:'flex'}}>
                <SpotlightCard>
                    <h1 style={{color: 'white'}}>Issue information</h1>
                    <br/>
                    <div >
                        <Select
                            inputId="single-select-example"
                            className="single-select"
                            classNamePrefix="react-select"
                            options={projects.map(proj => ({
                                label: proj.name, value: proj.key
                            }))}
                            onChange={(value) => {console.log(value); setCurrentProject(value)}}
                            placeholder="Choose a project"
                        />

                        <Select
                            inputId="single-select-example"
                            className="single-select"
                            classNamePrefix="react-select"
                            options={issues.map(issue => ({
                                label: issue?.key, value: issue?.key
                            }))}
                            onChange={(obj) => {
                                const key = obj?.value

                                const newIssue = issues.find(o => o.key === key)
                                setCurrentIssue(newIssue)
                            }}
                            placeholder="Choose an issue"
                        />
                    </div>
                    <p></p>
                    <p>Issue id: {currentIssue?.id}</p>
                    <p>Issue key: {currentIssue?.key}</p>
                    <p>Issue type: {currentIssue?.fields?.issuetype?.name}</p>
                    <p>Issue creator: {currentIssue?.fields?.creator?.displayName}</p>
                    <p>Issue assignee: {async () => {
                        if (currentIssue?.fields?.assignee?.displayName == null){
                            return 'no assignee'
                        }
                        else{
                            return await currentIssue?.fields?.assignee?.displayName
                        }
                    }}</p>
                    <p>Issue reporter: {currentIssue?.fields?.reporter?.displayName}</p>
                    <p>Issue status: {currentIssue?.fields?.status?.name}</p>
                </SpotlightCard>

                <div
                    style={{
                    display: 'flex',
                    width: '400px',
                    maxWidth: '100%',
                    margin: '0 auto',
                    flexDirection: 'column',
                    }}
                >
                    <h1>Create issue</h1>
                    <Form<{
                        summary: string,
                        issueType: string,
                        projectId: string
                    }>
                        onSubmit={async (data) => {
                            await createIssue(data.summary, data.issueType, data.projectId)
                        }}
                    >
                    {({formProps}) => (
                        <form {...formProps}>
                        <Field
                            aria-required={true}
                            name="summary"
                            defaultValue=""
                            label="Issue summary"
                            isRequired
                        >
                            {({fieldProps}) => <TextField {...fieldProps} />}
                        </Field>

                        <Field
                            aria-required={true}
                            name="issueType"
                            defaultValue=""
                            label="Issue type"
                            isRequired
                        >
                            {({fieldProps}) => <TextField {...fieldProps} />}
                        </Field>

                        <Field
                            aria-required={true}
                            name="projectId"
                            defaultValue=""
                            label="Project id"
                            isRequired
                        >
                            {({fieldProps}) => <TextField {...fieldProps} />}
                        </Field>

                        {/* <InputField name={"newLine"} label={"New Line"}/> */}

                        <FormFooter>
                            <Button appearance="primary" type="submit">Create</Button>
                        </FormFooter>
                        </form>
                    )}
                    </Form>
                </div>
            </div>
            <br/>
            <div
                style={{
                display: 'flex',
                width: '400px',
                maxWidth: '100%',
                margin: '0 auto',
                flexDirection: 'column',
                }}
            >
                <h1>Data storage</h1>
                <Form<{
                    key: string,
                    info: any
                }>
                    onSubmit={async (data) => {
                        if (button == 'set') {
                            await invoke('setData', {key:`${data.key}`, data:`${data.info}`})
                            .then(setDataStore('Your data has been succsesfully stored!'))
                        }
                        else if (button == 'get') {
                            const storedData = await invoke('getData', {key:`${data.key}`})
                            setDataStore(`Your data: ${storedData}`)
                            console.log(storedData)
                        }
                        else if (button == 'delete') {
                            await invoke('deleteData', {key:`${data.key}`})
                            .then(setDataStore('Your data has been deleted'))
                        }
                    }}
                >
                    {({formProps}) => (
                        <form {...formProps}>
                        <Field
                            aria-required={true}
                            name="key"
                            defaultValue=""
                            label="Enter key"
                            isRequired
                        >
                            {({fieldProps}) => <TextField {...fieldProps} />}
                        </Field>

                        <Field
                            aria-required={true}
                            name="info"
                            defaultValue=""
                            label="Enter data"
                        >
                            {({fieldProps}) => <TextField {...fieldProps} />}
                        </Field>

                        <FormFooter>
                            <ButtonGroup appearance="primary">
                                <Button type="submit"
                                    onClick={() => {
                                        setButton('set')
                                    }}
                                >Set data</Button>
                                <Button type="submit"
                                    onClick={() => {
                                        setButton('get')
                                    }}
                                >Get data</Button>
                                <Button type="submit"
                                    onClick={() => {
                                        setButton('delete')
                                    }}
                                >Delete data</Button>
                            </ButtonGroup>
                        </FormFooter>
                        </form>
                    )}
                </Form>
                <h3>{dataStore}</h3>
                <br/>
            </div>
            <div>Test</div>
        </div>
    );
}

export default mainPage;
