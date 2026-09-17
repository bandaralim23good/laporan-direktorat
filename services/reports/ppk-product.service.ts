import { prisma } from "@/lib/prisma";

export async function getPpkProductReport() {
  return await prisma.ppkProductReport.findMany({
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