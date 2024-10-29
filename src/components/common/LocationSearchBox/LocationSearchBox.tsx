/* eslint-disable @typescript-eslint/no-explicit-any */
import useMapInteraction from "@hooks/useMapInteraction";
import { Input, List, ListItem } from "@mui/material";
import mapStore from "@store/mapStore";
import React, { useState } from "react";

interface Location {
  value: string;
  name?: string;
  placeId?: string;
}

interface Props {
  name?: string;
   
  onChange: (location: Location) => void;
}

const LocationSearchBox: React.FC<Props> = ({ name, onChange }) => {
  const { mapRef } = mapStore();

  const [inputValue, setInputValue] = useState<string>("");
  const [showList, setShowList] = useState<boolean>(false);
  const { predictions, placePredictions } = useMapInteraction({ mapRef });

  const omitCountry = (inputString:string) => {
    const parts = inputString.split(", "); 
    if (parts[parts.length - 1].toLowerCase() === "zambia") {
      parts.pop();
    }
    const result = parts.join(", ");
    return result;
}

  const handleItemClick = (option: any) => {
    setInputValue(option.description);
    setShowList(false);
    onChange({
      name: name,
      value: option.description,
      placeId: option.place_id,
    });
  };

  return (
    <>
      <div className="select-container">
        <Input
          type="text"
          id="searchInput"
          name={name}
          onChange={(evt) => {
            setInputValue(evt.target.value);
            placePredictions(evt.target.value);
            setShowList(true);
          }}
          placeholder="Search..."
          value={inputValue}
          autoComplete="off"
        />
        {showList && predictions.length > 0 && (
          <List
            id="mySelect"
            sx={{
              bgcolor: "white",
              zIndex: 10001,
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
            }}
          >
            {predictions.map((option, index) => (
              <React.Fragment key={index}>
                <ListItem
                  key={option.place_id}
                  value={option.description}
                  onClick={() => handleItemClick(option)}
                  sx={{
                    color: "black",
                    width: "100%",
                  }}
                >
                  {omitCountry(option.description)}
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        )}
      </div>
    </>
  );
};

export default LocationSearchBox;
