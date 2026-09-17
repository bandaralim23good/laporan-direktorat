import { prisma } from "@/lib/prisma";

export async function getPpkReport() {
  return await prisma.ppkReport.findMany({
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