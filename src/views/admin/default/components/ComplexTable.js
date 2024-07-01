import React, { useMemo } from "react";
import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";

// Dane i konfiguracja tabeli
import { columnsDataComplex } from "../variables/columnsData";
import tableDataComplex from "../variables/tableDataComplex";

export default function ColumnsTable() {
  const columns = useMemo(() => columnsDataComplex, []);
  const data = useMemo(() => tableDataComplex, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = tableInstance;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "orange.500";
      case "Completed":
        return "green.500";
      case "Canceled":
        return "red.500";
      default:
        return "gray.500";
    }
  };

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="10px" align="center">
        <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
          Complex Table
        </Text>
        <Menu />
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, cellIndex) => {
                  let cellContent = cell.render("Cell");

                  // Customize rendering based on column accessor
                  if (cell.column.id === "status") {
                    let icon;
                    switch (cell.value) {
                      case "Pending":
                        icon = <MdOutlineError color={getStatusColor(cell.value)} />;
                        break;
                      case "Completed":
                        icon = <MdCheckCircle color={getStatusColor(cell.value)} />;
                        break;
                      case "Canceled":
                        icon = <MdCancel color={getStatusColor(cell.value)} />;
                        break;
                      default:
                        icon = null;
                    }
                    cellContent = (
                      <Flex align="center">
                        <Icon w="24px" h="24px" me="5px">
                          {icon}
                        </Icon>
                        <Text color={getStatusColor(cell.value)} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.id === "progress") {
                    cellContent = (
                      <Flex align="center">
                        <Progress
                          variant="table"
                          colorScheme="brandScheme"
                          h="8px"
                          w="108px"
                          value={cell.value}
                        />
                      </Flex>
                    );
                  }

                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={cellIndex}
                      fontSize={{ sm: "14px" }}
                      maxH="30px !important"
                      py="8px"
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {cellContent}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
