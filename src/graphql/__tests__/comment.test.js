import {tester} from 'graphql-tester';

// test framework
import {create as createExpressWrapper} from '../../lib/testUtils';
import {app} from '../../app';

// models needed for these tests
import Comment from '../../models/comment'; 

// 
const testServer = tester({
	server: createExpressWrapper(app),
	url: '/graphql',
	contentType: 'application/json',
	authorization: '123',
});

// Comment related tests, GraphQL layer
describe('GraphQL - Comment ...', () => {

	describe('GraphQL - CommentOn Range ...', () => {

		let commentInsertedID;

		beforeAll(async () => {
			await Comment.remove({});
			// create a comment for a ranged URN
			const gqlComment = {
				query: `mutation {
					commentInsert(
						comment: {
							tenantId: "testTenantID",
							lemmaCitation: {
								ctsNamespace: "greekLit",
								work:"tlg001",
								textGroup:"tlg0012",
								passageFrom: [1,5],
								passageTo: [2,5],
							}
						}
					) {
						_id
					}
				}`,
				variables: {}
			};
			const commentInserted = await testServer(JSON.stringify(gqlComment));
			expect(commentInserted.error).toBeFalsy();
			commentInsertedID = commentInserted.data.commentInsert._id;
			expect(commentInsertedID).toBeTruthy();
		});
	
		afterAll(async () => {
			await Comment.remove({});
		});

		it('query range comment - exact range', async () => {
			// comment: 1.5 ... 2.5
			// query:   1.5 ... 2.5
			const gqlExactStartEnd = {
				query: `query {
					commentsOn(urn: "urn:cts:greekLit:tlg0012.tlg001.perseus-grc2:1.5-2.5") {
						_id
					}
				  }
				  `,
				variables: {}
			};
			const resExactStartEnd = await testServer(JSON.stringify(gqlExactStartEnd));
			expect(resExactStartEnd.error).toBeFalsy();
			expect(resExactStartEnd.data.commentsOn[0]._id).toBe(commentInsertedID);
		});

		it('query range comment - exact passage', async () => {
			// comment: 1.5 ... 2.5
			// query:   ... 1.7 ... 
			const gqlExactPassage = {
				query: `query {
					commentsOn(urn: "urn:cts:greekLit:tlg0012.tlg001.perseus-grc2:1.7") {
						_id
					}
				  }
				  `,
				variables: {}
			};
			const resExactPassage = await testServer(JSON.stringify(gqlExactPassage));
			expect(resExactPassage.error).toBeFalsy();
			expect(resExactPassage.data.commentsOn[0]._id).toBe(commentInsertedID);
		});

		it('query range comment - not in range - comment.passageTo < query.passageFrom different chapter', async () => {
			// comment: 1.5 ... 2.5
			// query:               3.1 ... 3.5 
			const gqlNotInRangeRight = {
				query: `query {
					commentsOn(urn: "urn:cts:greekLit:tlg0012.tlg001.perseus-grc2:3.1-3.5") {
						_id
					}
				  }
				  `,
				variables: {}
			};
			const resNotInRangeRight = await testServer(JSON.stringify(gqlNotInRangeRight));
			expect(resNotInRangeRight.error).toBeFalsy();
			expect(resNotInRangeRight.data.commentsOn[0]).toBeFalsy();
		});

		it('query range comment - not in range - comment.passageTo < query.passageFrom ', async () => {
			// comment: 1.5 ... 2.5
			// query:               2.6 ... 3.5 
			const gqlNotInRangeRight = {
				query: `query {
					commentsOn(urn: "urn:cts:greekLit:tlg0012.tlg001.perseus-grc2:2.6-3.5") {
						_id
					}
				  }
				  `,
				variables: {}
			};
			const resNotInRangeRight = await testServer(JSON.stringify(gqlNotInRangeRight));
			expect(resNotInRangeRight.error).toBeFalsy();
			expect(resNotInRangeRight.data.commentsOn[0]).toBeFalsy();
		});

		it('query range comment - not in range - comment.passageFrom > query.passageTo different chapter', async () => {
			// comment:               1.5 ... 2.5
			// query:    0.1 ... 0.6 
			const gqlNotInRangeLeft = {
				query: `query {
					commentsOn(urn: "urn:cts:greekLit:tlg0012.tlg001.perseus-grc2:0.1-0.4") {
						_id
					}
				  }
				  `,
				variables: {}
			};
			const resNotInRangeLeft = await testServer(JSON.stringify(gqlNotInRangeLeft));
			expect(resNotInRangeLeft.error).toBeFalsy();
			expect(resNotInRangeLeft.data.commentsOn[0]).toBeFalsy();
		});

		it('query range comment - not in range - comment.passageFrom > query.passageTo ', async () => {
			// comment:               1.5 ... 2.5
			// query:    1.1 ... 1.4 
			const gqlNotInRangeLeft = {
				query: `query {
					commentsOn(urn: "urn:cts:greekLit:tlg0012.tlg001.perseus-grc2:1.1-1.4") {
						_id
					}
				  }
				  `,
				variables: {}
			};
			const resNotInRangeLeft = await testServer(JSON.stringify(gqlNotInRangeLeft));
			expect(resNotInRangeLeft.error).toBeFalsy();
			expect(resNotInRangeLeft.data.commentsOn[0]).toBeFalsy();
		});

		it('query range comment - within range ', async () => {
			// comment: 1.5 ........... 2.5 
			// query:       1.7 ... 2.3
			const gqlBothWithin = {
				query: `query {
					commentsOn(urn: "urn:cts:greekLit:tlg0012.tlg001.perseus-grc2:1.7-2.3") {
						_id
					}
				  }
				  `,
				variables: {}
			};
			const resBothWithin = await testServer(JSON.stringify(gqlBothWithin));
			expect(resBothWithin.error).toBeFalsy();
			expect(resBothWithin.data.commentsOn[0]._id).toBe(commentInsertedID);
		});

	});

	describe('GraphQL - Comment Sorting ...', () => {
		/*
		0	greekLit:tlg0001.* // by textGroup
		1	greekLit:tlg0012.tlg001.perseus-grc2:1.1-2.1   // covers N nodes from chapter 1 and 1 node from chapter 2
		2	greekLit:tlg0012.tlg001.perseus-grc2:1.1-1.10 // covers (N-10)+1 less nodes than above
		3	greekLit:tlg0012.tlg001.perseus-grc2:1.1-1.2 // covers 8 less nodes than above
		4	greekLit:tlg0012.tlg001.perseus-grc2:1.2-* // by passageFrom[1]
		5	greekLit:tlg0012.tlg001.perseus-grc2:2.* // by passageFrom[0]
		6	greekLit:tlg0012.tlg002.* // by work
		7	latinLit:* // by ctsNamespace
		*/

		let expectedSortedID;

		beforeAll(async () => {
			await Comment.remove({});

			// populate comments and generate expected order of IDs
			const commentInsertQueriesInExpectedOrder = [
				{// 7
					query: `mutation {
						commentInsert(
							comment: {
								tenantId: "testTenantID",
								lemmaCitation: {
									ctsNamespace: "latinLit",
									work:"phi001",
									textGroup:"phi0119",
									passageFrom: [1,1],
									passageTo: [1,2],
								},
								commentOrder: 7,
							}
						) {
							_id
						}
					}`,
					variables: {}
				},

				{// 0
					query: `mutation {
						commentInsert(
							comment: {
								tenantId: "testTenantID",
								lemmaCitation: {
									ctsNamespace: "greekLit",
									work:"tlg001",
									textGroup:"tlg0001",
									passageFrom: [1,1],
									passageTo: [1,2],
								},
								commentOrder: 0,
							}
						) {
							_id
						}
					}`,
					variables: {}
				},

				{// 6
					query: `mutation {
						commentInsert(
							comment: {
								tenantId: "testTenantID",
								lemmaCitation: {
									ctsNamespace: "greekLit",
									work:"tlg002",
									textGroup:"tlg0012",
									passageFrom: [1,1],
									passageTo: [1,2],
								},
								commentOrder: 6,
							}
						) {
							_id
						}
					}`,
					variables: {}
				},

				{// 5
					query: `mutation {
						commentInsert(
							comment: {
								tenantId: "testTenantID",
								lemmaCitation: {
									ctsNamespace: "greekLit",
									work:"tlg001",
									textGroup:"tlg0012",
									passageFrom: [2,1],
									passageTo: [2,2],
								},
								commentOrder: 5,
							}
						) {
							_id
						}
					}`,
					variables: {}
				},

				{// 4
					query: `mutation {
						commentInsert(
							comment: {
								tenantId: "testTenantID",
								lemmaCitation: {
									ctsNamespace: "greekLit",
									work:"tlg001",
									textGroup:"tlg0012",
									passageFrom: [1,2],
									passageTo: [1,3],
								},
								commentOrder: 4,
							}
						) {
							_id
						}
					}`,
					variables: {}
				},

				{// 3
					query: `mutation {
						commentInsert(
							comment: {
								tenantId: "testTenantID",
								lemmaCitation: {
									ctsNamespace: "greekLit",
									work:"tlg001",
									textGroup:"tlg0012",
									passageFrom: [1,1],
									passageTo: [1,2],
								},
								commentOrder: 3,
							}
						) {
							_id
						}
					}`,
					variables: {}
				},

				{// 2
					query: `mutation {
						commentInsert(
							comment: {
								tenantId: "testTenantID",
								lemmaCitation: {
									ctsNamespace: "greekLit",
									work:"tlg001",
									textGroup:"tlg0012",
									passageFrom: [1,1],
									passageTo: [1,10],
								},
								commentOrder: 2,
							}
						) {
							_id
						}
					}`,
					variables: {}
				},

				{// 1
					query: `mutation {
						commentInsert(
							comment: {
								tenantId: "testTenantID",
								lemmaCitation: {
									ctsNamespace: "greekLit",
									work:"tlg001",
									textGroup:"tlg0012",
									passageFrom: [1,1],
									passageTo: [3,1],
									edition: "perseus-grc2",
								},
								commentOrder: 1,
							}
						) {
							_id
						}
					}`,
					variables: {}
				},
				
			];
			const commentsInsertionResults = commentInsertQueriesInExpectedOrder.map(async (gqlQuery) => {
				const commentInserted = await testServer(JSON.stringify(gqlQuery));
				expect(commentInserted.error).toBeFalsy();
				const commentInsertedID = commentInserted.data.commentInsert._id;
				expect(commentInsertedID).toBeTruthy();
				return commentInsertedID;
			}); 

			await Promise.all(commentsInsertionResults).then((insertedCommentIDs) => {
				expectedSortedID = insertedCommentIDs;
			});
			
		});
	
		afterAll(async () => {
			await Comment.remove({});
		});

		it('should sort comments correctly', async () => {
			const gqlQuerySorted = {
				query: `query {
					comments {
						_id
						commentOrder
					}
				  }
				  `,
				variables: {}
			};
			const resSorted = await testServer(JSON.stringify(gqlQuerySorted));
			expect(resSorted.error).toBeFalsy();
			expect(resSorted.data.comments).toBeTruthy();
			const resSortedIDs = resSorted.data.comments.map(comment => comment.commentOrder);
			expect(resSortedIDs).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
		});

	});

});
