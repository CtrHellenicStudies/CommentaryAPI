import mongoose from 'mongoose';

import Keywords from '../../../models/keyword';
import PermissionsService from '../PermissionsService';

import { AuthenticationError } from '../../errors';

/**
 * Logic-layer service for dealing with keywords
 */
export default class KeywordsService extends PermissionsService {

	/**
	 * Get tags (keywords) for tenant
	 * @param {string} id - id of a tag
	 * @param {string} slug - slug of a tag
	 * @param {string} tenantId - id of tenant
	 * @returns {boolean} result promise
	 */
	async getKeyword(id, slug, tenantId) {
		const args = {};
		if (tenantId) {
			args.tenantId = tenantId;
		}
		if (id) {
			args._id = id;
		}
		if (slug) {
			args.slug = slug;
		}
		const keyword = await Keywords.findOne(args);
		return keyword;
	}

	/**
	 * Get tags (keywords) for tenant
	 * @param {string} id - id of a tag
	 * @param {string} tenantId - id of tenant
	 * @returns {boolean} result promise
	 */
	async getKeywords(tenantId, queryParam) {
		let args = {};
		if (queryParam) {
			args = JSON.parse(queryParam);
		}
		if (tenantId) {
			args.tenantId = tenantId;
		}
		const keywords = await Keywords.find(args).sort({title: 1});
		return keywords;
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
