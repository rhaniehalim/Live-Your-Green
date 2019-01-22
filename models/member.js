var bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
    var Member = sequelize.define("Member", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });


    //using bcrypt to compare entered password to stored hashed password
    Member.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    //hash entered password before member added to table
    // Member.hook("beforeCreate", function(user) {
    //     Member.password = bcrypt.hashSync(Member.password, bcrypt.genSaltSync(12), null);
    // });
    return Member;
};

