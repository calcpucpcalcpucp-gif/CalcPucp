-- CreateTable
CREATE TABLE "AdminCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminCode_pkey" PRIMARY KEY ("id")
);
