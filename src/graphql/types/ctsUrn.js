import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';


/**
 * Custom graphql scalar type representing a CTS URN as individual input components
 */
const CtsUrn = new GraphQLScalarType({
	name: 'CtsUrn',
	description: 'GraphQL custom scalar type to represent a CTS URN',

	parseValue(value) {
		return `urn:cts:${value.ctsNamespace}:${value.work.join('.')}:${value.passage.join('-')}`;
	},

	serialize(value) {
		const result = `urn:cts:${value.ctsNamespace}:${value.work.join('.')}:${value.passage.join('-')}`;

		return result;
	},

	parseLiteral(ast) {
		let result = null;
		let value;
		let ctsUrnParams = [];

		switch (ast.kind) {
		case 'StringValue':
			value = ast.value;
			ctsUrnParams = value.split(':');

			if (ctsUrnParams.length) {
				result = {};
				result.ctsNamespace = ctsUrnParams[2];
				result.work = ctsUrnParams[3].split('.');
				result.passage = ctsUrnParams[4].split('-');
			}
			break;
		case 'ObjectValue':
			result = ast.value;
			break;
		case 'ArrayValue':
			if (ast.value.length === 3) {
				result = {};
				result.ctsNamespace = ast.value[2];
				result.work = ast.value[3].split('.');
				result.passage = ast[4].split('-');
			}
			break;
		default:
			result = null;
			break;
		}

		return result;
	},

});


export default CtsUrn;
