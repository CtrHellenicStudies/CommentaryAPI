import User from '../../models/user';

export default class PermissionsService {
	constructor({ token }) {
		this.token = token || '';
		this.user = User.findOne({
			'services.resume.loginTokens.hashedToken': '', // TODO: figure out how to hash login token with meteor? Accounts._hashLoginToken(this.token),
		});
		this.userIsAdmin = true;// this.user && this.user.roles ? this.user.roles.indexOf('admin') !== -1 : false;
		this.userIsEditor = true;// this.user && this.user.roles ? this.user.roles.indexOf('editor') !== -1 : false;
		this.userIsCommenter = true;// this.user && this.user.roles ? this.user.roles.indexOf('commenter') !== -1 : false;
		this.userIsNobody = false;// !this.userIsAdmin && !this.userIsCommenter && !this.userIsEditor;
	}
}
