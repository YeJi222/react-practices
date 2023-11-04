import React, {useState} from 'react';
import styles from './assets/css/Task.css';

const Task = ({no, name, done}) => {
    const [checkedToggle, setCheckedToggle] = useState(done);

    return (
        <li className={styles.TaskList__Task}>
            <input
                type='checkbox'
                checked={checkedToggle}
                onChange={e => {
                    setCheckedToggle(!checkedToggle);
                }}/>
            {name}    
            <a href='#' className={styles.TaskList__Task__remove} />
        </li>
    );
};

export default Task;