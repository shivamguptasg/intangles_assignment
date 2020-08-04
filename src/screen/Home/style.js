import { makeStyles } from "@material-ui/core";

const drawerWidth = 260;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flex: 1,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: window.innerHeight - 50 + "px",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  drawerContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    // backgroundColor: "yellow",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  listIcon: {
    color: "#3f51b5",
    fontSize: "1rem",
  },
  slider: { width: "80%", marginLeft: "9%", marginTop: "12px" },
  container: {
    width: "100%",
  },
}));

export default useStyles;
