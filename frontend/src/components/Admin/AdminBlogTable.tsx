import React, {
  useState,
  useEffect,
  ChangeEvent
} from "react";
import { Theme } from "@material-ui/core/styles";
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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toolbar from "@material-ui/core/Toolbar";
import Spacer from "../Layout/Spacer";
import BlogDialog from "../Dialogs/BlogDialog";
import DeleteDialog from "../Dialogs/DeleteDialog";
import { Blog, BlankBlog } from "../../models/blog";
import {
  GetAllBlogs,
  CreateBlog,
  UpdateBlog,
  DeleteBlog
} from "../../services/blog_service";
import useStylesBase from "../../styles/styles-base";
import clsx from "clsx";

export default function AdminBlogTable() {
  const classesBase = useStylesBase();
  const [blog, setBlog] = useState<Blog>(BlankBlog());
  const [blogs, setBlogs] = useState<Blog[]>([]);
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
    setLoading(true);
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    const result = await GetAllBlogs();
    if (result) {
      setBlogs(result);
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
    setBlog(BlankBlog());
    setCreateEdit(true);
  }

  function handleOpenUpdate(index: number) {
    setBlog(Object.assign({}, blogs[index]));
    setCreateEdit(true);
  }

  function handleOpenDelete(index: number) {
    setSelected(index);
    setDelete(true);
  }

  async function handleCreate(blog: Blog) {
    setLoading(true);
    setCreateEdit(false);
    await CreateBlog(blog);
    await fetchBlogs();
  }

  async function handleUpdate(blog: Blog) {
    setLoading(true);
    setCreateEdit(false);
    await UpdateBlog(blog);
    await fetchBlogs();
  }

  async function handleDelete() {
    setLoading(true);
    setDelete(false);
    const deleteId: string = blogs[selected].blogId;
    await DeleteBlog(deleteId);
    await fetchBlogs();
  }

  const smContent = loading ? (
    <Grid
      container
      justify="center"
      className={clsx(classesBase.mt3, classesBase.mb3)}
    >
      <CircularProgress color="primary" />
    </Grid>
  ) : (
    <div className={classesBase.mb6}>
      <Grid container justify="center">
        <Button
          className={classesBase.button}
          color="primary"
          onClick={handleOpenCreate}
        >
          Create
        </Button>
      </Grid>
      {blogs
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((blog: Blog, index: number) => (
          <Paper key={blog.blogId} className={classesBase.adminPaper}>
            <Toolbar>
              <p className={classesBase.boldText}>{blog.title}</p>
              <Spacer />
              <IconButton
                size="small"
                color="primary"
                onClick={() => handleOpenUpdate(index)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                size="small"
                color="primary"
                onClick={() => handleOpenDelete(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Toolbar>
          </Paper>
        ))}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={blogs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage={""}
      />
    </div>
  );

  const content = smAndDown ? (
    smContent
  ) : (
    <Paper className={classesBase.adminPaper}>
      <Toolbar>
        <h6>Blogs</h6>
        <Spacer />
        <Button
          className={classesBase.button}
          color="primary"
          onClick={handleOpenCreate}
        >
          Create
        </Button>
      </Toolbar>
      {loading && <LinearProgress />}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((blog: Blog, index: number) => (
              <TableRow key={blog.blogId}>
                <TableCell component="th" scope="row">
                  {blog.title}
                </TableCell>
                <TableCell align="right">{blog.description}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenUpdate(index)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenDelete(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={blogs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );

  return (
    <div>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={clsx(classesBase.contentContainer, classesBase.fullHeight)}
      >
        <Grid item md={10} sm={10} xs={12}>
          {content}
        </Grid>
        <BlogDialog
          open={openCreateEdit}
          blog={blog}
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
}
