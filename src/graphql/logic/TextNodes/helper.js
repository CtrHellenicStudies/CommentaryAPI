
function resolveURN(urn) {

	const args = {};
	if (!urn) {
		return args;
	}
	const selectedURN = urn.v2 ? urn.v2 : unr.v1;
	const splitedURN = urn.split(':');
	const splittedDatas = splitedURN.split('.');

	args['work.slug'] = slugify(splittedDatas[0].toLowerCase());
	args['subwork.n'] = parseInt(splittedDatas[1], 10);
	args.$and = [{'text.n': { $gte: parseInt(splittedDatas[2].split('-')[0], 10)}}, {'text.n': { $lte: parseInt(splittedDatas[3], 10) }}];
	if (parseInt(splittedDatas[3], 10) === 0) {
		args.$and = [{'text.n': { $gte: parseInt(splittedDatas[2].split('-')[0], 10) }}, {'text.n': { $lte: parseInt(splittedDatas[2].split('-')[0], 10) }}];
	}
	return args;
}

export { resolveURN };
