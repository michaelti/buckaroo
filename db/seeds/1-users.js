const usersData = [
    {
        id: 1,
        email: "user@example.com",
        name: "Example User",
        password: "$2b$12$LfBsbfWePugr3oVYS/5xX.Jl4KVIHWnLvAb35/jnALPrrp3Kv79YG",
    },
    {
        id: 2,
        email: "user+2@example.com",
        name: "Example User 2",
        password: "$2b$12$LfBsbfWePugr3oVYS/5xX.Jl4KVIHWnLvAb35/jnALPrrp3Kv79YG",
    },
    {
        id: 3,
        email: "user+3@example.com",
        name: "Example User 3",
        password: "$2b$12$LfBsbfWePugr3oVYS/5xX.Jl4KVIHWnLvAb35/jnALPrrp3Kv79YG",
    },
];

exports.seed = async function (knex) {
    await knex("users").del();
    await knex("users").insert(usersData);
};
