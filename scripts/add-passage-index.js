import dotenv from 'dotenv';
import axios from 'axios';
import { createApolloFetch } from 'apollo-fetch';

import logger from '../src/lib/logger';
import dbSetup, { closeDB } from '../src/mongoose';
import Comment from '../src/models/comment';
import serializeUrn from '../src/modules/cts/lib/serializeUrn';



dotenv.config();
const db = dbSetup();

const uri = 'http://api.chs.local:3002/graphql';
const apolloFetch = createApolloFetch({ uri });


const groupTextNodesByEdition = (textNodes) => {
	const editions = [];
	let isInEdition = true;

	textNodes.forEach((textNode) => {
		isInEdition = false;

		editions.forEach((edition) => {
			if (
        (
            textNode.version
          && textNode.version.slug === edition.slug
        )
        || (
            textNode.translation
          && textNode.translation.slug === edition.slug
        )
      ) {
				edition.textNodes.push(textNode);
				isInEdition = true;
			}
		});

		if (!isInEdition) {
			let slug = '';
			if (textNode.version) {
				slug = textNode.version.slug;
			} else if (textNode.translation) {
				slug = textNode.translation.slug;
			}

			editions.push({
				slug,
				textNodes: [textNode],
			});
		}
	});

  // sort edition by textNodes returned
	editions.sort((a, b) => {
		if (a.textNodes.length < b.textNodes.length)			{ return -1; }
		if (a.textNodes.length > b.textNodes.length)			{ return 1; }
		return 0;
	});

	return editions;
};


const lookupTextNodeIndexByUrn = async (textNodesUrn) => {
	const res = await apolloFetch({
		query: `
      query textNodesQuery($textNodesUrn: CtsUrn!) {
      	textNodes(urn: $textNodesUrn, language: "greek") {
      		id
      		text
      		location
      		urn
          index

      		version {
      			id
      			title
      			slug
      		}

      		translation {
      			id
      			title
      			slug
      		}

      		language {
      			id
      			title
      			slug
      		}
      	}
      }
    `,
		variables: {
			textNodesUrn,
		},
	});

	return groupTextNodesByEdition(res.data.textNodes);
};


const addPassageIndexToLemmaCitationInComments = async () => {

	const comments = await Comment.find();
	let comment;

	for (let i = 0; i < comments.length; i += 1) {
		comment = comments[i];

		if (!comment.lemmaCitation) {
			continue; // eslint-disable-line
		}

		const textNodesUrn = serializeUrn(comment.lemmaCitation);
		const editions = await lookupTextNodeIndexByUrn(textNodesUrn);

		if (!editions || !editions.length || !editions[0].textNodes.length) {
			continue; // eslint-disable-line
		}

		comment.lemmaCitation.passageIndex = editions[0].textNodes[0].index;
		comment.lemmaCitation.passageLength = editions[0].textNodes.length;
		await Comment.update({ _id: comment._id }, {
			$set: {
				lemmaCitation: comment.lemmaCitation,
			},
		});
	}

};



db.on('error', logger.error)
	.on('disconnected', dbSetup)
	.once('open', async () => {
		logger.info(`Connected to mongodb ( host: ${db.host}, port: ${db.port}, name: ${db.name} )`);

		try {
      // Add passage index to lemma citation to sort on for all comments
			await addPassageIndexToLemmaCitationInComments();
		} catch (err) {
			logger.error(err);
		}

		db.close(() => {
			logger.info('Connection closed');
			process.exit(0);
		});
	});
