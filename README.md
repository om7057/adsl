### ASSIGNMENT-1

# Distributed MySQL Server + MySQL Client 
# Check if exists 8 on both pcs

## Disable all the firewalls

Step 1 : 
Device -1 : MySQL Server

Install the following : 

https://dev.mysql.com/downloads/mysql/ .msi

Step 2 : 
Install and setup only server for pc1 and give it a root password

Go to mysql server folder in program files in MYSQL in C drive and create my.ini as follows 

!
[mysqld]
bind-address = 0.0.0.0
!

Step 3 : 
Open mysql workbench and paste the following in a sample sql file

!
CREATE USER 'root'@'%' IDENTIFIED BY 'Om7249@123';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
!

Step 4 : 
Device -2 : MySQL Client :
Install .msi at the following link 

https://dev.mysql.com/downloads/workbench/

Step 5 : 
Go to cmd as administrator : 
mysql -h IP_OF_SERVER -u 22510034 -p


Step 5 : Execute Queries

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100),
    salary DECIMAL(10,2)
);


INSERT INTO employees (name, position, salary)
VALUES ('Alice Johnson', 'Software Engineer', 85000.00);

INSERT INTO employees (name, position, salary)
VALUES ('Bob Smith', 'Product Manager', 95000.00);



UPDATE employees
SET salary = 90000.00
WHERE id = 1;














# Assignment 11
Steps : 
Download neo4j desktop by simply giving credentials and storing the activation key

Place the required .csv files into the import folder

Create a new project in the neo4j 

Connect neo4j to browser


Insert following queries into neo4j browser : 

1) LOAD CSV WITH HEADERS FROM 'file:///papers.csv' AS row
MERGE (p:Paper {paper_id: row.paper_id})
SET p.title = row.title;


2) LOAD CSV WITH HEADERS FROM 'file:///authors.csv' AS row
MERGE (:Author {name: row.author_name});


3) LOAD CSV WITH HEADERS FROM 'file:///wrote.csv' AS row LIMIT 9000
MATCH (a:Author {name: row.author_name})
MATCH (p:Paper {paper_id: row.paper_id})
MERGE (a)-[:WROTE]->(p);


4)CREATE CONSTRAINT paper_id_unique IF NOT EXISTS
FOR (p:Paper) REQUIRE p.paper_id IS UNIQUE;

CREATE CONSTRAINT author_name_unique IF NOT EXISTS
FOR (a:Author) REQUIRE a.name IS UNIQUE;

CREATE CONSTRAINT classification_name_unique IF NOT EXISTS
FOR (c:Classification) REQUIRE c.name IS UNIQUE;


5) LOAD CSV WITH HEADERS FROM 'file:///citations.csv' AS row
MATCH (p1:Paper {paper_id: row.source})
MATCH (p2:Paper {paper_id: row.target})
MERGE (p1)-[:CITES]->(p2);



6) LOAD CSV WITH HEADERS FROM 'file:///classifications.csv' AS row
WITH row
WHERE row.class_name IS NOT NULL AND row.class_name <> ""
MERGE (c:Classification {name: row.class_name})
WITH c, row
WHERE row.parent_class IS NOT NULL AND row.parent_class <> ""
MERGE (parent:Classification {name: row.parent_class})
MERGE (c)-[:SUBCLASS_OF]->(parent);


7) LOAD CSV WITH HEADERS FROM 'file:///wrote.csv' AS row
MATCH (a:Author {name: row.author_name})
MATCH (p:Paper {paper_id: row.paper_id})
MERGE (a)-[:WROTE]->(p);


Debugging Queries

1) MATCH (a:Paper)-[r:CITES]->(b:Paper)
RETURN a.paper_id, b.paper_id
LIMIT 10;
 

## Assignment-12 : Only Neo4j

Working queries

CREATE (t1:TrainStation {city: 'Copenhagen', latitude: 55.672874, longitude: 12.56459})
CREATE (o1:Office {city: 'Malmo', latitude: 55.611784, longitude: 12.994341})
CREATE (t1)-[:TRAVEL_ROUTE]->(o1)


UNWIND range(1, 10000) AS id
CREATE (:Location {
  id: id,
  city: 'City' + id,
  latitude: 50 + rand() * 10,
  longitude: 10 + rand() * 10
})




MATCH (a:TrainStation {city: 'Copenhagen'})
MATCH (b:Office)
WITH point({latitude: a.latitude, longitude: a.longitude}) AS pointA,
     point({latitude: b.latitude, longitude: b.longitude}) AS pointB, b
