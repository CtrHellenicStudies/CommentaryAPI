import Editions from '../../../models/editions';
import PermissionsService from '../PermissionsService';
import { AuthenticationError } from '../../errors/index';

/**
 * Logic-layer service for dealing with editions
 */
export default class EditionsService extends PermissionsService {

	/**
	 * Get editions
	 * @param {string} editionId - id of edition
	 * @returns {Object[]} array of editions
	 */
	static editionsGet(editionId) {
		const args = {};

		if (editionId) {
			args._id = tenantId;
		}
		const promise = Editions.find(args).exec();
		return promise;
	}
	/**
	 * Insert edition
	 * @param {object} edition - book edition
	 * @param {string} multiline - multiline text
	 */
	editionInsert(edition, multiline) {
		if (this.userIsNobody) {
			throw new AuthenticationError();
		}
		return new Promise(function(resolve, rejected) {
			Editions.findOne(edition._id).exec().then(function(currentEdition) {
				const currentMultiline = currentEdition.multiLine && currentEdition.multiLine.length ? currentEdition.multiLine : [];
				
				if (currentMultiline.indexOf(multiline) === -1) {
					currentMultiline.push(multiline);
					currentEdition.multiLine = currentMultiline;
					Editions.update({_id: edition._id}, currentEdition, function(err, updated) {
						if (err) {
							console.log(err);
							rejected(1);
						}
						resolve(updated);
					});
				} else {
					rejected(2);
					return new Error('Multiline edition already exists!');
				}
			});
		});
	}
	/**
	 * Remove edition
	 * @param {object} edition - book edition
	 * @param {string} multiline - multiline text
	 */
	editionsRemove(edition, multiline) {
		if (this.userIsNobody) {
			throw new AuthenticationError();
		}
		return new Promise(function(resolve, rejected) {
			Editions.findOne(edition._id).exec().then(function(currentEdition) {
				const multilineIndex = currentEdition.multiLine.indexOf(multiline);
				currentEdition.multiLine.splice(multilineIndex, 1);
				Editions.update({_id: edition._id}, currentEdition, function(err, updated) {
					if (err) {
						console.log(err);
						rejected(1);
					}
					resolve(updated);
				});
			});
		});
	}
}
