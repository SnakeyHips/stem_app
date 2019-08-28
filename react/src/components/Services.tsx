import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import servicesimage from "../assets/services.jpg";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) => createStyles({
  bodyText: {
    marginBottom: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const Services: React.FunctionComponent = props => {
  const classes = useStyles({});
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  function getSteps() {
    return ["Vacancy registration", "Candidate sourcing", "Candidate interviews", "Job application email", "Final interview & candidate submission"];
  }

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <>
            <Typography className={classes.bodyText}>Via a telephone or face-to-face meeting, we listen to your recruitment needs and:</Typography>
            <List className="mb-24">
              <ListItem><ListItemText>&bull; Discuss the job description and understand the job responsibilities.</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Understand the skills and qualifications that you are looking for, identifying essential and desirable requirements.</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Understand the training, progression and other opportunities the vacancy might hold.</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Understand your business culture and establish behavioral competencies that will be needed to fit in with the role and company culture.</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; We can provide expert advice as to what skills are available, as well as advice on industry trends.</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Once we have established what you are looking for, we tailor our recruitment process to meet your requirements, and begin a candidate sourcing and selection process.</ListItemText></ListItem>
            </List>
          </>
        );
      case 1:
          return (
            <>
            <Typography className={classes.bodyText}>We search through our large network of candidates to find you the right candidate. We use a variety of sourcing tools including:</Typography>
            <List className="mb-24">
              <ListItem><ListItemText>&bull; Internal database of science, technology, engineering and manufacturing professionals in Wales.</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; UK job boards – including advertising and access to millions of CVs UK-wide.</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Social media – LinkedIn, Twitter and Facebook.</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Stem Website – advertising on Stem’s website job page.</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Networking and events – we network at industry events meeting with both active and passive candidates.</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Education links – for graduate roles, we have strong links with Wales’ universities.</ListItemText></ListItem>
            </List>
            </>
          );
      case 2:
        return (
          <>
          <Typography className={classes.bodyText}>Candidates selected from sourcing will be screened further via a telephone or face-to-face interview by Stem and will be evaluated on the following:</Typography>
            <List className="mb-24">
              <ListItem><ListItemText>&bull; Current salary, benefits package and expectations vs. what your opportunity offers.</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Location/commute to your business and hours of work.</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Relevant skills, qualifications and behavioral competencies.</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Career plans and aspirations.</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Availability.</ListItemText></ListItem>
            </List>
          </>
        );
      case 3:
        return (
          <>
          <Typography className={classes.bodyText}>Following the first stage Stem interview, candidates will be sent a job application email including:</Typography>
            <List className="mb-24">
              <ListItem><ListItemText>&bull; The job description.</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Job advert.</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Your company website.</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; An application form with questions or technical test can also be sent. The job application email tests the candidate’s interest and commitment.</ListItemText></ListItem>
            </List>
          </>
        );
      case 4:
        return (
          <>
            <Typography className={classes.bodyText}>Once the candidate has reviewed the job application email, Stem will conduct a final interview with the candidate to further gauge their interest and suitability for the role before presenting you their details. Once we have sent you their CV, we will continue to provide support during the process from when you first interview the candidate, through to the job offer and the candidate’s first day, providing feedback and advice to you and the candidate throughout.</Typography>
          </>
        );
    }
  }

  return (
    <div>
      <Grid container direction="column" justify="center">
        <Grid item xs={12}>
          <img src={servicesimage} className="header-image" alt=""/>
          <div className="header-text">Services</div>
        </Grid>
        <Grid container justify="center" className="content-container">
          <Grid item md={8} sm={10} xs={12} className="mb-24">
            <h2 className="content-title mb-24">Client Services</h2>
            <Typography className={classes.bodyText}>Stem is a specialist permanent recruitment consultancy providing sustainable recruitment solutions for the science, technology, engineering and manufacturing industries in Wales. Our approach to recruitment is simple but that of care, integrity, attention to detail, and solutions that make a genuine difference, short-term and long-term.</Typography>
            <h2 className="content-title mb-24">Our Recruitment Process</h2>
            <Typography className={classes.bodyText}>We provide a thorough 5-stage recruitment and vetting process which ensures that we not only find the right fit for our clients, but also the right fit for the candidate, ensuring all parties are satisfied.</Typography>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    {getStepContent(index)}
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>All steps completed - you&apos;ve finished!</Typography>
                <Button color="primary" onClick={handleReset} className={classes.button}>
                  Reset
                </Button>
              </Paper>
            )}
          </Grid>
          <Grid item md={8} sm={10} xs={12} className="mb-24">
            <h2 className="content-title mt-24 mb-24">Industries</h2>
            <Typography className={classes.bodyText}>We have expertise and experience in recruiting for the following industries:</Typography>
            <List className="mb-24">
              <ListItem><ListItemText>&bull; Automotive</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Aerospace</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Pharmaceutical</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Life Science</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Medical Device</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Electronic</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Semiconductor</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; FMCG</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Food Manufacturing</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Oil &amp; Gas</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Chemicals Manufacturing</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Materials Manufacturing</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Heavy Industry</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Digital</ListItemText></ListItem>
              <ListItem><ListItemText>&bull; Technology</ListItemText></ListItem>
            </List>
            <Typography className={classes.bodyText}>If you would like to find out more about how Stem can help grow your business, or if you have a vacancy and need help, then call us on 029 2120 2879, or email {" "}
            <a href="mailto:info@stemrecruit.co.uk">info@stemrecruit.co.uk.</a></Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Services;
