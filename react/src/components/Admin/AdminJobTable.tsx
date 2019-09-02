import React, { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toolbar from "@material-ui/core/Toolbar";
import Spacer from "../Layout/Spacer";
import JobDialog from "../Dialogs/JobDialog";
import DeleteDialog from "../Dialogs/DeleteDialog";
import Job from "../../models/job";
import { GetAllJobs } from "../../services/job_service";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boldText: {
      fontWeight: 500
    },
    button: {
      margin: theme.spacing(1)
    },
    divider: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    grid: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    icon: {
      color: "#9e9e9e"
    },
    paper: {
      width: "100%",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3)
    }
  })
);

const AdminJobTable: FunctionComponent = props => {
  const classes = useStyles({});
  const [job, setJob] = useState<Job>({
    jobId: "",
    title: "",
    salary: "",
    benefits: "",
    jobType: "",
    jobLocation: "",
    jobReference: "",
    description: "",
    jobFilled: "false",
    createdAt: ""
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [openCreateEdit, setCreateEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);
  const [openDelete, setDelete] = useState<boolean>(false);
  const smAndDown = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    setLoading(true);
    const result = await GetAllJobs();
    if (result) {
      setJobs(result);
    }
    setLoading(false);
  }

  function handleChangePage(event: unknown, newPage: number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function handleCreateEditClose() {
    setCreateEdit(false);
  }

  function handleDeleteClose() {
    setDelete(false);
  }

  function handleOpenCreate() {
    setJob({
      jobId: "",
      title: "",
      salary: "",
      benefits: "",
      jobType: "",
      jobLocation: "",
      jobReference: "",
      description: "",
      jobFilled: "false",
      createdAt: ""
    });
    setCreateEdit(true);
  }

  function handleOpenUpdate(index: number) {
    setJob(Object.assign({}, jobs[index]));
    setCreateEdit(true);
  }

  function handleOpenDelete(index: number) {
    setSelected(index);
    setDelete(true);
  }

  function handleCreate(job: Job) {
    setJobs([...jobs, job]);
    setCreateEdit(false);
  }

  function handleUpdate(job: Job) {
    setJobs(jobs.map((item: Job) => (item.jobId === job.jobId ? job : item)));
    setCreateEdit(false);
  }

  function handleDelete() {
    const deleteId: string = jobs[selected].jobId;
    setJobs(jobs.filter((item: Job) => item.jobId !== deleteId));
    setDelete(false);
  }

  const table = smAndDown ? (
    <div className="mb-48">
      {jobs
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((job: Job, index: number) => (
          <Paper key={job.jobId} className={classes.paper}>
            <Toolbar>
              <p className={classes.boldText}>{job.title}</p>
              <Spacer />
              <IconButton size="small" onClick={() => handleOpenUpdate(index)}>
                <EditIcon className={classes.icon} />
              </IconButton>
              <IconButton size="small" onClick={() => handleOpenDelete(index)}>
                <DeleteIcon className={classes.icon} />
              </IconButton>
            </Toolbar>
            <Divider className={classes.divider} />
            <Grid container justify="space-between" className={classes.grid}>
              <p className={classes.boldText}>Type:</p>
              <p>{job.jobType}</p>
            </Grid>
            <Grid container justify="space-between" className={classes.grid}>
              <p className={classes.boldText}>Location:</p>
              <p>{job.jobLocation}</p>
            </Grid>
            <Grid container justify="space-between" className={classes.grid}>
              <p className={classes.boldText}>Reference:</p>
              <p>{job.jobReference}</p>
            </Grid>
          </Paper>
        ))}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={jobs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  ) : (
    <Paper className={classes.paper}>
      <Toolbar>
        <h6>Jobs</h6>
        <Spacer />
        <Button
          className={classes.button}
          color="primary"
          onClick={handleOpenCreate}
        >
          Create
        </Button>
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Reference</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((job: Job, index: number) => (
              <TableRow key={job.jobId}>
                <TableCell component="th" scope="row">
                  {job.title}
                </TableCell>
                <TableCell align="right">{job.jobType}</TableCell>
                <TableCell align="right">{job.jobLocation}</TableCell>
                <TableCell align="right">{job.jobReference}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => handleOpenUpdate(index)}
                  >
                    <EditIcon className={classes.icon} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDelete(index)}
                  >
                    <DeleteIcon className={classes.icon} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={jobs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );

  const content = loading ? (
    <Grid container justify="center" className="mt-24 mb-24">
      <CircularProgress color="primary" />
    </Grid>
  ) : (
    table
  );

  return (
    <div>
      <Grid
        container
        justify="center"
        alignItems="center"
        className="content-container full-height"
      >
        <Grid item md={10} sm={10} xs={12}>
          {content}
        </Grid>
        <JobDialog
          open={openCreateEdit}
          job={job}
          handleClose={handleCreateEditClose}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
        />
        <DeleteDialog
          open={openDelete}
          handleClose={handleDeleteClose}
          handleDelete={handleDelete}
        />
      </Grid>
    </div>
  );
};

export default AdminJobTable;
