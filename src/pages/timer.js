import React from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/system";

const CountDownCard = styled("div")(({ theme }) => ({
    padding: 20,
    textAlign: "center",
    borderRadius: 5,
    minWidth: 70,
    maxWidth: 70,
    background: theme.palette.primary.main,
    margin: "auto",
}));

export default function Timer({ days, hours, minutes, seconds, completed }) {
    return (
        <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} sm={3}>
                <CountDownCard>{days}</CountDownCard>
                <p>Days</p>
            </Grid>
            <Grid item xs={12} sm={3}>
                <CountDownCard>{hours}</CountDownCard>
                <p>Hours</p>
            </Grid>
            <Grid item xs={12} sm={3}>
                <CountDownCard>{minutes}</CountDownCard>
                <p>Minutes</p>
            </Grid>
            <Grid item xs={12} sm={3}>
                <CountDownCard>{seconds}</CountDownCard>
                <p>Second</p>
            </Grid>
        </Grid>
    );
}
