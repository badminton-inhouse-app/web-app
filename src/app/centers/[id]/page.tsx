import { GetCenterDetailsData } from "@/types/entities";
import { notFound } from "next/navigation";
import CenterClient from "./client";

export default async function CenterPage({ params }: { params: { id: string } }) {
  const response = await fetch(`http://localhost:3000/api/centers/${params.id}`);
  const data = await response.json() as {
    data?: GetCenterDetailsData;
  }

  if (!data.data) {
    return notFound();
  }
  
  return (
    <CenterClient data={data.data} />
  )
}