import mongoose from 'mongoose';

import Comments from '../models/comments';
import Keywords from '../models/keywords';

function commentUpdate(id, comment) {
	return new Promise(function(resolve1, rejected1) {
		Comments.update({_id: id}, comment, function(err, updated) {
			if (err) {
				console.log(err);
				rejected1(1);
			}
			console.log(_id, updated);
			resolve1(updated);
		});
	});
}
export async function passage() {
	return new Promise(function(resolve, rejected) {    
		try {
			console.log('Migration starts');
			Comments.find().limit(100000).then(function(comments) {
				const promises = [];
				for (let i = 0; i < comments.length; i += 1) {
					if (comments[i].lemmaCitation && comments[i].lemmaCitation !== undefined
                        && comments[i].lemmaCitation.passage) {

						const cutted = comments[i].lemmaCitation.passage.split('-');
						const lemmaCitation = JSON.parse(JSON.stringify(comments[i].lemmaCitation));
						const comment = comments[i];

						lemmaCitation.passageFrom = cutted[0];
						lemmaCitation.passageTo = cutted[1];
						delete lemmaCitation.passage;

						comment.lemmaCitation = lemmaCitation;
						promises.push(commentUpdate(comment._id, comment));
					}
				}
				Promise.all(promises).then(function() {
					resolve(1);
				});
			});
            
		} catch (error) {
			console.log(error);
			rejected(error);
			throw new Error(error);
		}
	});
}
