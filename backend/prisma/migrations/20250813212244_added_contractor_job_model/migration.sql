-- CreateTable
CREATE TABLE "ContractorJob" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "jobName" TEXT NOT NULL,
    "contractor" TEXT NOT NULL,
    "stone" TEXT,
    "installDate" DATE,
    "installedBy" TEXT,
    "ft2" DOUBLE PRECISION,
    "address" TEXT,
    "sink" TEXT,
    "amount" DOUBLE PRECISION,
    "deposit" BOOLEAN,
    "final" BOOLEAN,

    CONSTRAINT "ContractorJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContractorJob_jobName_key" ON "ContractorJob"("jobName");
