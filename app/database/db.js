import postgres from "postgres";

const sql = postgres({
  host: "localhost", // Postgres ip address[s] or domain name[s]
  port: 5432, // Postgres server port[s]
  database: "social_media", // Name of database to connect to
  username: "postgres", // Username of database user
  password: "haianh6311", // Password of database user
});

export default sql;
