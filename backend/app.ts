import express, { Request, Response } from "express";
import mysql, { RowDataPacket } from "mysql2";
import { geographies_type, provinces_type, showDetail_type } from "./type";

const app = express();
const cors = require("cors");
const port = 4040;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crudreactexpress",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

app.get("/", (req: Request, res: Response) => {
  connection.query(
    "SELECT * FROM geographies",
    (err, results: geographies_type[]) => {
      if (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ error: "Error fetching data" });
      }
      res.json(results);
    }
  );
});

app.get("/provinces/:geography_id", (req: Request, res: Response) => {
  const geography_id = req.params.geography_id;
  const query =
    "SELECT * FROM provinces WHERE geography_id = ? ORDER BY id ASC";

  connection.query(query, [geography_id], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Error fetching data" });
    }

    res.json(results);
  });
});

app.get("/amphures/:province_id", (req: Request, res: Response) => {
  const province_id = req.params.province_id;
  const query = "SELECT * FROM amphures WHERE province_id = ? ORDER BY id ASC";

  connection.query(query, [province_id], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Error fetching data" });
    }

    res.json(results);
  });
});

app.get("/districts/:amphure_id", (req: Request, res: Response) => {
  const amphure_id = req.params.amphure_id;
  const query = "SELECT * FROM districts WHERE amphure_id = ? ORDER BY id ASC";

  connection.query(query, [amphure_id], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Error fetching data" });
    }

    res.json(results);
  });
});

app.get("/showDetail/", (req: Request, res: Response) => {
  const query = `
                  SELECT c.*,
                        g.name AS geographies_name,
                        p.name_th AS provinces_name,
                        d.name_th AS districts_name,
                        d.zip_code AS zip_code,
                        a.name_th AS amphures_name
                  FROM custommer AS c
                  LEFT JOIN geographies AS g ON g.id = c.geographies_id
                  LEFT JOIN provinces AS p ON p.id = c.provinces_id
                  LEFT JOIN districts AS d ON d.id = c.districts_id
                  LEFT JOIN amphures AS a ON a.id = c.amphures_id
                  ORDER BY c.id ASC
                `;

  connection.query(query, (err, results: showDetail_type) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Error fetching data" });
    }

    res.json(results);
  });
});

app.post("/addCustommer", (req: Request, res: Response) => {
  const data = req.body;

  // ดึงข้อมูลลูกค้าจากฐานข้อมูลโดยใช้ชื่อผู้ใช้
  const selectQuery =
    "SELECT * FROM custommer WHERE username = ? AND password = ?";
  connection.query(
    selectQuery,
    [data.username, data.password],
    (err, rows: RowDataPacket[]) => {
      if (err) {
        console.error("Error selecting data:", err);
        res.status(500).json({ message: err });
        return;
      }

      if (rows.length === 0) {
        // Insert data into the database
        const query = "INSERT INTO custommer SET ?";
        connection.query(query, data, (err, results) => {
          if (err) {
            console.error("Error inserting data:", err);
            res.status(500).json(err);
          } else {
            console.log("Data inserted successfully");
            res.status(200).json({ message: "Data inserted successfully" });
          }
        });
      } else {
        res
          .status(200)
          .json({ message: "มีข้อมูล Username และ Password แล้วในระบบ" });
      }
    }
  );
});

app.put('/updateItem/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedData = req.body;

  const checkmember =  "SELECT * FROM custommer WHERE id = ?";

  connection.query(checkmember, [itemId], (error, results: RowDataPacket[]) => {
    if (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'Error updating data' });
      return;
    }
    if(results.length > 0){

      const updateQuery = `
      UPDATE custommer
      SET fname = ?, lname = ?, gender = ?, phone = ?, email = ?, username = ?
      , password = ?, geographies_id  = ?, provinces_id   = ?, amphures_id    = ?
      , districts_id = ?
      WHERE id = ?
    `;
    connection.query(updateQuery, [updatedData.fname, updatedData.lname, updatedData.gender, updatedData.phone, updatedData.email
      , updatedData.username, updatedData.password, updatedData.geographies_id, updatedData.provinces_id
      , updatedData.amphures_id, updatedData.districts_id , itemId], (error, results) => {
      if (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Error updating data' });
        return;
      }
      console.log('Data updated successfully!');
      res.status(200).json({ message: 'Data updated successfully' });
    });
    }else{
      console.error("Error Nodata Customer:", error);
      res.status(500).json(error);
    }

  });
});


app.delete("/deleteItem/:itemId", (req: Request, res: Response) => {
  const itemId = parseInt(req.params.itemId);

  // ทำการลบข้อมูลจากฐานข้อมูล
  const query = "DELETE FROM custommer WHERE id = ?"; // แก้ชื่อตารางเป็น "customer"
  connection.query(query, [itemId], (err, result) => {
    if (err) {
      console.error("Error deleting item:", err);
      res.status(500).json({ message: "Error deleting item" });
    } else {
      res.status(200).json({ message: "Delete Item Successfully" });
    }
  });
});

app.get("/customer/edit/:id", (req: Request, res: Response) => {
  const id = req.params.id;
    const query = `
    SELECT c.*,
          g.name AS geographies_name,
          p.name_th AS provinces_name,
          d.name_th AS districts_name,
          d.zip_code AS zip_code,
          a.name_th AS amphures_name
    FROM custommer AS c
    LEFT JOIN geographies AS g ON g.id = c.geographies_id
    LEFT JOIN provinces AS p ON p.id = c.provinces_id
    LEFT JOIN districts AS d ON d.id = c.districts_id
    LEFT JOIN amphures AS a ON a.id = c.amphures_id
    WHERE c.id = ?
    ORDER BY c.id ASC
  `;
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Error fetching data" });
    }

    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
