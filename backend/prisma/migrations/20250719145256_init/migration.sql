-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "jobName" TEXT NOT NULL,
    "areaCode" TEXT,
    "model" TEXT,
    "direction" TEXT,
    "stone" TEXT,
    "backsplash" BOOLEAN,
    "installDate" TIMESTAMP(3),
    "ft2" DOUBLE PRECISION,
    "community" TEXT,
    "address" TEXT,
    "sink" TEXT,
    "amount" DOUBLE PRECISION,
    "poNumber" TEXT,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_jobName_key" ON "Job"("jobName");
