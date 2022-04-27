module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('workers', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

};
