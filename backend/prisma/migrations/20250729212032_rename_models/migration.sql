/*
  Warnings:

  - You are about to drop the `HOJob` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "HOJob";

-- CreateTable
CREATE TABLE "HomeownerJob" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "jobName" TEXT NOT NULL,
    "stone" TEXT,
    "backsplash" BOOLEAN,
    "installDate" DATE,
    "ft2" DOUBLE PRECISION,
    "address" TEXT,
    "sink" TEXT,
    "amount" DOUBLE PRECISION,
    "deposit" BOOLEAN,
    "final" BOOLEAN,

    CONSTRAINT "HomeownerJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HomeownerJob_jobName_key" ON "HomeownerJob"("jobName");
