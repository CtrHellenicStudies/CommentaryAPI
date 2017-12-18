export default class PermissionsService {
	constructor(props) {
		this.user = props && props.user ? props.user : null;

		console.log('Permissions Service user and project', this.user);
		this.userRolesForProject = [];
	}
	hasExamplePermission() {
		console.log('Granted example permission for user: ', this.user);
		return true;
	}
}
