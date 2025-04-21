import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "6zjrx5k4",
  dataset: "production",
  apiVersion: "2024-11-01",
  useCdn: false,
});
