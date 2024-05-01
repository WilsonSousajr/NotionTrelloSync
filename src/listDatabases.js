const { Client } = require('@notionhq/client');

const notion = new Client({
    auth: 'secret_MbousWVwuArha7UuvMJLFekYvXYhPMQsVFwi9NK5nl'
})

const databaseId = '91a41a23b7bc454280f079d80ce7528b'

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