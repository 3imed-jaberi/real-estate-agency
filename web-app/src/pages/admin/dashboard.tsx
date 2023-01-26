import React, { useEffect, useState } from "react";
import { Table, ScrollArea, TextInput, Center, Button } from "@mantine/core";
import { IconPlus, IconSearch, IconSquareCheck, IconSquareX } from "@tabler/icons";
import { useHistory } from "react-router-dom";
import Fuse from "fuse.js";

import { getAnnonceTitle } from "../../utils/get-annonce-title";
import { Annonce, annonceApi } from "../../api/annonce.api";

export function AdminDashboardPage() {
  const [data, setData] = useState<Annonce[]>([]);
  useEffect(() => {
    (async () => {
      const response = await annonceApi.fetchAll();
      setData(response.data);
    })();
  }, []);
  const [searchResult, setSearchResult] = useState<Annonce[]>([]);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchEngine = new Fuse(data, { keys: ["location", "surface", "roomNumbers"] });
    const result = searchEngine.search(event.target.value).map(({ item }) => item);
    setSearchResult(result);
  }
  const history = useHistory();
  const handleOnClickToSeeMoreDetails = (id: number) => () => {
    history.push(`/__danger_zone/admin/board/${id}`);
  };
  
  return (
    <ScrollArea
      style={{
        backgroundColor: "white",
        padding: '4rem'
      }}
    >
      <Center>
        <h1>Admin Board (v1 beta)</h1>
        <div/>
        <Button onClick={() => history.push('/__danger_zone/admin/board/add')}>
          <IconPlus /> Add New Annonce
        </Button>
      </Center>
      <br />
      <br />
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        onChange={handleOnChange}
      />
      <br /><br />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: "fixed", minWidth: 700 }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Availablity</th>
            <th>Price</th>
            <th>Location</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          { 
           (searchResult.length !== 0 ? searchResult : data)?.map((item) => (
              <tr
                key={item.id}
                onClick={handleOnClickToSeeMoreDetails(item.id)}
              >
                <td>{getAnnonceTitle(item)}</td>
                <td>
                  {item.available ? (
                    <IconSquareCheck color="green" />
                  ) : (
                    <IconSquareX color="red" />
                  )}
                </td>
                <td>{item.price}dt</td>
                <td>{item.location}</td>
                <td>{item.operation}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <br />
      <br />
    </ScrollArea>
  );
}
