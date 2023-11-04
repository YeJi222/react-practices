import React from 'react';
import styles from './assets/css/KanbanBoard.css';
import CardList from './CardList';
import cards from './assets/json/data';

const KanbanBoard = () => {
    return (
        <div className={styles.KanbanBoard}>
            <CardList 
                key={'To Do'}
                title={'To Do'}
                cards={cards.filter(card => card.status === 'ToDo')}/>
            <CardList
                key={'Doing'}
                title={'Doing'}
                cards={cards.filter(card => card.status === 'Doing')}/>
            <CardList
                key={'Done'}
                title={'Done'}
                cards={cards.filter(card => card.status === 'Done')}/>
        </div>
    );
};

// filter : 배열 요소를 조건에 따라 필터링하여 새로운 배열을 생성하여 반환
// cards 배열에서 status에 따라 필터링 

export default KanbanBoard;