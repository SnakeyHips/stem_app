import React, {
  useState,
  useEffect,
  ChangeEvent
} from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import PagesIcon from "@material-ui/icons/Pages";
import AssignmentIcon from "@material-ui/icons/Assignment";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { useLocation } from "react-router";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    "& a": {
      color: "rgba(34, 183, 113, 0.18)"
    }
  }
});

export default function BottomNav() {
  const classes = useStyles();
  const [value, setValue] = useState<string>("/");
  const location = useLocation();

  useEffect(() => {
    setValue(location.pathname);
  }, [location]);

  function handleChange(event: ChangeEvent<{}>, newValue: string) {
    setValue(newValue);
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        value="/"
        icon={<HomeIcon />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        label="Services"
        value="/services"
        icon={<PagesIcon />}
        component={Link}
        to="/services"
      />
      <BottomNavigationAction
        label="Jobs"
        value="/jobs"
        icon={<AssignmentIcon />}
        component={Link}
        to="/jobs"
      />
      <BottomNavigationAction
        label="Blogs"
        value="/blogs"
        icon={<EventNoteIcon />}
        component={Link}
        to="/blogs"
      />
    </BottomNavigation>
  );
}
