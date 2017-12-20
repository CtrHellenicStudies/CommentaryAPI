import mongoose from 'mongoose';
import slugify from 'slugify';

import TextNodes from '../../../models/textNodes';
import PermissionsService from '../PermissionsService';
import { AuthenticationError } from '../../errors/index';

/**
 * Logic-layer service for dealing with textNodes
 */
export default class TextNodesService extends PermissionsService {

	/**
	 * Create a text node
	 * @param {Object} textNode - candidate text node to create
	 * @returns {string} id of newly created text node
	 */
	textNodeCreate(textNode) {
		if (this.userIsAdmin) {
			return new Promise(function(resolve, rejection) {
				TextNodes.create(textNode, function(err, inserted) {
					if (err) {
						console.log(err);
						rejected(1);
					}
					resolve(inserted);
				});
			});
		}
		throw new AuthenticationError();
	}
	/**
	 * Update textNode
	 * @param {String} id 
	 * @param {String} editionId 
	 * @param {String} updatedText 
	 * @param {Int} updatedTextN 
	 */
	textNodeUpdate(id, editionId, updatedText, updatedTextN) {
		if (this.userIsNobody) {
			throw new AuthenticationError();
		}
		return new Promise(function(resolve, rejected) {
			TextNodes.find({_id: id}).exec().then(function(textNode) {
				if (!textNode) {
					throw new Error('text-editor', 'Unable to update text for provided text node ID');
				}
				const textNodeTextValues = textNode.text.slice();
				textNodeTextValues.forEach((textValue) => {
					if (textValue.edition === editionId) {
						textValue.html = updatedText;
						textValue.n = updatedTextN;
						textValue.text = stripTags(updatedText);
					}
				});
				textNode.text = textNodeTextValues;
				TextNodes.update({_id: id}, textNode, function(err, updated) {
					if (err) {
						console.log(err);
						rejected(1);
					}
					resolve(updated);
				});
			});
		});
	}
	/**
	 * Get text nodes
	 * @param {string} _id - id of text node
	 * @param {string} tenantId - id of current tenant
	 * @param {number} limit - limit 
	 * @param {number} skip - skip 
	 * @param {string} workSlug - slug of work
	 * @param {number} subworkN - number of subwork
	 * @param {string} editionId - id of edition
	 * @param {number} lineFrom - number of line that textnodes should be greater
	 *   than or equal to
	 * @param {number} lineTo - number of line that textnodes should be less than
	 *   or equal to
	 * @returns {Object[]} array of text nodes
	 */
	static textNodesGet(_id, tenantId, limit, skip, workSlug, subworkN, editionId, lineFrom, lineTo) {
		const args = {};
		const options = {};

		if (_id) {
			args._id = new mongoose.Types.ObjectID(_id);
		}
		if (editionId) {
			args['text.edition'] = editionId;
		}
		if (lineFrom) {
			args['text.n'] = { $gte: lineFrom };
		}
		if (lineTo) {
			args.$and = [{'text.n': { $gte: lineFrom }}, {'text.n': { $lte: lineTo }}];
		}
		if (lineTo === 0) {
			args.$and = [{'text.n': { $gte: lineFrom }}, {'text.n': { $lte: lineFrom }}];
		}
		if (workSlug) {
			args['work.slug'] = slugify(workSlug);
		}
		if (subworkN) {
			args['subwork.n'] = parseInt(subworkN, 10);
		}

		if (limit) {
			options.limit = limit;
		} else {
			options.limit = 100;
		}

		if (skip) {
			options.skip = skip;
		} else {
			options.skip = 0;
		}
		return TextNodes.find(args)
			.skip(options.skip)
			.limit(options.limit)
			.sort({
				'work.slug': 1,
				'text.n': 1,
			})
			.exec();
	}

	/**
	 * Remove a text node
	 * @param {string} textNodeId - id of text node
	 * @returns {boolean} result from mongo orm remove
	 */
	textNodeRemove(id) {
		if (this.userIsAdmin) {
			const removeId = new mongoose.Types.ObjectID(id);
			return TextNodes.find({_id: removeId}).remove().exec();
		}
		return new AuthenticationError();
	}
	/**
	 * Get max line
	 * @param {String} workSlug 
	 * @param {Number} subworkN 
	 */
	static getMaxLine(workSlug, subworkN) {

		let maxLine = 0;
		
		if (workSlug === 'homeric-hymns') {
			workSlug = 'hymns';
		}
	
		return new Promise(function(resolve, rejected) {
			TextNodes.aggregate([{
				$match: {
					'work.slug': workSlug,
					'subwork.n': subworkN,
				},
			}, {
				$group: {
					_id: 'maxLine',
					maxLine: {
						$max: '$text.n',
					},
				},
			}]).exec().then(function(_maxLine) {
				if (_maxLine && _maxLine.length) {
					maxLine = _maxLine[0].maxLine[0]; // granted that all text.editions have the same max line number
				}
			
				resolbe(maxLine);
			});
		});
	
	}
}
