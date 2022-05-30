"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Students", // table name
      "resetToken", // new field name
      {
        type: Sequelize.STRING,
        default: "",
      }
    );
    await queryInterface.addColumn(
      "Students", // table name
      "expireToken", // new field name
      {
        type: Sequelize.DATE,
        allowNull: true,
      }
    );
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
