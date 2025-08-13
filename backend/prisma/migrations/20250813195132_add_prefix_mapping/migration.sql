-- CreateTable
CREATE TABLE "PrefixMapping" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "prefix" TEXT NOT NULL,
    "community" TEXT NOT NULL,

    CONSTRAINT "PrefixMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PrefixMapping_prefix_key" ON "PrefixMapping"("prefix");
