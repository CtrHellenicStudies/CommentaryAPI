import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';

// types
import ProjectType, { ProjectInputType } from '../types/project';
import RemoveType from '../types/remove';

// Logic
import ProjectService from '../logic/projects';


const projectMutationFields = {
	projectCreate: {
		type: ProjectType,
		description: 'Create a new project',
		args: {
			project: {
				type: new GraphQLNonNull(ProjectInputType)
			}
		},
		async resolve(parent, { project }, { token }) {
			const projectService = new ProjectService(token);
			const projectCreated = await projectService.create(project);
			return projectCreated;
		},
	},

	projectUpdate: {
		type: ProjectType,
		description: 'Update project',
		args: {
			project: {
				type: new GraphQLNonNull(ProjectInputType),
			},
		},
		async resolve (parent, { project }, { token }) {
			const projectService = new ProjectService(token);
			const projectUpdated = await projectService.update(project);
			return projectUpdated;
		}
	},

	projectRemove: {
		type: RemoveType,
		description: 'Remove project',
		args: {
			_id: {
				type: new GraphQLNonNull(GraphQLString),
			},
			hostname: {
				type: new GraphQLNonNull(GraphQLString)
			},
		},
		async resolve (parent, { _id, hostname }, { token }) {
			const projectService = new ProjectService(token);
			const remove = await projectService.remove(_id, hostname);
			return remove;
		},
	},
};

export default projectMutationFields;
