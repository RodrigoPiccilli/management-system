/*
  Warnings:

  - You are about to drop the `Job` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Job";

-- CreateTable
CREATE TABLE "NVRJob" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "jobName" TEXT NOT NULL,
    "areaCode" TEXT,
    "model" TEXT,
    "direction" TEXT,
    "stone" TEXT,
    "backsplash" BOOLEAN,
    "installDate" DATE,
    "ft2" DOUBLE PRECISION,
    "community" TEXT,
    "address" TEXT,
    "sink" TEXT,
    "amount" DOUBLE PRECISION,
    "poNumber" TEXT,

    CONSTRAINT "NVRJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HOJob" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "jobName" TEXT NOT NULL,
    "stone" TEXT,
    "backsplash" BOOLEAN,
    "installDate" DATE,
    "ft2" DOUBLE PRECISION,
    "address" TEXT,
    "sink" TEXT,
    "amount" DOUBLE PRECISION,

    CONSTRAINT "HOJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NVRJob_jobName_key" ON "NVRJob"("jobName");

-- CreateIndex
CREATE UNIQUE INDEX "HOJob_jobName_key" ON "HOJob"("jobName");
