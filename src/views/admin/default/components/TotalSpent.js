// TransactionHistory.js

import React from "react";
import {
  Box,
  Flex,
  Text,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js"; // Załóżmy, że Card jest już odpowiednio zdefiniowany
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Przykładowe dane historii transakcji
const transactionHistoryData = [
  { date: '2023-01-01', amount: 300 },
  { date: '2023-02-01', amount: 500 },
  { date: '2023-03-01', amount: 800 },
  { date: '2023-04-01', amount: 600 },
  { date: '2023-05-01', amount: 900 },
  { date: '2023-06-01', amount: 700 },
];

export default function TransactionHistory(props) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  return (
    <Card p="20px" align="center" direction="column" w="100%" {...props}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mb="8px"
      >
        <Text color={textColor} fontSize="md" fontWeight="600" mt="4px">
          Transaction History
        </Text>
        <Select
          fontSize="sm"
          variant="subtle"
          defaultValue="monthly"
          width="unset"
          fontWeight="700"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </Select>
      </Flex>

      {/* Graf linii recharts */}
      <Box w="100%" h="300px">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={transactionHistoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
