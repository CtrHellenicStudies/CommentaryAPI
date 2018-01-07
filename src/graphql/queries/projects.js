import { GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';

// types
import ProjectType from '../types/project';

// Logic
import ProjectService from '../logic/projects';


const projectQueryFields = {
	project: {
		type: ProjectType,
		description: 'Get project document',
		args: {
			_id: {
				type: GraphQLString,
			},
			slug: {
				type: GraphQLString,
			},
			hostname: {
				type: GraphQLString,
			},
		},
		async resolve (parent, { _id, slug, hostname }, { token }) {
			const projectService = new ProjectService(token);
			const project = await projectService.getProject({ _id, slug, hostname });
			return project;
		},
	},
	checkProjectAvailability: {
		type: ProjectType,
		description: 'Check if project hostname is available',
		args: {
			hostname: {
				type: GraphQLString,
			},
		},
		async resolve (parent, { hostname }, { token }) {
			const projectService = new ProjectService(token);
			const project = await projectService.getProject({ hostname });
			return project;
		}
	},
	projects: {
		type: new GraphQLList(ProjectType),
		description: 'Get list of projects',
		args: {
			textsearch: {
				type: GraphQLString,
			},
			limit: {
				type: GraphQLInt,
			},
			offset: {
				type: GraphQLInt,
			},
		},
		async resolve (parent, { limit, offset, textsearch }, { token }) {
			const projectService = new ProjectService(token);
			const projects = await projectService.getProjects({ limit, offset, textsearch });
			return projects;
		}
	},
	userProjects: {
		type: new GraphQLList(ProjectType),
		description: 'Get list of projects that a user belongs to',
		args: {
			limit: {
				type: GraphQLInt,
			},
			offset: {
				type: GraphQLInt,
			},
		},
		async resolve (parent, { limit, offset }, { token }) {
			const projectService = new ProjectService(token);
			const projects = await projectService.getUserProjects({ limit, offset });
			return projects;
		},
	},
};

export default projectQueryFields;
