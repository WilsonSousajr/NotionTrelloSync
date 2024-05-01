require('dotenv').config();

const axios = require('axios');

const apiKey = process.env.TRELLO_KEY;
const token = process.env.TRELLO_TOKEN;
const boardId = process.env.TRELLO_BOARD_ID;

const fetchTrelloData = async () => {
    try{
        let allData = [];

        const listsResponse = await axios.get(`https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${token}`);
        const lists = listsResponse.data;

        for(const list of lists){

            const cardsResponse = await axios.get(`https://api.trello.com/1/lists/${list.id}/cards?key=${apiKey}&token=${token}`)
            const cards = cardsResponse.data;

            const cardsWithListName = cards.map(card => ({
                listName: list.name,
                cardName: card.name,
                cardDesc: card.desc,
                cardUrl: card.url,
                lastUpdated: card.dateLastActivity
            }));

            allData = allData.concat(cardsWithListName);
        }

        return allData;
    } catch(error){
        console.error('Error fetching Trello data:', error);
        return [];
    }
}

module.exports = fetchTrelloData;