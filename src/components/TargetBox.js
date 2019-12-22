import React from 'react';
import { Select, Label, Input } from '@rebass/forms'
import { Box, Flex, Button } from 'rebass'
import { Currencies } from "../constants"

export function TargetBox(props) {
  console.log(props)
    return (
        <Box>
      <Flex>
          <Box width={1/2}>
            <Select
              id='from'
              name='from'
              value={props.currencies.target}
              defaultValue={props.currencies.target}>
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
              onFocus={() => props.setActiveSection("target")}
              onChange={(evt) => props.setInputValue(parseInt(evt.target.value, 10), "target")}
              value={props.values.target}
            />
          </Box>
      </Flex>
      <Flex>
        <Box>
          <Label htmlFor='email'>Balance: {props.balance[props.currencies.target]}</Label>
        </Box>
      </Flex>
    </Box>
    )
}