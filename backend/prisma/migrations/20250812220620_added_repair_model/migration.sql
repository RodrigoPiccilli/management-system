-- CreateTable
CREATE TABLE "Repair" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "jobName" TEXT NOT NULL,
    "installDate" DATE,
    "installedBy" TEXT,
    "address" TEXT,
    "notes" TEXT,

    CONSTRAINT "Repair_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Repair_jobName_key" ON "Repair"("jobName");
