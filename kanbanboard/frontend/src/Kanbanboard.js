import React, {useState, useEffect} from 'react';
import styles from './assets/css/KanbanBoard.css';
import CardList from './CardList';

const KanbanBoard = () => {
    const [cards, setCards] = useState(null);

    const fetchCards = async () => {
        try{
            const response = await fetch('/api/card', {
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

            setCards(json.data);
        } catch(err){
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    return (
        cards === null ?
        null :
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