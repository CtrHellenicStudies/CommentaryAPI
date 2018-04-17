describe('Database tests ...', () => {

	it('should be using the test database', () => {
		const expectedTestDBName = 'ahcip_test';
		expect(process.env.DB_NAME).toEqual(expectedTestDBName);
	});

});
