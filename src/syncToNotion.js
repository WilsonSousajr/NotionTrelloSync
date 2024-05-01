require('dotenv').config();

const { Client } = require('@notionhq/client');
const fetchTrelloData = require('./fetchTrelloData');

const notion = new Client({
    auth: process.env.NOTION_TOKEN
});

const databaseId = process.env.NOTION_DATABASE_ID;

const syncToNotion = async () => {
    console.log("Syncing data to Notion...")
    try {
        const trelloData = await fetchTrelloData();
        for(const card of trelloData){
            console.log("Syncing card to Notion...", card.cardName);
            await notion.pages.create({
                parent: { database_id: databaseId },
                properties: {
                    'Card name': {
                        title: [
                            {
                                text: {
                                    content: card.cardName
                                }
                            }
                        ]
                    },
                    'List name': {
                        select: { name: card.listName }
                    },
                    'Card description': {
                        rich_text: [{
                            text: {
                                content: card.cardDesc || "No description"
                            }
                        }]
                    },
                    'Card Url': {
                        url: card.cardUrl
                    },
                    'Last updated': {
                        date: {start: new Date(card.lastUpdated).toISOString()}
                    }
                }
            })
            console.log(`Card '${card.cardName}' from list '${card.listName}' added to Notion.`)
        }
    } catch (error){
        console.error('Error syncing data to Notion', error)
    }
}

syncToNotion();