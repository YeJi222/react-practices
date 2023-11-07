import React, {useState, useEffect, useRef} from 'react';
import Task from './Task';
import styles from './assets/css/TaskList.css';

const TaskList = ({no}) => {
    const refForm = useRef(null);
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

    const addTask = async (newTask) => {
        try{
            const response = await fetch('/api/task', {
                method: 'post', 
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body: JSON.stringify(newTask)
            });

            if(!response.ok){
                throw new Error(`${response.status} ${response.statusText}`)
            }

            const json = await response.json();
            if(json.result != 'success'){
                throw new Error(`${json.result} ${json.message}`)
            }

            setTasks([json.data, ...tasks]);
        } catch(err){
            console.error(err);
        }
    }

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

            <form 
                ref={refForm}
                onSubmit={(e) => {
                    e.preventDefault();
                    if(e.target.contents.value.trim() != ''){ // 빈칸 입력되지 않도록 
                        const newTask = {
                            name: e.target.contents.value,
                            done: 'N',
                            cardNo: no
                        };

                        addTask(newTask);
                        refForm.current.reset();
                    }
                    console.error('태스크 추가 칸을 입력해주세요');
                }}>
                <div className={styles.add_area}>
                    <input
                        type='text'
                        placeholder={'태스크 추가'}
                        name='contents'
                        className={styles.TaskList__add_task}
                    /> 
                    <input type='submit' value='추가' className={styles.add_button} />
                </div>
            </form> 
        </div>
    );
};

export default TaskList;