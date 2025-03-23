import express from "express";
import cors from "cors";
import fs from "fs";
import csvParser from "csv-parser";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 3000;

const RECORDS_FILE = "records.csv";

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

// Função para ler o recorde do CSV
function lerRecorde() {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(RECORDS_FILE)) {
      fs.writeFileSync(RECORDS_FILE, "nick,score\nDesconhecido,0");
    }

    const records = [];
    fs.createReadStream(RECORDS_FILE)
      .pipe(csvParser())
      .on("data", (row) => records.push(row))
      .on("end", () => {
        if (records.length > 0) {
          resolve({ nick: records[0].nick, score: Number(records[0].score) });
        } else {
          resolve({ nick: "Desconhecido", score: 0 });
        }
      })
      .on("error", reject);
  });
}

// Rota para obter o recorde
app.get("/records", async (req, res) => {
  try {
    const recorde = await lerRecorde();
    res.json(recorde);
  } catch (error) {
    res.status(500).json({ error: "Erro ao ler recorde." });
  }
});

// Rota para salvar um novo recorde
app.post("/recorde", async (req, res) => {
  const { nick, score } = req.body;

  try {
    const recordeAtual = await lerRecorde();

    if (score > recordeAtual.score) {
      const csvContent = `nick,score\n${nick},${score}`;
      fs.writeFileSync(RECORDS_FILE, csvContent);
      res.json({ message: "Novo recorde salvo com sucesso!" });
    } else {
      res.json({ message: "Recorde não foi batido." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar recorde." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
