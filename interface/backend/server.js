import express from "express"
import mysql from "mysql2"
import cors from "cors"

const app = express()


app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json("Hello, the conncections its here")
})

app.post("/login", (req, res) => {
  
  const{email, password} = req.body
  console.log(req.body)
  const query = "select * from users where email = ?"

  db.query(query, [email], (err, data) => {
    if(err){
      console.log("O ERRO FOI AQUI")
      return res.json(err)
    }

    if(data.length > 0){
      const user = data[0];

      if(user.password === password){
        return res.json({
          message: "Login feito com sucesso",
          user:user
        })
      }
      else{
        return res.json("Senha incorreta")
      }
    }else {
      return res.json("Usuário não encontrado")
    }
  })
})

app.post("/register", (req, res) =>{
  const query = "insert into users(`name`,`email`, `password`,`profissao`) values (?)"

  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.profissao
  ]
  // query de insercao
  db.query(query, [values], (err, data) =>{
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.post("/newpatient", (req, res) => {
  const { patientData, parentData, userId } = req.body; // Inclui o userId recebido do frontend
  console.log(req.body);

  // Query para inserir o paciente, agora com o userId
  const query = "INSERT INTO Paciente (`name`, `idade`, `userId`) VALUES (?)";

  const values = [
    patientData.name,
    patientData.age,
    userId, // Adiciona o userId como último atributo
  ];

  console.log(values);

  // Executa a query de inserção do paciente
  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);

    // O id do paciente gerado será retornado em `data.insertId`
    const patientId = data.insertId;

    // Query para inserir os pais, associando o idPaciente
    const parentQuery =
      "INSERT INTO Pais (`name`, `idade`, `cpf`, `contato`, `idPaciente`) VALUES (?)";

    const parentValues = [
      parentData.name,
      parentData.age,
      parentData.cpf,
      parentData.contact,
      patientId, // Associação com o id do paciente recém-inserido
    ];

    console.log(parentValues);

    // Executa a query de inserção dos pais
    db.query(parentQuery, [parentValues], (err, parentData) => {
      if (err) return res.json(err);

      // Retorna uma resposta com sucesso, incluindo o id do paciente e a confirmação de inserção dos pais
      return res.json({
        message: "Paciente e pais inseridos com sucesso!",
        patientId: patientId,
        parentsInserted: parentData.affectedRows,
      });
    });
  });
});


app.get("/getUserIdByEmail", (req, res) => {
  const { email } = req.query;

  const query = "SELECT id FROM users WHERE email = ?";
  db.query(query, [email], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Erro no banco de dados" });
    }

    if (data.length > 0) {
      return res.json(data[0]); // Retorna o ID do usuário
    } else {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
  });
});

app.get("/patients", (req, res) => {
  const { userId } = req.query;  // Alterando para req.query para pegar query parameters

  // Consulta para buscar os pacientes desse usuário
  const query = `
    SELECT 
      p.id AS patientId, p.name AS patientName, p.idade AS patientAge, 
      pa.name AS parentName, pa.idade AS parentAge, pa.cpf, pa.contato 
    FROM Paciente p
    LEFT JOIN Pais pa ON p.id = pa.idPaciente
    WHERE p.userId = ?`; // Adicionando a condição WHERE para o userId

  db.query(query, [userId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/questions", (req, res) => {
  const query = "SELECT * FROM questions";

  db.query(query, (err, data) => {
    if (err) {
      console.log("Erro ao buscar questões:", err);
      return res.status(500).json({ message: "Erro ao buscar questões" });
    }

    // Mapear as questões para incluir as opções em um array
    const questions = data.map(row => ({
      id: row.id,
      question: row.pergunta, // Pergunta
      options: [
        row.option_1, // Primeira opção
        row.option_2, // Segunda opção
        row.option_3, // Terceira opção
        row.option_4  // Quarta opção
      ],
      result: row.resposta, // Resposta correta
      image: row.image_url // URL da imagem (se houver)
    }));

    // Retorna as questões com as opções em formato de array
    res.json(questions);
  });
});

app.listen(8800, ()=>{
  console.log("Connected to backend!")
})