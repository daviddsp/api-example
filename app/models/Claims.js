/** @format */

module.exports = (sequelize, type) => {
	const Claims = sequelize.define(
		'claims',
		{
			first_name: {
				type: type.STRING,
			},
			last_name: {
				type: type.STRING,
			},
			email: {
				type: type.STRING,
			},
			comments: {
				type: type.STRING,
			},
		},
		{
			timestamps: true,
		}
	);
	return Claims;
};
