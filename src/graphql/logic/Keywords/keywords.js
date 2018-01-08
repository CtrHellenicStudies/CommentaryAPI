import mongoose from 'mongoose';

import Keywords from '../../../models/keywords';
import PermissionsService from '../PermissionsService';

import { AuthenticationError } from '../../errors/index';

/**
 * Logic-layer service for dealing with keywords
 */
export default class KeywordsService extends PermissionsService {

	/**
	 * Get tags (keywords) for tenant
	 * @param {string} id - id of a tag
	 * @param {string} tenantId - id of tenant
	 * @returns {boolean} result promise
	 */
	keywordsGet(id, tenantId, slug, queryParam) {
		let args = {};
		if (queryParam) {
			args = JSON.parse(queryParam);
		}
		if (tenantId) {
			args.tenantId = tenantId;
		}
		if (id) {
			args._id = id;
		}
		if (slug) {
			args.slug = slug;
		}
		return	Keywords.find(args).sort({title: 1}).exec();
	}

	/**
	 * Remove a tag
	 * @param {string} keywordId - id of tag to remove
	 * @returns {boolean} result promise
	 */
	keywordRemove(keywordId) {
		if (this.userIsAdmin) {
			return Keywords.find({_id: keywordId}).remove().exec();
		}
		throw AuthenticationError();
	}

	/**
	 * Update a tag
	 * @param {string} keywordId - id of tag to update
	 * @param {Object} keyword - tag parameters to update
	 * @returns {boolean} result promise
	 */
	keywordUpdate(keywordId, keyword) {
		if (this.userIsAdmin) {
			return new Promise(function(resolve, rejected) {
				Keywords.update({_id: keywordId}, keyword, function(err, keywordUpdated) {
					if (err) {
						console.log(err);
						rejected(1);
					}
					resolve(keywordUpdated);
				});
			});
		}
		throw AuthenticationError();
	}
	/**
	 * Insert new tag to database
	 * @param {object} keyword
	 * @returns {boolean} result promise
	 */
	keywordInsert(keyword) {
		if (this.userIsNobody) {
			throw new AuthenticationError();
		}
		keyword._id = new mongoose.mongo.ObjectId();
		return new Promise(function(resolve, rejected) {
			Keywords.create(keyword, function(err, insertedKeyword) {
				if (err) {
					console.log(err);
					rejected(1);
				}
				resolve(insertedKeyword);
			});
		});
	}
}
