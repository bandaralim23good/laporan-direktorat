import { prisma } from "@/lib/prisma";

export async function getQamProductReport() {
  return await prisma.qamProductReport.findMany({
    orderBy: [
      {
        year: "desc",
      },
      {
        month: "desc",
      },
    ],
  });
}