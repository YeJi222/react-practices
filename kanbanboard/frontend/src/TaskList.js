import React, {useState, useEffect} from 'react';
import Task from './Task';
import styles from './assets/css/TaskList.css';

// 카드 번호 가져오기 
const TaskList = ({no}) => {
    const [tasks, setTasks] = useState(null);

    const fetchTaskList = async () => {
        try{
            const response = await fetch(`/api/task?cardNo=${no}`, {
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
    
            setTasks(json.data);
        } catch(err){
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTaskList();
    }, []);

    return (
        tasks === null ?
        null :
        <div>
            <ul>
                {
                    tasks.map(task => <Task
                                        key={task.no}
                                        no={task.no}                                        
                                        name={task.name}
                                        done={task.done}
                                        tasks={tasks}
                                        setTasks={setTasks} />)
                }
            </ul>
            <input
                type='text'
                placeholder={'태스크 추가'}
                className={styles.TaskList__add_task}/>
        </div>
    );
};

export default TaskList;