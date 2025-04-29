const { Client } = require("cassandra-driver");
async function run() {
  const client = new Client({
    cloud: {
    secureConnectBundle: "D:\\Academics\\0TY\\Labs\\Sem-VI\\ADSL\\22510034_Assignment09\\student-cassandra\\secure-connect-db.zip",
    },
    credentials: {
    username: "jUmZYXgbFNACyOfMzZWfldvX",
    password: "lx,.GCeziXjBF_aNlbi4_QpM1i0IioFZhXEYpefuiCN1SCGyeMeHbas3RjK4FjLb_FawZTB5awydb,N1Z+P9AJUp26pPRLISrx1oRHww3mqsYUvEmUw68HNH,MYT9.80",
    },
  });

  await client.connect();

  // Execute a query
  const rs = await client.execute("SELECT * FROM system.local");
  console.log(`Your cluster returned ${rs.rowLength} row(s)`);

  await client.shutdown();
}

// Run the async function
run();