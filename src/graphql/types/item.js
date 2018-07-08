import {
	GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt,
} from 'graphql';
import createType from 'mongoose-schema-to-graphql';

// types
import FileType, { FileInputType } from './file';
import MetadataType, { MetadataInputType } from './metadata';
import ManifestType from './manifest';

// logic
import ItemService from '../logic/items';
import FileService from '../logic/files';
import ManifestService from '../logic/manifests';

// models
import Item from '../../models/item';


const config = {
	name: 'ItemType',
	description: 'Item Schema base query type',
	class: 'GraphQLObjectType',
	schema: Item.schema,
	exclude: [],
	extend: {
		files: {
			type: new GraphQLList(FileType),
			description: 'Get item files',
			resolve(item, args, { token }) {
				const fileService = new FileService(token);
				return fileService.getFiles({ itemId: item._id });
			}
		},
		filesCount: {
			type: GraphQLInt,
			description: 'Count all item files',
			resolve(item, args, { token }) {
				const fileService = new FileService(token);
				return fileService.count({ itemId: item._id });
			}
		},
		metadata: {
			type: new GraphQLList(MetadataType),
			description: 'Get item metadata',
			resolve(item, args, context) {
				return item.metadata;
			}
		},
		manifest: {
			type: ManifestType,
			description: 'Get a IIIF manifest for all image files associated with item',
			resolve(parent, _, { token }) {
				const manifestService = new ManifestService(token);
				return manifestService.getManifest({ itemId: parent._id, });
			}
		},
	},
};

const configInput = {
	name: 'ItemInputType',
	description: 'Item Schema base create input type',
	class: 'GraphQLInputObjectType',
	schema: Item.schema,
	exclude: ['createdAt', 'updatedAt'],
	extend: {
		metadata: {
			type: new GraphQLList(MetadataInputType)
		},
	}
};

const ItemType = createType(config);
const ItemInputType = createType(configInput);

export default ItemType;
export { ItemInputType };
