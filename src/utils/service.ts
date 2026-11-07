import axios, { AxiosResponse } from "axios";

// Production builds always use VITE_API_BASE_URL. The staging/local URL is only
// honoured in `vite dev`, so a stray staging value can never leak into a release.
const API_BASE_URL =
  (import.meta.env.DEV && import.meta.env.VITE_API_BASE_URL_STAGING) ||
  import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL && typeof window !== "undefined") {
  console.warn(
    "VITE_API_BASE_URL or VITE_API_BASE_URL_STAGING is not set. API calls will use relative paths."
  );
}

const apiClient = axios.create({
  baseURL: API_BASE_URL || "",
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ServiceCheckboxState {
  name: string;
  checked: boolean;
}

export interface QuotePayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  companyName?: string;
  companyURL?: string;
  region?: string;
  services: string[];
  checkboxStates?: ServiceCheckboxState[];
  message: string;
}

export interface EmailPayload {
  name?: string;
  email: string;
  subject?: string;
  message: string;
  [key: string]: unknown;
}

export interface BlogPayload {
  title: string;
  content: string;
  author?: string;
  category?: string;
  [key: string]: unknown;
}

export interface CommentPayload {
  blogId?: string | number;
  author: string;
  comment: string;
  [key: string]: unknown;
}

export interface ApiResponse<T = unknown> {
  success?: boolean;
  message?: string;
  data?: T;
  Images?: string[];
  Users?: unknown[];
  [key: string]: unknown;
}

export const sendEmail = async (
  mailData: EmailPayload
): Promise<AxiosResponse<ApiResponse>> => {
  return apiClient.post("/api/sendEmail", mailData);
};

export const sendQuote = async (
  quoteData: QuotePayload
): Promise<AxiosResponse<ApiResponse>> => {
  return apiClient.post("/api/sendQuote", quoteData);
};

export const InsertBlog = async (
  blogs: BlogPayload
): Promise<AxiosResponse<ApiResponse>> => {
  return apiClient.post("/api/blogs", blogs);
};

export const updateBlog = async (
  blogId: string | number,
  quoteData: Partial<BlogPayload>
): Promise<AxiosResponse<ApiResponse>> => {
  return apiClient.put(`/api/blogs?id=${blogId}`, quoteData);
};

export const getBlogs = async (
  page: number | string,
  debouncedSearchTerm: string = ""
): Promise<ApiResponse> => {
  const response = await apiClient.get<ApiResponse>(
    `/api/blogs?page=${page}&title=${encodeURIComponent(debouncedSearchTerm)}`
  );
  return response.data;
};

export const getBlogById = async (
  blogId: string | number
): Promise<ApiResponse> => {
  const response = await apiClient.get<ApiResponse>(
    `/api/blogs/byId?id=${blogId}`
  );
  return response.data;
};

export const blogDelete = async (
  selectedBlogId: string | number
): Promise<ApiResponse> => {
  const response = await apiClient.delete<ApiResponse>(
    `/api/blogs/?id=${selectedBlogId}`
  );
  return response.data;
};

export const getImageById = async (
  blogId: string | number
): Promise<string[] | undefined> => {
  const response = await apiClient.get<ApiResponse>(`/api/images?id=${blogId}`);
  return response.data.Images;
};

export const getBlogsWithPagination = async (): Promise<ApiResponse> => {
  const response = await apiClient.get<ApiResponse>("/api/blogs");
  return response.data;
};

export const getCommentsByBlogId = async (
  blogId: string | number
): Promise<AxiosResponse<ApiResponse>> => {
  return apiClient.get(`/api/comments/${blogId}`);
};

export const addComments = async (
  commentData: CommentPayload
): Promise<AxiosResponse<ApiResponse>> => {
  return apiClient.post("/api/comments", commentData);
};

export const loginUser = async (
  email: string,
  password: string
): Promise<ApiResponse> => {
  const response = await apiClient.post<ApiResponse>(`/api/login`, {
    email,
    password,
  });
  return response.data;
};

export const getUsers = async (): Promise<unknown[] | undefined> => {
  const response = await apiClient.get<ApiResponse>("/api/users");
  return response.data.Users;
};

export default apiClient;