const DB_USERNAME = "photografinderUser";
const DB_PASSWORD = "to9c15bm0R628TG7";
const DB_CERT_PATH = "src\\ssl\\ca-certificate.crt";
export const DB_CONN_STRING = "mongodb+srv://"+ DB_USERNAME +":"+ DB_PASSWORD + "@db-mongodb-lon1-31633-56b1883f.mongo.ondigitalocean.com/photografinder?authSource=admin&replicaSet=db-mongodb-lon1-31633&tls=true&tlsCAFile="+ DB_CERT_PATH;