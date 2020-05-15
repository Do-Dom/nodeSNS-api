module.exports = (sequelize, DataTypes) => (
	sequelize.define('domain', {
		host: {
			type: DataTypes.STRING(80),
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING(10),
			allowNull:false,
		},
		clientSecret: {
			type: DataTypes.STRING(40),
			allowNull: false,
		},
	}, {
		validate: {
			unknownType() {
				console.log(this.type, this.type !== 'free', this.type !== 'premiun');
				if(this.type !== 'free' && this.type !== 'premium') {
					throw new Error('type column must be free or premium');
				}
			},
		},
		timestamps: true,
		paranoid: true,
	})
);
