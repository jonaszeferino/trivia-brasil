import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

import { ChakraProvider,Box, Table, Thead, Tbody, Tr, Th, Td, H1 } from "@chakra-ui/react";



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
    <div>Loading...</div>
  ) : (
    <Box>
      <H1>Questões inseridas</H1>
      <Table variant="striped" colorScheme="pink">
        <Thead>
          <Tr>
            <Th>Question</Th>
            <Th>Category</Th>
            <Th>Correct Answer</Th>
            <Th>Incorrect Answers</Th>
            <Th>Difficulty</Th>
            <Th>Tags</Th>
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