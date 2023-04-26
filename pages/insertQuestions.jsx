import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Input, ChakraProvider, Button, Select,TagInput, Spinner  } from "@chakra-ui/react";

export default function Reservations() {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [correct, setCorrect] = useState("");
  const [incorrect, setIncorrect] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [tags, setTags] = useState("");
  const [errorIncorrect, setErrorIncorrect] = useState(false);
  const [errorTags, setErrorTags] = useState(false);
  const [status, setStatus] = useState("");
  const [disableSend,setDisableSend] = useState(false)
  const [loading, setLoading] = useState(false);

  let url = "http://localhost:3000/api/v1/postInsertQuestions";
  

  const apiCall = () => {
    setLoading(true);
    setDisableSend(true);
    setStatus("")
    const data = {
      category: category,
      correctAnswer: correct,
      incorrectAnswers: incorrect,
      question: question,
      tags: tags,
      difficulty: difficulty,
      user: 'teste',
      approved: 0

    };

    console.log("data", data);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Dados Incorretos");
        }
      })
      .then((result) => {
        console.log(result);
        setStatus(result.status);
        setDisableSend(true);
        setLoading(false);
      })
      .catch((error) => {
        setErrorIncorrect(true);
        setDisableSend(true);
        setLoading(false);
      });
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeQuestion = (event) => {
    setQuestion(event.target.value);
  };
  const handleChangeCorrect = (event) => {
    setCorrect(event.target.value);
  };
  const handleChangeIncorrect = (event, index) => {
    const newIncorrect = [...incorrect];
    newIncorrect[index] = event.target.value;
    setIncorrect(newIncorrect);
  };

  const handleChangeDifficulty = (event) => {
    setDifficulty(event.target.value);
  };

  const handleChangeTags = (event) => {
    const tagValues = event.target.value.split(",").map((val) => val.trim());

    if (
      tagValues.length === 0 ||
      tagValues.length > 5 ||
      tagValues.some((tag) => !tag)
    ) {
      setErrorTags(true);
    } else {
      setTags(tagValues);
      setErrorTags(false);
    }
  };

  const Clean = () => {
    setDisableSend(false);
    setStatus("");
    setDifficulty("");
    setCategory(""),
    setCorrect(""),
    setIncorrect(prevState => {
        const newState = [...prevState]; 
        newState[0] = "";
        newState[1] = "";
        newState[2] = "";
        return newState; 
      });
    setQuestion(""),
    setTags(""),
    setDifficulty("");
    setErrorIncorrect(false);
    setErrorTags(false);
  };

  console.log(category);
  return (
    <div>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <ChakraProvider>
        <Button onClick={apiCall} className={styles.button} disabled={disableSend}>
            Enviar
          </Button>
          <Button onClick={Clean} className={styles.button}>
            Nova Questão
          </Button>

          <Select
            value={category}
            onChange={handleChangeCategory}
            placeholder="Selecione a Categoria"
          >
            <option value="História">História</option>
            <option value="Química">Química</option>
            <option value="Geografia">Geografia</option>
          </Select>
          <Input
            type="text"
            value={question}
            onChange={handleChangeQuestion}
            placeholder="question"
          />
          <Input
          style={{ backgroundColor: "#3add52", fontWeight: "bold" }}
            type="text"
            value={correct}
            onChange={handleChangeCorrect}
            placeholder="Correta"
          />
          <Input
          style={{ backgroundColor: "#d88383", fontWeight: "bold" }}
            type="text"
            value={incorrect[0]}
            onChange={(event) => handleChangeIncorrect(event, 0)}
            placeholder="Incorreta 1"
          />
           <Input
            style={{ backgroundColor: "#d88383", fontWeight: "bold" }}
            type="text"
             value={incorrect[1]}
            onChange={(event) => handleChangeIncorrect(event, 1)}
             placeholder="Incorreta 2"
/>       
          <Input
          style={{ backgroundColor: "#d88383", fontWeight: "bold" }}
            type="text"
            value={incorrect[2]}
            onChange={(event) => handleChangeIncorrect(event, 2)}
            placeholder="Incorreta 3"
          />
          {errorTags && (
            <div style={{ color: "red" }}>
              Coloque No mínimo uma tag, e no máximo 5 sepradas por vírgulas
            </div>
          )}
          <Input
            type="text"
            value={tags}
            onChange={handleChangeTags}
            placeholder="tags"
          />
          <Select
            value={difficulty}
            onChange={handleChangeDifficulty}
            placeholder="Selecione a dificuldade"
          >
            <option value="facil">Fácil</option>
            <option value="medio">Médio</option>
            <option value="dificil">Difícil</option>
          </Select>
          {status}{loading ? <Spinner /> :"" }
        </ChakraProvider>
      </div>
    </div>
  );
}