RETURN b.city, point.distance(pointA, pointB) AS dist
ORDER BY dist ASC
LIMIT 1;



UNWIND range(1, 10000) AS id
CREATE (:Location {
  id: id,
  city: 'City' + id,
  latitude: 50 + rand() * 10,
  longitude: 10 + rand() * 10
})


MATCH (a:TrainStation {city: 'Copenhagen'})
MATCH (b:Location)
WITH point({latitude: a.latitude, longitude: a.longitude}) AS center,
     point({latitude: b.latitude, longitude: b.longitude}) AS p, b
WHERE point.distance(center, p) < 10000  
RETURN b.city, point.distance(center, p) AS dist
ORDER BY dist ASC



MATCH (a:TrainStation {city: 'Copenhagen'})
MATCH (b:Location)
WITH point({latitude: a.latitude, longitude: a.longitude}) AS center,
     point({latitude: b.latitude, longitude: b.longitude}) AS p, b
WHERE point.distance(center, p) < 10000  
RETURN b.city, point.distance(center, p) AS dist
ORDER BY dist ASC






CREATE (:TrainStation {city: 'Stockholm', latitude: 59.3293, longitude: 18.0686});
CREATE (:TrainStation {city: 'Oslo', latitude: 59.9139, longitude: 10.7522});
CREATE (:Office {city: 'Gothenburg', latitude: 57.7089, longitude: 11.9746});
CREATE (:Office {city: 'Helsinki', latitude: 60.1699, longitude: 24.9384});





CREATE (:Location {city: 'Lund', latitude: 55.7047, longitude: 13.1910});
CREATE (:Location {city: 'Aarhus', latitude: 56.1629, longitude: 10.2039});
CREATE (:Location {city: 'Reykjavik', latitude: 64.1466, longitude: -21.9426});
CREATE (:Location {city: 'Vilnius', latitude: 54.6872, longitude: 25.2797});



MATCH (n:Location) RETURN n.city, n.latitude, n.longitude LIMIT 10;


CREATE (cph:TrainStation {city: 'Copenhagen', latitude: 55.6761, longitude: 12.5683});
CREATE (osl:TrainStation {city: 'Oslo', latitude: 59.9139, longitude: 10.7522});




CREATE (ml:Office {city: 'Malmo', latitude: 55.6050, longitude: 13.0038});
CREATE (gbg:Office {city: 'Gothenburg', latitude: 57.7089, longitude: 11.9746});



CREATE (:Location {city: 'Lund', latitude: 55.7047, longitude: 13.1910});
CREATE (:Location {city: 'Aarhus', latitude: 56.1629, longitude: 10.2039});




MATCH (a:TrainStation {city: 'Copenhagen'}), (b:Office {city: 'Malmo'})
CREATE (a)-[:ROUTE_TO]->(b);

MATCH (a:TrainStation {city: 'Oslo'}), (b:Office {city: 'Gothenburg'})
CREATE (a)-[:ROUTE_TO]->(b);



MATCH (n) RETURN n;




MATCH (a:TrainStation {city: 'Copenhagen'})
MATCH (b:Location)
WITH point({latitude: a.latitude, longitude: a.longitude}) AS pa,
     point({latitude: b.latitude, longitude: b.longitude}) AS pb, a, b
WHERE point.distance(pa, pb) < 100000
RETURN a, b;




MATCH (a:TrainStation), (b:Office)
WITH a, b, point({latitude: a.latitude, longitude: a.longitude}) AS pa,
             point({latitude: b.latitude, longitude: b.longitude}) AS pb
WITH a, b, point.distance(pa, pb) AS dist
ORDER BY dist
WITH a, collect({office: b, dist: dist})[0] AS nearest
RETURN a, nearest.office;



MATCH (a:TrainStation)-[r:ROUTE_TO]->(b:Office)
WITH a, b, r,
     point({latitude: a.latitude, longitude: a.longitude}) AS pa,
     point({latitude: b.latitude, longitude: b.longitude}) AS pb
RETURN a, b, r, point.distance(pa, pb) AS dist
ORDER BY dist;


# ✅ Assignment 10 – Cassandra Cluster Setup using Docker

## 🧰 Requirements
- Docker installed on all PCs
- Each PC must be connected to the same local network
- Cassandra image from Docker Hub
- Firewall disabled or ports opened (`7000`, `7001`, `7199`, `9042`)

## 📥 Step 1: Pull the Cassandra Docker Image

