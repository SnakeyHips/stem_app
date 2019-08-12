import { Component, Vue } from "vue-property-decorator";
import Blog from "@/models/blog";
import { getAllBlogs } from "@/services/blog_service";

@Component
export default class BlogsComponent extends Vue {
  date: string = new Date().toISOString();
  blogs: Blog[] = [];
  loading: boolean = false;
  onboarding: number = 0;
  filteredBlogs: Blog[] = [];
  searchTerm: string = "";

  async mounted() {
    this.loading = true;
    const res = await getAllBlogs();
    if (res) {
      this.blogs = res;
    }
    this.onSearch();
    this.loading = false;
  }

  onSearch() {
    this.onboarding = 0;
    if (this.searchTerm === "") {
      this.filteredBlogs = this.blogs;
    } else {
      this.filteredBlogs = this.blogs.filter(blog => blog.title.includes(this.searchTerm));
    }
  }

  next() {
    this.onboarding = this.onboarding + 1 === this.filteredBlogs.length
      ? 0
      : this.onboarding + 1;
  }

  prev() {
    this.onboarding = this.onboarding - 1 < 0
      ? this.filteredBlogs.length - 1
      : this.onboarding - 1;
  }
}
