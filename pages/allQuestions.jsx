import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

import { ChakraProvider,Box, Table, Thead, Tbody, Tr, Th, Td, CircularProgress, Text } from "@chakra-ui/react";



export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = "http://localhost:3000/api/v1/getAllQuestions";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <ChakraProvider>
      <div className={styles.container}>
      {isLoading ? (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    <CircularProgress isIndeterminate color="pink.500" />
    <Text ml="4">Carregando...</Text>
  </div>
) : (
    <Box>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>Todas questão aguardando aprovação</h1></div>
      <Table variant="striped" colorScheme="pink">
        <Thead>
          <Tr>
            <Th>Questão</Th>
            <Th>Categoria</Th>
            <Th>Correta</Th>
            <Th>Incorreta</Th>
            <Th>Dificuldade</Th>
            <Th>Tags</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {questions.map((question) => (
            <Tr key={question._id}>
              <Td>{question.question}</Td>
              <Td>{question.category}</Td>
              <Td>{question.correctAnswer}</Td>
              <Td>{question.incorrectAnswers.join(", ")}</Td>
              <Td>{question.difficulty}</Td>
              <Td>{question.tags.join(", ")}</Td>
              <Td> {question.approved == 1 ? "Aprovado" : "Aguar Aprovação"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )}
</div> 
    </ChakraProvider>
  );
}