```bash
docker pull cassandra:latest
```

## 🌐 Step 2: Get IPs of All PCs in the Network

Run on each PC:
```bash
ip a
```
Note the `inet` IP address under the Wi-Fi/Ethernet interface (e.g., `192.168.0.172`).

## 🌱 Step 3: Seed Node Setup

Choose one machine as the **Seed Node**.

### ✅ On Seed Node (e.g., IP = `192.168.0.172`):

```bash
docker run -d --name cassandra-seed   -e CASSANDRA_CLUSTER_NAME="TestCluster"   -e CASSANDRA_BROADCAST_ADDRESS=192.168.0.172   -e CASSANDRA_LISTEN_ADDRESS=192.168.0.172   -e CASSANDRA_RPC_ADDRESS=0.0.0.0   -e MAX_HEAP_SIZE=512M   -e HEAP_NEWSIZE=100M   --network=host   cassandra:latest
```

> 🛠️ Why we added `MAX_HEAP_SIZE` and `HEAP_NEWSIZE`? Cassandra by default may get killed with `Exit(137)` due to memory spikes.

## 🌿 Step 4: Connect Other Nodes

Use the Seed Node’s IP in the command below.

### ✅ On Node 2 (e.g., IP = `192.168.0.174`):

```bash
docker run -d --name cassandra-node2   -e CASSANDRA_CLUSTER_NAME="TestCluster"   -e CASSANDRA_SEEDS=192.168.0.172   -e CASSANDRA_BROADCAST_ADDRESS=192.168.0.174   -e CASSANDRA_LISTEN_ADDRESS=192.168.0.174   -e CASSANDRA_RPC_ADDRESS=0.0.0.0   -e MAX_HEAP_SIZE=512M   -e HEAP_NEWSIZE=100M   --network=host   cassandra:latest
```

Repeat for more nodes, adjusting the `BROADCAST_ADDRESS` and `LISTEN_ADDRESS`.

## 🚀 Step 5: Monitor the Containers

### ✅ Check status:
```bash
docker ps -a
```

### ✅ View logs (use proper hyphen `-`, not Word-style dash `–`):
```bash
docker logs -f cassandra-seed
```
Look for:
```
Created default superuser role 'cassandra'
```

## 🖥️ Step 6: Enter Cassandra Shell

### ✅ Use this command (with correct `-`):
```bash
docker exec -it cassandra-seed cqlsh
```

Test:
```sql
SELECT release_version FROM system.local;
```

## 📊 Step 7: View Cluster Status

```bash
docker exec -it cassandra-seed nodetool status
```

You should see:
```
UN  192.168.0.172   ...   cassandra-seed
UN  192.168.0.174   ...   cassandra-node2
```
`UN` = Up and Normal

## 🗃️ Step 8: Create Keyspace and Table

In `cqlsh`:
```sql
CREATE KEYSPACE my_keyspace WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
};
USE my_keyspace;

CREATE TABLE students (
  id UUID PRIMARY KEY,
  name TEXT,
  email TEXT
);

INSERT INTO students (id, name, email) VALUES (uuid(), 'Riya', 'riya@example.com');
SELECT * FROM students;
```

## 🔁 Resilience Test (Optional)

Try stopping one node:
```bash
docker stop cassandra-node2
```

Cassandra will continue working. When you start the node again:
```bash
docker start cassandra-node2
```

It will rejoin the cluster automatically with no data loss.

## ✅ Common Fixes Recap

| Issue                  | Fix                                                                 |
|------------------------|----------------------------------------------------------------------|
| `Exited (137)`         | Use `MAX_HEAP_SIZE=512M` and `HEAP_NEWSIZE=100M`                    |
| File not found         | Use correct dashes (`-`, not `–`)                                   |
| Container already exists | Use `docker rm -f container-name`                                 |
| Firewall blocks ports  | Run `sudo ufw disable` or allow ports `7000`, `9042`, etc.          |
| Wrong IP               | Always recheck with `ip a` before running Docker commands           |


For Creating keyspace : 
CREATE KEYSPACE my_keyspace
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

after use my_keyspace ;

Then perform normal sql crud operations 


9.	Once all the PCs show up in the cassandra Cluster, we can run commands in the cql lang to create and update database from any of the nodes

10.	Even if one node goes down, the other takes over, processing the queries till the nodes come back together, no data is lost





## For NDB Clustering using docker 

https://github.com/TerminatorShri/22510025_ADSL/tree/main/22510025_Assignment_8/backend
