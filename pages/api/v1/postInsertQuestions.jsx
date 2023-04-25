import  client  from "../../../mongoconnection"

export default async function handler(req, res) {
  const collection = client.db("triviaBrasil").collection("questions");

  switch (req.method) {
    case "POST":
      const body = (req.body);
      //const body = JSON.parse(req.body);
      console.log(body)
      const inPutMongo = await collection.insertOne(body); // iserir azar
      res.json({
        status: 'Questão Inserida Com Sucesso',
        statusCode:200,
        data: inPutMongo,
      });
      break;

    default:
      break;
  }
}
