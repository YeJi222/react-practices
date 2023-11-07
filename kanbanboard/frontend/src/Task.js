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

            const copiedTasks = [...tasks]; // tasks 배열 복사 
            const noIdx = tasks.findIndex(task => task.no === json.data.no); // 변경된 task no의 리스트 index 찾기 
            copiedTasks[noIdx].done = json.data.done; // 변경할 리스트 index의 done(체크여부)만 변경해주기 

            setTasks(copiedTasks); // 업데이트하여 재구성한 배열 set
        } catch(err){
            console.error(err);
        }
    };

    const deleteTask = async () => {
        try{
            const response = await fetch(`/api/task/delete/${no}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body: null
            });
    
            if(!response.ok){
                throw new Error(`${response.status} ${response.statusText}`)
            }

            // 해당 task만 delete - filtering
            const json = await response.json();
            if(json.result != 'success'){
                throw new Error(`${json.result} ${json.message}`)
            }

            const newTasks = tasks.filter((task) => task.no != json.data);
            setTasks(newTasks);
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
            <a onClick={deleteTask} className={styles.TaskList__Task__remove} />
        </li>
    );
};

export default Task;