import React from 'react';
import { Select, Label, Input } from '@rebass/forms'
import { Box, Flex } from 'rebass'
import { Currencies } from "../constants"

export function SourceBox(props) {
    return (
        <Box>
      <Flex>
          <Box width={1/2}>
            <Select
              id='from'
              name='from'
              value={props.currencies.source}
              defaultValue={props.currencies.source}>
              {Object.entries(Currencies).map(([index, currency]) => (
                <option
                  key={index}>
                  {currency}
                </option>
              ))}
            </Select>
          </Box>
          <Box width={1}>
            <Input
              id='email'
              name='email'
              onFocus={() => props.setActiveSection("source")}
              onChange={(evt) => props.setInputValue(parseInt(evt.target.value, 10), "source")}
              value={props.values.source}
            />
          </Box>
      </Flex>
      <Flex>
        <Box>
          <Label htmlFor='email'>Balance: {props.balance[props.currencies.source]}</Label>
        </Box>
      </Flex>
    </Box>
    )
}