import GrouperClient from '../structures/GrouperClient';
import { getDB } from '../database';
import Tag from '../models/Tag';


/**
 * Load tags from database into client tag store
 * 
 * @param {GrouperClient} client 
 */
async function LoadTags(client) {
    getDB().query("SELECT `name`, `created_at` FROM `tags`", (err, results) => {
        if (err) {
            throw err;
        }

        for (const result of results) {
            let tag = new Tag(result.name);

            tag.setCreatedAt(result.created_at);

            client.tags.set(result.name, tag);
        }
        
        console.log('test tags');

        /**
         * Emitted when tags are loaded from database
         * 
         * @event GrouperClient#tagsLoaded
         * @param {number} client.tags.size - Number of tags loaded
         */
        client.emit('tagsLoaded', client.tags.size);
    })
}

export {
    LoadTags,
};
