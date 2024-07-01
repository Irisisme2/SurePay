import React, { useMemo } from "react";
import {
  Flex,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineError,MdCheckCircle,MdCancel } from "react-icons/md"; // Import ikony dla statusu "Pending"

import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";

// Dane i konfiguracja tabeli
import { columnsDataCheck } from "../variables/columnsData";
import tableDataCheck from "../variables/tableDataCheck";

export default function CheckTable() {
  const columns = useMemo(() => columnsDataCheck, []);
  const data = useMemo(() => tableDataCheck, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 11 },
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

  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  // Funkcja do renderowania ikon i kolorów na podstawie statusu
  const renderStatusCell = (status) => {
    let icon;
    let color;

    switch (status) {
      case "Pending":
        icon = <MdOutlineError />;
        color = "orange.500";
        break;
      case "Completed":
        icon = <MdCheckCircle />;
        color = "green.500";
        break;
      case "Canceled":
        icon = <MdCancel />;
        color = "red.500";
        break;
      default:
        icon = null;
        color = "gray.500";
    }

    return (
      <Flex align="center">
        <Text color={color} me="5px" fontSize="sm" fontWeight="700">
          {icon}
        </Text>
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {status}
        </Text>
      </Flex>
    );
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
          Check Table
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
                  if (cell.column.id === "name") {
                    cellContent = (
                      <Flex align="center">
                        <Checkbox
                          defaultChecked={cell.value[1]}
                          colorScheme="brandScheme"
                          me="10px"
                        />
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value[0]}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.id === "progress") {
                    cellContent = (
                      <Flex align="center">
                        <Text
                          me="10px"
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value}%
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.id === "quantity") {
                    cellContent = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.id === "date") {
                    cellContent = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.id === "status") {
                    cellContent = renderStatusCell(cell.value);
                  } else if (cell.column.id === "actions") {
                    cellContent = (
                      <Flex>
                        {cell.value.map((action, index) => (
                          <Text
                            key={index}
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                            cursor="pointer"
                            _hover={{ color: "blue.500" }}
                            mr={index !== cell.value.length - 1 ? "10px" : "0"}
                          >
                            {action}
                          </Text>
                        ))}
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