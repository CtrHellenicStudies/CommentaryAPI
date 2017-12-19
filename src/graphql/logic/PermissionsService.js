import User from '../../models/user';

export default class PermissionsService {
	constructor({ token }) {
		this.token = token || '';
		this.user = User.findOne({
			'services.resume.loginTokens.hashedToken': '', // TODO: figure out how to hash login token with meteor? Accounts._hashLoginToken(this.token),
		});
		// console.log(token, this.user);
		this.userIsAdmin = this.user && this.user.roles ? this.user.roles.indexOf('admin') !== -1 : false;
		this.userIsEditor = this.user && this.user.roles ? this.user.roles.indexOf('editor') !== -1 : false;
		this.userIsCommenter = this.user && this.user.roles ? this.user.roles.indexOf('commenter') !== -1 : false;
		this.userIsNobody = !this.userIsAdmin && !this.userIsCommenter && !this.userIsEditor;
	}
}
