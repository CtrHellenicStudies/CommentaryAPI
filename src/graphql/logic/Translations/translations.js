import TranslationNodes from '../../../models/translationNodes';
import Works from '../../../models/works';
import PermissionsService from '../PermissionsService';
import { AuthenticationError } from '../../errors/index';

/**
 * Logic-layer service for dealing with translations
 */
export default class TranslationsService extends PermissionsService {

	/**
	 * DEPRECATED
	 * Get translations
	 * @param {string} tenantId - id of current tenant
	 * @returns {Object[]} array of translations 
	 */
	static translationGet(tenantId) {
		const args = {};

		if (tenantId) {
			args.tenantId = tenantId;
		}

		return TranslationNodes.find(args).exec();
	}
	/**
	 * Get Authors of work
	 * @param {String} workId - id of work which authors
	 * @param {Number} subwork - subwork number
	 * @returns {object} promise 
	 */
	static getAuthors(workId, subwork) {

		return new Promise(function(resolve, rejected) {
			if (!workId || !subwork) {
				resolve([]);
				return;
			}
			Works.findOne({_id: workId}).exec().then(function(work) {
				console.log(work);
				TranslationNodes.find({work: work.slug, subwork: parseInt(subwork, 10)}).exec().then(function(translations) {
					const authors = {};
					const ret = [];
					for (let i = 0; i < translations.length; i += 1) {
						if (!authors[translations[i].author]) {
							authors[translations[i].author] = true;
							ret.push(translations[i]);
						}
					}
					console.log(ret);
					resolve(ret);
				});
			});
		});
	}
	/**
	 * Update translation node
	 * @param {object} translationNode 
	 * @returns {object} promise
	 */
	translationUpdate(translationNode) {

		if (this.userIsNobody) {
			throw new AuthenticationError();
		}
		return new Promise(function(resolve, rejected) {
			if (!translationNode.n)	{ 
				rejected(); 
			}
			const query = {
				author: translationNode.author,
				n: translationNode.n,
				subwork: translationNode.subwork,
				work: translationNode.work
			};
			delete translationNode._id;
			return TranslationNodes.findOneAndUpdate(query, translationNode, function(err, _translationNode) {
				if (err) {
					console.log(err);
					rejected(err);
				}
				resolve(_translationNode._id);
			});
		});
	}
	/**
	 * Update translation author
	 * @returns {object} promise
	 */
	translationUpdateAuthor() {
		if (this.userIsNobody) {
			throw new AuthenticationError();
		}
	}
	/**
	 * add new translation author
	 * @param {object} workDetails 
	 * @param {string} authorName 
	 * @returns {object} promise
	 */
	translationAddAuthor(workDetails, authorName) {
		if (this.userIsNobody) {
			throw new AuthenticationError();
		}
			// TODO: remove this after changing to workId instead of a slug
		const workSlug = Works.findOne(workDetails.work).slug;
		return new Promise(function(resolve, rejected) {
			Works.findOne(workDetails.work).exec().then(function(work) {
				const newAuthor = Object.assign({}, workDetails, {author: authorName, work: workSlug});
				TranslationNodes.create(newAuthor, function(err, inserted) {
					if (err) {
						console.log(err);
						rejected(1);
					}
					resolve(inserted);
				});
			});
		});
	}
	/**
	 * Remove selected translation node
	 * @param {String} id - translationNode id 
	 * @returns {object} promise

	 */
	translationRemove(id) {
		if (this.userIsNobody) {
			throw new AuthenticationError();
		}
		return TranslationNodes.findOne({_id: id}).remove().exec();
	}
}
