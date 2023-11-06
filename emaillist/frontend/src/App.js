import React, {useState, useEffect} from 'react';
import './assets/scss/App.scss';
import RegisterForm from './RegisterForm';
import SearchBar from './SearchBar';
import Emaillist from './Emaillist';
// import data from './assets/json/data';

function App() {
    const [emails, setEmails] = useState(null);
    const searchEmail = (keyword) => {
        const newEmails = data.filter(email => email.firstName.indexOf(keyword) !== -1 || email.lastName.indexOf(keyword) !== -1 || email.email.indexOf(keyword) !== -1);
        setEmails(newEmails);
    };

    const addEmail = async (email) => {
        const insertResponse = await fetch('/api', {
            method: 'post', 
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(email)
        });

        if(!insertResponse.ok){
            throw new Error(`${insertResponse.status} ${insertResponse.statusText}`)
        }

        const json = await insertResponse.json();
        if(json.result != 'success'){
            throw new Error(`${json.result} ${json.message}`)
        }

        const newEmails = [...emails, json.data];
        setEmails(newEmails);
    }

    /*
    const fetchList = async () => {
        try{
            const response = await fetch('/api', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body: null
            });

            if(!response.ok){
                throw new Error(`${response.status} ${response.statusText}`)
            }

            const json = await response.json();
            if(json.result != 'success'){
                throw new Error(`${json.result} ${json.message}`)
            }

            setEmails(json.data);
        } catch(err){
            console.error(err);
        }
    };
    */

    useEffect(() => {
        // fetchList();
        (async () => {
            try{
                const response = await fetch('/api', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept':'application/json'
                    },
                    body: null
                });
    
                if(!response.ok){
                    throw new Error(`${response.status} ${response.statusText}`)
                }
    
                const json = await response.json();
                if(json.result != 'success'){
                    throw new Error(`${json.result} ${json.message}`)
                }
    
                setEmails(json.data);
            } catch(err){
                console.error(err);
            }
        })();
    }, []);

    return (
        <div id={'App'}>
            <RegisterForm addEmail={addEmail}/>
            <SearchBar searchEmail={searchEmail}/>
            {
                emails === null ?
                null :
                <Emaillist emails={emails} />
            }
        </div>
    );
}

export {App};