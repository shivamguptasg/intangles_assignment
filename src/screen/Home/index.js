import React, { useState } from "react";
import clsx from "clsx";
import {
  useTheme,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Slider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
  Checkbox,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { PrimaryBlue } from "../../constants/color";
import WrappedMap from "../../component/map";

// import * as locData from "../../data/location.json";
import useStyles from "./style";

import mapDataCoords from "../../data/location.json";

function Home(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [source, setSource] = useState("Chandur bazar, Maharashtra, 444801");
  const [destination, setDestination] = useState(
    "Bhatkuli, Maharashtra, 444801"
  );

  const resetRouteRef = React.useRef(null);

  const marks = [
    {
      value: 1,
      label: "1x",
    },
    {
      value: 50,
      label: "2x",
    },
    {
      value: 100,
      label: "3x",
    },
  ];

  function valuetext(value) {
    return `${value}x`;
  }

  function valueLabelFormat(value) {
    let mark = marks.findIndex((mark) => mark.value === value) + 1;
    setSpeed(mark);
    return `${mark}x`;
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Intangles
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon style={{ color: PrimaryBlue }} />
            ) : (
              <ChevronRightIcon style={{ color: PrimaryBlue }} />
            )}
          </IconButton>
        </div>
        <Divider style={{ backgroundColor: PrimaryBlue }} />
        <div className={classes.drawerContainer}>
          <div className={classes.container}>
            <h3 style={{ color: PrimaryBlue, paddingLeft: "9%" }}>History</h3>
            <Divider style={{ backgroundColor: PrimaryBlue }} />
            <List component="nav" aria-labelledby="nested-list-subheader">
              <ListItem button>
                <ListItemIcon>
                  <ArrowForwardIosIcon className={classes.listIcon} />
                </ListItemIcon>
                <ListItemText primary="Bhatkuli, Maharashtra, 444801 To Bhatkuli, Maharashtra, 444801" />
                <Checkbox color="primary" checked={true} />
              </ListItem>
            </List>
          </div>
          <div className={classes.container}>
            <h3 style={{ color: PrimaryBlue, paddingLeft: "9%" }}>Route</h3>
            <Divider style={{ backgroundColor: PrimaryBlue }} />
            <TextField
              id="standard-basic"
              label="Source"
              style={{ marginLeft: "9%", marginTop: "10px" }}
              value={source}
              multiline
            />
            <h5 style={{ color: PrimaryBlue, paddingLeft: "9%" }}>TO</h5>
            <TextField
              id="standard-basic"
              label="Destination"
              style={{ marginLeft: "9%" }}
              value={destination}
              multiline
            />
          </div>
          <div className={classes.container}>
            <h3 style={{ color: PrimaryBlue, paddingLeft: "9%" }}>Speed</h3>
            <Divider style={{ backgroundColor: PrimaryBlue }} />
            <Slider
              defaultValue={1}
              valueLabelFormat={valueLabelFormat}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-restrict"
              step={null}
              valueLabelDisplay="auto"
              marks={marks}
              className={classes.slider}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "15px" }}
            onClick={() => {
              if (resetRouteRef.current) {
                resetRouteRef.current.reset();
              }
            }}
          >
            Reset
          </Button>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDAnK8BGUICKulh-gtjXnyxR7mbnRQ7NXw`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          speed={speed}
          resetRouteRef={resetRouteRef}
          paths={mapDataCoords}
        />
      </main>
    </div>
  );
}

export default Home;
