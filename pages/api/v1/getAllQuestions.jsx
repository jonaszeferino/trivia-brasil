import client from "../../../mongoconnection";

export default async function handler(req, res) {
  const collection = client.db("triviaBrasil").collection("questions");

  switch (req.method) {
    case "POST":
      // código para inserir uma questão
      break;

    case "GET":
      const questions = await collection.find({}).toArray();
      res.json({
        status: "OK",
        statusCode: 200,
        data: questions,
      });
      break;

    default:
      res.status(405).end(); // método HTTP não permitido
      break;
  }
}

//************ */ caso queira busca um regsitro aleatório:**********************
// const collection = client.db("triviaBrasil").collection("questions");

// const randomQuestion = await collection.aggregate([
//   { $sample: { size: 1 } },
// ]).toArray();
// console.log(randomQuestion);

//************** */ buscar um registro aleatorio por categoria *******************

// const collection = client.db("triviaBrasil").collection("questions");
// const pipeline = [
//   { $match: { category: "Historia" } }, // filtra por categoria
//   { $sample: { size: 1 } }, // seleciona um registro aleatório
// ];

// const randomQuestion = await collection.aggregate(pipeline).toArray();