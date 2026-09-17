import { prisma } from "@/lib/prisma";

export async function getQamReport() {
  return await prisma.qamReport.findMany({
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