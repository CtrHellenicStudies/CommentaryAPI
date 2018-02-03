import _ from 'underscore';
import winston from 'winston';

import Comments from '../src/models/comments';


/**
 * mapping between previous Commentaries works and tlg indices
 */
const tlgMappingForWorks = [{
	title: 'Iliad',
	slug: 'iliad',
	tlg: 'tlg001',
	tlgAuthor: 'tlg0012',
}, {
	title: 'Odyssey',
	slug: 'odyssey',
	tlg: 'tlg002',
	tlgAuthor: 'tlg0012',
}, {
	title: 'Homeric Hymns',
	slug: 'homeric-hymns',
	tlgAuthor: 'tlg0013',
	subworks: _.range(0, 33),
}, {
	title: 'Olympian',
	slug: 'olympian',
	tlg: 'tlg001',
	tlgAuthor: 'tlg0033',
}, {
	title: 'Pythian',
	slug: 'pythian',
	tlg: 'tlg002',
	tlgAuthor: 'tlg0033',
}, {
	title: 'Nemean',
	slug: 'nemean',
	tlg: 'tlg003',
	tlgAuthor: 'tlg0033',
}, {
	title: 'Isthmean',
	slug: 'isthmean',
	tlg: 'tlg004',
	tlgAuthor: 'tlg0033',
}];


/**
 * Change all work, subwork, lineFrom, and lineTo to lemmaCitation object
 */
export async function up () {
	winston.info('Starting comment lemmaCitation migration');
	// update all comments
	const comments = await this('Comments').find();
	comments.forEach(async (comment) => {
		const lemmaCitation = {
			corpus: 'greekLit',
			textGroup: null,
			work: null,
			passageFrom: null,
			passageTo: null,
		};

		// set tlg information for urns
		tlgMappingForWorks.forEach((mapping) => {
			if (
				comment.work
				&& comment.work.slug === mapping.slug
			) {
				lemmaCitation.textGroup = mapping.tlgAuthor;
				lemmaCitation.work = mapping.tlg;
			}
		});

		// set passageFrom and passageTo
		if (comment.subwork) {
			lemmaCitation.passageFrom = [comment.subwork.n, comment.lineFrom];
			if ('lineTo' in comment && comment.lineTo) {
				lemmaCitation.passageTo = [comment.subwork.n, comment.lineTo];
			}
		}

		// update comments
		const update = await this('Comments').update({
			_id: comment._id,
		}, {
			$set: {
				work: null,
				subwork: null,
				lineFrom: null,
				lineTo: null,
				lemmaCitation,
			},
		});
	});

	winston.info('Migration completed successfully');
	return true;
}

/**
 * Change all lemmaCitation to work, subwork, lineFrom, and lineTo
 */
export async function down () {
	winston.info('Reverting comment lemmaCitation migration');
	const comments = await this('Comments').find();

	// update all comments
	comments.forEach(async (comment) => {
		// set tlg information for urns
		tlgMappingForWorks.forEach((mapping) => {
			if (
				comment.lemmaCitation
				&& comment.lemmaCitation.work === mapping.tlg
			) {
				comment.work = mapping;
			}
		});

		if (comment.lemmaCitation.passageFrom && comment.lemmaCitation.passageFrom.length) {
		// set subwork
			comment.subwork = {
				title: comment.lemmaCitation.passageFrom[0],
				n: comment.lemmaCitation.passageFrom[0],
			};

			// set linefrom, lineto
			comment.lineFrom = comment.lemmaCitation.passageFrom[1];
			if (comment.lemmaCitation.passageTo && comment.lemmaCitation.passageTo.length) {
				comment.lineTo = comment.lemmaCitation.passageTo[1];
			}
		}

		// update comments
		const update = await this('Comments').update({
			_id: comment._id,
		}, {
			$set: {
				work: comment.work,
				subwork: comment.subwork,
				lineFrom: comment.lineFrom,
				lineTo: comment.lineTo,
				lemmaCitation: null,
			},
		});
	});

	winston.info('Migration reverted successfully');
	return true;
}
