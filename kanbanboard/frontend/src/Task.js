import React, {useState} from 'react';
import styles from './assets/css/Task.css';

const Task = ({no, name, done, tasks, setTasks}) => {
    const updateTaskCheck = async (check) => {
        try{
            const response = await fetch(`/api/task/${no}?done=${check}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body: null
            });
    
            if(!response.ok){
                throw new Error(`${response.status} ${response.statusText}`)
            }

            // 해당 task no만 change 
            const json = await response.json();
            if(json.result != 'success'){
                throw new Error(`${json.result} ${json.message}`)
            }

            const copiedTasks = [...tasks];
            const noIdx = tasks.findIndex(task => task.no === json.data.no);
            copiedTasks[noIdx].done = json.data.done;

            setTasks(copiedTasks);
        } catch(err){
            console.error(err);
        }
    };

    return (
        <li className={styles.TaskList__Task}>
            <input
                type='checkbox'
                checked={done === 'Y' ? true : false}
                onChange={e => {
                    updateTaskCheck(done === 'Y' ? 'N' : 'Y');
                }}/>
            {name}    
            <a href='#' className={styles.TaskList__Task__remove} />
        </li>
    );
};

export default Task;