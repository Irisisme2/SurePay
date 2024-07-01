// PieCard.js

import React from "react";
import {
  Box,
  Flex,
  Text,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart"; // Załóżmy, że PieChart jest już odpowiednio zdefiniowany
import { VSeparator } from "components/separator/Separator";
import { pieChartData, pieChartOptions } from "variables/charts";

export default function OrderStatus(props) {
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
          Order Status
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

      <PieChart
        h="100%"
        w="100%"
        chartData={pieChartData}
        chartOptions={pieChartOptions}
      />

      <Card
        bg={cardColor}
        flexDirection="row"
        boxShadow={cardShadow}
        w="100%"
        p="15px"
        px="20px"
        mt="15px"
        mx="auto"
      >
        <Flex direction="column" py="5px" flex="1" textAlign="center">
          <Flex align="center">
            <Box
              h="8px"
              w="8px"
              bg="#FFBBCC"
              borderRadius="50%"
              me="4px"
            />
            <Text
              fontSize={{ base: "xs", sm: "sm" }}
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              Pending
            </Text>
          </Flex>
          <Text fontSize={{ base: "lg", sm: "xl" }} color={textColor} fontWeight="700">
            {pieChartData[0]}%
          </Text>
        </Flex>

        <VSeparator mx={{ base: "20px", xl: "20px", "2xl": "20px" }} />

        <Flex direction="column" py="5px" flex="1" textAlign="center">
          <Flex align="center">
            <Box
              h="8px"
              w="8px"
              bg="#66CCFF"
              borderRadius="50%"
              me="4px"
            />
            <Text
              fontSize={{ base: "xs", sm: "sm" }}
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              Paid
            </Text>
          </Flex>
          <Text fontSize={{ base: "lg", sm: "xl" }} color={textColor} fontWeight="700">
            {pieChartData[1]}%
          </Text>
        </Flex>

        <VSeparator mx={{ base: "20px", xl: "20px", "2xl": "20px" }} />

        <Flex direction="column" py="5px" flex="1" textAlign="center">
          <Flex align="center">
            <Box
              h="8px"
              w="8px"
              bg="#FFD700"
              borderRadius="50%"
              me="4px"
            />
            <Text
              fontSize={{ base: "xs", sm: "sm" }}
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              Complete
            </Text>
          </Flex>
          <Text fontSize={{ base: "lg", sm: "xl" }} color={textColor} fontWeight="700">
            {pieChartData[2]}%
          </Text>
        </Flex>
      </Card>
    </Card>
  );
}
