import React, {useState, useEffect} from 'react';
import './assets/scss/App.scss';
import RegisterForm from './RegisterForm';
import SearchBar from './SearchBar';
import Emaillist from './Emaillist';
// import data from './assets/json/data';

function App() {
    const [emails, setEmails] = useState(null);
    const searchEmail = (keyword) => {
        const newEmails = emails.filter(email => email.firstName.indexOf(keyword) !== -1 || email.lastName.indexOf(keyword) !== -1 || email.email.indexOf(keyword) !== -1);
        setEmails(newEmails);
    };

    const addEmail = async (email) => {
        try{
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

            const newEmails = [json.data, ...emails];
            setEmails(newEmails);
        } catch(err){
            console.error(err);
        }
    }

    /*
    const fetchEmails = async () => {
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
        // fetchEmails();
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