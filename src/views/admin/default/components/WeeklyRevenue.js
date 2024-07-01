// Chakra imports
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Checkbox,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import LineChart from "components/charts/LineChart";
import React from "react";
import { lineChartDataSales, lineChartOptionsSales } from "variables/charts";
import { MdTrendingUp } from "react-icons/md";

export default function SalesReport(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text
          me="auto"
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
        >
          Sales Report
        </Text>
        <Box
          align="center"
          justifyContent="center"
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w="37px"
          h="37px"
          lineHeight="100%"
          borderRadius="10px"
          {...rest}
        >
          <Icon as={MdTrendingUp} color={iconColor} w="24px" h="24px" />
        </Box>
      </Flex>

      <Box h="240px" mt="auto">
        <LineChart
          chartData={lineChartDataSales}
          chartOptions={lineChartOptionsSales}
        />
      </Box>
    </Card>
  );
}
