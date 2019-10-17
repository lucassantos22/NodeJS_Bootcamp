module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'training-2-database',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
};