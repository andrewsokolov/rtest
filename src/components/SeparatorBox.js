import React from 'react';
import { Select, Label, Input } from '@rebass/forms'
import { Box, Flex, Button } from 'rebass'
import { currencies } from "../constants"
export function SeparatorBox(props) {
    return (
        <Box p={3}>
            <Button onClick={props.switch}>switch</Button>
            Exchange Rate: {props.exchangeRate}
        </Box>
    )
}