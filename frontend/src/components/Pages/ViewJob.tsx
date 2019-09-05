import React, { FunctionComponent, useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import ContentDom from "../Layout/ContentDom";
import LinkButton from "../Layout/LinkButton";
import { Job, BlankJob } from "../../models/job";
import { GetJob } from "../../services/job_service";
import { ConvertDate } from "../../helpers/DateHelper";
import { useStylesBase } from "../../styles/styles-base";

const ViewJob: FunctionComponent<RouteComponentProps> = props => {
  const classesBase = useStylesBase();
  const [job, setJob] = useState<Job>(BlankJob());
  const [loading, setLoading] = useState<boolean>(false);
  const params: any = props.match.params;

  useEffect(() => {
    fetchJob();
  }, [job.jobId]);

  async function fetchJob() {
    setLoading(true);
    const result = await GetJob(params.id);
    if (result) {
      setJob(result);
    }
    setLoading(false);
  }

  const content = loading ? (
    <Grid container justify="center" className="mt-24 mb-24">
      <CircularProgress color="primary" />
    </Grid>
  ) : (
    <Paper key={job.jobId} elevation={0} className={classesBase.viewPaper}>
      <h6 className="primary-text text-center">{job.title}</h6>
      <h6>Salary - Benefits</h6>
      <p>{`${job.salary} - ${job.benefits}`}</p>
      <h6>Type</h6>
      <p>{job.jobType}</p>
      <h6>Location</h6>
      <p>{job.jobLocation}</p>
      <h6>Reference</h6>
      <p>{job.jobReference}</p>
      <ContentDom content={job.description}/>
      <p>Published: {ConvertDate(job.createdAt)}</p>
    </Paper>
  );

  return (
    <div>
      <Grid container justify="center" className="content-container">
        <Grid item md={8} sm={10} xs={12} className="mb-24">
          {content}
        </Grid>
        <Grid container justify="center" className="mb-24">
          <LinkButton
            className={classesBase.button}
            to="/jobs"
          >
            Jobs
          </LinkButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(ViewJob);
