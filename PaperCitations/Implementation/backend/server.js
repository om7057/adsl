// server.js
const express = require('express');
const cors = require('cors');
const neo4j = require('neo4j-driver');

const app = express();
app.use(cors());

const driver = neo4j.driver(
  'bolt://localhost:7689',
  neo4j.auth.basic('neo4j', 'Om7249@123') 
);

app.get('/citation-check', async (req, res) => {
    const { from, to } = req.query;
    const session = driver.session();
    console.log(`Received request with from: ${from}, to: ${to}`);
  
    try {
      const result = await session.run(
        `MATCH (a:Paper {paper_id: $from})-[:CITES]->(b:Paper {paper_id: $to}) 
         RETURN a.paper_id AS fromPaperId, b.paper_id AS toPaperId`,
        { from, to }
      );
  
      // Log the result of the query
      console.log('Neo4j query result:', result.records);
  
      if (result.records.length > 0) {
        res.json({ cites: true });
      } else {
        res.json({ cites: false });
      }
    } catch (error) {
      console.error('Error occurred while querying Neo4j:', error);
      res.status(500).json({ error: 'An error occurred while checking citation' });
    } finally {
      await session.close();
    }
  });
  

app.listen(3000, () => console.log('API running on http://localhost:3000'));
