require('dotenv').config();

const { Client } = require('@notionhq/client');

const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

const databaseId = process.env.NOTION_DATABASE_ID;

async function getDatabaseDetails(){
    try{
        const response = await notion.databases.retrieve({
            database_id: databaseId 
        })
        console.log(response)
    } catch (error) {
        console.error('Error fetching database details: ', error)
    }
}

getDatabaseDetails();