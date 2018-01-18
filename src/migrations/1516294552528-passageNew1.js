
import mongoose from 'mongoose';
import Comments from '../models/comments';

/**
 * Make any changes you need to make to the database here
 */

export async function up() {
	try {
		console.log('Migration starts');
		const comments = this('comments').find();
		for (let i = 0; i < comments.length; i += 1) {
			console.log(i);
			const lemmaCitation = comments[i].lemmaCitation;
			console.log(lemmaCitation);
			const cutPassage = comments[i].lemmaCitation.passage.split('-');
			comments[i].lemmaCitation.passageFrom = cutPassage[0];
			comments[i].lemmaCitation.passageTo = cutPassage[1];
			delete comments[i].lemmaCitation.passage;
		//	await this('comments').update({_id: comments[i]._id}, comments[i]);
		}
	} catch (error) {
		console.log(error);
		throw new Error(error); 
	}
	return lib.getPromise();
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
exports.down = function down(done) {
	done();
};

