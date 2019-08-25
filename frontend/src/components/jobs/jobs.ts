import { Component, Vue } from "vue-property-decorator";
import Job from "@/models/job";
import { getAllJobs } from "@/services/job_service";

@Component
export default class JobsComponent extends Vue {
  date: string = new Date().toISOString();
  jobs: any[] = [];
  loading: boolean = false;
  filteredJobs: Job[] = [];
  page: number = 1;
  jobsPerPage: number = 3;
  jobsPages: number = 0;
  jobsPaged: Job[] = [];
  searchTerm: string = "";
  searchDialog: boolean = false;
  job: Job = {
    jobId: "",
    title: "",
    salary: "",
    benefits: "",
    jobType: "",
    jobLocation: "",
    jobReference: "",
    description: "",
    jobFilled: "",
    createdAt: ""
  };
  salaries: string[] = [
    "> £20,000",
    "£20,000+",
    "£30,000+",
    "£40,000+",
    "£50,000+",
  ];
  benefits: string[] = [];
  jobTypes: string[] = [];
  jobLocations: string[] = [];

  async mounted() {
    this.loading = true;
    const res = await getAllJobs();
    if (res) {
      this.jobs = res;
      this.populateSets();
      this.onSearch();
    }
    this.loading = false;
  }

  onPageChange() {
    this.jobsPages = Math.ceil(this.filteredJobs.length / this.jobsPerPage);
    this.jobsPaged = this.filteredJobs.slice((this.page - 1) * this.jobsPerPage, (this.page) * this.jobsPerPage);
  }

  onSearch() {
    const regex = new RegExp(`^.*${this.job.title}.*$`, "i");
    this.page = 1;
    this.searchTerm = `${this.job.title}, ${this.job.salary}, ${this.job.benefits}, ${this.job.jobType}, ${this.job.jobLocation}`;
    if (!this.searchTerm.replace(", ", "")) {
      this.filteredJobs = this.jobs;
    } else {
      this.filteredJobs = this.jobs.filter(job => this.checkJob(job));
    }
    this.onPageChange();
  }

  populateSets() {
    const benefitsSet: Set<string> = new Set<string>();
    const jobTypesSet: Set<string> = new Set<string>();
    const jobLocationsSet: Set<string> = new Set<string>();

    for (let i = 0; i < this.jobs.length; i++) {
      benefitsSet.add(this.jobs[i].benefits);
      jobTypesSet.add(this.jobs[i].jobType);
      jobLocationsSet.add(this.jobs[i].jobLocation);
    }
    this.benefits = [...benefitsSet];
    this.jobTypes = [...jobTypesSet];
    this.jobLocations = [...jobLocationsSet];
  }

  checkJob(checkJob: Job) {
    const regex = new RegExp(`^.*${this.job.title}.*$`, "i");
    if (this.job.title) {
      if (regex.test(checkJob.title)) {
        
      }
    }
  }

  openRoute(id: string) {
    this.$router.push({ path: `/job/${id}` });
  }
}
