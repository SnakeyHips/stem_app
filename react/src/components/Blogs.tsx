import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import blogsimage from "../assets/blogs.jpg";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const Blogs: React.FunctionComponent = props => {
  const classes = useStyles({});

  return (
    <div>
      <Grid container direction="column" justify="center">
        <Grid item xs={12}>
          <img src={blogsimage} className="header-image" alt=""/>
          <div className="header-text">Blogs</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Blogs;