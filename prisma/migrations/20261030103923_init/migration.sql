-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('GITHUB', 'ZIP');

-- CreateTable
CREATE TABLE "GeneratedReadme" (
    "id" TEXT NOT NULL,
    "sourceType" "SourceType" NOT NULL DEFAULT 'GITHUB',
    "repoUrl" TEXT,
    "fileName" TEXT,
    "content" TEXT NOT NULL,
    "readmeStyle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeneratedReadme_pkey" PRIMARY KEY ("id")
);
