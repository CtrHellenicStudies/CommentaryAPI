import mockingoose from 'mockingoose';
import mongoose from 'mongoose';
import Users from '.././user'; // variable name has to be the same as defined in model, eg. `Users` in `mongoose.model('Users', UserSchema); `

describe('User model ...', () => {

	it('should be able to findOne document', async () => {
		// SETUP
		const _userRegisteredByPassportLocalMongoose = {
			_id: '5abbf3c3d3919a112db3a9bf',
			createdAt: '2018-03-28T19:57:55.572Z',
			updatedAt: '2018-03-28T19:57:55.572Z',
			salt: 'dab45489682f89f4536919d4fc1c9e496512b5e3e54c95eaae2a53aa54fccdc6',
			hash: '6704e03d0fcb58b3d1eba3221fe32d6e22c97697a94704129cb1f3e1d4810386af64e3a65d0f5b00e4100642e04465080a4a4ebca326d78c50fb9cd9ccff7aa852597a0b5f2aca517ba9c72f810644d1a67de7197f95963f70297385edb810e0e51b1003b77f7b63c020f8eb7aaa93180effad399bd17872bfa360a8f7e3dfeb5b17d70abaf8f4bf8021f0acab65118c0ef39e3b30bff53c1582040948fcbe970e6d8a06133dd50891f29a90ed60434db51b60aedabb2561228ff501dafe307b62d79927c65f16db90533397976f0f83375f1147a951a6f42d96a0a03011510c4a9e87686788ca8c52bda910b27611bf90aea7d3d42f4bb3b24df2589b3fe873c6e4ab688335bda1e4bba00c72e71a680eee2d0ca8c82559b0410d0871923edf13a50b82930e28ebd1945d3b8bab6fe5cce8224002dc435c326ba0eeee107480e64d16010f8d6f3f01536a7f99af8e1f34acbf6a26b42b51597d5d77c8f87fde749da7d6ee503bcac02fa264f4bd833c644d9277938ddb43c6248c0e53cc951c83ce547b2cd6450329a72b4b5c96f7abf9b1a41cbcce78eb9a44cb6c8146f527cde7ea0604b6148e1631f98e80d1c37f031e10a7736e9318191d6d5e334f29b9e314380ad1c4cbae7d55d1144e1f9236e2abfd1a2c964c2007fad0603970744d62ade83fc6e86b24ff230443b4cf6a897f4038a27e9db5ebd27d4620c5318091',
			username: 'hao@archimedes.digital',
			roles: [],
			oauthIds: [],
			canEditCommenters: [],
			__v: 0
		};
		mockingoose.Users.toReturn(_userRegisteredByPassportLocalMongoose, 'findOne');

		// RUN
		const oneUser = await Users.findOne();
		
		// CHECK
		expect(oneUser.toObject()).toHaveProperty('_id');
		expect(oneUser.toObject()).toHaveProperty('username');
		expect(oneUser).toBeInstanceOf(Users);
	});

});
